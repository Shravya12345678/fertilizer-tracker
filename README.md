

# 🌾 Thermal-Based Fertilizer Efficiency Tracker (CropSaver AI)

An AI-powered agricultural decision support system that analyzes crop response to fertilizer using thermal signatures, environmental data, and machine learning. 

## 🔗 Live Project Links
* **📱 Mobile App (Android APK):** [Download & Install Here] https://expo.dev/accounts/shravya2004/projects/mobile-app/builds/66119314-ad32-4011-bec9-3ab28b820235
* **🎬 Video Demo :** https://youtu.be/Z7BYalxKY5Y?si=1b_DKBgnvhNsLRz
* **💻 Live Web Dashboard:** https://fertilizer-tracker.vercel.app/

---

## ✨ Features

* 🌡️ **Thermal Data Tracking**: Record and analyze before/after fertilizer application temperatures to monitor transpiration cooling.
* 🤖 **AI Analysis**: ML-powered efficiency prediction based on thermal deltas and environmental variables.
* 🎯 **Deficiency Detection**: Identify specific N, P, or K deficiencies and receive actionable AI-generated recommendations.
* 📊 **Interactive Dashboard**: Real-time visualizations and historical analytics for multiple fields.
* 📱 **CropSaver AI Mobile**: A dedicated production-ready **React Native** application for on-the-go data entry and analysis in the field.
* 🔐 **Secure Authentication**: Robust JWT-based system to keep farmer data private and secure.
* 📄 **Report Export**: Generate and download detailed PDF analysis reports for offline records.

---
## 🧠 The AI Strategy: "Mixed-Data" Approach

A unique aspect of this POC is how the AI was trained using open-source global agricultural data:

### 📊 Data Sources
* **Image Data:** [Kaggle PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease)  
  *Used to train the model on visual symptoms and identify the Region of Interest (ROI) for thermal analysis.*
* **Numerical Data:** [Kaggle Crop Recommendation Dataset](https://www.kaggle.com/datasets/atharvaingle/crop-recommendation-dataset)  
  *Used to establish the chemical ground truth (N-P-K levels) and environmental optimal ranges (pH, Temp, Humidity).*

### 🤖 Logic & Training
* **The "Brain":** The model's logic was built by curating **220 high-quality images** and mapping them to the chemical patterns found in the CSV data.
* **POC Implementation:** While the current UI takes numerical inputs, these values represent the **features extracted** from thermal imagery (Thermal Delta). This ensures a lightweight mobile experience while maintaining a "brain" trained on real biological visual patterns.

---

## 🛠️ Tech Stack

### Frontend & Mobile

* **Web**: React.js 18 (Functional Components, Hooks)
* **Mobile**: **React Native (via Expo)** for cross-platform Android support.
* **Build System**: **EAS (Expo Application Services)** for standalone APK generation.
* **Styling**: **Custom CSS** (Zero framework dependencies for maximum stability).
* **Icons**: Lucide React & Lucide React Native.

### Backend & AI

* **Server**: Node.js & Express (API Architecture).
* **Database**: MongoDB & Mongoose (NoSQL).
* **ML Service**: Python 3.12 with Flask API.
* **Data Science**: Scikit-learn (Random Forest), NumPy, Pandas.

---

## 📂 Project Structure

```text
fertilizer-efficiency-tracker/
├── backend/            # Express API & MongoDB Models
├── ml-service/         # Python Flask AI engine
├── web-dashboard/      # React.js Web Frontend
├── mobile-app/         # React Native Mobile Application (CropSaver AI)
└── datasets/           # Training data for ML models
````

---

## 🚀 Installation (Local)

### 1. Backend Setup

```bash
cd backend
npm install
# Create .env with MONGODB_URI, JWT_SECRET, and PORT
npm run dev
```

### 2. ML Service Setup

```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python src/app.py
```

### 3. Web Dashboard Setup

```bash
cd web-dashboard
npm install
npm start
```

### 4. Mobile App Setup (Development)

```bash
cd mobile-app
npm install
npx expo start
# Scan the QR code with the 'Expo Go' app on your Android phone
```

---

## 📱 Mobile App (CropSaver AI)

The mobile component is a standalone Android application optimized for field use. It connects directly to the production API for real-time predictions.

### How to Install (APK)

1. **Build**: The app is built using EAS: `eas build -p android --profile preview`.
2. **Download**: Scan the generated QR code or download the `.apk` file from the build link(https://expo.dev/accounts/shravya2004/projects/mobile-app/builds/66119314-ad32-4011-bec9-3ab28b820235).
3. **Security**: Since this is a custom-signed app, select **"Install Anyway"** if prompted by Android Play Protect during installation.

---

## 🎮 Usage & Demo Data

### Generating Demo Data

To explore the dashboard with pre-filled analytics, run the custom seeder script:

```bash
cd backend
node scripts/createDemoData.js
```

### Demo Credentials

* **Email:** `demo@fertilizer-tracker.com`
* **Password:** `demo123`

---

## 🤖 ML Models

### Efficiency Predictor

* **Model**: Random Forest Regressor.
* **Input**: N, P, K, humidity, temperature, pH, rainfall, thermal_delta.
* **Output**: Efficiency score (%).

### Deficiency Classifier

* **Model**: Random Forest Classifier.
* **Classes**: Balanced, N_deficient, P_deficient, K_deficient.

---

## 🌐 Cloud Deployment (Production)

### 1. ML Service (Render)

* **Root Directory**: `ml-service`
* **Build Command**: `pip install -r requirements.txt`
* **Start Command**: `python src/app.py`
* **Environment Variable**: `PYTHON_VERSION`: `3.11.10`

### 2. Backend API (Render)

* **Root Directory**: `backend`
* **Build Command**: `npm install`
* **Start Command**: `node server.js`
* **Variables**: `MONGODB_URI`, `JWT_SECRET`, `ML_SERVICE_URL`

### 3. Web Dashboard (Vercel)

* **Root Directory**: `web-dashboard`
* **Node.js Version**: `20.x`
* **Environment Variables**: `API_BASE_URL`

---

## 📸 Screenshots

![signinn](https://github.com/user-attachments/assets/71387209-94a1-45fa-adc0-88ef9f83efd0)

![ignup](https://github.com/user-attachments/assets/e2f2b07a-dca7-49e2-917f-3bb41d8a5eae)
---

## 👨‍💻 Author

**Shravya Shetty**

* **GitHub**: [Shravya12345678](https://github.com/Shravya12345678)
* **LinkedIn**: [Shravya Shetty](https://www.linkedin.com/in/shravya-shetty04/)
* **Email**: [shravya2004n@gmail.com](mailto:shravya2004n@gmail.com)

```
