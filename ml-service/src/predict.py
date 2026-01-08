# import joblib
# import numpy as np
# import json
# import os

# class FertilizerPredictor:
#     """
#     Prediction service for fertilizer efficiency analysis
#     """
    
#     def __init__(self, models_dir='../trained_models'):
#         self.models_dir = models_dir
#         self.efficiency_model = None
#         self.deficiency_model = None
#         self.scaler = None
#         self.label_encoder = None
#         self.feature_names = None
#         self.deficiency_classes = None
        
#         self.load_models()
        
#     def load_models(self):
#         base_dir = os.path.dirname(os.path.abspath(__file__))
#         models_dir = os.path.join(base_dir, '..', 'trained_models')
#         try:
#             print("Loading models from:", models_dir)
#             model_path = os.path.join(models_dir, 'efficiency_model.pkl')
#             self.efficiency_model = joblib.load(model_path)
#             print("✅ Models loaded successfully!")
#         except Exception as e:
#             print(f"❌ Error loading models: {e}")
#             raise e
    
#     # def load_models(self):
#     #     """Load all trained models and preprocessors"""
#     #     print("Loading models...")
        
#     #     try:
#     #         # Load models
#     #         self.efficiency_model = joblib.load(
#     #             os.path.join(self.models_dir, 'efficiency_model.pkl')
#     #         )
#     #         self.deficiency_model = joblib.load(
#     #             os.path.join(self.models_dir, 'deficiency_model.pkl')
#     #         )
            
#     #         # Load preprocessors
#     #         self.scaler = joblib.load(
#     #             os.path.join(self.models_dir, 'scaler.pkl')
#     #         )
#     #         self.label_encoder = joblib.load(
#     #             os.path.join(self.models_dir, 'label_encoder.pkl')
#     #         )
            
#     #         # Load model info
#     #         with open(os.path.join(self.models_dir, 'model_info.json'), 'r') as f:
#     #             model_info = json.load(f)
#     #             self.feature_names = model_info['efficiency_features']
#     #             self.deficiency_classes = model_info['deficiency_classes']
            
#     #         print("✅ Models loaded successfully!")
            
#     #     except Exception as e:
#     #         print(f"❌ Error loading models: {e}")
#     #         raise
    
#     def preprocess_input(self, input_data):
#         """
#         Preprocess input data
        
#         Expected input format:
#         {
#             'N': float,
#             'P': float,
#             'K': float,
#             'temperature': float,
#             'humidity': float,
#             'ph': float,
#             'rainfall': float,
#             'thermal_delta': float,
#             'green_ratio': float
#         }
#         """
#         # Extract features in correct order
#         features = [input_data[name] for name in self.feature_names]
        
#         # Convert to numpy array
#         features_array = np.array(features).reshape(1, -1)
        
#         # Scale features
#         features_scaled = self.scaler.transform(features_array)
        
#         return features_scaled
    
#     def predict_efficiency(self, input_data):
#         """Predict fertilizer efficiency score"""
#         features = self.preprocess_input(input_data)
#         efficiency_score = self.efficiency_model.predict(features)[0]
        
#         # Clip to valid range
#         efficiency_score = max(0, min(100, efficiency_score))
        
#         return round(efficiency_score, 2)
    
#     def predict_deficiency(self, input_data):
#         """Predict nutrient deficiency"""
#         features = self.preprocess_input(input_data)
        
#         # Predict class
#         deficiency_encoded = self.deficiency_model.predict(features)[0]
#         deficiency = self.label_encoder.inverse_transform([deficiency_encoded])[0]
        
#         # Predict probabilities
#         probabilities = self.deficiency_model.predict_proba(features)[0]
        
#         # Create probability dict
#         prob_dict = {
#             self.deficiency_classes[i]: round(float(prob), 4)
#             for i, prob in enumerate(probabilities)
#         }
        
#         return deficiency, prob_dict
    
#     def predict_all(self, input_data):
#         """
#         Complete prediction pipeline
        
#         Returns comprehensive analysis
#         """
#         try:
#             # Predict efficiency
#             efficiency_score = self.predict_efficiency(input_data)
            
#             # Predict deficiency
#             deficiency, deficiency_probs = self.predict_deficiency(input_data)
            
