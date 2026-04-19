// ===== SEES - Smart Event Experience System =====

// --- Navigation ---
function openApp() {
  document.getElementById('page-landing').classList.remove('active');
  document.getElementById('page-app').classList.add('active');
  showTab('dashboard');
  startSimulations();
}

function goLanding() {
  document.getElementById('page-app').classList.remove('active');
  document.getElementById('page-landing').classList.add('active');
}

function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.mobile-bottom-nav button').forEach(b => b.classList.remove('active'));

  const tab = document.getElementById('tab-' + tabName);
  if (tab) tab.classList.add('active');

  const nav = document.getElementById('nav-' + tabName);
  if (nav) nav.classList.add('active');

  const mob = document.getElementById('mob-' + tabName);
  if (mob) mob.classList.add('active');

  if (tabName === 'live') {
    renderGates();
    if (typeof google !== 'undefined') initGoogleMap();
  }
  if (tabName === 'alerts') renderAlerts();
  if (tabName === 'analytics') setTimeout(drawAnalytics, 100);
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function toggleMobileNav() {
  const links = document.querySelector('.nav-links');
  const actions = document.querySelector('.nav-actions');
  if (links) links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  if (actions) actions.style.display = actions.style.display === 'flex' ? 'none' : 'flex';
}

// --- Toast ---
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// --- Alert Control ---
function setScope(scope) {
  document.getElementById('scope-all').classList.toggle('active', scope === 'all');
  document.getElementById('scope-sec').classList.toggle('active', scope === 'security');
}

function sendAlert() {
  const msg = document.getElementById('alert-message').value;
  if (!msg.trim()) { showToast('⚠ Please enter an alert message'); return; }
  showToast('✅ Alert broadcast sent successfully');
  document.getElementById('alert-message').value = '';
  document.getElementById('last-sent').textContent = 'Last sent: just now';
}

// --- Config ---
function updateConfig() {
  document.getElementById('density-val').textContent = document.getElementById('density-thresh').value + '%';
  document.getElementById('delay-val').textContent = document.getElementById('alert-delay').value + 's';
  document.getElementById('refresh-val').textContent = document.getElementById('refresh-interval').value + 's';
  document.getElementById('confidence-val').textContent = document.getElementById('ai-confidence').value + '%';
}

function saveConfig() { showToast('✅ Configuration saved'); }
function exportCSV() { showToast('📥 CSV exported successfully'); }
function deploySupport() { showToast('🚀 Support team deployed to North Gates'); }
function executeMaintenance() { showToast('🔧 Maintenance routine initiated'); }

// --- Gate Data ---
const gates = [
  { id: 'NORTH-01', pct: 12, status: 'LOW FLOW', level: 'low' },
  { id: 'SOUTH-02', pct: 58, status: 'MODERATE', level: 'mod' },
  { id: 'EAST-MAIN', pct: 92, status: 'CRITICAL', level: 'crit' },
  { id: 'WEST-03', pct: 41, status: 'MODERATE', level: 'mod' },
  { id: 'VIP-NORTH', pct: 5, status: 'MINIMAL', level: 'low' }
];

function renderGates() {
  const list = document.getElementById('gates-list');
  if (!list) return;
  list.innerHTML = gates.map(g => {
    const barColor = g.level === 'crit' ? 'var(--red)' : g.level === 'mod' ? 'var(--accent)' : 'var(--teal)';
    return `<div class="gate-card ${g.level === 'crit' ? 'critical' : ''}">
      <div class="gate-left">
        <div class="gate-id-label">GATE ID</div>
        <div class="gate-name">${g.id}</div>
        <div class="gate-crowd-label">Crowd Level</div>
        <div class="gate-bar"><div class="gate-bar-fill" style="width:${g.pct}%;background:${barColor}"></div></div>
      </div>
      <div class="gate-right">
        <div class="gate-pct pct-${g.level}">${g.pct}%</div>
        <div class="gate-status"><span class="dot dot-${g.level}"></span>STATUS: ${g.status}</div>
      </div>
    </div>`;
  }).join('');
}

