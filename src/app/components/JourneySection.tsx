import { useEffect, useRef } from "react";
import { SectionTitle } from "./SectionTitle";

// ---- Edit your journey here (oldest first) ----
// type: Training, Learning, Project, CTF, Cybersecurity, Experience ...
// `place` is optional and appears opposite the title.
interface JourneyEvent {
  date: string;
  type: string;
  title: string;
  desc: string;
  place?: string;
}

const JOURNEY: JourneyEvent[] = [
  { date: "Dec 2024", type: "Education", title: "G.C.E. Advanced Level Studies", desc: "Completed my Advanced Level studies in the Physical Science stream.", place: "Zahira College, Kalmunai" },
  { date: "Feb 2025", type: "Education", title: "Certificate in Information Technology and English", desc: "Completed certificate courses in Information Technology and English.", place: "BCAS Campus" },
  { date: "May 2025", type: "Education", title: "Foundation Programme", desc: "Began my foundation studies in preparation for higher education.", place: "Informatics Institute of Technology (IIT)" },
  { date: "Jan 2026", type: "Education", title: "BSc (Hons) Computer Science", desc: "Started my Computer Science degree awarded by the University of Westminster and delivered through IIT.", place: "Informatics Institute of Technology (IIT)" },
  { date: "Sep 2026", type: "Cybersecurity", title: "Junior Cybersecurity Analyst", desc: "Earned digital badges in cybersecurity, networking and endpoint security.", place: "Cisco Networking Academy" }
];

// Cards alternate right / left and each dot sits beside its card, so a zig-zag line joins them.
// The line stays empty until you scroll past the top of this section. Then it fills as you scroll,
// a ring travels along its tip, and each node lights up when the line reaches it.
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const baseRef = useRef<SVGPolylineElement>(null);
  const fillRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const wrap = ref.current;
    const section = wrap?.closest("section");
    const base = baseRef.current;
    const fill = fillRef.current;
    if (!wrap || !section || !base || !fill) return;
    const dots = Array.from(wrap.querySelectorAll<HTMLElement>(".jdot"));
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const s = section.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      const pts = dots.map((d) => {
        const r = d.getBoundingClientRect();
        return [r.left - w.left + r.width / 2, r.top - w.top + r.height / 2];
      });
      if (!pts.length) return;
      const str = pts.map((p) => p.join(",")).join(" ");
      base.setAttribute("points", str);
      fill.setAttribute("points", str);

      // cumulative length of the path at every dot
      const cum = [0];
      for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      const total = Math.max(1, cum[cum.length - 1]);

      const lineStart = w.top - s.top;
      const scrolled = Math.max(0, -s.top - 12);                         // scroll past the section top (12px dead zone)
      const range = Math.max(1, lineStart + w.height - window.innerHeight * 0.75);
      const progress = still ? 1 : Math.min(1, scrolled / range);
      const dist = progress * total;

      fill.style.strokeDasharray = `${total}`;
      fill.style.strokeDashoffset = `${total - dist}`;

      // position of the travelling ring
      let k = 1;
      while (k < cum.length - 1 && cum[k] < dist) k++;
      const seg = Math.max(1, cum[k] - cum[k - 1]);
      const t = pts.length > 1 ? Math.min(1, Math.max(0, (dist - cum[k - 1]) / seg)) : 0;
      const a = pts[pts.length > 1 ? k - 1 : 0], b = pts[pts.length > 1 ? k : 0];
      wrap.style.setProperty("--hx", `${a[0] + (b[0] - a[0]) * t}px`);
      wrap.style.setProperty("--hy", `${a[1] + (b[1] - a[1]) * t}px`);

      dots.forEach((d, i) => d.parentElement?.classList.toggle("lit", cum[i] <= dist + 0.5));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    const ro = new ResizeObserver(onScroll);
    ro.observe(wrap);
    window.addEventListener("resize", onScroll);
    if (!still) window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="jwrap" ref={ref}>
      <svg className="jsvg" aria-hidden="true">
        <polyline className="jline" ref={baseRef} />
        <polyline className="jfill" ref={fillRef} />
      </svg>
      <span className="jhead" aria-hidden="true" />
      <ol className="journey">
        {JOURNEY.map((j, i) => (
          <li key={i} className={`journey-item ${i % 2 === 0 ? "left" : "right"}`}>
            <span className="jdot" />
            <div className="jcard reveal" style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
              <div className="jtop">
                <span className="pill">{j.type}</span>
                <span className="jdate">{j.date}</span>
              </div>
              <div className="jcard-heading">
                <h3>{j.title}</h3>
                {j.place && <span className="jplace">{j.place}</span>}
              </div>
              <p>{j.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function JourneySection() {
  return (
    <section id="journey">
      <SectionTitle a="Career" b="Journey" />
      <Timeline />
    </section>
  );
}