#             # Generate recommendations
#             recommendations = self.generate_recommendations(
#                 efficiency_score, deficiency, input_data
#             )
            
#             # Determine stress level
#             stress_level = self.determine_stress_level(efficiency_score, input_data)
            
#             result = {
#                 'success': True,
#                 'efficiency_score': efficiency_score,
#                 'deficiency': deficiency,
#                 'deficiency_probabilities': deficiency_probs,
#                 'stress_level': stress_level,
#                 'recommendations': recommendations,
#                 'input_data': input_data
#             }
            
#             return result
            
#         except Exception as e:
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def generate_recommendations(self, efficiency_score, deficiency, input_data):
#         """Generate fertilizer recommendations"""
#         recommendations = []
        
#         # Efficiency-based recommendations
#         if efficiency_score < 50:
#             recommendations.append("⚠️ Low fertilizer efficiency detected. Consider soil testing.")
#         elif efficiency_score < 70:
#             recommendations.append("✓ Moderate efficiency. Minor adjustments recommended.")
#         else:
#             recommendations.append("✓ Good fertilizer efficiency!")
        
#         # Deficiency-based recommendations
#         if deficiency == 'N_deficient':
#             recommendations.append("🌱 Nitrogen deficiency detected. Apply urea or ammonium-based fertilizers.")
#             recommendations.append(f"   Current N level: {input_data['N']} (Increase to 60-80)")
#         elif deficiency == 'P_deficient':
#             recommendations.append("🌱 Phosphorus deficiency detected. Apply DAP or rock phosphate.")
#             recommendations.append(f"   Current P level: {input_data['P']} (Increase to 40-60)")
#         elif deficiency == 'K_deficient':
#             recommendations.append("🌱 Potassium deficiency detected. Apply MOP or potash.")
#             recommendations.append(f"   Current K level: {input_data['K']} (Increase to 40-60)")
#         else:
#             recommendations.append("✓ Nutrient levels are balanced!")
        
#         # Thermal-based recommendations
#         thermal_delta = input_data.get('thermal_delta', 0)
#         if thermal_delta > 2:
#             recommendations.append("🌡️ High thermal stress detected. Increase irrigation.")
#         elif thermal_delta < -3:
#             recommendations.append("🌡️ Excellent transpiration activity. Continue current practices.")
        
#         return recommendations
    
#     def determine_stress_level(self, efficiency_score, input_data):
#         """Determine crop stress level"""
#         thermal_delta = input_data.get('thermal_delta', 0)
        
#         if efficiency_score > 75 and thermal_delta < 0:
#             return 'low'
#         elif efficiency_score > 50:
#             return 'medium'
#         else:
#             return 'high'

# # Test the predictor
# if __name__ == "__main__":
#     predictor = FertilizerPredictor()
    
#     # Test prediction
#     test_input = {
#         'N': 60,
#         'P': 45,
#         'K': 40,
#         'temperature': 28.5,
#         'humidity': 65.0,
#         'ph': 6.5,
#         'rainfall': 100.0,
#         'thermal_delta': -2.3,
#         'green_ratio': 0.75
#     }
    
#     result = predictor.predict_all(test_input)
    
#     print("\n" + "="*60)
#     print("PREDICTION TEST")
#     print("="*60)
#     print(json.dumps(result, indent=2))



# import joblib
# import numpy as np
# import json
# import os

# class FertilizerPredictor:
#     """
#     Prediction service for fertilizer efficiency analysis
#     """
    
#     def __init__(self, models_dir='../trained_models'):
#         # We define these as None initially so we can check if they loaded
#         self.efficiency_model = None
#         self.deficiency_model = None
#         self.scaler = None
#         self.label_encoder = None
#         self.feature_names = None
#         self.deficiency_classes = None
        
#         # Determine the absolute path to the models directory
#         base_dir = os.path.dirname(os.path.abspath(__file__))
#         self.models_path = os.path.join(base_dir, '..', 'trained_models')
        
#         self.load_models()
        
#     def load_models(self):
#         """Load all trained models and preprocessors from the trained_models folder"""
#         print(f"📡 Attempting to load models from: {self.models_path}")
        
