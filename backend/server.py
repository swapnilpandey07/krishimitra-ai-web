import os
import sys
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import traceback
from ml_engine import ml_engine

from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SECRET_KEY = os.getenv("SUPABASE_SECRET_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_SECRET_KEY)

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

app = Flask(__name__, static_folder=None)
CORS(app)  # Enable Cross-Origin Resource Sharing for all origins

@app.route('/', methods=['GET'])
def serve_index():
    return send_from_directory(ROOT_DIR, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
    if os.path.exists(os.path.join(ROOT_DIR, path)):
        return send_from_directory(ROOT_DIR, path)
    return send_from_directory(ROOT_DIR, 'index.html')

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "KrishiMitra-AI ML Backend",
        "version": "1.0.0",
        "modelsLoaded": [
            "RandomForest Crop Recommendation Classifier",
            "Computer Vision Leaf Disease Diagnostic Engine",
            "APMC Mandi Price Forecasting Time-Series Engine",
            "Soil Quality & NPK Balancing Engine"
        ]
    })

@app.route('/api/predict-crop', methods=['POST'])
def predict_crop():
    try:
        data = request.get_json() or {}
        n = float(data.get('nitrogen', data.get('n', 45)))
        p = float(data.get('phosphorus', data.get('p', 50)))
        k = float(data.get('potassium', data.get('k', 40)))
        temp = float(data.get('temperature', 22.5))
        humidity = float(data.get('humidity', 60.0))
        ph = float(data.get('pH', data.get('ph', 6.8)))
        rainfall = float(data.get('rainfall', 150.0))
        soil_type = data.get('soilType', 'Black Soil')
        season = data.get('season', 'Rabi')

        result = ml_engine.predict_crop(
            n=n, p=p, k=k, temp=temp, humidity=humidity,
            ph=ph, rainfall=rainfall, soil_type=soil_type, season=season
        )
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/api/detect-disease', methods=['POST'])
def detect_disease():
    try:
        data = request.get_json() or {}
        image_data = data.get('image', None)
        
        if not image_data:
            return jsonify({
                "status": "error",
                "message": "Missing 'image' parameter in request payload (base64 encoded)."
            }), 400

        result = ml_engine.analyze_leaf_image(image_data)
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/api/predict-price', methods=['POST'])
def predict_price():
    try:
        data = request.get_json() or {}
        crop = data.get('crop', 'Wheat')
        mandi = data.get('mandi', 'Indore Main Mandi')
        horizon = int(data.get('horizonDays', 30))

        result = ml_engine.predict_market_price(crop_name=crop, mandi=mandi, horizon_days=horizon)
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/api/soil-health', methods=['POST'])
def soil_health():
    try:
        data = request.get_json() or {}
        n = float(data.get('nitrogen', data.get('n', 210)))
        p = float(data.get('phosphorus', data.get('p', 18)))
        k = float(data.get('potassium', data.get('k', 230)))
        ph = float(data.get('pH', data.get('ph', 7.2)))
        oc = float(data.get('organicCarbon', 0.58))
        ec = float(data.get('electricalConductivity', 0.45))

        result = ml_engine.analyze_soil_health(
            n=n, p=p, k=k, ph=ph, organic_carbon=oc, electrical_conductivity=ec
        )
        return jsonify(result)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 400

import sys
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

if __name__ == '__main__':
    print("==========================================================")
    print(">> [KrishiMitra-AI] Backend Server is Starting...")
    print(">> [KrishiMitra-AI] URL: http://127.0.0.1:5000")
    print(">> [KrishiMitra-AI] Ready to receive inference requests from web client")
    print("==========================================================")
    app.run(host='127.0.0.1', port=5000, debug=False)
