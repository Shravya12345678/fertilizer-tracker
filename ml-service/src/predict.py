


import joblib
import numpy as np
import pandas as pd
import json
import os
import io
import base64
import matplotlib
# Use a non-interactive backend for matplotlib to prevent crashes on servers
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

class FertilizerPredictor:
    def __init__(self):
        self.efficiency_model = None
        self.deficiency_model = None
        self.scaler = None
        self.label_encoder = None
        self.feature_names = None
        self.deficiency_classes = None
        
        # Locate the models folder relative to this file (which is in /src)
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self.models_path = os.path.normpath(os.path.join(base_dir, '..', 'trained_models'))
        self.load_models()
        
    def load_models(self):
        try:
            self.efficiency_model = joblib.load(os.path.join(self.models_path, 'efficiency_model.pkl'))
            self.deficiency_model = joblib.load(os.path.join(self.models_path, 'deficiency_model.pkl'))
            self.scaler = joblib.load(os.path.join(self.models_path, 'scaler.pkl'))
            self.label_encoder = joblib.load(os.path.join(self.models_path, 'label_encoder.pkl'))
            
            with open(os.path.join(self.models_path, 'model_info.json'), 'r') as f:
                model_info = json.load(f)
                # Ensure we use the exact keys the model was trained on
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
            # 1. Smart Mapping: Handle common variations in input names
            # This prevents "KeyError" if the user sends 'Nitrogen' instead of 'N'
            data = {
                'N': input_data.get('N', input_data.get('Nitrogen', 0)),
                'P': input_data.get('P', input_data.get('Phosphorus', 0)),
                'K': input_data.get('K', input_data.get('Potassium', 0)),
                'temperature': input_data.get('temperature', input_data.get('Temperature', 25.0)),
                'humidity': input_data.get('humidity', input_data.get('Humidity', 50.0)),
                'ph': input_data.get('ph', input_data.get('pH', 6.5)),
                'rainfall': input_data.get('rainfall', input_data.get('Rainfall', 100.0)),
                'thermal_delta': input_data.get('thermal_delta', 0.0),
                'green_ratio': input_data.get('green_ratio', 0.5)
            }

            # 2. Convert to DataFrame to match the feature names used during training
            # This fixes the "UserWarning: X has feature names..."
            features_df = pd.DataFrame([data], columns=self.feature_names)
            
            # 3. Scale and Predict
            features_scaled = self.scaler.transform(features_df)
            
            eff_score = float(self.efficiency_model.predict(features_scaled)[0])
            eff_score = max(0, min(100, eff_score)) # Clamp 0-100
            
            def_idx = self.deficiency_model.predict(features_scaled)[0]
            deficiency = self.label_encoder.inverse_transform([def_idx])[0]
            
            # 4. Generate Heatmap
            heatmap = self.generate_heatmap_base64(data['thermal_delta'])
            
            return {
                'success': True,
                'efficiency_score': round(eff_score, 2),
                'deficiency': deficiency,
                'heatmap_image': heatmap,
                'recommendations': self.get_recs(eff_score, deficiency),
                'stress_level': 'high' if eff_score < 50 else 'medium' if eff_score < 75 else 'low'
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def get_recs(self, score, label):
        """Generates simple text recommendations"""
        recs = [f"Detected Status: {label.replace('_', ' ')}."]
        if score < 60: 
            recs.append("Action Required: Low efficiency detected. Optimize irrigation or soil aeration.")
        else:
            recs.append("Status: Fertilizer efficiency is within optimal range.")
        return " ".join(recs)