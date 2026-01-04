import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib
import os

class DataPreprocessor:
    """
    Preprocess thermal dataset for ML training
    """
    
    def __init__(self, data_path='../data/thermal_dataset.csv'):
        self.data_path = data_path
        self.df = None
        self.label_encoder = LabelEncoder()
        self.scaler = StandardScaler()
        
    def load_data(self):
        """Load the thermal dataset"""
        print("Loading thermal dataset...")
        self.df = pd.read_csv(self.data_path)
        print(f"✅ Loaded {len(self.df)} samples")
        print(f"   Columns: {list(self.df.columns)}")
        return self.df
    
    def clean_data(self):
        """Clean and handle missing values"""
        print("\nCleaning data...")
        
        # Check for missing values
        missing = self.df.isnull().sum()
        if missing.sum() > 0:
            print(f"⚠️  Missing values found:")
            print(missing[missing > 0])
            
            # Fill missing values
            self.df.fillna(self.df.mean(numeric_only=True), inplace=True)
            print("✅ Missing values filled with mean")
        else:
            print("✅ No missing values")
        
        # Remove duplicates
        initial_rows = len(self.df)
        self.df.drop_duplicates(inplace=True)
        removed = initial_rows - len(self.df)
        if removed > 0:
            print(f"✅ Removed {removed} duplicate rows")
        
        return self.df
    
    def prepare_features(self):
        """
        Prepare features for model training
        
        Returns:
        - X_efficiency: Features for efficiency prediction
        - y_efficiency: Target for efficiency prediction
        - X_deficiency: Features for deficiency classification
        - y_deficiency: Target for deficiency classification
        """
        print("\nPreparing features...")
        
        # Feature columns
        feature_cols = [
            'N', 'P', 'K',
            'temperature', 'humidity', 'ph', 'rainfall',
            'thermal_delta', 'green_ratio'
        ]
        
        # Efficiency prediction (Regression)
        X_efficiency = self.df[feature_cols].copy()
        y_efficiency = self.df['efficiency_score'].copy()
        
        # Deficiency classification (Classification)
        X_deficiency = self.df[feature_cols].copy()
        y_deficiency = self.df['deficiency'].copy()
        
        # Encode deficiency labels
        y_deficiency_encoded = self.label_encoder.fit_transform(y_deficiency)
        
        print(f"✅ Features prepared:")
        print(f"   Feature columns: {len(feature_cols)}")
        print(f"   Efficiency samples: {len(X_efficiency)}")
        print(f"   Deficiency samples: {len(X_deficiency)}")
        print(f"   Deficiency classes: {list(self.label_encoder.classes_)}")
        
        return X_efficiency, y_efficiency, X_deficiency, y_deficiency_encoded
    
    def split_data(self, X, y, test_size=0.2, random_state=42):
        """Split data into train and test sets"""
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state, stratify=None
        )
        
        print(f"\n✅ Data split:")
        print(f"   Training samples: {len(X_train)}")
        print(f"   Test samples: {len(X_test)}")
        
        return X_train, X_test, y_train, y_test
    
    def scale_features(self, X_train, X_test):
        """
        Scale features using StandardScaler
        """
        print("\nScaling features...")
        
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        print("✅ Features scaled")
        
        return X_train_scaled, X_test_scaled
    
    def save_preprocessors(self, output_dir='../trained_models'):
        """Save label encoder and scaler"""
        os.makedirs(output_dir, exist_ok=True)
        
        joblib.dump(self.label_encoder, os.path.join(output_dir, 'label_encoder.pkl'))
        joblib.dump(self.scaler, os.path.join(output_dir, 'scaler.pkl'))
        
        print(f"\n✅ Preprocessors saved to {output_dir}")
    
    def prepare_all(self):
        """
        Complete preprocessing pipeline
        
        Returns: Dictionary with all prepared data
        """
        print("="*60)
        print("DATA PREPROCESSING PIPELINE")
        print("="*60)
        
        # Load and clean
        self.load_data()
        self.clean_data()
        
        # Prepare features
        X_eff, y_eff, X_def, y_def = self.prepare_features()
        
        # Split efficiency data
        X_eff_train, X_eff_test, y_eff_train, y_eff_test = self.split_data(X_eff, y_eff)
        
        # Split deficiency data
        X_def_train, X_def_test, y_def_train, y_def_test = self.split_data(X_def, y_def)
        
        # Scale features
        X_eff_train_scaled, X_eff_test_scaled = self.scale_features(X_eff_train, X_eff_test)
        X_def_train_scaled, X_def_test_scaled = self.scale_features(X_def_train, X_def_test)
        
        # Save preprocessors
        self.save_preprocessors()
        
        print("\n" + "="*60)
        print("PREPROCESSING COMPLETE!")
        print("="*60)
        
        return {
            'efficiency': {
                'X_train': X_eff_train_scaled,
                'X_test': X_eff_test_scaled,
                'y_train': y_eff_train,
                'y_test': y_eff_test,
                'feature_names': X_eff.columns.tolist()
            },
            'deficiency': {
                'X_train': X_def_train_scaled,
                'X_test': X_def_test_scaled,
                'y_train': y_def_train,
                'y_test': y_def_test,
                'feature_names': X_def.columns.tolist(),
                'classes': self.label_encoder.classes_
            }
        }

# Main execution
if __name__ == "__main__":
    preprocessor = DataPreprocessor()
    data = preprocessor.prepare_all()
    
    print("\n✅ Data ready for model training!")