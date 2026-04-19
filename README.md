# SEES — Smart Event Experience System 📡🏟️

SEES is a premium, real-time event intelligence platform designed for stadium and large-venue management. It leverages **FastAPI WebSockets** and **React** to provide high-fidelity telemetry, spatial crowd heatmaps, and dynamic safety routing across major Indian venues.

![Architecture](https://img.shields.io/badge/Architecture-Fullstack_React_%2B_FastAPI-blueviolet)
![Realtime](https://img.shields.io/badge/Realtime-WebSockets_Active-green)
![Maps](https://img.shields.io/badge/Mapping-Google_Satellite_Engine-blue)

## ✨ Core Features

- **Digital Twin Visualization**: High-detail satellite views of iconic Indian stadiums (Wankhede, Eden Gardens, Narendra Modi Stadium, etc.).
- **Live Spatial Telemetry**: Real-time crowd heatmaps and discrete pulse nodes driven by a high-frequency WebSocket stream.
- **Dynamic Escort Paths**: Intelligent safety and escort routing visualized with directional polylines.
- **Venue-Aware Simulation**: Contextual data simulation that respects the actual seating capacities of different stadiums.
- **Premium Dark Mode UI**: A state-of-the-art "Space Grotesk" interface with glassmorphism effects and micro-animations.

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Lucide React, Google Maps JavaScript API (Visualization & Satellite).
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic.
- **Real-time**: WebSockets (Bi-directional streaming).
- **Design System**: Vanilla CSS with custom design tokens.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v16+)
- Python (3.10+)
- Google Maps JavaScript API Key

### 2. Backend Setup
```bash
cd backend
pip install fastapi uvicorn pydantic
python main.py
```
*The server will start at `http://localhost:8000`*

### 3. Frontend Setup
1. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=YOUR_ACTUAL_API_KEY
   VITE_BACKEND_URL=http://localhost:8000
   ```
2. Install dependencies and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
*The dashboard will be available at `http://localhost:5173`*

## 🗺️ Supported Venues
- **Wankhede Stadium**, Mumbai (33k capacity)
- **Eden Gardens**, Kolkata (68k capacity)
- **Narendra Modi Stadium**, Ahmedabad (132k capacity)
- **M. Chinnaswamy Stadium**, Bengaluru (40k capacity)
- ... and 6 more major Indian stadiums.

## 📜 License
Internal Development - SEES Intelligence Group.
