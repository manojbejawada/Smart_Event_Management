import React, { useState, useEffect, useRef } from 'react'; // React core hooks
import { 
  LayoutDashboard, 
  Activity, 
  Bell, 
  Settings, 
  Menu, 
  X, 
  Search, 
  ArrowRight, 
  ChevronRight,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  RefreshCw,
  AlertTriangle,
  Info
} from 'lucide-react';

// --- Components ---

const LandingPage = ({ onEnter }) => (
  <div className="page active" id="page-landing">
    <nav className="landing-nav">
      <div className="nav-logo">
        <Zap className="logo-icon" />
        <span className="logo-text">SEES</span>
      </div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#integrations">Integrations</a>
      </div>
      <div className="nav-actions">
        <button className="btn-primary" onClick={onEnter}>Get Started</button>
      </div>
    </nav>

    <header className="hero-section">
      <div className="hero-badge">AI-POWERED ORCHESTRATION</div>
      <h1 className="hero-title">
        The Future of <span className="gradient-text">Smart Event</span> Management
      </h1>
      <p className="hero-subtitle">
        Orchestrate crowd flow, enhance security, and deliver seamless experiences with real-time AI insights.
      </p>
      <div className="hero-actions">
        <button className="btn-primary btn-lg" onClick={onEnter}>Enter Dashboard</button>
        <button className="btn-ghost btn-lg">Watch Demo</button>
      </div>
      <div className="hero-visual">
        <div className="heatmap-preview">
          <div className="heatmap-overlay-text">REAL-TIME SPATIAL ANALYTICS</div>
          <div style={{ height: '300px', background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Activity size={48} color="var(--accent)" opacity={0.5} />
          </div>
        </div>
      </div>
    </header>

    <section id="features" className="features-section">
      <h2 className="section-title">Built for <em>Event Leads</em></h2>
      <p className="section-subtitle">Precision tools designed for high-stakes environments.</p>
      <div className="features-grid">
        <div className="feature-card">
          <Activity className="feature-icon" color="var(--accent)" />
          <h3>Crowd Intelligence</h3>
          <p>Real-time heatmaps and density forecasting using edge-processed vision AI.</p>
        </div>
        <div className="feature-card">
          <Shield className="feature-icon" color="var(--teal)" />
          <h3>Safety First</h3>
          <p>Automated hazard detection and emergency routing for optimal safety protocols.</p>
        </div>
        <div className="feature-card">
          <BarChart3 className="feature-icon" color="var(--accent)" />
          <h3>Predictive Analytics</h3>
          <p>Anticipate bottlenecks before they happen with historical data modeling.</p>
        </div>
        <div className="feature-card feature-card-alert">
          <Bell className="feature-icon" color="var(--red)" />
          <h3>Smart Alerts</h3>
          <p>Instant broadcast system with multi-channel priority routing for staff.</p>
        </div>
      </div>
    </section>

    <footer className="landing-footer">
      <div className="footer-bottom">
        <p>© 2026 SEES Intelligence. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  </div>
);

const AppShell = ({ activeTab, onTabChange, venues, selectedVenue, onVenueChange, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'live', icon: Activity, label: 'Live Status' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: 3 },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="nav-logo">
            <Zap className="logo-icon" size={24} />
            <span className="logo-text">SEES</span>
          </div>
        </div>
        
        <div className="venue-selector-box" style={{ marginBottom: '24px', padding: '0 8px' }}>
          <label style={{ fontSize: '10px', letterSpacing: '1.5px', color: 'var(--accent)', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>SYSTEM NODE</label>
          <div style={{ position: 'relative' }}>
            <select 
              value={selectedVenue?.id} 
              onChange={(e) => onVenueChange(e.target.value)}
              style={{ 
                width: '100%', 
                background: 'var(--bg3)', 
                color: 'var(--text)', 
                border: '1px solid var(--border)', 
                padding: '10px 12px', 
                borderRadius: '10px',
                fontSize: '13px',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer'
              }}
            >
              {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
            <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)' }}>
              <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon size={20} className="nav-icon" />
              <span>{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="system-load-card">
           <div className="load-label">System Performance</div>
           <div className="load-bar"><div className="load-fill" style={{ width: '65%' }}></div></div>
           <div className="load-pct">Processing: 65% capacity</div>
        </div>
        <button className="nav-item" style={{ marginTop: '12px', border: '1px solid var(--border)' }} onClick={() => window.location.href = '/'}>
          <X size={18} className="nav-icon" />
          <span>Exit to Home</span>
        </button>
      </aside>

      <div className="app-content-wrapper">
        <header className="app-topbar">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Menu size={24} />
          </button>
          <div className="topbar-search">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search venues, alerts, or staff..." />
          </div>
          <div className="topbar-actions">
            <button className="topbar-icon-btn">
              <Bell size={20} />
              <span className="alert-dot"></span>
            </button>
            <div className="topbar-avatar" style={{ background: 'var(--accent)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>EL</div>
          </div>
        </header>

        <main className="app-main">
          <div className="tab-container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// --- View Components ---

const DashboardView = ({ data = {}, venues = [], selectedVenueId, onVenueChange }) => (
  <div className="dashboard-view">
    <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <h1>System Overview</h1>
        <p>Real-time telemetry for <strong>{venues.find(v => v.id === selectedVenueId)?.name || 'Venue'}</strong></p>
      </div>
      <div className="refresh-badge" style={{ background: data.timestamp ? 'rgba(72,187,120,0.1)' : 'rgba(245,101,101,0.1)', color: data.timestamp ? '#48bb78' : '#f56565' }}>
        <RefreshCw size={14} className={data.timestamp ? "spin" : ""} style={{ marginRight: '6px' }} />
        {data.timestamp ? 'WS CONNECTED' : 'WS DISCONNECTED'}
      </div>
    </div>

    <div className="stats-row">
      <div className="stat-widget stat-blue">
        <div className="stat-label-sm">TOTAL CROWD</div>
        <div className="stat-value">{Number(data.total_crowd || 0).toLocaleString()}</div>
        <div className="stat-trend">↑ 12% from last hour</div>
      </div>
      <div className="stat-widget stat-teal">
        <div className="stat-label-sm">AVG WAIT TIME</div>
        <div className="stat-value">{data.avg_wait_time || 0}<span className="stat-unit">m</span></div>
        <div className="stat-trend">Stable throughput</div>
      </div>
      <div className="stat-widget stat-red">
        <div className="stat-label-sm">ACTIVE ALERTS</div>
        <div className="stat-value">{data.active_alerts || 0}</div>
        <div className="stat-trend critical">Action required</div>
      </div>
      <div className="stat-widget stat-purple">
        <div className="stat-label-sm">AI CONFIDENCE</div>
        <div className="stat-value">98<span className="stat-unit">%</span></div>
        <div className="stat-trend">High precision</div>
      </div>
    </div>

    <div className="card">
      <div className="card-header">
        <h2>Gate Analytics</h2>
        <button className="btn-outline">Export Report</button>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>NODE ID</th>
              <th>CAPACITY</th>
              <th>THROUGHPUT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {(data.gates && data.gates.length > 0) ? data.gates.map(gate => (
              <tr key={gate.id}>
                <td><strong>{gate.id}</strong></td>
                <td>
                  <div className="capacity-bar">
                    <div className="cap-fill" style={{ width: `${gate.pct}%`, background: gate.pct > 80 ? 'var(--red)' : 'var(--accent)' }}></div>
                  </div>
                </td>
                <td>{gate.count || 0} / min</td>
                <td><span className={`badge badge-${(gate.status || 'LOW').toLowerCase().replace(/\s+/g, '-')}`}>{gate.status || 'LOW FLOW'}</span></td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                  Initializing venue telemetry...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const LiveStatusView = ({ data, selectedVenue }) => {
  const mapRef = useRef(null);
  const [activeZone, setActiveZone] = useState('all');

  useEffect(() => {
    const initMap = async () => {
      if (window.google && mapRef.current) {
        const { Map } = await window.google.maps.importLibrary("maps");
        const { Polyline } = await window.google.maps.importLibrary("maps");
        const { HeatmapLayer } = await window.google.maps.importLibrary("visualization");

        const map = new Map(mapRef.current, {
          center: { lat: selectedVenue?.lat || 20, lng: selectedVenue?.lng || 78 },
          zoom: 18,
          mapTypeId: 'satellite',
          tilt: 45,
          disableDefaultUI: true
        });

        // 1. Render Discrete Pulse Nodes (Simulation Dots)
        if (data.hotspots) {
          data.hotspots.forEach((spot, idx) => {
            const colors = ['#f56565', '#4fd1c5', '#7c6af7', '#ed8936', '#48bb78'];
            const color = colors[idx % colors.length];

            // Outer Pulse
            new Circle({
              strokeWeight: 1,
              strokeColor: color,
              fillColor: color,
              fillOpacity: 0.2,
              map: map,
              center: { lat: spot.lat, lng: spot.lng },
              radius: 12
            });

            // Inner Core
            new Circle({
              strokeWeight: 2,
              strokeColor: '#fff',
              fillColor: color,
              fillOpacity: 1,
              map: map,
              center: { lat: spot.lat, lng: spot.lng },
              radius: 4
            });
          });
        }

        // 2. Render Escort Paths (Polylines)
        if (data.paths) {
          data.paths.forEach((path, idx) => {
            new Polyline({
              path: path,
              geodesic: true,
              strokeColor: idx === 0 ? '#7c6af7' : '#4fd1c5',
              strokeOpacity: 0.8,
              strokeWeight: 4,
              map: map,
              icons: [{
                icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 3, strokeColor: '#fff' },
                offset: '100%',
                repeat: '50px'
              }]
            });
          });
        }
      }
    };

    initMap();
  }, [selectedVenue, data.hotspots, data.paths]);

  const zones = [
    { id: 'z1', label: 'Zone 1 → Gate A' },
    { id: 'z2', label: 'Zone 2 → Food Court North' },
    { id: 'z3', label: 'Zone 3 → West Stand' },
    { id: 'z4', label: 'Zone 4 → Parking A' }
  ];

  return (
    <div className="tab-content active" style={{ padding: '0' }}>
      <div className="live-venue-header" style={{ padding: '24px', background: 'linear-gradient(to bottom, var(--bg2), transparent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
           <div>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--muted)', marginBottom: '4px' }}>REAL VENUE LAYER</div>
              <h1 style={{ margin: '0', fontSize: '28px' }}>{selectedVenue?.name}</h1>
           </div>
           <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--muted)' }}>
              Loaded real-world layout for {selectedVenue?.name.split(',')[0]}.<br/>
              <span style={{ color: 'var(--accent)' }}>• simulated crowd events</span>
           </div>
        </div>
      </div>

      <div className="card" style={{ margin: '0 24px', padding: '0', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg1)' }}>
         <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
      </div>

      <div className="zone-pills" style={{ display: 'flex', gap: '12px', padding: '24px', flexWrap: 'wrap' }}>
        {zones.map(zone => (
          <button 
            key={zone.id} 
            className={`btn-pill ${activeZone === zone.id ? 'active' : ''}`}
            onClick={() => setActiveZone(zone.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              background: activeZone === zone.id ? 'rgba(124, 106, 247, 0.2)' : 'var(--bg2)',
              color: activeZone === zone.id ? 'var(--accent)' : 'var(--text)',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {zone.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const AlertsView = () => {
  const [scope, setScope] = useState('all');
  
  return (
    <div className="alerts-view">
      <div className="page-header">
        <h1>Alert Center</h1>
        <p>AI-processed system insights and manual broadcasts.</p>
      </div>
      
      <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
         <div className="ai-pulse-header">
            <Zap size={20} color="var(--accent)" />
            <span className="pulse-label">AI INSIGHT PULSE</span>
         </div>
         <h3>North Gates experiencing high density</h3>
         <p style={{ margin: '12px 0', color: 'var(--muted)' }}>AI suggests opening overflow tunnels in Sector 4 within the next 15 minutes to avoid level 2 congestion.</p>
         <button className="btn-primary" onClick={() => alert('Protocol Executed: Tunnels Opening')}>Execute Protocol</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Alert Log</h2>
          <div className="toggle-group" style={{ display: 'flex', gap: '8px' }}>
            <button className={`btn-outline ${scope === 'all' ? 'active' : ''}`} onClick={() => setScope('all')} style={{ background: scope === 'all' ? 'var(--accent)' : 'transparent', color: scope === 'all' ? '#fff' : 'var(--accent)' }}>All Alerts</button>
            <button className={`btn-outline ${scope === 'security' ? 'active' : ''}`} onClick={() => setScope('security')} style={{ background: scope === 'security' ? 'var(--accent)' : 'transparent', color: scope === 'security' ? '#fff' : 'var(--accent)' }}>Security Only</button>
          </div>
        </div>
        <div className="alerts-list">
           {(scope === 'all' || scope === 'security') && (
             <div className="alert-card high-alert">
                <div className="alert-icon-wrap" style={{ background: 'rgba(245,101,101,0.1)' }}><AlertTriangle color="var(--red)" /></div>
                <div className="alert-body">
                   <span className="badge badge-high">HIGH</span>
                   <h3>Unauthorized Access Attempt</h3>
                   <p>System Console login failure detected at Gate 4. Monitoring active.</p>
                   <div className="alert-time">14:22:15</div>
                </div>
             </div>
           )}
           {scope === 'all' && (
             <div className="alert-card info-alert">
                <div className="alert-icon-wrap" style={{ background: 'rgba(0,229,192,0.1)' }}><Info color="var(--teal)" /></div>
                <div className="alert-body">
                   <span className="badge badge-low">INFO</span>
                   <h3>Routine Backup Completed</h3>
                   <p>Automated cloud synchronization finished successfully.</p>
                   <div className="alert-time">13:55:00</div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const AdminView = () => (
  <div className="tab-content active">
    <div className="page-header">
      <h1>System Settings</h1>
      <p>Configure hardware thresholds and processing parameters.</p>
    </div>
    <div className="admin-grid">
       <div className="card">
          <h2>System Health</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                   <span>Core CPU</span>
                   <span>42%</span>
                </div>
                <div className="load-bar"><div className="load-fill" style={{ width: '42%' }}></div></div>
             </div>
             <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                   <span>Memory Usage</span>
                   <span>68%</span>
                </div>
                <div className="load-bar"><div className="load-fill" style={{ width: '68%', background: 'var(--teal)' }}></div></div>
             </div>
          </div>
       </div>
       <div className="card">
          <h2>Configuration</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <div>
                <label style={{ fontSize: '12px', color: 'var(--muted)' }}>Density Threshold</label>
                <input type="range" style={{ width: '100%' }} />
             </div>
             <button className="btn-primary btn-full">Save Changes</button>
          </div>
       </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState('landing');
  const [tab, setTab] = useState('dashboard');
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState('');
  const [data, setData] = useState({ total_crowd: 0, avg_wait_time: 0, active_alerts: 0, gates: [], hotspots: [], paths: [] });

  // Initial Fetch: Venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
        const res = await fetch(`${backendUrl}/venues`);
        if (res.ok) {
          const list = await res.json();
          setVenues(list);
          if (list.length > 0) {
            setSelectedVenueId(list[0].id);
          }
        }
      } catch (e) {
        console.error('Failed to fetch venues');
      }
    };
    fetchVenues();
  }, []);

  // WebSocket for Live Telemetry
  useEffect(() => {
    // Only connect if we have a valid venue ID from our actual list
    if (page === 'app' && selectedVenueId && venues.some(v => v.id === selectedVenueId)) {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const wsUrl = backendUrl.replace('http', 'ws');
      const socket = new WebSocket(`${wsUrl}/ws/${selectedVenueId}`);

      socket.onmessage = (event) => {
        const json = JSON.parse(event.data);
        setData(json);
      };

      socket.onerror = () => console.error('WebSocket Error');
      
      return () => socket.close();
    }
  }, [page, selectedVenueId]);

  const selectedVenue = venues.find(v => v.id === selectedVenueId) || venues[0];

  if (page === 'landing') {
    return <LandingPage onEnter={() => setPage('app')} />;
  }

  return (
    <AppShell 
      activeTab={tab} 
      onTabChange={setTab} 
      venues={venues} 
      selectedVenue={selectedVenue} 
      onVenueChange={setSelectedVenueId}
    >
      {tab === 'dashboard' && (
        <DashboardView 
          data={data} 
          venues={venues} 
          selectedVenueId={selectedVenueId} 
          onVenueChange={setSelectedVenueId} 
        />
      )}
      {tab === 'live' && <LiveStatusView data={data} selectedVenue={selectedVenue} />}
      {tab === 'alerts' && <AlertsView />}
      {tab === 'analytics' && <div className="card"><h2>Analytics View</h2><p>Historical charts and trend analysis...</p></div>}
      {tab === 'admin' && <AdminView />}
    </AppShell>
  );
}
