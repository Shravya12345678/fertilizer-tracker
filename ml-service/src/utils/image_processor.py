import cv2
import numpy as np
import os
from pathlib import Path

class ImageThermalProcessor:
    """
    Process plant images to extract features and simulate thermal signatures
    """
    
    def __init__(self):
        self.image_size = (224, 224)
    
    def load_image(self, image_path):
        """Load and preprocess image"""
        try:
            img = cv2.imread(image_path)
            if img is None:
                return None
            
            # Resize to standard size
            img = cv2.resize(img, self.image_size)
            return img
        except Exception as e:
            print(f"Error loading image {image_path}: {e}")
            return None
    
    def extract_health_indicator(self, image_path):
        """
        Extract plant health indicator from filename
        Returns: 'healthy' or 'stressed'
        """
        filename = os.path.basename(image_path).lower()
        
        # Check if filename contains health-related keywords
        if 'healthy' in filename:
            return 'healthy'
        else:
            # Any disease/problem indicates stress
            return 'stressed'
    
    def calculate_green_ratio(self, image):
        """
        Calculate ratio of green pixels (indicator of plant health)
        Healthy plants have more green area
        """
        if image is None:
            return 0.0
        
        # Convert to HSV color space
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        
        # Define range for green color
        lower_green = np.array([35, 40, 40])
        upper_green = np.array([85, 255, 255])
        
        # Create mask for green pixels
        mask = cv2.inRange(hsv, lower_green, upper_green)
        
        # Calculate ratio of green pixels
        total_pixels = image.shape[0] * image.shape[1]
        green_pixels = np.sum(mask > 0)
        green_ratio = green_pixels / total_pixels
        
        return green_ratio
    
    def calculate_texture_variance(self, image):
        """
        Calculate texture variance (indicator of leaf damage)
        Higher variance = more texture irregularity = disease
        """
        if image is None:
            return 0.0
        
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Calculate Laplacian (edge detection)
        laplacian = cv2.Laplacian(gray, cv2.CV_64F)
        variance = laplacian.var()
        
        return variance
    
    def extract_features(self, image_path):
        """
        Extract all features from image
        """
        image = self.load_image(image_path)
        
        if image is None:
            return None
        
        features = {
            'health_status': self.extract_health_indicator(image_path),
            'green_ratio': self.calculate_green_ratio(image),
            'texture_variance': self.calculate_texture_variance(image),
            'filename': os.path.basename(image_path)
        }
        
        return features
    
    def simulate_thermal_signature(self, image_features, base_temp):
        """
        Simulate thermal signature based on image features and base temperature
        
        Logic:
        - Healthy plants transpire more → cooler canopy (negative delta)
        - Stressed plants transpire less → warmer canopy (positive delta)
        """
        if image_features is None:
            return None
        
        health_status = image_features['health_status']
        green_ratio = image_features['green_ratio']
        
        # Base temperature variation
        base_variation = np.random.uniform(-0.5, 0.5)
        
        if health_status == 'healthy':
            # Healthy plants: 1-3°C cooler
            # More green = more cooling
            cooling_effect = -1.5 - (green_ratio * 1.5)
            thermal_delta = cooling_effect + base_variation
        else:
            # Stressed/diseased plants: 0.5-2.5°C warmer
            # Less green = less cooling = warmer
            warming_effect = 0.5 + ((1 - green_ratio) * 2.0)
            thermal_delta = warming_effect + base_variation
        
        before_temp = base_temp + np.random.uniform(-1, 1)
        after_temp = before_temp + thermal_delta
        
        return {
            'before_temp': round(before_temp, 2),
            'after_temp': round(after_temp, 2),
            'thermal_delta': round(thermal_delta, 2),
            'health_status': health_status
        }