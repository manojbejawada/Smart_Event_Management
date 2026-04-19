import random
import time # System time logic
import asyncio
from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="SEES Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🇮🇳 Indian Stadiums with Capacities
VENUES = [
    {"id": "wankhede", "name": "Wankhede Stadium, Mumbai", "lat": 18.9388, "lng": 72.8258, "capacity": 33108},
    {"id": "eden", "name": "Eden Gardens, Kolkata", "lat": 22.5646, "lng": 88.3433, "capacity": 68000},
    {"id": "chinnaswamy", "name": "M. Chinnaswamy Stadium, Bengaluru", "lat": 12.9788, "lng": 77.5996, "capacity": 40000},
    {"id": "narendra_modi", "name": "Narendra Modi Stadium, Ahmedabad", "lat": 23.0910, "lng": 72.5970, "capacity": 132000},
    {"id": "chepauk", "name": "M. A. Chidambaram Stadium, Chennai", "lat": 13.0628, "lng": 80.2795, "capacity": 50000},
    {"id": "kotla", "name": "Arun Jaitley Stadium, Delhi", "lat": 28.6379, "lng": 77.2433, "capacity": 41842},
    {"id": "uppal", "name": "Rajiv Gandhi Stadium, Hyderabad", "lat": 17.4065, "lng": 78.5500, "capacity": 55000},
    {"id": "greenfield", "name": "Greenfield Stadium, Kerala", "lat": 8.5241, "lng": 76.9366, "capacity": 50000},
    {"id": "barsapara", "name": "Barsapara Stadium, Guwahati", "lat": 26.1445, "lng": 91.7362, "capacity": 40000},
    {"id": "jsca", "name": "JSCA Stadium, Ranchi", "lat": 23.3441, "lng": 85.3096, "capacity": 50000}
]

# Data Model
class Telemetry(BaseModel):
    venue_id: str
    total_crowd: int
    avg_wait_time: int
    active_alerts: int
    gates: List[dict]
    hotspots: List[dict]
    paths: List[List[dict]] # New: List of escort paths (Lat/Lng points)
    timestamp: float

# Root
@app.get("/")
async def root():
    return {"status": "SEES backend running 🚀"}

# Get venues
@app.get("/venues")
async def get_venues():
    return VENUES

# Helper: Generate realistic crowd based on venue capacity
def generate_crowd(capacity):
    current_hour = time.localtime().tm_hour
    # Peak hours: 18:00 - 22:00
    if 18 <= current_hour <= 22:
        return random.randint(int(capacity * 0.7), int(capacity * 0.95))
    else:
        return random.randint(int(capacity * 0.1), int(capacity * 0.4))

# Telemetry API (REST)
@app.get("/telemetry/{venue_id}", response_model=Telemetry)
async def get_telemetry(venue_id: str):
    venue = next((v for v in VENUES if v["id"] == venue_id), None)
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")

    capacity = venue.get("capacity", 50000)
    total_crowd = generate_crowd(capacity)
    avg_wait = random.randint(5, 20)
    alerts = random.randint(0, 5)

    gates = []
    gate_labels = ["Gate A", "Gate B", "Gate C", "Gate D"]
    for i, label in enumerate(gate_labels):
        share = 0.4 if i == 0 else 0.2
        count = int(total_crowd * (share + random.uniform(-0.05, 0.05)))
        pct = int((count / (capacity / 4)) * 100)
        status = "CRITICAL" if pct > 80 else "MODERATE" if pct > 40 else "LOW FLOW"
        gates.append({"id": label, "count": count, "pct": min(pct, 100), "status": status})

    # Generate 15-20 hotspots around the venue center
    hotspots = []
    for _ in range(20):
        hotspots.append({
            "lat": venue["lat"] + random.uniform(-0.002, 0.002),
            "lng": venue["lng"] + random.uniform(-0.002, 0.002),
            "intensity": random.randint(1, 10)
        })

    # Generate paths
    paths = []
    for _ in range(3):
        start_lat = venue["lat"] + random.uniform(-0.001, 0.001)
        start_lng = venue["lng"] + random.uniform(-0.001, 0.001)
        path = [{"lat": start_lat, "lng": start_lng}]
        for _ in range(5):
            path.append({
                "lat": path[-1]["lat"] + random.uniform(-0.0005, 0.0005),
                "lng": path[-1]["lng"] + random.uniform(-0.0005, 0.0005)
            })
        paths.append(path)

    return {
        "venue_id": venue_id,
        "total_crowd": total_crowd,
        "avg_wait_time": avg_wait,
        "active_alerts": alerts,
        "gates": gates,
        "hotspots": hotspots,
        "paths": paths,
        "timestamp": time.time()
    }

# 🔥 WebSocket for LIVE streaming
@app.websocket("/ws/{venue_id}")
async def websocket_endpoint(websocket: WebSocket, venue_id: str):
    await websocket.accept()

    venue = next((v for v in VENUES if v["id"] == venue_id), None)
    if not venue:
        await websocket.close()
        return

    while True:
        capacity = venue.get("capacity", 50000)
        total_crowd = generate_crowd(capacity)
        avg_wait = random.randint(5, 20)
        alerts = random.randint(0, 5)

        gates = []
        gate_labels = ["Gate A", "Gate B", "Gate C", "Gate D"]
        for i, label in enumerate(gate_labels):
            share = 0.4 if i == 0 else 0.2
            count = int(total_crowd * (share + random.uniform(-0.05, 0.05)))
            pct = int((count / (capacity / 4)) * 100)
            status = "CRITICAL" if pct > 80 else "MODERATE" if pct > 40 else "LOW FLOW"
            gates.append({"id": label, "count": count, "pct": min(pct, 100), "status": status})

        # Generate hotspots (Heatmap Nodes)
        hotspots = []
        for _ in range(40):
            hotspots.append({
                "lat": venue["lat"] + random.uniform(-0.0008, 0.0008),
                "lng": venue["lng"] + random.uniform(-0.0008, 0.0008),
                "intensity": random.randint(2, 12)
            })

        # Generate paths
        paths = []
        for _ in range(3):
            start_lat = venue["lat"] + random.uniform(-0.001, 0.001)
            start_lng = venue["lng"] + random.uniform(-0.001, 0.001)
            path = [{"lat": start_lat, "lng": start_lng}]
            for _ in range(5):
                path.append({
                    "lat": path[-1]["lat"] + random.uniform(-0.0003, 0.0003),
                    "lng": path[-1]["lng"] + random.uniform(-0.0003, 0.0003)
                })
            paths.append(path)

        data = {
            "venue_id": venue_id,
            "total_crowd": total_crowd,
            "avg_wait_time": avg_wait,
            "active_alerts": alerts,
            "gates": gates,
            "hotspots": hotspots,
            "paths": paths,
            "timestamp": time.time()
        }

        await websocket.send_json(data)

        await asyncio.sleep(2)  # send every 2 seconds

# Run server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)