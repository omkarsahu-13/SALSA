/**
 * S.A.L.S.A — Oceanic Canvas Engine
 * Renders an animated underwater digital ecosystem:
 * - Shimmering caustic light rays from the surface
 * - Floating bioluminescent particles
 * - Rising organic micro-bubbles with horizontal sine wobble
 * - Gentle depth fog & ocean atmosphere
 */

(function () {
  const canvas = document.getElementById('ocean-canvas-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;

  // Particle and Bubble systems
  const particles = [];
  const bubbles = [];
  const PARTICLE_COUNT = 45;
  const BUBBLE_COUNT = 30;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Particle Class (Bioluminescent Marine Snow)
  class MarineParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.5 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = -(Math.random() * 0.3 + 0.15);
      this.alpha = Math.random() * 0.6 + 0.2;
      this.hue = Math.random() > 0.3 ? 190 : 160; // Cyan or Aquamarine
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
      this.x += this.speedX + Math.sin(this.pulse) * 0.2;
      this.y += this.speedY;
      this.pulse += this.pulseSpeed;

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }

    draw() {
      const dynamicAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${dynamicAlpha})`;
      ctx.shadowColor = `hsla(${this.hue}, 90%, 65%, 0.8)`;
      ctx.shadowBlur = this.size * 4;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow for performance
    }
  }

  // Bubble Class
  class Bubble {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 50;
      this.radius = Math.random() * 4 + 2;
      this.speedY = Math.random() * 0.8 + 0.5;
      this.wobbleSpeed = Math.random() * 0.04 + 0.02;
      this.wobbleAmp = Math.random() * 1.5 + 0.5;
      this.wobbleAngle = Math.random() * Math.PI * 2;
      this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.wobbleAngle += this.wobbleSpeed;
      this.x += Math.sin(this.wobbleAngle) * this.wobbleAmp;
      this.y -= this.speedY;

      if (this.y < -20) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 240, 255, ${this.alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Bubble highlight
      ctx.beginPath();
      ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.9})`;
      ctx.fill();
    }
  }

  // Initialize particles & bubbles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new MarineParticle());
  }
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    bubbles.push(new Bubble());
  }

  let time = 0;

  // Draw shimmering underwater light rays from top
  function drawLightRays() {
    const numRays = 5;
    for (let i = 0; i < numRays; i++) {
      const rayWidth = width / numRays;
      const startX = i * rayWidth + Math.sin(time * 0.0008 + i) * 60;
      const endX = startX + (i - numRays / 2) * 120 + Math.cos(time * 0.001 + i) * 80;
      
      const gradient = ctx.createLinearGradient(startX, 0, endX, height * 0.75);
      const intensity = 0.035 + 0.02 * Math.sin(time * 0.0015 + i * 1.5);
      
      gradient.addColorStop(0, `rgba(0, 240, 255, ${intensity * 1.8})`);
      gradient.addColorStop(0.5, `rgba(0, 180, 216, ${intensity})`);
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(startX - 40, 0);
      ctx.lineTo(startX + 60, 0);
      ctx.lineTo(endX + 180, height * 0.85);
      ctx.lineTo(endX - 100, height * 0.85);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  // Animation Loop
  function animate() {
    time++;
    ctx.clearRect(0, 0, width, height);

    // Draw Light Rays
    drawLightRays();

    // Update and draw bubbles
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].update();
      bubbles[i].draw();
    }

    // Update and draw bioluminescent marine particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Single static render
    drawLightRays();
  } else {
    animate();
  }
})();
