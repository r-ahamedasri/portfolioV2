import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Icon } from "./Icon";

export function SmoothScroll() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const showTopBtnRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      respectReducedMotion: true,
    });

    (window as unknown as { lenisInstance: Lenis }).lenisInstance = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Synchronize progress bar and scroll effects directly with Lenis engine
    // Eliminates React state re-renders and CSS transition lag
    const handleLenisScroll = (e: { scroll: number; progress: number }) => {
      const { scroll, progress } = e;

      // Direct GPU transform update on progress bar
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${progress})`;
      }

      // Back-to-top button threshold (only re-render on state change)
      const shouldShowTop = scroll > 450;
      if (shouldShowTop !== showTopBtnRef.current) {
        showTopBtnRef.current = shouldShowTop;
        setShowTopBtn(shouldShowTop);
      }

      // Fade out hero scroll prompt smoothly
      const heroScroll = document.querySelector<HTMLElement>(".scroll");
      if (heroScroll) {
        const opacity = Math.max(0, 1 - scroll / 120);
        heroScroll.style.opacity = `${opacity}`;
        heroScroll.style.pointerEvents = opacity <= 0.05 ? "none" : "auto";
      }

      // Hero portrait depth parallax
      const portrait = document.querySelector<HTMLElement>(".portrait");
      if (portrait && scroll < window.innerHeight) {
        portrait.style.transform = `translateY(${scroll * 0.08}px)`;
      }
    };

    lenis.on("scroll", handleLenisScroll);

    // Initial check on mount
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const initialProgress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
    if (fillRef.current) {
      fillRef.current.style.transform = `scaleX(${initialProgress})`;
    }

    // Smooth scroll for internal anchor links (with navbar clearance offset)
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, {
          offset: -65,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", handleLenisScroll);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete (window as unknown as { lenisInstance?: Lenis }).lenisInstance;
    };
  }, []);

  const scrollToTop = () => {
    const lenis = (window as unknown as { lenisInstance?: Lenis }).lenisInstance;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top luminous scroll progress bar */}
      <div
        className="scroll-progress-bar"
        role="progressbar"
        aria-label="Reading progress"
      >
        <div
          ref={fillRef}
          className="scroll-progress-fill"
        />
      </div>

      {/* Floating Back-to-Top Button */}
      <button
        type="button"
        className={`scroll-top-btn ${showTopBtn ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <Icon n="up" s={18} />
      </button>
    </>
  );
}
