import { Icon, v } from "./Icon";
import { SectionTitle } from "./SectionTitle";

// ---- Edit your About Me content here ----
const PHOTO = "/about.jpg"; // image in /public. Set to "" to show a placeholder.
const PARAGRAPHS = [
  "I'm a Computer Science undergraduate with a strong interest in cybersecurity, software development, and emerging technologies. I enjoy exploring how systems work, solving technical problems, and building practical solutions that make a difference. With a growing foundation in programming and security, I'm continuously developing my skills through hands-on projects, technical research, and independent learning.",
];
const GOALS =
  "To become a skilled cybersecurity professional, specializing in securing systems, identifying vulnerabilities, and building technology with security and privacy at its core.";
const LEARNING =
  "Deepening my knowledge of Python, Java, network security, web application security, and ethical hacking through practical exercises and hands-on projects.";
const INTERESTS =
  "Cybersecurity, penetration testing, secure software development, AI-driven security solutions, and exploring how technology can solve real-world problems.";

export function AboutSection() {
  return (
    <section id="about">
      <SectionTitle a="About" b="Me" />
      <div className="about">
        <div className="about-photo reveal">
          {PHOTO
            ? <img src={PHOTO} alt="About me" />
            : <div className="photoph"><Icon n="user" s={44} /><p>Your photo here</p><span>public/about.jpg</span></div>}
        </div>
        <div className="about-body">
          <div className="reveal">{PARAGRAPHS.map((p, i) => <p key={i}>{p}</p>)}</div>
          <div className="facts">
            <div className="fact reveal">
              <h3>Career Goals</h3>
              <p className="small">{GOALS}</p>
            </div>
            <div className="fact reveal" style={v({ "--d": "0.1s" })}>
              <h3>Currently Learning</h3>
              <p className="small">{LEARNING}</p>
            </div>
            <div className="fact reveal" style={v({ "--d": "0.2s" })}>
              <h3>Interests</h3>
              <p className="small">{INTERESTS}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
