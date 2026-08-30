const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;

// Shared Navigation Header
function renderHeader(activePage) {
  return `
  <!-- Persistent Frosted Glass Navigation Bar -->
  <header class="navbar-glass">
    <div class="navbar-container">
      <a href="index.html" class="nav-brand">
        <div class="nav-logo-icon">🌊</div>
        <div class="nav-brand-text">
          <span class="nav-brand-title">S.A.L.S.A</span>
          <span class="nav-brand-subtitle">SIH 2026 • Team Nexora</span>
        </div>
      </a>

      <!-- Desktop Nav Links with Dropdowns -->
      <ul class="nav-links">
        <li class="nav-item">
          <a href="index.html" class="nav-link ${activePage === 'index.html' ? 'active' : ''}">Home</a>
        </li>
        
        <!-- Overview Dropdown -->
        <li class="nav-item">
          <a href="about.html" class="nav-link ${['about.html', 'problem.html', 'solution.html'].includes(activePage) ? 'active' : ''}">
            Overview ▾
          </a>
          <div class="nav-dropdown">
            <a href="about.html" class="${activePage === 'about.html' ? 'active' : ''}">📖 About the Project</a>
            <a href="problem.html" class="${activePage === 'problem.html' ? 'active' : ''}">🚨 Problem Statement</a>
            <a href="solution.html" class="${activePage === 'solution.html' ? 'active' : ''}">💡 Our Solution</a>
          </div>
        </li>

        <!-- Engineering Dropdown -->
        <li class="nav-item">
          <a href="how-it-works.html" class="nav-link ${['how-it-works.html', 'features.html', 'technology.html'].includes(activePage) ? 'active' : ''}">
            Engineering ▾
          </a>
          <div class="nav-dropdown">
            <a href="how-it-works.html" class="${activePage === 'how-it-works.html' ? 'active' : ''}">⚙️ How It Works & Lab</a>
            <a href="features.html" class="${activePage === 'features.html' ? 'active' : ''}">✨ Core Features</a>
            <a href="technology.html" class="${activePage === 'technology.html' ? 'active' : ''}">🏗️ System Architecture</a>
          </div>
        </li>

        <!-- Commercial Dropdown -->
        <li class="nav-item">
          <a href="market.html" class="nav-link ${['market.html', 'competitors.html', 'budget.html'].includes(activePage) ? 'active' : ''}">
            Commercial ▾
          </a>
          <div class="nav-dropdown">
            <a href="market.html" class="${activePage === 'market.html' ? 'active' : ''}">📊 Market Analysis</a>
            <a href="competitors.html" class="${activePage === 'competitors.html' ? 'active' : ''}">⚔️ Competitor Analysis</a>
            <a href="budget.html" class="${activePage === 'budget.html' ? 'active' : ''}">💰 Budget & BOM</a>
          </div>
        </li>

        <!-- Impact & Scope Dropdown -->
        <li class="nav-item">
          <a href="roadmap.html" class="nav-link ${['roadmap.html', 'impact.html', 'future-scope.html'].includes(activePage) ? 'active' : ''}">
            Impact & Future ▾
          </a>
          <div class="nav-dropdown">
            <a href="roadmap.html" class="${activePage === 'roadmap.html' ? 'active' : ''}">🗺️ Roadmap & Feasibility</a>
            <a href="impact.html" class="${activePage === 'impact.html' ? 'active' : ''}">🌍 Impact & Benefits</a>
            <a href="future-scope.html" class="${activePage === 'future-scope.html' ? 'active' : ''}">🔮 Future Scope</a>
          </div>
        </li>

        <!-- Team Dropdown -->
        <li class="nav-item">
          <a href="team.html" class="nav-link ${['team.html', 'about-team.html'].includes(activePage) ? 'active' : ''}">
            Team ▾
          </a>
          <div class="nav-dropdown">
            <a href="team.html" class="${activePage === 'team.html' ? 'active' : ''}">👥 Team Members</a>
            <a href="about-team.html" class="${activePage === 'about-team.html' ? 'active' : ''}">🤝 About Nexora Unit</a>
          </div>
        </li>

        <li class="nav-item">
          <a href="resources.html" class="nav-link ${activePage === 'resources.html' ? 'active' : ''}">Resources</a>
        </li>

        <li class="nav-item">
          <a href="contact.html" class="nav-link ${activePage === 'contact.html' ? 'active' : ''}">Contact</a>
        </li>
      </ul>

      <!-- Action Button -->
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <a href="how-it-works.html" class="btn-primary" style="padding: 0.45rem 1rem; font-size: 0.85rem;">
          ⚡ Live Simulator
        </a>
        <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Toggle menu">☰</button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div id="mobile-drawer" class="mobile-drawer">
    <a href="index.html" class="mobile-nav-link ${activePage === 'index.html' ? 'active' : ''}">🏠 Home</a>
    
    <div class="mobile-drawer-group-title">Overview</div>
    <a href="about.html" class="mobile-nav-link ${activePage === 'about.html' ? 'active' : ''}">📖 About the Project</a>
    <a href="problem.html" class="mobile-nav-link ${activePage === 'problem.html' ? 'active' : ''}">🚨 Problem Statement</a>
    <a href="solution.html" class="mobile-nav-link ${activePage === 'solution.html' ? 'active' : ''}">💡 Our Solution</a>

    <div class="mobile-drawer-group-title">Engineering</div>
    <a href="how-it-works.html" class="mobile-nav-link ${activePage === 'how-it-works.html' ? 'active' : ''}">⚙️ How It Works & Lab</a>
    <a href="features.html" class="mobile-nav-link ${activePage === 'features.html' ? 'active' : ''}">✨ Core Features</a>
    <a href="technology.html" class="mobile-nav-link ${activePage === 'technology.html' ? 'active' : ''}">🏗️ System Architecture</a>

    <div class="mobile-drawer-group-title">Commercial</div>
    <a href="market.html" class="mobile-nav-link ${activePage === 'market.html' ? 'active' : ''}">📊 Market Analysis</a>
    <a href="competitors.html" class="mobile-nav-link ${activePage === 'competitors.html' ? 'active' : ''}">⚔️ Competitor Analysis</a>
    <a href="budget.html" class="mobile-nav-link ${activePage === 'budget.html' ? 'active' : ''}">💰 Budget & BOM</a>

    <div class="mobile-drawer-group-title">Impact & Scope</div>
    <a href="roadmap.html" class="mobile-nav-link ${activePage === 'roadmap.html' ? 'active' : ''}">🗺️ Roadmap & Feasibility</a>
    <a href="impact.html" class="mobile-nav-link ${activePage === 'impact.html' ? 'active' : ''}">🌍 Impact & Benefits</a>
    <a href="future-scope.html" class="mobile-nav-link ${activePage === 'future-scope.html' ? 'active' : ''}">🔮 Future Scope</a>

    <div class="mobile-drawer-group-title">Team & Info</div>
    <a href="team.html" class="mobile-nav-link ${activePage === 'team.html' ? 'active' : ''}">👥 Team Members</a>
    <a href="about-team.html" class="mobile-nav-link ${activePage === 'about-team.html' ? 'active' : ''}">🤝 About Nexora Unit</a>
    <a href="resources.html" class="mobile-nav-link ${activePage === 'resources.html' ? 'active' : ''}">📚 Resources & References</a>
    <a href="contact.html" class="mobile-nav-link ${activePage === 'contact.html' ? 'active' : ''}">📬 Contact & Info</a>
  </div>
  `;
}

