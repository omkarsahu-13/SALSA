# 🌊 S.A.L.S.A — Secure Acoustic Ledger For Subsea Autonomy
### *Development of a Low-Power, Real-Time Adaptive Software-Defined Sonar Transmitter Payload for Autonomous Underwater Vehicles (AUVs)*

**Team Nexora** • Smart India Hackathon (SIH) 2026

---

## 📌 Executive Summary

**S.A.L.S.A (Secure Acoustic Ledger For Subsea Autonomy)** is an intelligent, low-power Software-Defined Sonar (SDS) transmitter payload engineered specifically for compact Autonomous Underwater Vehicles (AUVs). 

Traditional subsea acoustic systems are rigid, bulky, expensive, and consume significant power. S.A.L.S.A solves these bottlenecks through dynamic real-time environmental adaptation, multi-waveform digital signal processing (DSP), dynamic clock frequency scaling, and multi-stage analog signal conditioning.

---

## ✨ Key Architectural Features

- **⚡ Real-Time Adaptive Frequency Hopping**: Dynamically adjusts sonar frequencies across 5 bands (100 kHz – 500 kHz) in `< 150 ms` based on environmental sensing (turbidity, depth, temperature).
- **🌊 5 Waveform Transmission Modes**:
  1. *CW (Continuous Wave) Pulse* — Narrowband range profiling and Doppler velocity estimation.
  2. *LFM Up Chirp (Linear Frequency Modulation)* — Pulse compression for high-resolution reef and bathymetric mapping.
  3. *LFM Down Chirp* — Eliminates range-Doppler coupling errors in dynamic maneuvering.
  4. *Phase-Coded (Barker-7)* — Extreme noise immunity and high penetration through turbid silt.
  5. *Geometric Exponential Sweep* — Wideband oceanographic surveys maintaining constant fractional bandwidth ($Q$).
- **🎯 12-Bit Digital-to-Analog Synthesis**: High-precision external MCP4725 DAC with 4096 discrete voltage levels and 6 µs settling time.
- **🔋 Intelligent Dynamic Power Scaling**: Scales CPU clock from 80 MHz to 240 MHz and limits current draw between 35 mA and 80 mA, reducing overall energy consumption by **56%** and extending AUV mission life by up to **40%**.
- **🎛️ 3-Stage Analog Conditioning**: 10 µF DC blocking capacitor, 159 kHz RC low-pass filter, and LM358 op-amp active buffer achieving `< 1% THD` and `> 40 dB SNR`.
- **📺 Live Telemetry HUD**: SSD1306 128×64 I2C display and real-time browser HUD monitoring depth, ping frequency, turbidity, temperature, and power consumption.
- **🔌 Modular AUV Plug-and-Play Integration**: Standard BNC transducer output, custom 3D-printed enclosure, and Pixhawk / ArduPilot flight controller compatibility.

---

## 🏗️ 5-Layer System Architecture

```
┌────────────────────────────────────────────────────────┐
│  1. SENSING LAYER (Turbidity, Depth, Temperature ADC)  │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│  2. DECISION LAYER (Micro-Controller Adaptive Rules)   │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│  3. SYNTHESIS LAYER (DMA Hardware Timers, Hamming DSP) │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│  4. CONDITIONING LAYER (DC Block, RC Filter, LM358)    │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│  5. TRANSDUCER & TELEMETRY LAYER (Piezo TX, OLED, HUD) │
└────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack & Web Experience

- **Frontend & UI**: HTML5, Tailwind CSS CDN, Custom Oceanic Glassmorphism Design System (`ocean-theme.css`).
- **Interactive Visualizers**: HTML5 Canvas Particle Engine (`ocean-canvas.js`), Dynamic Chart Visualizers (`charts.js`).
- **Interactive Sonar Lab**: Live Web Audio API & Canvas Oscilloscope Real-Time Simulator (`salsa-simulator.js`).
- **Local Dev Server**: Node.js HTTP Server (`server.js`).

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)

### Installation & Launch

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kanak-narware/S.A.L.S.A-TEAM-NEXORA-.git
   cd S.A.L.S.A-TEAM-NEXORA-
   ```

2. **Start the local server**:
   ```bash
   node server.js
   ```

3. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to access the interactive web application, architecture documentation, and live Sonar Laboratory simulator.

---

## 👥 Team Nexora

- **Kanak Narware** — *Team Lead & Embedded Systems / Hardware Architecture*
- **Team Nexora Members** — *DSP Engineering, Subsea Firmware, Power Optimization & Web Platform*

---

## 📄 License & Compliance

Developed for **Smart India Hackathon (SIH) 2026** under subsea payload specifications aligned with the **Ministry of Earth Sciences (MoES)** & **National Institute of Ocean Technology (NIOT)**.
