import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Icon, v } from "./Icon";
import { SectionTitle } from "./SectionTitle";

// ---- Edit your certificates here ----
// image: file in public/certifications. If the file is missing, a placeholder is shown.
// url: verification link ("" hides the link).
interface Certificate {
  id: string;
  image: string;
  issuer: string;
  title: string;
  issued: string;
  url: string;
}

const CERTIFICATES: Certificate[] = [
  { id: "certificate-01", image: "/certifications/certificate-01.png", issuer: "BCAS Campus", title: "Information Technology", issued: "September 2025", url: "http://www.bcas.lk/bcvs/" },
  { id: "certificate-02", image: "/certifications/certificate-02.png", issuer: "BCAS Campus", title: "English", issued: "September 2025", url: "http://www.bcas.lk/bcvs/" },
  { id: "certificate-03", image: "/certifications/certificate-03.png", issuer: "Information Institute of Technology", title: "Foundation Certificate in Higher Education", issued: "January 2026", url: "" },
  { id: "certificate-04", image: "/certifications/certificate-04.png", issuer: "Information Institute of Technology", title: "English Communication Skills for IT", issued: "July 2026", url: "" },
  { id: "certificate-05", image: "/certifications/certificate-05.png", issuer: "freeCodeCamp", title: "Python Developer", issued: "June 2026", url: "https://www.freecodecamp.org/certification/ahamedasri/python-v9" },
  { id: "certificate-06", image: "/certifications/certificate-06.png", issuer: "LinkedIn Learning", title: "Learning Git and GitHub", issued: "July 2026", url: "https://www.linkedin.com/learning/certificates/d077807610bb8275c9a6711b5983109e6933a465a9b3efdc85011c283ac2e7c0" },
];

// ---- Edit your badges here (name is optional) ----
const BADGES = [
  { image: "/certifications/badge-01.png", name: "Introduction to Cybersecurity" },
  { image: "/certifications/badge-02.png", name: "Networking Basics" },
  { image: "/certifications/badge-03.png", name: "Operating Systems Basics" },
  { image: "/certifications/badge-04.png", name: "Networking Devices and Initial Configuration" },
  { image: "/certifications/badge-05.png", name: "Endpoint Security" },
  { image: "/certifications/badge-06.png", name: "" },
  { image: "/certifications/badge-07.png", name: "" },
  { image: "/certifications/badge-08.png", name: "" },
];

const initials = (s: string) => s.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();

// Shows the image, or the fallback when the file is missing.
function SafeImage({ src, alt, fallback }: { src: string; alt: string; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  return failed || !src ? <>{fallback}</> : <img src={src} alt={alt} draggable={false} onError={() => setFailed(true)} />;
}

const BADGE_MARQUEE_DURATION = 34; // seconds for a complete loop

function BadgeCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    initialX: number;
    pointerId: number;
    halfWidth: number;
  } | null>(null);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    // Read current visual translateX from computed transform matrix
    const computedStyle = window.getComputedStyle(track);
    const matrix = new DOMMatrixReadOnly(computedStyle.transform);
    const currentX = matrix.m41 || 0;
    const halfWidth = track.scrollWidth / 2;

    if (halfWidth <= 0) return;

    // Freeze at exact visual position and switch to interactive drag
    track.style.animation = "none";
    track.style.transform = `translate3d(${currentX}px, 0, 0)`;

    dragRef.current = {
      startX: event.clientX,
      initialX: currentX,
      pointerId: event.pointerId,
      halfWidth,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track) return;

    const deltaX = event.clientX - drag.startX;
    let newX = drag.initialX + deltaX;

    // Wrap around halfWidth seamlessly
    const halfWidth = drag.halfWidth;
    newX = ((((newX % halfWidth) - halfWidth) % halfWidth) + halfWidth) % halfWidth - halfWidth;

    track.style.transform = `translate3d(${newX}px, 0, 0)`;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track) return;

    // Calculate current position percentage and resume CSS compositor marquee seamlessly
    const computedStyle = window.getComputedStyle(track);
    const matrix = new DOMMatrixReadOnly(computedStyle.transform);
    const currentX = matrix.m41 || 0;
    const halfWidth = drag.halfWidth;

    const normalized = (((currentX % halfWidth) + halfWidth) % halfWidth);
    const progress = (halfWidth - normalized) / halfWidth;

    dragRef.current = null;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(drag.pointerId)) {
      event.currentTarget.releasePointerCapture(drag.pointerId);
    }

    // Resume hardware CSS marquee from exact position
    track.style.transform = "";
    track.style.animation = `badgeMarquee ${BADGE_MARQUEE_DURATION}s linear infinite`;
    track.style.animationDelay = `-${progress * BADGE_MARQUEE_DURATION}s`;
    track.style.animationPlayState = "running";
  };

  return (
    <div className="badge-carousel">
      <div
        className="badge-viewport"
        ref={viewportRef}
        role="region"
        aria-label="Verified skill badges"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
      >
        <div className="badge-track" ref={trackRef}>
          {[0, 1].map((copy) => (
            <div key={copy} className="badge-group" aria-hidden={copy === 1}>
              {BADGES.map((badge, idx) => (
                <div key={badge.image + copy + idx} className="badge-slide">
                  <div className="badge-frame" title={badge.name || "Verified badge"}>
                    <SafeImage src={badge.image} alt={badge.name || "Verified badge"} fallback={<Icon n="award" s={34} />} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CertificationSection() {
  return (
    <section id="certifications">
      <div className="head reveal">
        <SectionTitle a="Certifications &" b="Badges" r={false} />
        <p className="count"><b>{CERTIFICATES.length}</b> credentials<span>·</span><b>{BADGES.length}</b> badges</p>
      </div>
      <div className="creds">
        {CERTIFICATES.map((c, i) => (
          <article key={c.id} className="credcard reveal" style={v({ "--d": (i % 3) * 0.1 + "s" })}>
            <div className="cprev">
              <SafeImage
                src={c.image}
                alt={`${c.title} certificate`}
                fallback={<div className="cph"><span className="seal"><Icon n="award" s={26} /></span><b>{initials(c.issuer)}</b></div>}
              />
              <span className="pill dpill">{c.issued}</span>
            </div>
            <div className="cinfo">
              <p className="issuer">{c.issuer}</p>
              <h3>{c.title}</h3>
              {c.url && <a className="cred" href={c.url} target="_blank" rel="noreferrer">Show credential <Icon n="ext" s={14} /></a>}
            </div>
          </article>
        ))}
      </div>
      <div className="shelf reveal">
        <h3 className="sub">Badges <span className="muted small">Verified skill badges</span></h3>
        <BadgeCarousel />
      </div>
    </section>
  );
}
