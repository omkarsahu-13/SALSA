/**
 * S.A.L.S.A — High-Visual Interactive Real-Time Sonar Simulator
 */

window.SalsaSimulator = {
  state: {
    turbidity: 15,
    depth: 45,
    temp: 25,
    manualWaveform: null,
    txActive: true,
    audioEnabled: false
  },

  compute() {
    const { turbidity, depth } = this.state;
    let env, freq, basePower, baseWave, baseDuration, cpuFreq, color;

    if (turbidity < 20) {
      env = 'Clear Shallow Reef';
      freq = 500.0;
      basePower = 80;
      baseWave = 'LFM Up Chirp';
      baseDuration = 5;
      cpuFreq = 240;
      color = '#00f0ff';
    } else if (turbidity < 40) {
      env = 'Moderate Coastal';
      freq = 400.0;
      basePower = 70;
      baseWave = 'LFM Up Chirp';
      baseDuration = 8;
      cpuFreq = 240;
      color = '#38bdf8';
    } else if (turbidity < 60) {
      env = 'Muddy Water';
      freq = 300.0;
      basePower = 55;
      baseWave = 'LFM Up Chirp';
      baseDuration = 12;
      cpuFreq = 160;
      color = '#10b981';
    } else if (turbidity < 80) {
      env = 'Heavy Sediment Mud';
      freq = 200.0;
      basePower = 40;
      baseWave = 'Phase Coded (Barker-7)';
      baseDuration = 15;
      cpuFreq = 80;
      color = '#f59e0b';
    } else {
      env = 'Extreme Muddy Estuary';
      freq = 100.0;
      basePower = 35;
      baseWave = 'Phase Coded (Barker-7)';
      baseDuration = 20;
      cpuFreq = 80;
      color = '#ef4444';
    }

    let amplitudeOffset = 0;
    let duration = baseDuration;
    let depthStatus = 'Nominal Water Depth';

    if (depth > 70) {
      amplitudeOffset = 500;
      duration = Math.round(baseDuration * 1.5 * 10) / 10;
      depthStatus = 'Deep Trench (Boosted TX)';
    } else if (depth < 30) {
      amplitudeOffset = -300;
      duration = Math.round(baseDuration * 0.8 * 10) / 10;
      depthStatus = 'Shallow Surface (Eco Mode)';
    }

    const activeWaveform = this.state.manualWaveform || baseWave;
    const powerPercent = Math.round((basePower / 80) * 100);

    return {
      environment: env,
      frequencyKHz: freq,
      currentDrawMA: basePower,
      powerPercent: powerPercent,
      waveform: activeWaveform,
      durationMs: duration,
      cpuFreqMHz: cpuFreq,
      depthStatus: depthStatus,
      color: color,
      amplitudeOffset: amplitudeOffset,
      adcTurbidity: Math.round((turbidity / 100) * 4095),
      adcDepth: Math.round((depth / 100) * 4095)
    };
  },

  updateUI() {
    const data = this.compute();

    const els = {
      turbVal: document.getElementById('sim-turb-val'),
      depthVal: document.getElementById('sim-depth-val'),
      freqVal: document.getElementById('sim-freq-val'),
      powerVal: document.getElementById('sim-power-val'),
      cpuVal: document.getElementById('sim-cpu-val'),
      waveVal: document.getElementById('sim-wave-val'),
      durVal: document.getElementById('sim-dur-val'),
      envBadge: document.getElementById('sim-env-badge'),
      depthBadge: document.getElementById('sim-depth-badge'),
      oledEnv: document.getElementById('oled-env'),
      oledFreq: document.getElementById('oled-freq'),
      oledWave: document.getElementById('oled-wave'),
      oledPwr: document.getElementById('oled-pwr'),
      oledCur: document.getElementById('oled-cur'),
      oledTx: document.getElementById('oled-tx'),
      hudFreq: document.getElementById('hud-freq'),
      hudDepth: document.getElementById('hud-depth'),
      hudPower: document.getElementById('hud-power'),
      waterVisual: document.getElementById('sim-water-visual')
    };

    if (els.turbVal) els.turbVal.textContent = `${this.state.turbidity}%`;
    if (els.depthVal) els.depthVal.textContent = `${this.state.depth}%`;
    if (els.freqVal) els.freqVal.textContent = `${data.frequencyKHz} kHz`;
    if (els.powerVal) els.powerVal.textContent = `${data.currentDrawMA} mA`;
    if (els.cpuVal) els.cpuVal.textContent = `${data.cpuFreqMHz} MHz`;
    if (els.waveVal) els.waveVal.textContent = data.waveform;
    if (els.durVal) els.durVal.textContent = `${data.durationMs} ms`;

    if (els.envBadge) {
      els.envBadge.textContent = data.environment;
      els.envBadge.style.color = data.color;
      els.envBadge.style.borderColor = data.color;
    }
    if (els.depthBadge) els.depthBadge.textContent = data.depthStatus;

    if (els.oledEnv) els.oledEnv.textContent = `ENV: ${data.environment.substring(0, 16)}`;
    if (els.oledFreq) els.oledFreq.textContent = `FREQ: ${data.frequencyKHz.toFixed(1)} kHz`;
    if (els.oledWave) els.oledWave.textContent = `WAVE: ${data.waveform.substring(0, 12)}`;
    if (els.oledPwr) els.oledPwr.textContent = `PWR: ${data.powerPercent}%`;
    if (els.oledCur) els.oledCur.textContent = `CUR: ${data.currentDrawMA} mA`;
    if (els.oledTx) els.oledTx.textContent = `${this.state.txActive ? 'TX ACTIVE' : 'TX STANDBY'} | ${data.cpuFreqMHz}MHz`;

    if (els.hudFreq) els.hudFreq.textContent = `${data.frequencyKHz} kHz`;
    if (els.hudDepth) els.hudDepth.textContent = `${Math.round(this.state.depth * 3.5)} m`;
    if (els.hudPower) els.hudPower.textContent = `${data.currentDrawMA} mA`;

    // Dynamic water clarity visualization card background
    if (els.waterVisual) {
      const brownOpacity = this.state.turbidity / 100;
      els.waterVisual.style.background = `linear-gradient(180deg, rgba(${Math.round(150 * brownOpacity)}, ${Math.round(100 * (1 - brownOpacity * 0.7))}, ${Math.round(180 * (1 - brownOpacity))}, 0.6) 0%, rgba(2, 10, 20, 0.9) 100%)`;
    }

    this.drawOscilloscope(data);
  },

  drawOscilloscope(data) {
    const canvas = document.getElementById('oscilloscope-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.parentElement.clientWidth || 400;
    const h = canvas.height = 150;

    ctx.fillStyle = '#010810';
    ctx.fillRect(0, 0, w, h);

    // Neon Grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Center Reference Line
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    if (!this.state.txActive) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      return;
    }

    // Draw Active Glowing Waveform
    ctx.beginPath();
    ctx.strokeStyle = data.color || '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = data.color || '#00f0ff';
    ctx.shadowBlur = 10;

    const points = 350;
    const midY = h / 2;
    const maxAmp = (h / 2 - 18) * (data.powerPercent / 100);

    for (let i = 0; i < points; i++) {
      const t = i / points;
      const x = t * w;
      const hamming = 0.54 - 0.46 * Math.cos(2 * Math.PI * t);

      let rawSignal = 0;
      const waveType = data.waveform;

      if (waveType.includes('Up')) {
        const f0 = 2;
        const f1 = 18;
        const instFreq = f0 + (f1 - f0) * t;
        rawSignal = Math.sin(2 * Math.PI * instFreq * t);
      } else if (waveType.includes('Down')) {
        const f0 = 18;
        const f1 = 2;
        const instFreq = f0 + (f1 - f0) * t;
        rawSignal = Math.sin(2 * Math.PI * instFreq * t);
      } else if (waveType.includes('Phase') || waveType.includes('Barker')) {
        const barker = [1, 1, 1, -1, -1, 1, -1];
        const chipIndex = Math.min(6, Math.floor(t * 7));
        rawSignal = barker[chipIndex] * Math.sin(2 * Math.PI * 10 * t);
      } else if (waveType.includes('Geo') || waveType.includes('Geometric')) {
        const instFreq = 2 * Math.pow(8, t);
        rawSignal = Math.sin(2 * Math.PI * instFreq * t);
      } else {
        rawSignal = Math.sin(2 * Math.PI * 8 * t);
      }

      const y = midY - rawSignal * maxAmp * hamming;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.font = '10px monospace';
    ctx.fillStyle = '#67e8f9';
    ctx.fillText('3.3V (12-bit MCP4725 DAC)', 10, 16);
    ctx.fillText('0.0V Ground', 10, h - 8);
    ctx.fillText(`Duration: ${data.durationMs}ms | CPU: ${data.cpuFreqMHz}MHz`, w - 210, 16);
  },

  playPingSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const actx = new AudioContext();
      const osc = actx.createOscillator();
      const gain = actx.createGain();

      const data = this.compute();
      const audibleFreq = 400 + (data.frequencyKHz / 500) * 1200;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(audibleFreq, actx.currentTime);
      if (data.waveform.includes('Up')) {
        osc.frequency.exponentialRampToValueAtTime(audibleFreq * 2, actx.currentTime + 0.18);
      } else if (data.waveform.includes('Down')) {
        osc.frequency.exponentialRampToValueAtTime(audibleFreq * 0.5, actx.currentTime + 0.18);
      }

      gain.gain.setValueAtTime(0.35, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(actx.destination);

      osc.start();
      osc.stop(actx.currentTime + 0.3);
    } catch (e) {
      console.warn('Audio requires user trigger');
    }
  },

  init() {
    const turbSlider = document.getElementById('sim-turbidity-slider');
    const depthSlider = document.getElementById('sim-depth-slider');
    const txToggle = document.getElementById('sim-tx-toggle');
    const pingBtn = document.getElementById('sim-ping-btn');
    const waveSelect = document.getElementById('sim-waveform-select');

    if (turbSlider) {
      turbSlider.addEventListener('input', (e) => {
        this.state.turbidity = parseInt(e.target.value, 10);
        this.updateUI();
      });
    }

    if (depthSlider) {
      depthSlider.addEventListener('input', (e) => {
        this.state.depth = parseInt(e.target.value, 10);
        this.updateUI();
      });
    }

    if (txToggle) {
      txToggle.addEventListener('click', () => {
        this.state.txActive = !this.state.txActive;
        txToggle.textContent = this.state.txActive ? 'TX: ACTIVE' : 'TX: STANDBY';
        txToggle.classList.toggle('emerald', this.state.txActive);
        this.updateUI();
      });
    }

    if (pingBtn) {
      pingBtn.addEventListener('click', () => {
        this.playPingSound();
      });
    }

    if (waveSelect) {
      waveSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        this.state.manualWaveform = val === 'AUTO' ? null : val;
        this.updateUI();
      });
    }

    this.updateUI();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('sim-turbidity-slider') || document.getElementById('oscilloscope-canvas')) {
    window.SalsaSimulator.init();
  }
});