#         try:
#             # 1. Load the ML Models
#             self.efficiency_model = joblib.load(
#                 os.path.join(self.models_path, 'efficiency_model.pkl')
#             )
#             self.deficiency_model = joblib.load(
#                 os.path.join(self.models_path, 'deficiency_model.pkl')
#             )
            
#             # 2. Load the Preprocessors (Scaler and Encoder)
#             self.scaler = joblib.load(
#                 os.path.join(self.models_path, 'scaler.pkl')
#             )
#             self.label_encoder = joblib.load(
#                 os.path.join(self.models_path, 'label_encoder.pkl')
#             )
            
#             # 3. Load Model Metadata (Features and Classes)
#             info_path = os.path.join(self.models_path, 'model_info.json')
#             with open(info_path, 'r') as f:
#                 model_info = json.load(f)
#                 self.feature_names = model_info['efficiency_features']
#                 self.deficiency_classes = model_info['deficiency_classes']
            
#             print("✅ All models, scalers, and metadata loaded successfully!")
            
#         except Exception as e:
#             print(f"❌ CRITICAL ERROR loading models: {str(e)}")
#             # We raise the error so the Flask app (app.py) knows the service isn't ready
#             raise e

#     def preprocess_input(self, input_data):
#         """
#         Preprocess input data into the format the model expects.
#         Matches keys from analysisController.js
#         """
#         # Extract features in the exact order defined during training
#         try:
#             features = [input_data[name] for name in self.feature_names]
#         except KeyError as e:
#             raise KeyError(f"Missing required input field: {str(e)}")
        
#         # Convert to numpy array and reshape for a single prediction
#         features_array = np.array(features).reshape(1, -1)
        
#         # Apply the same scaling used during training
#         features_scaled = self.scaler.transform(features_array)
        
#         return features_scaled
    
#     def predict_efficiency(self, input_data):
#         """Predict fertilizer efficiency score (0-100)"""
#         features = self.preprocess_input(input_data)
#         efficiency_score = self.efficiency_model.predict(features)[0]
        
#         # Ensure result stays within logical bounds
#         efficiency_score = max(0, min(100, efficiency_score))
#         return round(float(efficiency_score), 2)
    
#     def predict_deficiency(self, input_data):
#         """Predict nutrient deficiency type and probabilities"""
#         features = self.preprocess_input(input_data)
        
#         # Get the numeric prediction and decode it back to a string (e.g., 'N_deficient')
#         deficiency_encoded = self.deficiency_model.predict(features)[0]
#         deficiency = self.label_encoder.inverse_transform([deficiency_encoded])[0]
        
#         # Get probabilities for each class
#         probabilities = self.deficiency_model.predict_proba(features)[0]
        
#         # Create a dictionary mapping class names to probabilities
#         prob_dict = {
#             self.deficiency_classes[i]: round(float(prob), 4)
#             for i, prob in enumerate(probabilities)
#         }
        
#         return deficiency, prob_dict
    
#     def predict_all(self, input_data):
#         """The main pipeline called by app.py"""
#         try:
#             # 1. Run Predictions
#             eff_score = self.predict_efficiency(input_data)
#             deficiency, deficiency_probs = self.predict_deficiency(input_data)
            
#             # 2. Logic-based insights
#             recommendations = self.generate_recommendations(eff_score, deficiency, input_data)
#             stress_level = self.determine_stress_level(eff_score, input_data)
            
#             return {
#                 'success': True,
#                 'efficiency_score': eff_score,
#                 'deficiency': deficiency,
#                 'deficiency_probabilities': deficiency_probs,
#                 'stress_level': stress_level,
#                 'recommendations': recommendations
#             }
            
#         except Exception as e:
#             print(f"⚠️ Prediction logic error: {str(e)}")
#             return {
#                 'success': False,
#                 'error': str(e)
#             }
    
#     def generate_recommendations(self, score, deficiency, data):
#         """Generate human-readable advice based on AI results"""
#         recs = []
        
#         # Efficiency Insight
#         if score < 50:
#             recs.append("⚠️ Critical: Low fertilizer efficiency. Soil may have high runoff or leaching.")
#         elif score < 75:
#             recs.append("✓ Moderate efficiency. Consider optimizing application timing.")
#         else:
#             recs.append("⭐ High efficiency! Current application matches plant uptake well.")
            
