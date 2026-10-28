import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";

// ---- Edit your hero content here ----
const AVAILABILITY = "Available for opportunities";
const GREETING = "Hi, I'm";
const NAME = "Ahamed Asri";
const INTRO =
  "A Computer Science undergraduate focused on cybersecurity, security automation, and secure software development, with hands-on experience building practical tools and exploring AI-driven solutions.";
const PHOTO = "/profile.WebP"; // transparent PNG in /public
const RESUME = "/AhamedAsri_Resume.pdf"; // file in /public

export function HeroSection() {
  return (
    <section id="home" className="home">
      <div className="hero-text">
        <div className="availability"><i aria-hidden="true" /><span>{AVAILABILITY}</span></div>
        <p className="hi">{GREETING}</p>
        <h1 className="name">{NAME}</h1>
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
