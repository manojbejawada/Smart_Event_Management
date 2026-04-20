import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Bell, 
  Settings, 
  Menu, 
  X, 
  Search, 
  ChevronRight,
  Zap,
  Shield,
  BarChart3,
  RefreshCw,
  AlertTriangle,
  Info,
  Map as MapIcon,
  Navigation,
  Users,
  Flame,
  Utensils,
  ParkingCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// --- Toast System ---
const Toast = ({ toasts, removeToast }) => (
  <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none' }}>
    {toasts.map(t => (
      <div key={t.id} style={{
        display: 'flex', alignItems: 'flex-start', gap: '12px',
        background: t.type === 'success' ? 'rgba(0,210,128,0.15)' : t.type === 'danger' ? 'rgba(255,77,77,0.15)' : 'rgba(0,210,255,0.15)',
        border: `1px solid ${t.type === 'success' ? 'rgba(0,210,128,0.5)' : t.type === 'danger' ? 'rgba(255,77,77,0.5)' : 'rgba(0,210,255,0.5)'}`,
        backdropFilter: 'blur(16px)',
        padding: '14px 18px',
        borderRadius: '14px',
        minWidth: '300px',
        maxWidth: '420px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        animation: 'slideInRight 0.35s ease-out',
        color: 'var(--text)',
        pointerEvents: 'all'
      }}>
        <div style={{ marginTop: '1px', flexShrink: 0 }}>
          {t.type === 'success' && <CheckCircle size={18} color="#00d280" />}
          {t.type === 'danger' && <XCircle size={18} color="#ff4d4d" />}
          {t.type === 'info' && <Info size={18} color="#00d2ff" />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '3px' }}>{t.title}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: '1.4' }}>{t.message}</div>
        </div>
        <button aria-label="Close notification" onClick={() => removeToast(t.id)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '2px', flexShrink: 0 }}>
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
);

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((title, message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500);
  }, []);
  const remove = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), []);
  return { toasts, show, remove };
};

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
             <Activity size={48} color="var(--accent)" style={{ opacity: 0.5 }} />
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

const FloatingAlert = ({ message }) => (
  <div className="floating-alert">
    <div className="alert-pulse"></div>
    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{message}</div>
    <AlertTriangle size={16} color="var(--red)" />
  </div>
);

const MetricRow = ({ data }) => (
  <div className="stats-row">
    <div className="stat-widget">
      <div className="stat-label-sm">AVG DENSITY</div>
      <div className="stat-value">{Math.round((data.total_crowd / 1000) || 0)}%</div>
    </div>
    <div className="stat-widget">
      <div className="stat-label-sm">HEAT INDEX</div>
      <div className="stat-value">{Math.round(data.avg_wait_time * 1.5) || 0}</div>
    </div>
    <div className="stat-widget">
      <div className="stat-label-sm">CROWDED ZONES</div>
      <div className="stat-value">{data.active_alerts || 0}</div>
    </div>
    <div className="stat-widget">
      <div className="stat-label-sm">LIVE QUEUES</div>
      <div className="stat-value">{data.gates?.length || 0}</div>
    </div>
  </div>
);

