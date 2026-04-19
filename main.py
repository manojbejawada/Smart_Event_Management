import random
import time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="SEES Backend Simulation")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock Venue Data (Same as frontend for consistency)
VENUES = [
    {"id": "msg", "name": "Madison Square Garden, NY", "lat": 40.7505, "lng": -73.9934},
    {"id": "wembley", "name": "Wembley Stadium, London", "lat": 51.5560, "lng": -0.2796},
    {"id": "allianz", "name": "Allianz Arena, Munich", "lat": 48.2188, "lng": 11.6247},
    {"id": "saitama", "name": "Saitama Super Arena, Japan", "lat": 35.8948, "lng": 139.6310},
    {"id": "maracana", "name": "Maracanã Stadium, Brazil", "lat": -22.9121, "lng": -43.2302},
    {"id": "mcg", "name": "Melbourne Cricket Ground, AUS", "lat": -37.8200, "lng": 144.9834},
    {"id": "att", "name": "AT&T Stadium, Texas", "lat": 32.7473, "lng": -97.0945},
    {"id": "sofi", "name": "SoFi Stadium, LA", "lat": 33.9535, "lng": -118.3392},
    {"id": "campnou", "name": "Camp Nou, Barcelona", "lat": 41.3809, "lng": 2.1228},
    {"id": "singapore", "name": "Singapore National Stadium", "lat": 1.3039, "lng": 103.8749}
]

class Telemetry(BaseModel):
    venue_id: str
    total_crowd: int
    avg_wait_time: int
    active_alerts: int
    gates: List[dict]
    timestamp: float

@app.get("/")
async def root():
    return {"status": "online", "message": "SEES Simulation Backend is running"}

@app.get("/venues")
async def get_venues():
    return VENUES

@app.get("/telemetry/{venue_id}", response_model=Telemetry)
async def get_telemetry(venue_id: str):
    # Verify venue exists
    venue = next((v for v in VENUES if v["id"] == venue_id), None)
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")

    # Simulate crowd data
    # In a real app, this could fetch from Google Maps Places API for popularity data
    # if an API key was provided and the library was configured.
    
    total_crowd = random.randint(5000, 50000)
    avg_wait = random.randint(2, 25)
    alerts = random.randint(0, 5)
    
    gates = [
        {"id": "ALPHA-01", "pct": random.randint(10, 95)},
        {"id": "BETA-02", "pct": random.randint(10, 95)},
        {"id": "GAMMA-03", "pct": random.randint(10, 95)},
        {"id": "DELTA-04", "pct": random.randint(10, 95)}
    ]
    
    # Calculate status based on pct
    for g in gates:
        if g["pct"] > 85: g["status"] = "CRITICAL"
        elif g["pct"] > 40: g["status"] = "MODERATE"
        else: g["status"] = "LOW FLOW"

    return {
        "venue_id": venue_id,
        "total_crowd": total_crowd,
        "avg_wait_time": avg_wait,
        "active_alerts": alerts,
        "gates": gates,
        "timestamp": time.time()
    }

# Endpoint to fetch real data from Google Maps (Placeholder for user API key)
@app.get("/google-places-info/{venue_id}")
async def get_google_info(venue_id: str, api_key: str = "YOUR_API_KEY"):
    venue = next((v for v in VENUES if v["id"] == venue_id), None)
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")
    
    # This is where you'd call Google Places API
    # Example URL: f"https://maps.googleapis.com/maps/api/place/details/json?place_id=...&key={api_key}"
    
    return {
        "venue": venue["name"],
        "message": "In a production environment, this would return real-time Google Places data like popular times or traffic.",
        "simulated_rating": random.uniform(4.0, 5.0),
        "simulated_reviews": random.randint(1000, 50000)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