#         # Deficiency Insight
#         recs_map = {
#             'N_deficient': "🌱 Nitrogen deficiency: Apply Urea or Ammonium Nitrate.",
#             'P_deficient': "🌱 Phosphorus deficiency: Apply DAP or Superphosphate.",
#             'K_deficient': "🌱 Potassium deficiency: Apply MOP (Potash).",
#             'healthy': "✓ No major nutrient deficiencies detected."
#         }
#         recs.append(recs_map.get(deficiency, "Check local soil guidelines."))
        
#         # Environmental Stress
#         if data.get('thermal_delta', 0) > 2.0:
#             recs.append("🌡️ High Thermal Stress: Increase irrigation to support transpiration.")
            
#         return recs

#     def determine_stress_level(self, score, data):
#         """Calculate categorical stress level"""
#         thermal = data.get('thermal_delta', 0)
#         if score < 40 or thermal > 3:
#             return 'high'
#         if score < 70 or thermal > 1:
#             return 'medium'
#         return 'low'

# # Logic for local testing
# if __name__ == "__main__":
#     predictor = FertilizerPredictor()
#     sample = {
#         'N': 60, 'P': 40, 'K': 40, 'temperature': 25, 
#         'humidity': 60, 'ph': 6.5, 'rainfall': 100, 
#         'thermal_delta': -2.0, 'green_ratio': 0.75
#     }
#     print(predictor.predict_all(sample))



# import joblib
# import numpy as np
# import json
# import os
# import matplotlib.pyplot as plt
# import seaborn as sns
# import io
# import base64

# class FertilizerPredictor:
#     def __init__(self, models_dir='../trained_models'):
#         self.efficiency_model = None
#         self.deficiency_model = None
#         self.scaler = None
#         self.label_encoder = None
#         self.feature_names = None
#         self.deficiency_classes = None
        
#         base_dir = os.path.dirname(os.path.abspath(__file__))
#         self.models_path = os.path.join(base_dir, '..', 'trained_models')
#         self.load_models()
        
#     def load_models(self):
#         try:
#             self.efficiency_model = joblib.load(os.path.join(self.models_path, 'efficiency_model.pkl'))
#             self.deficiency_model = joblib.load(os.path.join(self.models_path, 'deficiency_model.pkl'))
#             self.scaler = joblib.load(os.path.join(self.models_path, 'scaler.pkl'))
#             self.label_encoder = joblib.load(os.path.join(self.models_path, 'label_encoder.pkl'))
            
#             info_path = os.path.join(self.models_path, 'model_info.json')
#             with open(info_path, 'r') as f:
#                 model_info = json.load(f)
#                 self.feature_names = model_info['efficiency_features']
#                 self.deficiency_classes = model_info['deficiency_classes']
#             print("✅ All models, scalers, and metadata loaded successfully!")
#         except Exception as e:
#             print(f"❌ CRITICAL ERROR loading models: {str(e)}")
#             raise e

#     def generate_heatmap_base64(self, thermal_delta):
#         """Generates a synthetic thermal heatmap based on the delta value"""
#         # Create a 10x10 grid representing the field based on your temps
#         data = np.random.randn(10, 10) * 0.4 + (25 + thermal_delta)
        
#         plt.figure(figsize=(5, 4))
#         # Red-Yellow-Green (Reversed) color scheme for thermal stress
#         sns.heatmap(data, cmap='RdYlGn_r', cbar=True, cbar_kws={'label': 'Temp °C'})
#         plt.title(f"Thermal Distribution Map (Δ {thermal_delta}°C)")
#         plt.axis('off')
        
#         buf = io.BytesIO()
#         plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
#         plt.close()
#         buf.seek(0)
#         return f"data:image/png;base64,{base64.b64encode(buf.read()).decode('utf-8')}"

#     def preprocess_input(self, input_data):
#         features = [input_data[name] for name in self.feature_names]
#         features_array = np.array(features).reshape(1, -1)
#         return self.scaler.transform(features_array)
    
#     def predict_all(self, input_data):
#         try:
#             features_scaled = self.preprocess_input(input_data)
            
#             # 1. Prediction logic
#             eff_score = max(0, min(100, self.efficiency_model.predict(features_scaled)[0]))
#             deficiency_encoded = self.deficiency_model.predict(features_scaled)[0]
#             deficiency = self.label_encoder.inverse_transform([deficiency_encoded])[0]
            