// Shared Footer
function renderFooter() {
  return `
  <!-- Persistent Glassmorphism Footer -->
  <footer class="footer-glass">
    <div class="footer-container">
      <div class="footer-col">
        <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1rem;">
          <span style="font-size: 1.5rem;">🌊</span>
          <span style="font-size: 1.25rem; font-weight: 800; color: #ffffff;">S.A.L.S.A</span>
        </div>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.6;">
          Secure Acoustic Ledger For Subsea Autonomy — Development of a Low Power, Real-Time Adaptive Software-Defined Sonar Transmitter Payload for Autonomous Underwater Vehicles (AUVs).
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="glass-pill">SIH 2026</span>
          <span class="glass-pill">PS ID: 26058</span>
          <span class="glass-pill">Team Nexora</span>
        </div>
      </div>

      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Project</a></li>
          <li><a href="problem.html">Problem Statement</a></li>
          <li><a href="solution.html">Our Solution</a></li>
          <li><a href="how-it-works.html">How It Works</a></li>
          <li><a href="features.html">Core Features</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Technical & Commercial</h4>
        <ul>
          <li><a href="technology.html">Architecture & Stack</a></li>
          <li><a href="market.html">Market Analysis</a></li>
          <li><a href="competitors.html">Competitor Matrix</a></li>
          <li><a href="budget.html">Budget & BOM</a></li>
          <li><a href="roadmap.html">Roadmap & Feasibility</a></li>
          <li><a href="impact.html">Impact & Benefits</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Team & Resources</h4>
        <ul>
          <li><a href="team.html">Team Members</a></li>
          <li><a href="about-team.html">About Team Nexora</a></li>
          <li><a href="resources.html">Documentation & Papers</a></li>
          <li><a href="future-scope.html">Future Scope</a></li>
          <li><a href="contact.html">Contact Information</a></li>
        </ul>
      </div>
    </div>
    
    <div style="max-width: 1280px; margin: 2rem auto 0 auto; padding-top: 1.5rem; border-top: 1px solid rgba(0,240,255,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.8125rem; color: var(--text-muted);">
      <div>© Smart India Hackathon 2026 • Team Nexora • S.A.L.S.A Project</div>
      <div>Theme: Robotics & Drones | Category: Hardware</div>
    </div>
  </footer>

  <!-- Persistent Bottom Telemetry HUD -->
  <div class="telemetry-hud">
    <div class="hud-item">
      <span class="hud-dot"></span>
      <span>SYSTEM: <strong style="color: #ffffff;">ONLINE</strong></span>
    </div>
    <div class="hud-item">
      <span>SIMULATED DEPTH: <strong id="hud-depth" style="color: var(--cyan-primary);">157 m</strong></span>
    </div>
    <div class="hud-item">
      <span>ACTIVE PING FREQ: <strong id="hud-freq" style="color: var(--cyan-primary);">500.0 kHz</strong></span>
    </div>
    <div class="hud-item">
      <span>POWER DRAW: <strong id="hud-power" style="color: #10b981;">80 mA (Adaptive)</strong></span>
    </div>
    <div class="hud-item">
      <button id="hud-ping-trigger" class="glass-pill" style="cursor: pointer; padding: 0.2rem 0.6rem; font-size: 0.7rem; border-color: var(--cyan-primary);">
        🔊 PING SONAR
      </button>
    </div>
  </div>
  `;
}