const LocationGrid = ({ gates = [] }) => {
  const icons = [Utensils, Utensils, Navigation, Users, MapIcon, ParkingCircle];
  const names = ['Food Court A', 'Food Court C', 'Gate B', 'Restroom 2', 'Seat Block West', 'Parking A'];
  const locations = names.map((name, i) => {
    const gate = gates[i];
    const waitMin = gate ? Math.max(1, Math.round(gate.pct / 15)) : (i + 1) * 1;
    const density = gate ? (gate.pct > 70 ? 'high' : gate.pct > 35 ? 'medium' : 'low') : 'low';
    return { id: name, name, wait: `${waitMin} min`, density, icon: icons[i] };
  });

  return (
    <div className="location-grid">
      {locations.map(loc => (
        <div key={loc.id} className="glass-card location-card">
          <div className="location-icon-box">
            <loc.icon size={18} />
          </div>
          <div className="location-info">
            <h4>{loc.name}</h4>
            <div className="location-meta">{loc.wait} wait • {loc.density} crowd</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ControlPanel = ({ showToast }) => (
  <div className="control-panel">
    <button className="control-btn" onClick={() => showToast('Surge Zone 1 Activated', 'Staff redirected to Gate A. Overflow barriers opening now.', 'danger')}>
      <Flame size={14} /> Surge Zone 1
    </button>
    <button className="control-btn" onClick={() => showToast('Food Rush Protocol', 'Food courts B & D opened. Vendor carts deployed to north stand.', 'info')}>
      <Utensils size={14} /> Food Rush
    </button>
    <button className="control-btn" onClick={() => showToast('Emergency Mode Engaged', 'All security alerted. Emergency exits unlocked. EMS on standby.', 'danger')}>
      <AlertTriangle size={14} /> Emergency Mode
    </button>
    <button className="control-btn" onClick={() => showToast('Crowd Optimization Active', 'AI rerouting 12,000 attendees via alternate corridors. ETA: 4 min.', 'success')}>
      <Zap size={14} /> Optimize Crowd
    </button>
  </div>
);

const AppShell = ({ activeTab, onTabChange, venues, selectedVenue, onVenueChange, children, alertCount = 0 }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'live', icon: Activity, label: 'Mission Control' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Analytics' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: alertCount > 0 ? alertCount : null },
    { id: 'admin', icon: Settings, label: 'Settings' },
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
              aria-label="Select Venue"
              value={selectedVenue?.id || ''} 
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
      </aside>

      <div className="app-content-wrapper">
        <header className="app-topbar">
          <button aria-label="Toggle sidebar menu" className="sidebar-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Menu size={24} />
          </button>
          <div className="topbar-search">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search venues, alerts, or staff..." />
          </div>
          <div className="topbar-actions">
            <button aria-label="View notifications" className="topbar-icon-btn">
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

// SVG Sparkline Chart
const SparklineChart = ({ history, color = '#00d2ff', label = 'Crowd' }) => {
  const W = 100, H = 60;
  if (history.length < 2) return <div style={{ height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.8rem' }}>Collecting data…</div>;
  const vals = history.map(h => h.value);
  const min = Math.min(...vals), max = Math.max(...vals);
  const range = max - min || 1;
  const pts = history.map((h, i) => {
    const x = (i / (history.length - 1)) * W;
    const y = H - ((h.value - min) / range) * (H - 8) - 4;
    return `${x},${y}`;
  }).join(' ');
  const area = `0,${H} ` + pts + ` ${W},${H}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '120px' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#grad-${label})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
};

const AnalyticsView = ({ data = {}, crowdHistory = [], venues = [], selectedVenueId }) => (
  <div className="dashboard-view">
    <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
      <div>
        <h1>Analytics</h1>
        <p>Live telemetry for <strong>{venues.find(v => v.id === selectedVenueId)?.name || 'Venue'}</strong></p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#48bb78', background: 'rgba(72,187,120,0.1)', padding: '6px 14px', borderRadius: '20px' }}>
        <RefreshCw size={12} className="spin" /> LIVE SIMULATION
      </div>
    </div>

    <div className="stats-row" style={{ marginBottom: '24px' }}>
      {[
        { label: 'TOTAL CROWD', value: Number(data.total_crowd || 0).toLocaleString(), trend: '↑ live', color: 'var(--accent)' },
        { label: 'AVG WAIT', value: `${data.avg_wait_time || 0}m`, trend: 'minutes avg', color: 'var(--teal)' },
        { label: 'ACTIVE ALERTS', value: data.active_alerts || 0, trend: 'needs attention', color: 'var(--red)' },
        { label: 'AI CONFIDENCE', value: '98%', trend: 'high precision', color: '#a78bfa' },
      ].map(s => (
        <div key={s.label} className="stat-widget" style={{ borderTop: `3px solid ${s.color}` }}>
          <div className="stat-label-sm">{s.label}</div>
          <div className="stat-value">{s.value}</div>
          <div className="stat-trend">{s.trend}</div>
        </div>
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
      <div className="card">
        <div className="card-header"><h2>Crowd Trend</h2><span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Last 30 ticks</span></div>
        <SparklineChart history={crowdHistory} color="var(--accent)" label="crowd" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.72rem', color: 'var(--muted)' }}>
          <span>{crowdHistory[0]?.label || '—'}</span>
          <span>{crowdHistory[crowdHistory.length - 1]?.label || '—'}</span>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h2>Wait Time Trend</h2><span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Last 30 ticks</span></div>
        <SparklineChart history={crowdHistory.map(h => ({ ...h, value: h.wait }))} color="var(--teal)" label="wait" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.72rem', color: 'var(--muted)' }}>
          <span>{crowdHistory[0]?.label || '—'}</span>
          <span>{crowdHistory[crowdHistory.length - 1]?.label || '—'}</span>
        </div>
      </div>
    </div>

    <div className="card">
      <div className="card-header"><h2>Gate Analytics</h2><button className="btn-outline">Export</button></div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead><tr><th>NODE ID</th><th>CAPACITY</th><th>THROUGHPUT</th><th>STATUS</th></tr></thead>
          <tbody>
            {(data.gates && data.gates.length > 0) ? data.gates.map(gate => (
              <tr key={gate.id}>
                <td><strong>{gate.id}</strong></td>
                <td>
                  <div className="capacity-bar" style={{ height: '6px', background: 'var(--bg3)', borderRadius: '3px' }}>
                    <div style={{ width: `${gate.pct}%`, height: '100%', borderRadius: '3px', background: gate.pct > 80 ? 'var(--red)' : gate.pct > 40 ? 'var(--amber)' : 'var(--accent)', transition: 'width 0.5s' }}></div>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '4px' }}>{gate.pct}%</div>
                </td>
                <td>{gate.count || 0} / min</td>
                <td><span className={`badge badge-${gate.pct > 80 ? 'high' : gate.pct > 40 ? 'moderate' : 'low'}`}>{gate.status}</span></td>
              </tr>
            )) : <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>Collecting gate telemetry…</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const LiveStatusView = ({ data, selectedVenue, showToast }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      if (window.google && mapRef.current) {
        const { Map, Circle, Polyline } = await window.google.maps.importLibrary("maps");
        
        const map = new Map(mapRef.current, {
          center: { lat: selectedVenue?.lat || 20, lng: selectedVenue?.lng || 78 },
          zoom: 18,
          mapTypeId: 'satellite',
          tilt: 45,
          heading: 90,
          disableDefaultUI: true,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          ]
        });

        if (data.hotspots) {
          data.hotspots.forEach((spot) => {
            const intensity = spot.intensity || 5;
            const color = intensity > 8 ? '#ff4d4d' : intensity > 4 ? '#ffaa00' : '#00d2ff';

            new Circle({
              strokeWeight: 0,
              fillColor: color,
              fillOpacity: 0.35,
              map: map,
              center: { lat: spot.lat, lng: spot.lng },
              radius: 8 + intensity
            });

            new Circle({
              strokeWeight: 1,
              strokeColor: '#fff',
              fillColor: color,
              fillOpacity: 1,
              map: map,
              center: { lat: spot.lat, lng: spot.lng },
              radius: 3
            });
          });
        }

        if (data.paths) {
          data.paths.forEach((path, idx) => {
            new Polyline({
              path: path,
              geodesic: true,
              strokeColor: idx === 0 ? '#00d2ff' : '#33ffda',
              strokeOpacity: 0.6,
              strokeWeight: 4,
              map: map,
              icons: [{
                icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 2, strokeColor: '#fff' },
                offset: '100%',
                repeat: '40px'
              }]
            });
          });
        }
      }
    };

    initMap();
  }, [selectedVenue, data.hotspots, data.paths]);

  return (
    <div className="live-status-view">
      <FloatingAlert message="ZONE-20 critical congestion" />
      
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1', margin: '0' }}>command map</h1>
        <p style={{ color: 'var(--muted)', marginTop: '12px', maxWidth: '500px' }}>
          Track density, hotspots, and safe movement corridors as conditions evolve across the stadium.
        </p>
      </div>

      <MetricRow data={data} />
      <ControlPanel showToast={showToast} />

      <div style={{ marginTop: '40px' }}>
        <div style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--muted)', marginBottom: '8px', fontWeight: '700' }}>POPULAR LOCATIONS</div>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '24px' }}>Food courts, gates, restrooms, seating, and parking</h2>
        <LocationGrid />
      </div>

      <div style={{ marginTop: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
           <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--muted)', marginBottom: '4px', fontWeight: '700' }}>REAL VENUE LAYER</div>
              <h3 style={{ margin: '0' }}>{selectedVenue?.name || 'Loading venue...'}</h3>
           </div>
           <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--muted)' }}>
              Loaded real-world layout. • simulated crowd events
           </div>
        </div>
        
        <div className="map-container">
           <div ref={mapRef} style={{ width: '100%', height: '600px' }}></div>
           <div className="map-controls-overlay">
              <button className="control-btn" style={{ background: 'var(--bg2)' }}>Map</button>
              <button className="control-btn" style={{ background: 'var(--accent)', color: '#000' }}>Satellite</button>
           </div>
        </div>
      </div>
    </div>
  );
};

const AlertsView = ({ showToast }) => {
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
         <button className="btn-primary" onClick={() => showToast('Protocol Executed', 'Overflow tunnels opening in Sector 4. Estimated relief in 2 minutes.', 'success')}>Execute Protocol</button>
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
           <div className="alert-card high-alert" style={{ background: 'rgba(255, 77, 77, 0.05)', padding: '16px', borderRadius: '12px', display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div className="alert-icon-wrap" style={{ background: 'rgba(255, 77, 77, 0.1)', padding: '10px', borderRadius: '10px' }}><AlertTriangle color="var(--red)" /></div>
              <div className="alert-body">
                 <span className="badge badge-high">HIGH</span>
                 <h3>Unauthorized Access Attempt</h3>
                 <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>System Console login failure detected at Gate 4. Monitoring active.</p>
                 <div className="alert-time" style={{ fontSize: '0.75rem', marginTop: '8px' }}>14:22:15</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const AdminView = ({ data = {} }) => {
  const cpuLoad = Math.min(95, Math.round((data.total_crowd || 0) / 500));
  const memLoad = Math.min(95, Math.round((data.avg_wait_time || 0) * 4));
  const aiLoad = 98;
  const netLoad = Math.min(90, 40 + (data.active_alerts || 0) * 8);
  const metrics = [
    { label: 'Core CPU', value: cpuLoad, color: cpuLoad > 80 ? 'var(--red)' : 'var(--accent)' },
    { label: 'Memory Usage', value: memLoad, color: memLoad > 70 ? 'var(--amber)' : 'var(--teal)' },
    { label: 'AI Engine', value: aiLoad, color: '#a78bfa' },
    { label: 'Network I/O', value: netLoad, color: 'var(--accent)' },
  ];
  return (
    <div className="admin-view">
      <div className="page-header">
        <h1>System Settings</h1>
        <p>Live hardware metrics and configuration parameters.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>System Health</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {metrics.map(m => (
              <div key={m.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem' }}>
                  <span>{m.label}</span>
                  <span style={{ color: m.color, fontWeight: '700' }}>{m.value}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg3)', borderRadius: '3px' }}>
                  <div style={{ width: `${m.value}%`, height: '100%', borderRadius: '3px', background: m.color, transition: 'width 0.8s ease' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>Configuration</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Density Threshold Alert (%)</label>
              <input type="range" defaultValue={75} style={{ width: '100%', accentColor: 'var(--accent)' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>Simulation Refresh Rate (ms)</label>
              <input type="range" defaultValue={2000} min={500} max={5000} style={{ width: '100%', accentColor: 'var(--teal)' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-primary" style={{ flex: 1 }}>Save Changes</button>
              <button className="btn-outline">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

// --- Random Data Generator ---
const generateRandomData = (venue) => {
  const capacity = venue?.capacity || 50000;
  const total_crowd = Math.floor(Math.random() * capacity * 0.8) + Math.floor(capacity * 0.1);
  const avg_wait_time = Math.floor(Math.random() * 20) + 2;
  const active_alerts = Math.floor(Math.random() * 6);
  const gateLabels = ['Gate A', 'Gate B', 'Gate C', 'Gate D'];
  const gates = gateLabels.map((label, i) => {
    const pct = Math.floor(Math.random() * 90) + 5;
    return {
      id: label,
      count: Math.floor(Math.random() * 800) + 50,
      pct,
      status: pct > 80 ? 'CRITICAL' : pct > 40 ? 'MODERATE' : 'LOW FLOW'
    };
  });
  const lat = venue?.lat || 20;
  const lng = venue?.lng || 78;
  const hotspots = Array.from({ length: 30 }, () => ({
    lat: lat + (Math.random() - 0.5) * 0.004,
    lng: lng + (Math.random() - 0.5) * 0.004,
    intensity: Math.floor(Math.random() * 12) + 1
  }));
  const paths = Array.from({ length: 3 }, () => {
    const startLat = lat + (Math.random() - 0.5) * 0.002;
    const startLng = lng + (Math.random() - 0.5) * 0.002;
    const path = [{ lat: startLat, lng: startLng }];
    for (let i = 0; i < 5; i++) {
      path.push({
        lat: path[path.length - 1].lat + (Math.random() - 0.5) * 0.0006,
        lng: path[path.length - 1].lng + (Math.random() - 0.5) * 0.0006
      });
    }
    return path;
  });
  return { venue_id: venue?.id || '', total_crowd, avg_wait_time, active_alerts, gates, hotspots, paths, timestamp: Date.now() };
};

export default function App() {
  const [tab, setTab] = useState('live');
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState('');
  const [data, setData] = useState({ total_crowd: 0, avg_wait_time: 0, active_alerts: 0, gates: [], hotspots: [], paths: [] });
  const [crowdHistory, setCrowdHistory] = useState([]);
  const wsConnected = useRef(false);
  const { toasts, show: showToast, remove: removeToast } = useToast();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
        const res = await fetch(`${backendUrl}/venues`);
        if (res.ok) {
          const list = await res.json();
          setVenues(list);
          if (list.length > 0) setSelectedVenueId(list[0].id);
        }
      } catch (e) {
        console.error('Failed to fetch venues');
      }
    };
    fetchVenues();
  }, []);

  // WebSocket — tries to connect to backend
  useEffect(() => {
    if (selectedVenueId) {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const wsUrl = backendUrl.replace('http', 'ws');
      const socket = new WebSocket(`${wsUrl}/ws/${selectedVenueId}`);
      socket.onopen = () => { wsConnected.current = true; };
      socket.onmessage = (event) => setData(JSON.parse(event.data));
      socket.onerror = () => { wsConnected.current = false; };
      socket.onclose = () => { wsConnected.current = false; };
      return () => socket.close();
    }
  }, [selectedVenueId]);

  // Frontend simulation — runs every 2s
  useEffect(() => {
    const selectedVenue = venues.find(v => v.id === selectedVenueId) || venues[0];
    const tick = () => {
      if (!wsConnected.current) {
        const venue = venues.find(v => v.id === selectedVenueId) || venues[0];
        const d = generateRandomData(venue);
        setData(d);
        const now = new Date();
        const label = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
        setCrowdHistory(prev => [...prev.slice(-29), { label, value: d.total_crowd, wait: d.avg_wait_time }]);
      }
    };
    tick();
    const interval = setInterval(tick, 2000);
    return () => clearInterval(interval);
  }, [selectedVenueId, venues]);

  const selectedVenue = venues.find(v => v.id === selectedVenueId) || venues[0];

  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />
      <AppShell 
        activeTab={tab} 
        onTabChange={setTab} 
        venues={venues} 
        selectedVenue={selectedVenue} 
        onVenueChange={setSelectedVenueId}
        alertCount={data.active_alerts}
      >
        {tab === 'live' && <LiveStatusView data={data} selectedVenue={selectedVenue} showToast={showToast} />}
        {tab === 'dashboard' && <AnalyticsView data={data} crowdHistory={crowdHistory} venues={venues} selectedVenueId={selectedVenueId} />}
        {tab === 'alerts' && <AlertsView showToast={showToast} data={data} />}
        {tab === 'admin' && <AdminView data={data} />}
      </AppShell>
    </>
  );
}