#             # 2. Get probabilities
#             probabilities = self.deficiency_model.predict_proba(features_scaled)[0]
#             prob_dict = {self.deficiency_classes[i]: round(float(prob), 4) for i, prob in enumerate(probabilities)}
            
#             # 3. Generate Visuals and Insights
#             heatmap_image = self.generate_heatmap_base64(input_data.get('thermal_delta', 0))
#             recommendations = self.generate_recommendations(eff_score, deficiency, input_data)
#             stress_level = self.determine_stress_level(eff_score, input_data)
            
#             return {
#                 'success': True,
#                 'efficiency_score': round(float(eff_score), 2),
#                 'deficiency': deficiency,
#                 'deficiency_probabilities': prob_dict,
#                 'heatmap_image': heatmap_image,
#                 'stress_level': stress_level,
#                 'recommendations': recommendations
#             }
#         except Exception as e:
#             return {'success': False, 'error': str(e)}

#     def generate_recommendations(self, score, deficiency, data):
#         recs = []
#         if score < 50:
#             recs.append("⚠️ Critical: Low fertilizer efficiency. Soil may have high runoff or leaching.")
#         elif score < 75:
#             recs.append("✓ Moderate efficiency. Consider optimizing application timing.")
#         else:
#             recs.append("⭐ High efficiency! Current application matches plant uptake well.")
            
#         recs_map = {
#             'N_deficient': "🌱 Nitrogen deficiency: Apply Urea or Ammonium Nitrate.",
#             'P_deficient': "🌱 Phosphorus deficiency: Apply DAP or Superphosphate.",
#             'K_deficient': "🌱 Potassium deficiency: Apply MOP (Potash).",
#             'healthy': "✓ No major nutrient deficiencies detected."
#         }
#         recs.append(recs_map.get(deficiency, "Check local soil guidelines."))
        
#         if data.get('thermal_delta', 0) > 2.0:
#             recs.append("🌡️ High Thermal Stress: Increase irrigation to support transpiration.")
#         return recs

#     def determine_stress_level(self, score, data):
#         thermal = data.get('thermal_delta', 0)
#         if score < 40 or thermal > 3: return 'high'
#         if score < 70 or thermal > 1: return 'medium'
#         return 'low'




# import joblib
# import numpy as np
# import json
# import os
# import matplotlib.pyplot as plt
# import seaborn as sns
# import io
# import base64

# class FertilizerPredictor:
#     def __init__(self, models_dir='../trained_models'):
#         self.efficiency_model = None
#         self.deficiency_model = None
#         self.scaler = None
#         self.label_encoder = None
#         self.feature_names = None
#         self.deficiency_classes = None
        
#         base_dir = os.path.dirname(os.path.abspath(__file__))
#         self.models_path = os.path.join(base_dir, '..', 'trained_models')
#         self.load_models()
        
#     def load_models(self):
#         try:
#             self.efficiency_model = joblib.load(os.path.join(self.models_path, 'efficiency_model.pkl'))
#             self.deficiency_model = joblib.load(os.path.join(self.models_path, 'deficiency_model.pkl'))
#             self.scaler = joblib.load(os.path.join(self.models_path, 'scaler.pkl'))
#             self.label_encoder = joblib.load(os.path.join(self.models_path, 'label_encoder.pkl'))
            
#             with open(os.path.join(self.models_path, 'model_info.json'), 'r') as f:
#                 model_info = json.load(f)
#                 self.feature_names = model_info['efficiency_features']
#                 self.deficiency_classes = model_info['deficiency_classes']
#             print("✅ Models Loaded")
#         except Exception as e:
#             print(f"❌ Load Error: {str(e)}")

#     def generate_heatmap(self, delta):
#         # Create a synthetic 10x10 thermal grid
#         data = np.random.randn(10, 10) * 0.5 + (25 + delta)
#         plt.figure(figsize=(5, 4))
#         sns.heatmap(data, cmap='RdYlGn_r', cbar=True)
#         plt.axis('off')
        
#         buf = io.BytesIO()
#         plt.savefig(buf, format='png', bbox_inches='tight')
#         plt.close()
#         return f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"

