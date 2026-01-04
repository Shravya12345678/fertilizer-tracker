import joblib
import numpy as np
import json
import os

class FertilizerPredictor:
    """
    Prediction service for fertilizer efficiency analysis
    """
    
    def __init__(self, models_dir='../trained_models'):
        self.models_dir = models_dir
        self.efficiency_model = None
        self.deficiency_model = None
        self.scaler = None
        self.label_encoder = None
        self.feature_names = None
        self.deficiency_classes = None
        
        self.load_models()
        
        def load_models(self):
            base_dir = os.path.dirname(os.path.abspath(__file__))
            models_dir = os.path.join(base_dir, '..', 'trained_models')
            
            try:
                print("Loading models from:", models_dir)
                model_path = os.path.join(models_dir, 'efficiency_model.pkl')
                self.efficiency_model = joblib.load(model_path)
                print("✅ Models loaded successfully!")
            except Exception as e:
                    print(f"❌ Error loading models: {e}")
                    raise e
    
    # def load_models(self):
    #     """Load all trained models and preprocessors"""
    #     print("Loading models...")
        
    #     try:
    #         # Load models
    #         self.efficiency_model = joblib.load(
    #             os.path.join(self.models_dir, 'efficiency_model.pkl')
    #         )
    #         self.deficiency_model = joblib.load(
    #             os.path.join(self.models_dir, 'deficiency_model.pkl')
    #         )
            
    #         # Load preprocessors
    #         self.scaler = joblib.load(
    #             os.path.join(self.models_dir, 'scaler.pkl')
    #         )
    #         self.label_encoder = joblib.load(
    #             os.path.join(self.models_dir, 'label_encoder.pkl')
    #         )
            
    #         # Load model info
    #         with open(os.path.join(self.models_dir, 'model_info.json'), 'r') as f:
    #             model_info = json.load(f)
    #             self.feature_names = model_info['efficiency_features']
    #             self.deficiency_classes = model_info['deficiency_classes']
            
    #         print("✅ Models loaded successfully!")
            
    #     except Exception as e:
    #         print(f"❌ Error loading models: {e}")
    #         raise
    
    def preprocess_input(self, input_data):
        """
        Preprocess input data
        
        Expected input format:
        {
            'N': float,
            'P': float,
            'K': float,
            'temperature': float,
            'humidity': float,
            'ph': float,
            'rainfall': float,
            'thermal_delta': float,
            'green_ratio': float
        }
        """
        # Extract features in correct order
        features = [input_data[name] for name in self.feature_names]
        
        # Convert to numpy array
        features_array = np.array(features).reshape(1, -1)
        
        # Scale features
        features_scaled = self.scaler.transform(features_array)
        
        return features_scaled
    
    def predict_efficiency(self, input_data):
        """Predict fertilizer efficiency score"""
        features = self.preprocess_input(input_data)
        efficiency_score = self.efficiency_model.predict(features)[0]
        
        # Clip to valid range
        efficiency_score = max(0, min(100, efficiency_score))
        
        return round(efficiency_score, 2)
    
    def predict_deficiency(self, input_data):
        """Predict nutrient deficiency"""
        features = self.preprocess_input(input_data)
        
        # Predict class
        deficiency_encoded = self.deficiency_model.predict(features)[0]
        deficiency = self.label_encoder.inverse_transform([deficiency_encoded])[0]
        
        # Predict probabilities
        probabilities = self.deficiency_model.predict_proba(features)[0]
        
        # Create probability dict
        prob_dict = {
            self.deficiency_classes[i]: round(float(prob), 4)
            for i, prob in enumerate(probabilities)
        }
        
        return deficiency, prob_dict
    
    def predict_all(self, input_data):
        """
        Complete prediction pipeline
        
        Returns comprehensive analysis
        """
        try:
            # Predict efficiency
            efficiency_score = self.predict_efficiency(input_data)
            
            # Predict deficiency
            deficiency, deficiency_probs = self.predict_deficiency(input_data)
            
            # Generate recommendations
            recommendations = self.generate_recommendations(
                efficiency_score, deficiency, input_data
            )
            
            # Determine stress level
            stress_level = self.determine_stress_level(efficiency_score, input_data)
            
            result = {
                'success': True,
                'efficiency_score': efficiency_score,
                'deficiency': deficiency,
                'deficiency_probabilities': deficiency_probs,
                'stress_level': stress_level,
                'recommendations': recommendations,
                'input_data': input_data
            }
            
            return result
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def generate_recommendations(self, efficiency_score, deficiency, input_data):
        """Generate fertilizer recommendations"""
        recommendations = []
        
        # Efficiency-based recommendations
        if efficiency_score < 50:
            recommendations.append("⚠️ Low fertilizer efficiency detected. Consider soil testing.")
        elif efficiency_score < 70:
            recommendations.append("✓ Moderate efficiency. Minor adjustments recommended.")
        else:
            recommendations.append("✓ Good fertilizer efficiency!")
        
        # Deficiency-based recommendations
        if deficiency == 'N_deficient':
            recommendations.append("🌱 Nitrogen deficiency detected. Apply urea or ammonium-based fertilizers.")
            recommendations.append(f"   Current N level: {input_data['N']} (Increase to 60-80)")
        elif deficiency == 'P_deficient':
            recommendations.append("🌱 Phosphorus deficiency detected. Apply DAP or rock phosphate.")
            recommendations.append(f"   Current P level: {input_data['P']} (Increase to 40-60)")
        elif deficiency == 'K_deficient':
            recommendations.append("🌱 Potassium deficiency detected. Apply MOP or potash.")
            recommendations.append(f"   Current K level: {input_data['K']} (Increase to 40-60)")
        else:
            recommendations.append("✓ Nutrient levels are balanced!")
        
        # Thermal-based recommendations
        thermal_delta = input_data.get('thermal_delta', 0)
        if thermal_delta > 2:
            recommendations.append("🌡️ High thermal stress detected. Increase irrigation.")
        elif thermal_delta < -3:
            recommendations.append("🌡️ Excellent transpiration activity. Continue current practices.")
        
        return recommendations
    
    def determine_stress_level(self, efficiency_score, input_data):
        """Determine crop stress level"""
        thermal_delta = input_data.get('thermal_delta', 0)
        
        if efficiency_score > 75 and thermal_delta < 0:
            return 'low'
        elif efficiency_score > 50:
            return 'medium'
        else:
            return 'high'

# Test the predictor
if __name__ == "__main__":
    predictor = FertilizerPredictor()
    
    # Test prediction
    test_input = {
        'N': 60,
        'P': 45,
        'K': 40,
        'temperature': 28.5,
        'humidity': 65.0,
        'ph': 6.5,
        'rainfall': 100.0,
        'thermal_delta': -2.3,
        'green_ratio': 0.75
    }
    
    result = predictor.predict_all(test_input)
    
    print("\n" + "="*60)
    print("PREDICTION TEST")
    print("="*60)
    print(json.dumps(result, indent=2))