import pandas as pd
import numpy as np
import os
import json
from pathlib import Path
from tqdm import tqdm
from utils.image_processor import ImageThermalProcessor

class ThermalDataGenerator:
    """
    Generate synthetic thermal data by combining:
    - Plant images (220 images)
    - NPK data from CSV (2200 records)
    """
    
    def __init__(self, csv_path, images_dir):
        self.csv_path = csv_path
        self.images_dir = images_dir
        self.processor = ImageThermalProcessor()
        
        # Load CSV data
        print("Loading crop recommendation dataset...")
        self.crop_data = pd.read_csv(csv_path)
        print(f"✅ Loaded {len(self.crop_data)} records from CSV")
        
        # Get image paths
        self.image_paths = self._get_image_paths()
        print(f"✅ Found {len(self.image_paths)} images")
    
    def _get_image_paths(self):
        """Get all image paths from the images directory"""
        image_paths = []
        
        for crop_folder in os.listdir(self.images_dir):
            crop_path = os.path.join(self.images_dir, crop_folder)
            
            if os.path.isdir(crop_path):
                for img_file in os.listdir(crop_path):
                    if img_file.lower().endswith(('.jpg', '.jpeg', '.png')):
                        image_paths.append(os.path.join(crop_path, img_file))
        
        return image_paths
    
    def _match_crop_type(self, image_path):
        """
        Extract crop type from image path and match with CSV data
        """
        filename = os.path.basename(image_path).lower()
        
        # Mapping between image crops and CSV crops
        crop_mapping = {
            'corn': 'maize',
            'grape': 'grapes',
            'apple': 'apple',
            'tomato': 'pomegranate',  # Use similar crop
            'potato': 'kidneybeans',   # Use similar crop
            'pepper': 'pigeonpeas'     # Use similar crop
        }
        
        for img_crop, csv_crop in crop_mapping.items():
            if img_crop in filename:
                return csv_crop
        
        return 'maize'  # Default
    
    def generate_dataset(self, output_path='data/thermal_dataset.csv'):
        """
        Generate complete thermal dataset
        """
        print("\n" + "="*60)
        print("GENERATING THERMAL DATASET")
        print("="*60)
        
        dataset = []
        
        for image_path in tqdm(self.image_paths, desc="Processing images"):
            # Extract image features
            image_features = self.processor.extract_features(image_path)
            
            if image_features is None:
                continue
            
            # Match crop type
            crop_type = self._match_crop_type(image_path)
            
            # Get corresponding NPK data from CSV
            crop_samples = self.crop_data[self.crop_data['label'] == crop_type]
            
            if len(crop_samples) == 0:
                crop_samples = self.crop_data  # Use random if no match
            
            # For each image, create multiple samples with different NPK values
            num_samples = 5  # Create 5 variations per image
            
            for _ in range(num_samples):
                # Randomly select NPK values from matching crop
                npk_sample = crop_samples.sample(1).iloc[0]
                
                # Simulate thermal signature
                thermal_data = self.processor.simulate_thermal_signature(
                    image_features,
                    base_temp=npk_sample['temperature']
                )
                
                if thermal_data is None:
                    continue
                
                # Combine all data
                record = {
                    'image_path': image_path,
                    'crop_type': crop_type,
                    'N': npk_sample['N'],
                    'P': npk_sample['P'],
                    'K': npk_sample['K'],
                    'temperature': npk_sample['temperature'],
                    'humidity': npk_sample['humidity'],
                    'ph': npk_sample['ph'],
                    'rainfall': npk_sample['rainfall'],
                    'before_temp': thermal_data['before_temp'],
                    'after_temp': thermal_data['after_temp'],
                    'thermal_delta': thermal_data['thermal_delta'],
                    'health_status': thermal_data['health_status'],
                    'green_ratio': image_features['green_ratio']
                }
                
                # Calculate efficiency score (target variable)
                record['efficiency_score'] = self._calculate_efficiency(record)
                
                # Determine deficiency (target variable)
                record['deficiency'] = self._determine_deficiency(record)
                
                dataset.append(record)
        
        # Convert to DataFrame
        df = pd.DataFrame(dataset)
        
        # Save to CSV
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        df.to_csv(output_file, index=False)
        
        print(f"\n✅ Dataset generated successfully!")
        print(f"   Total samples: {len(df)}")
        print(f"   Saved to: {output_path}")
        
        # Display statistics
        self._display_statistics(df)
        
        return df
    
    def _calculate_efficiency(self, record):
        """
        Calculate fertilizer efficiency score (0-100)
        
        Factors:
        - NPK adequacy
        - Thermal response (negative delta = good)
        - Plant health
        """
        # Optimal NPK ranges (example values)
        optimal_N = 80
        optimal_P = 60
        optimal_K = 50
        
        # Calculate NPK adequacy (0-1)
        n_adequacy = 1 - abs(record['N'] - optimal_N) / optimal_N
        p_adequacy = 1 - abs(record['P'] - optimal_P) / optimal_P
        k_adequacy = 1 - abs(record['K'] - optimal_K) / optimal_K
        
        npk_score = (n_adequacy + p_adequacy + k_adequacy) / 3
        npk_score = max(0, min(1, npk_score))  # Clip to 0-1
        
        # Thermal response score
        # Negative delta (cooling) is good = high efficiency
        if record['thermal_delta'] < -2:
            thermal_score = 1.0
        elif record['thermal_delta'] < 0:
            thermal_score = 0.7
        elif record['thermal_delta'] < 1:
            thermal_score = 0.5
        else:
            thermal_score = 0.3
        
        # Health status score
        health_score = 1.0 if record['health_status'] == 'healthy' else 0.5
        
        # Combined efficiency score
        efficiency = (npk_score * 0.4 + thermal_score * 0.4 + health_score * 0.2) * 100
        
        return round(efficiency, 2)
    
    def _determine_deficiency(self, record):
        """
        Determine nutrient deficiency type
        
        Returns: 'N_deficient', 'P_deficient', 'K_deficient', or 'Balanced'
        """
        N = record['N']
        P = record['P']
        K = record['K']
        
        # Thresholds
        N_low = 40
        P_low = 30
        K_low = 30
        
        deficiencies = []
        
        if N < N_low:
            deficiencies.append('N')
        if P < P_low:
            deficiencies.append('P')
        if K < K_low:
            deficiencies.append('K')
        
        if len(deficiencies) == 0:
            return 'Balanced'
        elif len(deficiencies) == 1:
            return f'{deficiencies[0]}_deficient'
        else:
            # Multiple deficiencies - return the most severe
            npk_values = {'N': N, 'P': P, 'K': K}
            most_deficient = min(deficiencies, key=lambda x: npk_values[x])
            return f'{most_deficient}_deficient'
    
    def _display_statistics(self, df):
        """Display dataset statistics"""
        print("\n" + "="*60)
        print("DATASET STATISTICS")
        print("="*60)
        
        print(f"\nShape: {df.shape}")
        print(f"Samples: {len(df)} rows, {len(df.columns)} columns")
        
        print("\nCrop Distribution:")
        print(df['crop_type'].value_counts())
        
        print("\nHealth Status Distribution:")
        print(df['health_status'].value_counts())
        
        print("\nDeficiency Distribution:")
        print(df['deficiency'].value_counts())
        
        print("\nEfficiency Score Statistics:")
        print(df['efficiency_score'].describe())
        
        print("\nThermal Delta Statistics:")
        print(df['thermal_delta'].describe())

# Main execution
if __name__ == "__main__":
    # Paths (adjust if needed)
    CSV_PATH = "../datasets/Crop_recommendation.csv"
    IMAGES_DIR = "../datasets/selected_plant_images"
    OUTPUT_PATH = "data/thermal_dataset.csv"
    
    # Generate dataset
    generator = ThermalDataGenerator(CSV_PATH, IMAGES_DIR)
    df = generator.generate_dataset(OUTPUT_PATH)
    
    print("\n✅ Thermal data generation complete!")