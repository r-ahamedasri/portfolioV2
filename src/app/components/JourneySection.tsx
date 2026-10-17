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
  { date: "Dec 2024", type: "Education", title: "Completed G.C.E. Advanced Level Examinations", desc: "Completed my G.C.E. Advanced Level studies in the Physical Science stream.", place: "" },
  { date: "Feb 2025", type: "Education", title: "Certificate in IT and English", desc: "Built a foundation in computing, communication and problem-solving at BCAS Campus.", place: "BCAS Campus" },
  { date: "Sep 2025", type: "Training", title: "BCAS certificates earned", desc: "Received certificates in Information Technology and English from BCAS Campus.", place: "BCAS Campus" },
  { date: "Jan 2026", type: "Training", title: "Started BSc (Hons) Computer Science", desc: "Began the University of Westminster degree through IIT and earned the Foundation Certificate in Higher Education.", place: "University of Westminster · IIT" },
  { date: "Jun 2026", type: "Learning", title: "Python Developer certification", desc: "Completed the freeCodeCamp Python Developer certification.", place: "freeCodeCamp" },
  { date: "Jul 2026", type: "Learning", title: "Git, GitHub and communication skills", desc: "Completed Learning Git and GitHub (LinkedIn Learning) and English Communication Skills for IT (IIT).", place: "LinkedIn Learning · IIT" },
  { date: "Date", type: "Cybersecurity", title: "Cisco Networking Academy badges", desc: "Earned badges in cybersecurity, networking and endpoint security. Add dates.", place: "Cisco Networking Academy" },
];

// The line stays empty until you scroll past the top of this section. Then it fills as you scroll,
// a ring travels along its tip, and each node lights up when the line reaches it.
function Timeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = ref.current;
    const section = wrap?.closest("section");
    if (!wrap || !section) return;
    const dots = Array.from(wrap.querySelectorAll<HTMLElement>(".jdot"));
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const s = section.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      const height = w.height;
      const lineStart = w.top - s.top;                                   // where the line starts inside the section
      const firstDot = dots[0];
      const firstDotCenter = firstDot
        ? firstDot.getBoundingClientRect().top - w.top + firstDot.getBoundingClientRect().height / 2
        : 0;
      const scrolled = Math.max(0, -s.top - 12);                         // scroll past the section top (12px dead zone)
      const range = Math.max(1, lineStart + height - window.innerHeight * 0.75); // scroll needed to fill the whole line
      const progress = Math.min(1, scrolled / range);
      const y = still ? height : firstDotCenter + progress * (height - firstDotCenter);
      wrap.style.setProperty("--fy", `${y}px`);
      dots.forEach((d) => d.parentElement?.classList.toggle("lit", d.offsetTop + d.offsetHeight / 2 <= y));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    if (!still) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="jwrap" ref={ref}>
      <span className="jfill" aria-hidden="true" />
      <span className="jhead" aria-hidden="true" />
      <ol className="journey">
        {JOURNEY.map((j, i) => (
          <li key={i} className="journey-item">
            <span className="jdate">{j.date}</span>
            <span className="jdot" />
            <div className="jcard reveal" style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}>
              <span className="pill">{j.type}</span>
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
