import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { flushSync } from "react-dom";
import { Icon } from "./Icon";

// ---- Edit the nav links here (id must match the section id) ----
const LOGO = "AA";
const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function NavBar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [glide, setGlide] = useState({ x: 0, w: 0, on: false });
  const linksRef = useRef<HTMLElement>(null);

  // which section is on screen
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...NAV_SECTIONS.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // the glass highlight slides to the link of the section on screen
  useLayoutEffect(() => {
    const place = () => {
      const bar = linksRef.current;
      const a = bar?.querySelector<HTMLElement>("a.active");
      if (!bar || !a) { setGlide((g) => ({ ...g, on: false })); return; }
      setGlide({ x: a.offsetLeft, w: a.offsetWidth, on: true });
      bar.scrollTo({ left: a.offsetLeft - bar.clientWidth / 2 + a.offsetWidth / 2, behavior: "smooth" });
    };
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // theme switch: circular reveal from the button + a ripple through the particles
  const toggleTheme = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const next = !dark;
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    window.dispatchEvent(new CustomEvent("themeburst", { detail: { x, y } }));
    const apply = () => {
      document.documentElement.dataset.theme = next ? "dark" : "light";
      localStorage.setItem("theme", next ? "dark" : "light");
      flushSync(() => setDark(next));
    };
    const doc = document as unknown as { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(); return; }
    doc.startViewTransition(apply).ready.then(() => {
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return (
    <header className={`topbar${scrolled ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <a className="logo" href="#home" aria-label="Home">{LOGO}<span>.</span></a>
      <nav id="primary-nav" aria-label="Main" className="links" ref={linksRef}>
        <span className="glide" aria-hidden="true" style={{ transform: `translateX(${glide.x}px)`, width: glide.w, opacity: glide.on ? 1 : 0 }} />
        {NAV_SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? "active" : ""} aria-current={active === s.id ? "true" : undefined} onClick={() => setMenuOpen(false)}>{s.label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="mode" aria-label="Toggle dark mode" onClick={toggleTheme}><Icon key={dark ? "sun" : "moon"} n={dark ? "sun" : "moon"} /></button>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-icon" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
