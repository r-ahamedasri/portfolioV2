import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";

// ---- Edit your hero content here ----
const AVAILABILITY = "Available for opportunities";
const GREETING = "Hi, I'm";
const NAME = "Ahamed Asri";
const ROLES = ["Aspiring Information Security Engineer", "Aspiring AI Security Engineer"];
const INTRO =
  "BSc (Hons) Computer Science undergraduate at the University of Westminster, associated with the Informatics Institute of Technology (IIT). I build. I break. I learn. With a growing focus on cybersecurity, I explore development, networking, and security to understand how technology works, where it breaks, and how to make it better.";
const PHOTO = "/profile.png"; // transparent PNG in /public
const RESUME = "/AhamedAsri_Resume.pdf"; // file in /public

// Types a phrase, pauses, then deletes only back to the words the next phrase shares.
function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0, current = "", typing = true, id = 0;
    const common = (a: string, b: string) => { let k = 0; while (k < a.length && k < b.length && a[k] === b[k]) k++; return k; };
    const tick = () => {
      const w = words[i];
      let delay = 65;
      if (typing) {
        current = w.slice(0, current.length + 1);
        if (current === w) { typing = false; delay = 1900; }
      } else {
        const next = words[(i + 1) % words.length];
        const keep = next === w ? 0 : common(w, next);
        current = current.slice(0, -1); delay = 32;
        if (current.length <= keep) { typing = true; i = (i + 1) % words.length; delay = 280; }
      }
      setText(current);
      id = window.setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

export function HeroSection() {
  const role = useTypewriter(ROLES);
  return (
    <section id="home" className="home">
      <div className="hero-text">
        <div className="availability"><i aria-hidden="true" /><span>{AVAILABILITY}</span></div>
        <p className="hi">{GREETING}</p>
        <h1 className="name">{NAME}</h1>
        <div className="rule" aria-hidden="true"><i /><i /><i /></div>
        <h2 className="role"><span className="prompt">$</span> <span>{role}<i className="caret" /></span></h2>
        <p className="lead">{INTRO}</p>
        <div className="row">
          <a className="btn" href="#projects">View projects</a>
          <a className="btn ghost" href={RESUME} download>Download CV <Icon n="dl" s={18} /></a>
        </div>
        <SocialLinks />
      </div>
      <div className="portrait">
        <img src={PHOTO} alt={NAME} />
      </div>
      <a className="scroll" href="#about" aria-label="Scroll to about">Scroll<Icon n="down" s={20} /></a>
    </section>
  );
}
