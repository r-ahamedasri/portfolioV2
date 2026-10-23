import { useState } from "react";
import { Icon, v } from "./Icon";
import { SectionTitle } from "./SectionTitle";

// ---- Edit your projects here ----
// category: used for the filter buttons. image: screenshot in public/projects (e.g. "public/projects/hash-identifier.png" or "/projects/hash-identifier.png").
// result: "what I learned" text (optional, hidden when empty).
interface Project {
  title: string;
  category: string;
  status: string;
  description: string;
  tech: string[];
  features: string[];
  result: string;
  image: string;
  repo: string;
  demo: string;
}

const PROJECTS: Project[] = [
  {
    title: "Hash Identifier",
    category: "Threat Analysis",
    status: "Completed",
    description: "A Python CLI tool for analyzing and identifying unknown hash formats, built for fast and reliable hash analysis.",
    tech: ["Python", "CLI", "Hash Analysis"],
    features: ["Algorithm detection", "Prefix and pattern analysis", "Confidence scoring with ranked results", "Non-hash detection"],
    result: "",
    image: "public/cover/hash-identifier.WebP",
    repo: "https://github.com/r-ahamedasri/hash-identifier",
    demo: "",
  },
  {
    title: "OriginAI",
    category: "Multi-Agent AI",
    status: "Completed",
    description: "An AI-powered Digital Product Passport platform that analyzes products using a multi-agent AI pipeline.",
    tech: ["Python", "Google ADK", "Gemini", "AI Agents", "APIs", "Pytest"],
    features: ["Materials and sustainability insights", "Supply chain and carbon footprint analysis", "Repairability and recycling insights", "Multi-agent AI pipeline"],
    result: "",
    image: "public/cover/originai.WebP",
    repo: "https://github.com/r-ahamedasri/originai",
    demo: "",
  },
  {
    title: "Shulker Box",
    category: "Security Tool",
    status: "Completed",
    description: "A password and recovery-key manager that keeps everything encrypted and stored only on your own device.",
    tech: ["Rust", "Encryption", "Cryptography", "CLI"],
    features: ["Nothing is uploaded to a server", "Command-line tool to save, view and manage passwords", "Backup recovery phrase so you are never locked out"],
    result: "",
    image: "public/cover/shulkerbox.WebP",
    repo: "https://github.com/r-ahamedasri/ShulkerBox",
    demo: "",
  },
];

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const cleanSrc = src ? src.replace(/^\/?public\//, "/") : "";

  if (!cleanSrc || failed) {
    return (
      <div className="mock">
        <i />
        <i />
        <i />
      </div>
    );
  }

  return (
    <img
      src={cleanSrc.startsWith("/") || cleanSrc.startsWith("http") ? cleanSrc : `/${cleanSrc}`}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}

export function ProjectsSection() {
  const cats = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const shown = PROJECTS.filter((p) => cat === "All" || p.category === cat);

  return (
    <section id="projects">
      <div className="head reveal">
        <div>
          <SectionTitle a="Selected" b="Projects" r={false} />
          <p className="lead">Security tools, automation, CTF work and software I have built.</p>
        </div>
        <div className="filters">{cats.map((c) => <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>)}</div>
      </div>
      <div className="projs">
        {shown.map((p, n) => (
          <article key={p.title + cat} className="proj reveal" style={v({ "--n": n, "--d": `${(n % 2) * 0.12}s`, "--g": `var(--g${n % 4})` })}>
            <div className="shot">
              <ProjectImage src={p.image} alt={`${p.title} screenshot`} />
              <span className="pill tl">{p.category}</span><span className="pill tr">{p.status}</span>
            </div>
            <div className="pbody">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="tags">{p.tech.map((t) => <span key={t} className="pill">{t}</span>)}</div>
              <h4>Main features</h4>
              <ul>{p.features.map((x) => <li key={x}>{x}</li>)}</ul>
              {p.result && (<><h4>Results &amp; learnings</h4><p className="small">{p.result}</p></>)}
              <div className="links2">
                {p.repo && <a href={p.repo} target="_blank" rel="noreferrer"><Icon n="github" s={18} /> Repository</a>}
                {p.demo && <a href={p.demo} target="_blank" rel="noreferrer"><Icon n="arrow" s={18} /> Live demo</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
