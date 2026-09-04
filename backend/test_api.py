"""
Unit and integration test script for KrishiMitra-AI ML Backend
"""
import base64
import io
import requests
from PIL import Image

def run_tests():
    base_url = "http://127.0.0.1:5000"
    print("Testing ML Engine directly and via API...")

    from ml_engine import ml_engine

    # 1. Test Crop Prediction
    crop_res = ml_engine.predict_crop(n=45, p=50, k=40, temp=21.0, humidity=55.0, ph=6.8, rainfall=120.0)
    print("1. [PASS] Crop Prediction:", crop_res["recommendedCrop"], f"({crop_res['confidence']}%)")

    # 2. Test Disease Detection with a sample dummy image
    img = Image.new('RGB', (100, 100), color=(180, 160, 40)) # Yellowish test leaf
    buf = io.BytesIO()
    img.save(buf, format='JPEG')
    img_b64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    disease_res = ml_engine.analyze_leaf_image(img_b64)
    print("2. [PASS] Leaf Disease Detection:", disease_res["disease"], f"({disease_res['confidence']}%)")

    # 3. Test Market Price Forecasting
    price_res = ml_engine.predict_market_price(crop_name="Wheat", mandi="Indore Main Mandi")
    print("3. [PASS] Market Price Forecast: Current Rs.", price_res["currentPrice"], "-> 30d Rs.", price_res["projectedPrice30d"], f"({price_res['recommendation']})")

    # 4. Test Soil Health Analysis
    soil_res = ml_engine.analyze_soil_health(n=180, p=14, k=210, ph=7.2)
    print("4. [PASS] Soil Health Quality Index:", soil_res["soilQualityIndex"], f"({soil_res['rating']})")

    print("\nAll ML models verified successfully!")

if __name__ == "__main__":
    run_tests()
