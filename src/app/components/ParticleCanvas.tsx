import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number;
}

interface ParticleCanvasProps {
  className?: string;
  count?: number;
  connectionDistance?: number;
  repelRadius?: number;
  sizeMultiplier?: number;
}

// Particles drift gently, then settle. They get pushed away when the mouse comes near.
export function ParticleCanvas({
  className = "net",
  count = 108,
  connectionDistance = 130,
  repelRadius = 130,
  sizeMultiplier = 0.65,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const colRef = useRef<number[] | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      canvas.style.height = `${canvas.height}px`;
      const viewports = Math.max(1, canvas.height / Math.max(window.innerHeight, 1));
      const actual = Math.ceil(count * viewports);
      particlesRef.current = Array.from({ length: actual }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: (Math.random() * 1.5 + 0.5) * sizeMultiplier,
        opacity: Math.random() * 0.4 + 0.25,
      }));
    };

    const draw = () => {
      // Use white in dark mode and softened charcoal in light mode.
      const dark = document.documentElement.dataset.theme === "dark";
      const target = dark ? [255, 255, 255] : [72, 72, 72];
      const cur = colRef.current ?? (colRef.current = target.slice());
      for (let k = 0; k < 3; k++) cur[k] += (target[k] - cur[k]) * 0.06;
      const gray = cur.map(Math.round).join(",");
      const pts = particlesRef.current;
      const mouse = mouseRef.current;
      const visibleTop = Math.max(0, window.scrollY - connectionDistance);
      const visibleBottom = Math.min(canvas.height, window.scrollY + window.innerHeight + connectionDistance);
      const visible: Particle[] = [];
      ctx.clearRect(0, visibleTop, canvas.width, visibleBottom - visibleTop);

      for (const p of pts) {
        if (p.y >= visibleTop && p.y <= visibleBottom) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < repelRadius && dist > 0) {
            const force = ((repelRadius - dist) / repelRadius) * 0.35;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
        p.vx *= 0.97; p.vy *= 0.97;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 2.5) { p.vx = (p.vx / spd) * 2.5; p.vy = (p.vy / spd) * 2.5; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < visibleTop || p.y > visibleBottom) continue;
        visible.push(p);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${gray},${dark ? p.opacity + 0.15 : p.opacity * 0.45})`;
        ctx.fill();

      }

      for (let i = 0; i < visible.length; i++) {
        const p = visible[i];
        for (let j = i + 1; j < visible.length; j++) {
          const p2 = visible[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${gray},${(1 - d / connectionDistance) * (dark ? 0.25 : 0.08)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      if (!still) rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    // theme toggle sends a ripple: particles get pushed away from the button
    const onBurst = (e: Event) => {
      const { x, y: clientY } = (e as CustomEvent<{ x: number; y: number }>).detail;
      const y = clientY + window.scrollY;
      for (const q of particlesRef.current) {
        const dx = q.x - x, dy = q.y - y, dist = Math.hypot(dx, dy) || 1;
        const f = Math.min(5, 1200 / (dist + 150));
        q.vx += (dx / dist) * f; q.vy += (dy / dist) * f;
      }
    };

    init();
    draw();
    const resizeObserver = new ResizeObserver(init);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("resize", init);
    if (!still) {
      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseleave", onMouseLeave);
      window.addEventListener("themeburst", onBurst);
    }
    return () => {
      window.removeEventListener("resize", init);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("themeburst", onBurst);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, connectionDistance, repelRadius, sizeMultiplier]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