// --- Alerts Data ---
const alertsData = [
  { title: 'Main Power Grid Fluctuation', severity: 'HIGH', sevClass: 'high', icon: '✦', iconClass: 'high-icon', cardClass: 'high-alert', desc: 'Voltage drop detected in Sector 4. Immediate intervention required to prevent backup system failure.', time: '14:22:15' },
  { title: 'Sensor Threshold Reached', severity: 'WARNING', sevClass: 'warn', icon: '⚠', iconClass: 'warn-icon', cardClass: 'warn-alert', desc: 'Humidity levels in Central Hub are exceeding the pre-set 65% threshold. Cooling systems adjusting.', time: '14:18:42' },
  { title: 'Routine Backup Completed', severity: 'INFO', sevClass: 'info', icon: 'ℹ', iconClass: 'info-icon', cardClass: 'info-alert', desc: 'Automated cloud synchronization for Event Data Log 455-A finished successfully.', time: '13:55:00' },
  { title: 'Unauthorized Access Attempt', severity: 'HIGH', sevClass: 'high', icon: '🔴', iconClass: 'high-icon', cardClass: 'high-alert', desc: 'Multiple failed access attempts detected on the System Console from unknown IP 192.168.1.102. System locked.', time: '12:10:05' }
];

function renderAlerts() {
  const list = document.getElementById('alerts-list');
  if (!list) return;
  list.innerHTML = alertsData.map(a => `<div class="alert-card ${a.cardClass}">
    <div class="alert-icon-wrap ${a.iconClass}">${a.icon}</div>
    <div class="alert-body">
      <span class="alert-severity sev-${a.sevClass}">${a.severity}</span>
      <h3>${a.title}</h3>
      <p>${a.desc}</p>
      <div class="alert-time-label">TIME RECEIVED</div>
      <div class="alert-time">${a.time}</div>
    </div>
  </div>`).join('');
}

// --- Canvas: Hero Heatmap ---
function drawHeroCanvas() {
  const c = document.getElementById('hero-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  c.width = 700; c.height = 300;
  ctx.fillStyle = '#0a0d1a';
  ctx.fillRect(0, 0, 700, 300);

  // Grid lines
  ctx.strokeStyle = 'rgba(124,106,247,0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 700; x += 35) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 300); ctx.stroke(); }
  for (let y = 0; y < 300; y += 35) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(700, y); ctx.stroke(); }

  // Heatmap blobs
  const blobs = [[200, 150, 80, 'rgba(124,106,247,0.3)'], [400, 100, 60, 'rgba(0,229,192,0.25)'], [500, 200, 90, 'rgba(245,101,101,0.3)'], [150, 80, 50, 'rgba(124,106,247,0.2)'], [600, 140, 45, 'rgba(0,229,192,0.2)']];
  blobs.forEach(([x, y, r, color]) => {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  });

  // Dots
  for (let i = 0; i < 120; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 700, Math.random() * 300, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124,106,247,${Math.random() * 0.5 + 0.1})`;
    ctx.fill();
  }
}

// --- Canvas: Camera Feeds ---
function drawCamCanvas(id, hue) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0a0d1a';
  ctx.fillRect(0, 0, 280, 140);
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 280, Math.random() * 140, Math.random() * 3 + 1, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue},70%,60%,${Math.random() * 0.4 + 0.1})`;
    ctx.fill();
  }
  ctx.strokeStyle = `hsla(${hue},70%,60%,0.15)`;
  for (let x = 0; x < 280; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 140); ctx.stroke(); }
}

// --- Google Maps Integration ---
let map;
const venueLocations = [
  { name: 'Madison Square Garden, NY', lat: 40.7505, lng: -73.9934 },
  { name: 'Wembley Stadium, London', lat: 51.5560, lng: -0.2796 },
  { name: 'Allianz Arena, Munich', lat: 48.2188, lng: 11.6247 },
  { name: 'Saitama Super Arena, Japan', lat: 35.8948, lng: 139.6310 },
  { name: 'Maracanã Stadium, Brazil', lat: -22.9121, lng: -43.2302 },
  { name: 'Melbourne Cricket Ground, AUS', lat: -37.8200, lng: 144.9834 },
  { name: 'AT&T Stadium, Texas', lat: 32.7473, lng: -97.0945 },
  { name: 'SoFi Stadium, LA', lat: 33.9535, lng: -118.3392 },
  { name: 'Camp Nou, Barcelona', lat: 41.3809, lng: 2.1228 },
  { name: 'Singapore National Stadium', lat: 1.3039, lng: 103.8749 }
];

