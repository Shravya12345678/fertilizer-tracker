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
![signin](https://github.com/user-attachments/assets/38969359-e046-4fbe-9e3e-9b649c64ea8f)
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
- GitHub: [@yourusername](https://github.com/Shravya12345678)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/shravya-shetty04/)
- Email: shravya2004n@gmail.com

## 🙏 Acknowledgments

- SRS Documentation Team
- Open-source community
- Kaggle for datasets
- Stack Overflow community