#     def predict_all(self, data):
#         try:
#             feat_vals = [data[n] for n in self.feature_names]
#             scaled = self.scaler.transform([feat_vals])
            
#             eff = max(0, min(100, self.efficiency_model.predict(scaled)[0]))
#             def_idx = self.deficiency_model.predict(scaled)[0]
#             label = self.label_encoder.inverse_transform([def_idx])[0]
            
#             return {
#                 'success': True,
#                 'efficiency_score': float(eff),
#                 'deficiency': label,
#                 'heatmap_image': self.generate_heatmap(data.get('thermal_delta', 0)),
#                 'recommendations': self.get_recs(eff, label),
#                 'stress_level': 'high' if eff < 50 else 'medium' if eff < 75 else 'low'
#             }
#         except Exception as e:
#             return {'success': False, 'error': str(e)}

#     def get_recs(self, score, label):
#         recs = [f"Nutrient Status: {label.replace('_', ' ')}."]
#         if score < 60: recs.append("Action Required: Low efficiency detected. Optimize irrigation.")
#         return " ".join(recs)


import joblib
import numpy as np
import json
import os
import matplotlib.pyplot as plt
import seaborn as sns
import io
import base64

# Use a non-interactive backend for matplotlib to prevent crashes on servers
import matplotlib
matplotlib.use('Agg')

class FertilizerPredictor:
    def __init__(self, models_dir='../trained_models'):
        self.efficiency_model = None
        self.deficiency_model = None
        self.scaler = None
        self.label_encoder = None
        self.feature_names = None
        self.deficiency_classes = None
        
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.models_path = os.path.join(base_dir, '..', 'trained_models')
        self.load_models()
        
    def load_models(self):
        try:
            self.efficiency_model = joblib.load(os.path.join(self.models_path, 'efficiency_model.pkl'))
            self.deficiency_model = joblib.load(os.path.join(self.models_path, 'deficiency_model.pkl'))
            self.scaler = joblib.load(os.path.join(self.models_path, 'scaler.pkl'))
            self.label_encoder = joblib.load(os.path.join(self.models_path, 'label_encoder.pkl'))
            
            with open(os.path.join(self.models_path, 'model_info.json'), 'r') as f:
                model_info = json.load(f)
                self.feature_names = model_info['efficiency_features']
                self.deficiency_classes = model_info['deficiency_classes']
            print("✅ ML Models Loaded Successfully")
        except Exception as e:
            print(f"❌ Load Error: {str(e)}")

    def generate_heatmap_base64(self, delta):
        """Creates a thermal stress heatmap and returns it as a Base64 string"""
        # Create synthetic 10x10 field data based on the thermal delta
        data = np.random.randn(10, 10) * 0.5 + (25 + delta)
        
        plt.figure(figsize=(5, 4))
        # RdYlGn_r: Red (High Stress) to Green (Healthy)
        sns.heatmap(data, cmap='RdYlGn_r', cbar=True, xticklabels=False, yticklabels=False)
        plt.title(f"Thermal Stress Map (Δ {delta}°C)")
        
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight', dpi=100)
        plt.close() # Important to prevent memory leaks
        buf.seek(0)
        
        img_str = base64.b64encode(buf.read()).decode('utf-8')
        return f"data:image/png;base64,{img_str}"

    def predict_all(self, input_data):
        try:
            # Prepare data
            features = [input_data[name] for name in self.feature_names]
            features_scaled = self.scaler.transform([features])
            
            # Predict
            eff_score = float(self.efficiency_model.predict(features_scaled)[0])
            eff_score = max(0, min(100, eff_score)) # Clamp 0-100
            
            def_idx = self.deficiency_model.predict(features_scaled)[0]
            deficiency = self.label_encoder.inverse_transform([def_idx])[0]
            
            # Generate Heatmap
            heatmap = self.generate_heatmap_base64(input_data.get('thermal_delta', 0))
            
            return {
                'success': True,
                'efficiency_score': round(eff_score, 2),
                'deficiency': deficiency,
                'heatmap_image': heatmap,
                'recommendations': f"Apply specific fertilizer for {deficiency.replace('_', ' ')}.",
                'stress_level': 'high' if eff_score < 50 else 'medium' if eff_score < 75 else 'low'
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}