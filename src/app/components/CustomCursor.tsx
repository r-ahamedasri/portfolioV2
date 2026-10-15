import { useEffect, useRef, useState } from "react";

// Dot + ring cursor. The ring turns into a rotated square over links, buttons and inputs.
export function CustomCursor() {
  const isTouch = window.matchMedia("(pointer: coarse), (any-pointer: coarse)").matches;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouch) return;
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, [role='button'], label, input, textarea, select, [data-hover]"));
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animate = () => {
      const ease = 0.12;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ease;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const dot = isClicking ? 6 : isHovering ? 4 : 6;
  const ring = isClicking ? 20 : isHovering ? 48 : 32;

  return (
    <>
      <div ref={dotRef} className="cdot" style={{ opacity: visible ? 1 : 0 }} aria-hidden="true">
        <div style={{ width: dot, height: dot }} />
      </div>
      <div ref={ringRef} className={`cring${isHovering ? " hover" : ""}`} style={{ opacity: visible ? 1 : 0 }} aria-hidden="true">
        <div style={{ width: ring, height: ring, borderRadius: isHovering ? 4 : "50%", transform: isHovering ? "rotate(45deg)" : "rotate(0deg)" }} />
      </div>
    </>
  );
}
