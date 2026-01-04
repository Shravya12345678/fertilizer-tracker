
# ML Service API Documentation

## Base URL
http://localhost:5001

## Endpoints

### 1. Health Check
* **URL:** `/api/health`
* **Method:** `GET`
* **Description:** Verifies that the Flask server and AI models are loaded correctly.
* **Response:**
```json
{
  "success": true,
  "status": "healthy",
  "models_loaded": true,
  "service": "ml-service"
}

```

### 2. Model Information

* **URL:** `/api/models/info`
* **Method:** `GET`
* **Description:** Returns the required input features and target classes for the models.
* **Response:**

```json
{
  "success": true,
  "models": {
    "efficiency": {
      "type": "RandomForestRegressor",
      "target": "efficiency_score",
      "features": ["N", "P", "K", "temperature", "humidity", "ph", "rainfall", "thermal_delta", "green_ratio"]
    },
    "deficiency": {
      "type": "RandomForestClassifier",
      "target": "deficiency",
      "classes": ["Balanced", "N_deficient", "P_deficient", "K_deficient"],
      "features": ["N", "P", "K", "temperature", "humidity", "ph", "rainfall", "thermal_delta", "green_ratio"]
    }
  }
}

```

### 3. Complete Prediction

* **URL:** `/api/predict`
* **Method:** `POST`
* **Description:** Sends soil and environmental data to the AI to get efficiency scores and deficiency alerts.
* **Request Body:**

```json
{
  "N": 60,
  "P": 45,
  "K": 40,
  "temperature": 28.5,
  "humidity": 65.0,
  "ph": 6.5,
  "rainfall": 100.0,
  "thermal_delta": -2.3,
  "green_ratio": 0.75
}

```

* **Response:**

```json
{
  "success": true,
  "efficiency_score": 79.5,
  "deficiency": "K_deficient",
  "deficiency_probabilities": {
    "Balanced": 0.2225,
    "K_deficient": 0.6000,
    "N_deficient": 0.0685,
    "P_deficient": 0.1090
  },
  "stress_level": "low",
  "recommendations": [
    "✓ Good fertilizer efficiency!",
    "🌱 Potassium deficiency detected. Apply MOP or potash.",
    "Action: Increase K levels to the 40-60 range."
  ]
}

```

### 4. Efficiency Only

* **URL:** `/api/predict/efficiency`
* **Method:** `POST`

### 5. Deficiency Only

* **URL:** `/api/predict/deficiency`
* **Method:** `POST`

## Error Responses

Returned when the request is missing data or formatted incorrectly:

```json
{
  "success": false,
  "error": "Detailed error message"
}

```

## Status Codes

* **200:** Success
* **400:** Bad Request (Missing fields or invalid JSON)
* **404:** Endpoint Not Found
* **500:** Internal Server Error

```

##Command prompt
1️⃣ Terminal 1: The ML Service (The Brain)
Open your first Command Prompt and run these:

DOS


cd C:\Users\Hp\Desktop\fertilizer-efficiency-tracker\ml-service
venv\Scripts\activate
cd src
python app.py
What to look for: You should see (venv) at the start of the line and eventually a message saying 🚀 ML Service starting on port 5001. Keep this window open.

2️⃣ Terminal 2: The Backend Server (The Manager)
Open a new Command Prompt window and run these:

DOS

cd C:\Users\Hp\Desktop\fertilizer-efficiency-tracker\backend
npm run dev
What to look for: You should see ✅ MongoDB Connected Successfully! and 🚀 Server running on Port: 5000. Keep this window open as well.

3️⃣ Terminal 3: The API Test (The Handshake)
Open a third Command Prompt window and run this:

DOS

cd C:\Users\Hp\Desktop\fertilizer-efficiency-tracker\backend
node tests/api-test.js
What to look for: This script will run once and then finish. You are looking for it to print out the analysis results (like the 71.29% Efficiency score).

Note: If this test passes, it means your "Engine" and "Brain" are talking perfectly.


3️⃣Terminal 4: Frontend
cd web-dashboard
npm start