// Base HTML Wrapper
function wrapHTML({ title, activePage, content, prevPage, nextPage, extraScripts = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | S.A.L.S.A — SIH 2026</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Custom Oceanic Glassmorphism Stylesheet -->
  <link rel="stylesheet" href="assets/css/ocean-theme.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Ambient Oceanic Gradient Layer -->
  <div class="ocean-ambient-layer"></div>
  <!-- Dynamic HTML5 Background Canvas (Rays, Bubbles, Marine Particles) -->
  <canvas id="ocean-canvas-bg"></canvas>

  ${renderHeader(activePage)}

  <main class="page-container">
    ${content}

    <!-- Bottom Page Navigation Bar -->
    ${(prevPage || nextPage) ? `
      <div class="page-nav-bar">
        <div>
          ${prevPage ? `
            <a href="${prevPage.url}" class="btn-secondary">
              ← ${prevPage.label}
            </a>
          ` : ''}
        </div>
        <div>
          ${nextPage ? `
            <a href="${nextPage.url}" class="btn-primary">
              ${nextPage.label} →
            </a>
          ` : ''}
        </div>
      </div>
    ` : ''}
  </main>

  ${renderFooter()}

  <!-- Global JavaScript Engines -->
  <script src="assets/js/ocean-canvas.js"></script>
  <script src="assets/js/salsa-simulator.js"></script>
  <script src="assets/js/charts.js"></script>
  <script src="assets/js/navigation.js"></script>
  ${extraScripts}
</body>
</html>`;
}

console.log('Script framework loaded.');
