# KrishiMitra-AI — Smart India Hackathon 2026

An AI-driven agriculture decision support system integrating real-time soil chemistry, micro-weather forecasts, computer vision crop disease diagnostics, and mandi price intelligence to maximize net farmer profitability.

---

## 📦 Project Structure

```
SIH/
├── backend/
│   ├── ml_engine.py         # ML Models (Random Forest, Computer Vision, Price Forecaster, Soil SQI)
│   ├── server.py            # Flask REST API Server & Frontend Host
│   ├── start_server.bat     # One-click Windows batch launcher
│   └── test_api.py          # Automated verification script
├── src/
│   ├── components/          # Reusable UI widgets & gauges
│   ├── pages/               # Application views
│   ├── services/            # REST API Client (apiService.js)
│   ├── data/                # Agricultural dataset fallback tables
│   ├── styles/              # Design system CSS tokens
│   └── bundle.jsx           # Standalone bundled React application
├── index.html               # Main Web Entrypoint
├── requirements.txt         # Python dependencies
└── README.md                # Project documentation
```

---

## 🚀 How to Run the Project

### Prerequisites
- Python 3.9+ installed

### Step 1: Install Python Dependencies
Open PowerShell or Command Prompt in this folder and run:
```powershell
pip install -r requirements.txt
```

### Step 2: Start the AI Backend Server
Double-click `backend/start_server.bat` or run:
```powershell
python backend/server.py
```

### Step 3: Open the Web Application
Open your browser and visit:
👉 **http://127.0.0.1:5000** (or open `index.html` directly)

---

## 🤖 Integrated AI Models

1. **Random Forest Crop Recommendation Model** (`POST /api/predict-crop`):
   Predicts optimal crops and matching confidence scores from N-P-K nutrient metrics, soil pH, temperature, humidity, and rainfall.

2. **Computer Vision Leaf Disease Classifier** (`POST /api/detect-disease`):
   Extracts lesion patterns, greenness percentage, necrotic indices, and identifies crop diseases with chemical and organic treatments.

3. **APMC Mandi Price Forecasting Time-Series Engine** (`POST /api/predict-price`):
   Projects 30-day commodity price trends, upper/lower confidence bands, and Buy/Hold/Sell signals.

4. **Soil Health Evaluator & Fertilizer Calculator** (`POST /api/soil-health`):
   Computes Soil Quality Index (SQI) and exact dosages for Neem-Coated Urea, DAP, MOP, and agricultural lime/gypsum.
