# 🌾 Thermal-Based Fertilizer Efficiency Tracker

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
