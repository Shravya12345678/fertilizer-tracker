<!-- # 🌾 Thermal-Based Fertilizer Efficiency Tracker

AI-powered agricultural decision support system that analyzes crop response to fertilizer using thermal signatures and machine learning.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [ML Models](#ml-models)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## ✨ Features

- 🌡️ **Thermal Data Tracking**: Record before/after fertilizer temperatures
- 🤖 **AI Analysis**: ML-powered efficiency prediction
- 🎯 **Deficiency Detection**: Identify N, P, K deficiencies
- 📊 **Interactive Dashboard**: Real-time visualizations
- 📱 **Mobile Responsive**: Works on all devices
- 🔐 **Secure Authentication**: JWT-based auth system

## 🛠️ Tech Stack

### Frontend
- React.js 18
- React Router v6
- Axios for API calls
- Custom CSS (no framework dependencies)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer for file uploads

### Machine Learning
- Python 3.12
- Scikit-learn (Random Forest)
- Flask API
- NumPy, Pandas

## 📦 Prerequisites

- Node.js v18+
- Python 3.12+
- MongoDB 8.2+
- 4GB RAM minimum
- 5GB free disk space

## 🚀 Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/fertilizer-tracker.git
cd fertilizer-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### 3. ML Service Setup
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
cd src
python app.py
```

### 4. Frontend Setup
```bash
cd web-dashboard
npm install
npm start
```

## 🎮 Usage

### Demo Credentials
Email: demo@fertilizer-tracker.com
Password: demo123

### Workflow

1. **Login** → Access dashboard
2. **Add Crop** → Enter NPK values
3. **Record Thermal Data** → Before/after temps
4. **Analyze** → Get ML predictions
5. **View Results** → Efficiency + recommendations

## 📡 API Documentation

### Base URL
Development: http://localhost:5000/api
Production: https://your-api.onrender.com/api

### Endpoints

#### Authentication
```http
POST /auth/register - Register new user
POST /auth/login    - Login user
GET  /auth/me       - Get current user
```

#### Crops
```http
GET    /crops     - Get all crops
POST   /crops     - Create crop
GET    /crops/:id - Get single crop
PUT    /crops/:id - Update crop
DELETE /crops/:id - Delete crop
```

#### Thermal Data
```http
GET  /thermal     - Get all thermal data
POST /thermal     - Create thermal data
GET  /thermal/:id - Get single measurement
```

#### Analysis
```http
POST /analysis/thermal/:id - Analyze thermal data
```

## 🤖 ML Models

### Efficiency Predictor
- **Model**: Random Forest Regressor
- **Features**: N, P, K, temperature, humidity, pH, rainfall, thermal_delta
- **Output**: Efficiency score (0-100%)
- **Accuracy**: R² > 0.85

### Deficiency Classifier
- **Model**: Random Forest Classifier
- **Classes**: Balanced, N_deficient, P_deficient, K_deficient
- **Accuracy**: 92%+

## 🌐 Deployment

### Backend (Render)
1. Create Web Service
2. Set environment variables
3. Deploy from GitHub

### Frontend (Vercel)
1. Connect repository
2. Set root directory: `web-dashboard`
3. Add environment variable: `REACT_APP_API_URL`

### Database (MongoDB Atlas)
1. Create cluster
2. Add IP whitelist: `0.0.0.0/0`
3. Get connection string

## 📸 Screenshots
![signinn](https://github.com/user-attachments/assets/f5dfbdbb-94b7-4221-a4cd-78174a6e4652)
![ignup](https://github.com/user-attachments/assets/b07558f9-890e-4c16-892c-51099687b882)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- GitHub: (https://github.com/Shravya12345678)
- LinkedIn: (https://www.linkedin.com/in/shravya-shetty04/)
- Email: shravya2004n@gmail.com

## 🙏 Acknowledgments

- SRS Documentation Team
- Open-source community
- Kaggle for datasets
- Stack Overflow community -->


# 🌾 Thermal-Based Fertilizer Efficiency Tracker

An AI-powered agricultural decision support system that analyzes crop response to fertilizer using thermal signatures, environmental data, and machine learning. This project bridges the gap between high-tech thermal imaging and practical field application.

## 📋 Table of Contents

* Features
* Tech Stack
* Project Structure
* Prerequisites
* Installation (Local)
* Usage & Demo Data
* ML Models
* Cloud Deployment (Production)
* Author

---

## ✨ Features

* 🌡️ **Thermal Data Tracking**: Record and analyze before/after fertilizer application temperatures to monitor transpiration cooling.
* 🤖 **AI Analysis**: ML-powered efficiency prediction based on thermal deltas and environmental variables.
* 🎯 **Deficiency Detection**: Identify specific N, P, or K deficiencies and receive actionable AI-generated recommendations.
* 📊 **Interactive Dashboard**: Real-time visualizations and historical analytics for multiple fields.
* 📱 **Native Mobile App**: A dedicated **React Native** application for on-the-go data entry and analysis in the field.
* 🔐 **Secure Authentication**: Robust JWT-based system to keep farmer data private and secure.
* 📄 **Report Export**: Generate and download detailed PDF analysis reports for offline records.

---

## 🛠️ Tech Stack

### Frontend & Mobile

* **Web**: React.js 18 (Functional Components, Hooks)
* **Mobile**: **React Native (via Expo)** for cross-platform iOS and Android support.
* **Styling**: **Custom CSS** (Zero framework dependencies for maximum stability and performance).
* **Icons**: Lucide React & Lucide React Native.

### Backend & AI

* **Server**: Node.js & Express (API Architecture).
* **Database**: MongoDB & Mongoose (NoSQL).
* **ML Service**: Python 3.12 with Flask API.
* **Data Science**: Scikit-learn (Random Forest), NumPy, Pandas.

---

## 📂 Project Structure

Based on the repository organization:

```text
fertilizer-tracker/
├── backend/            # Express API & MongoDB Models
├── ml-service/         # Python Flask AI engine
├── web-dashboard/      # React.js Web Frontend
├── mobile-app/         # React Native Mobile Application
└── datasets/           # Training data for ML models

```

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
cd src
python app.py

```

### 3. Web Dashboard Setup

```bash
cd web-dashboard
npm install
npm start

```

### 4. Mobile App Setup (React Native)

```bash
cd mobile-app
npm install
npx expo start
# Scan the QR code with the 'Expo Go' app on your phone

```

---

## 🎮 Usage & Demo Data

### Generating Demo Data

To explore the dashboard with pre-filled analytics (multiple crops and measurements), run the custom seeder script:

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
* **Output**: Efficiency score .

### Deficiency Classifier

* **Model**: Random Forest Classifier.
* **Classes**: Balanced, N_deficient, P_deficient, K_deficient.
* **Performance**:  Accuracy on validation sets.

---

## 🌐 Cloud Deployment (Production)

This project is configured for seamless deployment across Render and Vercel.

### 1. ML Service (Render)

* **Root Directory**: `ml-service`.
* **Build Command**: `pip install -r requirements.txt`.
* **Start Command**: `python src/app.py`.
* **Environment Variable**: `PYTHON_VERSION`: `3.11.10`.

### 2. Backend API (Render)

* **Root Directory**: `backend`.
* **Build Command**: `npm install`.
* **Start Command**: `node server.js`.
* **Required Variables**: `MONGODB_URI`, `JWT_SECRET`, `ML_SERVICE_URL`.

### 3. Web Dashboard (Vercel)

* **Root Directory**: `web-dashboard`.
* **Node.js Version**: `20.x`.
* **Environment Variables**: `API_BASE_URL`, `REACT_APP_EMAILJS_PUBLIC_KEY`.

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

