import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const PARTICLE_COUNT = 90;
    const GRAVITY = 0.003;
    const CONNECTION_DISTANCE = 130;
    const MOUSE_RADIUS = 200;
    const MOUSE_FORCE = 0.08;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * -0.2 - 0.05,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction - particles are attracted/repelled
        const dmx = mx - p.x;
        const dmy = my - p.y;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);

        if (mouseDist < MOUSE_RADIUS && mouseDist > 0) {
          const force = (1 - mouseDist / MOUSE_RADIUS) * MOUSE_FORCE;
          // Gentle attraction toward cursor
          p.vx += (dmx / mouseDist) * force * 0.3;
          p.vy += (dmy / mouseDist) * force * 0.3;

          // Boost opacity near cursor
          p.opacity = Math.min(0.7, p.opacity + 0.01);
        } else {
          // Slowly return to base opacity
          if (p.opacity > 0.4) {
            p.opacity -= 0.002;
          }
        }

        p.vy += GRAVITY;
        p.x += p.vx;
        p.y += p.vy;

        // Damping so particles don't fly away
        p.vx *= 0.998;
        p.vy *= 0.998;

        if (p.y > canvas!.height + 10) {
          p.y = -10;
          p.vy = Math.random() * -0.2 - 0.05;
        }
        if (p.x < -10) p.x = canvas!.width + 10;
        if (p.x > canvas!.width + 10) p.x = -10;

        // Draw particle
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx!.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const lineOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.08;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }

        // Draw connections to mouse
        if (mouseDist < MOUSE_RADIUS * 1.5) {
          const lineOpacity = (1 - mouseDist / (MOUSE_RADIUS * 1.5)) * 0.12;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mx, my);
          ctx!.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
          ctx!.lineWidth = 0.3;
          ctx!.stroke();
        }
      }

      // Subtle glow around mouse
      if (mx > 0 && my > 0) {
        const gradient = ctx!.createRadialGradient(mx, my, 0, mx, my, 120);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.015)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx!.beginPath();
        ctx!.arc(mx, my, 120, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    init();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{ zIndex: 0, pointerEvents: "none" }}
    />
  );
}