function initGoogleMap() {
  const mapContainer = document.getElementById('google-map');
  if (!mapContainer) return;

  // Dark mode style
  const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#141829" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#141829" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#182c21" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e2540" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
    { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
    { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a0d1a" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
    { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }
  ];

  map = new google.maps.Map(mapContainer, {
    center: { lat: 20, lng: 0 },
    zoom: 2,
    styles: darkMapStyle,
    disableDefaultUI: true,
    zoomControl: true
  });

  venueLocations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map: map,
      title: loc.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#7c6af7',
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
        scale: 7
      }
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="color: #141829; font-family: 'Space Grotesk', sans-serif; padding: 10px;">
                  <strong style="display: block; font-size: 14px; margin-bottom: 4px;">${loc.name}</strong>
                  <span style="font-size: 12px; color: #7c6af7;">● LIVE TELEMETRY ACTIVE</span>
                </div>`
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
      showToast(`📍 Connected to ${loc.name}`);
    });
  });
}

// Draw static map fallback if google is not loaded yet
function drawSpatialMap() {
  const c = document.getElementById('spatial-canvas');
  if (!c) {
    // If we're in the new layout, try initializing google maps
    if (typeof google !== 'undefined') {
      initGoogleMap();
    }
    return;
  }
  const ctx = c.getContext('2d');
  c.width = 600; c.height = 200;
  ctx.fillStyle = '#0e0520';
  ctx.fillRect(0, 0, 600, 200);

  // Grid
  ctx.strokeStyle = 'rgba(124,106,247,0.1)';
  for (let x = 0; x < 600; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 200); ctx.stroke(); }
  for (let y = 0; y < 200; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(600, y); ctx.stroke(); }

  // Heat zones
  const zones = [[350, 100, 80, 'rgba(245,101,101,0.35)'], [200, 80, 50, 'rgba(124,106,247,0.25)'], [450, 140, 40, 'rgba(0,229,192,0.2)']];
  zones.forEach(([x, y, r, color]) => {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  });

  // Roads
  ctx.strokeStyle = 'rgba(124,106,247,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(50, 100); ctx.lineTo(550, 100); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(300, 20); ctx.lineTo(300, 180); ctx.stroke();
}

// --- Analytics Charts ---
function drawAnalytics() {
  drawLineChart();
  drawDonutChart();
  drawBarChart();
}

function drawLineChart() {
  const c = document.getElementById('analytics-chart');
  if (!c) return;
  const ctx = c.getContext('2d');
  c.width = 600; c.height = 250;
  ctx.fillStyle = 'transparent'; ctx.clearRect(0, 0, 600, 250);

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  for (let y = 30; y < 220; y += 40) { ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(580, y); ctx.stroke(); }

  // Data
  const data = [40, 55, 48, 72, 68, 85, 90, 78, 95, 88, 92, 80];
  const maxV = 100;
  ctx.beginPath();
  ctx.strokeStyle = 'var(--accent)';
  ctx.lineWidth = 2.5;
  data.forEach((v, i) => {
    const x = 40 + i * (540 / (data.length - 1));
    const y = 220 - (v / maxV) * 190;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Fill
  const grad = ctx.createLinearGradient(0, 30, 0, 220);
  grad.addColorStop(0, 'rgba(124,106,247,0.2)');
  grad.addColorStop(1, 'rgba(124,106,247,0)');
  ctx.lineTo(580, 220); ctx.lineTo(40, 220); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  // Dots
  data.forEach((v, i) => {
    const x = 40 + i * (540 / (data.length - 1));
    const y = 220 - (v / maxV) * 190;
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#7c6af7'; ctx.fill();
    ctx.strokeStyle = '#0a0d1a'; ctx.lineWidth = 2; ctx.stroke();
  });

  // Labels
  ctx.fillStyle = '#8892b0'; ctx.font = '11px Space Grotesk';
  const hours = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];
  hours.forEach((h, i) => {
    ctx.fillText(h, 30 + i * (540 / 11), 242);
  });
}

function drawDonutChart() {
  const c = document.getElementById('donut-chart');
  if (!c) return;
  const ctx = c.getContext('2d');
  c.width = 300; c.height = 300;

  const data = [3402, 1120, 2890, 452];
  const colors = ['#7c6af7', '#00e5c0', '#f56565', '#a78bfa'];
  const labels = ['North Main', 'West Plaza', 'South Gate', 'East Dock'];
  const total = data.reduce((a, b) => a + b, 0);
  const cx = 150, cy = 130, outerR = 90, innerR = 55;

  let startAngle = -Math.PI / 2;
  data.forEach((val, i) => {
    const sliceAngle = (val / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = colors[i]; ctx.fill();
    startAngle += sliceAngle;
  });

  // Center text
  ctx.fillStyle = '#e8eaf6'; ctx.font = 'bold 22px Space Grotesk'; ctx.textAlign = 'center';
  ctx.fillText(total.toLocaleString(), cx, cy - 2);
  ctx.fillStyle = '#8892b0'; ctx.font = '11px Space Grotesk';
  ctx.fillText('Total', cx, cy + 16);

  // Legend
  labels.forEach((l, i) => {
    const y = 250 + Math.floor(i / 2) * 20;
    const x = (i % 2) * 150 + 20;
    ctx.fillStyle = colors[i];
    ctx.fillRect(x, y - 8, 10, 10);
    ctx.fillStyle = '#8892b0'; ctx.font = '11px Space Grotesk'; ctx.textAlign = 'left';
    ctx.fillText(`${l} (${data[i]})`, x + 16, y);
  });
}

function drawBarChart() {
  const c = document.getElementById('bar-chart');
  if (!c) return;
  const ctx = c.getContext('2d');
  c.width = 600; c.height = 200;

  const data = [12, 8, 15, 6, 10, 4, 7, 14, 9, 5, 11, 8];
  const maxV = 16;
  const barW = 32;

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  for (let y = 20; y < 170; y += 30) { ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(580, y); ctx.stroke(); }

  data.forEach((v, i) => {
    const x = 50 + i * 44;
    const h = (v / maxV) * 140;
    const y = 170 - h;

    const grad = ctx.createLinearGradient(x, y, x, 170);
    grad.addColorStop(0, '#7c6af7');
    grad.addColorStop(1, 'rgba(124,106,247,0.3)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]);
    ctx.fill();
  });

  // Labels
  ctx.fillStyle = '#8892b0'; ctx.font = '10px Space Grotesk'; ctx.textAlign = 'center';
  const hours = ['8AM', '9AM', '10', '11', '12P', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];
  hours.forEach((h, i) => { ctx.fillText(h, 66 + i * 44, 188); });
}

// --- Live Simulations ---
let simInterval;
function startSimulations() {
  drawHeroCanvas();
  drawCamCanvas('cam-canvas-1', 270);
  drawCamCanvas('cam-canvas-2', 200);
  if (typeof google !== 'undefined') initGoogleMap();
  else drawSpatialMap();

  // Refresh countdown
  let count = 5;
  if (simInterval) clearInterval(simInterval);
  simInterval = setInterval(() => {
    count--;
    const el = document.getElementById('refresh-count');
    if (el) el.textContent = count;
    if (count <= 0) {
      count = 5;
      simulateDataUpdate();
    }
  }, 1000);

  // System load animation
  animateSystemLoad();
}

async function simulateDataUpdate() {
  try {
    // Try to fetch from the local backend (using MSG as default venue for this demo)
    const response = await fetch('http://localhost:8000/telemetry/msg');
    if (!response.ok) throw new Error('Backend not reachable');
    
    const data = await response.json();
    
    // Update dashboard stats
    const crowdEl = document.getElementById('stat-crowd');
    if (crowdEl) crowdEl.textContent = data.total_crowd.toLocaleString();

    const waitEl = document.getElementById('stat-wait');
    if (waitEl) waitEl.innerHTML = data.avg_wait_time.toString().padStart(2, '0') + '<span class="stat-unit">m</span>';

    const alertsEl = document.getElementById('stat-alerts');
    if (alertsEl) alertsEl.textContent = data.active_alerts.toString().padStart(2, '0');

    // Update gates
    // If backend returns gates, we use them
    if (data.gates) {
      // Map backend gates to our global gates array for UI consistency
      data.gates.forEach((bg, i) => {
        if (gates[i]) {
          gates[i].pct = bg.pct;
          gates[i].status = bg.status;
          gates[i].level = bg.pct > 85 ? 'crit' : bg.pct > 40 ? 'mod' : 'low';
        }
      });
    }

  } catch (err) {
    // Fallback to local simulation if backend is down
    const crowdEl = document.getElementById('stat-crowd');
    if (crowdEl) {
      const base = 12482;
      const delta = Math.floor(Math.random() * 400 - 200);
      crowdEl.textContent = (base + delta).toLocaleString();
    }

    const waitEl = document.getElementById('stat-wait');
    if (waitEl) {
      const w = 6 + Math.floor(Math.random() * 6);
      waitEl.innerHTML = w.toString().padStart(2, '0') + '<span class="stat-unit">m</span>';
    }

    gates.forEach(g => {
      const delta = Math.floor(Math.random() * 8 - 4);
      g.pct = Math.max(2, Math.min(98, g.pct + delta));
      if (g.pct >= 85) { g.status = 'CRITICAL'; g.level = 'crit'; }
      else if (g.pct >= 35) { g.status = 'MODERATE'; g.level = 'mod'; }
      else { g.status = 'LOW FLOW'; g.level = 'low'; }
    });
  }

  const activeTab = document.querySelector('.tab-content.active');
  if (activeTab && activeTab.id === 'tab-live') renderGates();
}

function animateSystemLoad() {
  setInterval(() => {
    const val = 35 + Math.floor(Math.random() * 30);
    const fill = document.getElementById('load-fill');
    const pct = document.getElementById('load-pct');
    if (fill) fill.style.width = val + '%';
    if (pct) pct.textContent = val + '%';
  }, 3000);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  drawHeroCanvas();
});
