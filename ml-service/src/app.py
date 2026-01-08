# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from predict import FertilizerPredictor
# import os

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)  # Enable CORS for frontend access

# # Initialize predictor
# print("\n" + "="*60)
# print("Initializing ML Predictor...")
# predictor = FertilizerPredictor()
# print("✅ Predictor ready!")
# print("="*60 + "\n")

# @app.route('/', methods=['GET'])
# def home():
#     """API home endpoint"""
#     return jsonify({
#         'success': True,
#         'message': 'Fertilizer Efficiency ML Service',
#         'version': '1.0.0',
#         'endpoints': {
#             'predict': '/api/predict',
#             'health': '/api/health',
#             'models': '/api/models/info'
#         }
#     })

# @app.route('/api/health', methods=['GET'])
# def health_check():
#     """Health check endpoint"""
#     return jsonify({
#         'success': True,
#         'status': 'healthy',
#         'models_loaded': True,
#         'service': 'ml-service'
#     })

# @app.route('/api/models/info', methods=['GET'])
# def model_info():
#     """Get model information"""
#     return jsonify({
#         'success': True,
#         'models': {
#             'efficiency': {
#                 'type': 'RandomForestRegressor',
#                 'target': 'efficiency_score',
#                 'features': predictor.feature_names
#             },
#             'deficiency': {
#                 'type': 'RandomForestClassifier',
#                 'target': 'deficiency',
#                 'classes': list(predictor.deficiency_classes),
#                 'features': predictor.feature_names
#             }
#         }
#     })

# @app.route('/api/predict', methods=['POST'])
# def predict():
#     """Main prediction endpoint"""
#     try:
#         data = request.get_json()
#         if not data:
#             return jsonify({'success': False, 'error': 'No input data provided'}), 400

#         result = predictor.predict_all(data)
        
#         if result['success']:
#             return jsonify(result), 200
#         else:
#             return jsonify(result), 500
#     except Exception as e:
#         return jsonify({'success': False, 'error': str(e)}), 500

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 10000))
#     print(f"🚀 ML Service starting on port {port}")
#     app.run(host='0.0.0.0', port=port, debug=False)



from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import FertilizerPredictor
import os

app = Flask(__name__)
CORS(app)

# Initialize predictor on startup
predictor = FertilizerPredictor()

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'success': True,
        'message': 'Fertilizer Efficiency ML Service',
        'endpoints': {'predict': '/api/predict', 'health': '/api/health'}
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'success': True, 'status': 'healthy'})

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'error': 'No data'}), 400

        result = predictor.predict_all(data)
        status_code = 200 if result['success'] else 500
        return jsonify(result), status_code
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    # PORT is set by Render automatically
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port, debug=False)