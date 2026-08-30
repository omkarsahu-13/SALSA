/**
 * S.A.L.S.A — High Performance Animated Charts Engine
 * Pure SVG & Canvas data visualizations based 100% on provided reports.
 */

window.SalsaCharts = {
  // Render SOM 5-Year Revenue Trajectory Chart
  renderSomRevenueChart(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const data = [
      { year: 'Year 1', units: 50, rev: 0.075, label: '₹7.5 Lakh', sector: 'IITs, NIO Research' },
      { year: 'Year 2', units: 200, rev: 0.50, label: '₹50 Lakh', sector: 'Defence, DRDO Pilot' },
      { year: 'Year 3', units: 500, rev: 1.75, label: '₹1.75 Cr', sector: 'Ports, Oil & Gas' },
      { year: 'Year 4', units: 1000, rev: 5.00, label: '₹5.00 Cr', sector: 'Navy, Export' },
      { year: 'Year 5', units: 2500, rev: 12.50, label: '₹12.50 Cr', sector: 'Mass Deployment' }
    ];

    const maxRev = 14;
    const height = 240;
    const width = 600;
    const padding = { top: 30, right: 30, bottom: 45, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    let bars = '';
    const barWidth = 48;
    const step = chartW / data.length;

    data.forEach((d, i) => {
      const barH = (d.rev / maxRev) * chartH;
      const x = padding.left + i * step + (step - barWidth) / 2;
      const y = padding.top + (chartH - barH);

      bars += `
        <g class="chart-group">
          <!-- Gradient Bar -->
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="6" fill="url(#cyanGrad)" 
                stroke="rgba(0, 240, 255, 0.6)" stroke-width="1.5">
            <title>${d.year}: ${d.label} (${d.units} units) - ${d.sector}</title>
          </rect>
          <!-- Value Label -->
          <text x="${x + barWidth / 2}" y="${y - 8}" fill="#00f0ff" font-size="11" font-weight="700" text-anchor="middle" font-family="monospace">${d.label}</text>
          <!-- X Axis Label -->
          <text x="${x + barWidth / 2}" y="${height - 24}" fill="#cbd5e1" font-size="12" font-weight="600" text-anchor="middle">${d.year}</text>
          <!-- Sub Label -->
          <text x="${x + barWidth / 2}" y="${height - 10}" fill="#94a3b8" font-size="9.5" text-anchor="middle">${d.units} units</text>
        </g>
      `;
    });

    const svg = `
      <svg viewBox="0 0 ${width} ${height}" class="w-full h-auto" style="max-height: 280px; overflow: visible;">
        <defs>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#0369a1" stop-opacity="0.5" />
          </linearGradient>
        </defs>
        <!-- Horizontal Grid Lines -->
        <line x1="${padding.left}" y1="${padding.top}" x2="${width - padding.right}" y2="${padding.top}" stroke="rgba(0,240,255,0.1)" stroke-dasharray="3,3" />
        <line x1="${padding.left}" y1="${padding.top + chartH / 2}" x2="${width - padding.right}" y2="${padding.top + chartH / 2}" stroke="rgba(0,240,255,0.1)" stroke-dasharray="3,3" />
        <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${width - padding.right}" y2="${padding.top + chartH}" stroke="rgba(0,240,255,0.3)" stroke-width="1.5" />
        
        <!-- Y Axis Labels -->
        <text x="${padding.left - 10}" y="${padding.top + 4}" fill="#94a3b8" font-size="10" text-anchor="end" font-family="monospace">₹14 Cr</text>
        <text x="${padding.left - 10}" y="${padding.top + chartH / 2 + 4}" fill="#94a3b8" font-size="10" text-anchor="end" font-family="monospace">₹7 Cr</text>
        <text x="${padding.left - 10}" y="${padding.top + chartH + 4}" fill="#94a3b8" font-size="10" text-anchor="end" font-family="monospace">₹0</text>
        
        ${bars}
      </svg>
    `;

    el.innerHTML = svg;
  },

  // Render SAM Segmentation Donut Chart
  renderSamSegmentation(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const segments = [
      { name: 'Defence AUV Programs', val: 60, pct: '31.6%', color: '#00f0ff' },
      { name: 'AUV/ROV Sonar Payloads', val: 45, pct: '23.7%', color: '#38bdf8' },
      { name: 'Underwater Inspection Drones', val: 35, pct: '18.4%', color: '#0284c7' },
      { name: 'Marine Research Systems', val: 25, pct: '13.2%', color: '#10b981' },
      { name: 'Port & Harbour Security', val: 15, pct: '7.9%', color: '#f59e0b' },
      { name: 'Academic / Institutional', val: 10, pct: '5.3%', color: '#8b5cf6' }
    ];

    let listHtml = '<div style="display: flex; flex-direction: column; gap: 0.65rem;">';
    segments.forEach(s => {
      listHtml += `
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.25rem;">
            <span style="color: #cbd5e1; display: flex; align-items: center; gap: 0.4rem;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: ${s.color}; display: inline-block;"></span>
              ${s.name}
            </span>
            <span style="font-family: monospace; font-weight: 700; color: ${s.color};">$${s.val}M (${s.pct})</span>
          </div>
          <div style="width: 100%; height: 6px; background: rgba(0,240,255,0.1); border-radius: 3px; overflow: hidden;">
            <div style="width: ${s.pct}; height: 100%; background: ${s.color}; border-radius: 3px;"></div>
          </div>
        </div>
      `;
    });
    listHtml += '</div>';

    el.innerHTML = listHtml;
  },

  // Render Budget Breakdown Donut/Bar Chart
  renderBudgetBreakdown(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const categories = [
      { name: 'Core Electronics', amount: 1175, pct: 33.1, color: '#00f0ff' },
      { name: 'Enclosure & Mechanical', amount: 650, pct: 18.3, color: '#0ea5e9' },
      { name: 'Prototyping & Assembly', amount: 635, pct: 17.9, color: '#38bdf8' },
      { name: 'Power & Connectivity', amount: 630, pct: 17.8, color: '#10b981' },
      { name: 'Testing & Consumables', amount: 580, pct: 16.4, color: '#f59e0b' },
      { name: 'Signal Conditioning', amount: 138, pct: 3.9, color: '#ec4899' }
    ];

    let html = '<div style="display: flex; flex-direction: column; gap: 0.8rem;">';
    categories.forEach(c => {
      html += `
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.25rem;">
            <span style="color: #f8fafc; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
              <span style="width: 10px; height: 10px; border-radius: 2px; background: ${c.color};"></span>
              ${c.name}
            </span>
            <span style="font-family: monospace; color: var(--cyan-light); font-weight: 700;">₹${c.amount} (${c.pct}%)</span>
          </div>
          <div style="width: 100%; height: 8px; background: rgba(0,240,255,0.1); border-radius: 4px; overflow: hidden;">
            <div style="width: ${c.pct}%; height: 100%; background: ${c.color}; border-radius: 4px;"></div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    el.innerHTML = html;
  },

  // Render Power Modes Comparison
  renderPowerModes(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const modes = [
      { mode: 'Ultra Low', freq: '100 kHz', cpu: '80 MHz', cur: 35, max: 80, env: 'Extreme Mud' },
      { mode: 'Low', freq: '200 kHz', cpu: '80 MHz', cur: 40, max: 80, env: 'Heavy Mud' },
      { mode: 'Medium', freq: '300 kHz', cpu: '160 MHz', cur: 55, max: 80, env: 'Muddy Water' },
      { mode: 'High', freq: '500 kHz', cpu: '240 MHz', cur: 80, max: 80, env: 'Clear Water' }
    ];

    let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">';
    modes.forEach(m => {
      const pct = Math.round((m.cur / m.max) * 100);
      html += `
        <div class="glass-card" style="padding: 1rem; border-color: rgba(0,240,255,0.25);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-weight: 700; color: #ffffff; font-size: 0.95rem;">${m.mode}</span>
            <span class="glass-pill" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${m.cpu}</span>
          </div>
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--cyan-primary); font-family: monospace; margin: 0.25rem 0;">
            ${m.cur} mA
          </div>
          <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.5rem;">
            ${m.freq} • ${m.env}
          </div>
          <div style="width: 100%; height: 6px; background: rgba(0,240,255,0.1); border-radius: 3px; overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, #10b981, #00f0ff);"></div>
          </div>
        </div>
      `;
    });
    html += '</div>';

    el.innerHTML = html;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('som-revenue-chart')) {
    window.SalsaCharts.renderSomRevenueChart('som-revenue-chart');
  }
  if (document.getElementById('sam-segmentation-chart')) {
    window.SalsaCharts.renderSamSegmentation('sam-segmentation-chart');
  }
  if (document.getElementById('budget-breakdown-chart')) {
    window.SalsaCharts.renderBudgetBreakdown('budget-breakdown-chart');
  }
  if (document.getElementById('power-modes-chart')) {
    window.SalsaCharts.renderPowerModes('power-modes-chart');
  }
});
