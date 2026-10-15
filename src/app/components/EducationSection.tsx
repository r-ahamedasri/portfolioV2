import { Icon, v } from "./Icon";
import { SectionTitle } from "./SectionTitle";

// ---- Edit your education here ----
// The first entry is shown as the large feature card. icon: "cap" or "user".
const EDUCATION = [
  {
    period: "Jan 2026 – Present",
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Westminster",
    description: "Pursuing a well-rounded Computer Science degree while focusing on AI & machine learning, cybersecurity, and networking. Active in research and collaborative development projects.",
    highlights: ["Software Engineering", "AI & Machine Learning", "Cybersecurity", "Networking", "Databases"],
    icon: "cap",
    status: "Enrolled",
    graduation: "2028",
  },
  {
    period: "Feb 2025 – Jun 2025",
    degree: "Certificate in Information Technology and English",
    institution: "BCAS Campus",
    description: "Developed a strong foundation in information technology and English, building practical skills in computing, communication, and problem-solving.",
    highlights: ["Information Technology", "Computer Fundamentals", "English Language", "Communication Skills"],
    icon: "cap",
    status: "Completed",
    graduation: "",
  },
  {
    period: "Current",
    degree: "Member, IEEE",
    institution: "IEEE Student Branch of IIT",
    description: "Engaging with a global community of technology and engineering professionals while exploring new developments and technical resources.",
    highlights: ["IEEE", "IEEE Computer Society", "IEEE Robotics & Automation Society"],
    icon: "user",
    status: "Active",
    graduation: "",
  },
];

// Shown inside the feature card
const FOCUS_AREAS = ["Software Engineering", "Cybersecurity Fundamentals", "Network Infrastructure", "AI & Machine Learning"];

export function EducationSection() {
  return (
    <section id="education">
      <SectionTitle a="Academic" b="Qualifications" />
      <div className="bento">
        {EDUCATION.map((e, i) => i === 0 ? (
          <article key={e.degree} className="ecard feat reveal">
            {e.graduation && <span className="gradmark" aria-hidden="true">{e.graduation}</span>}
            <div className="fmain">
              <span className="eicon"><Icon n={e.icon} s={26} /></span>
              <p className="meta">{e.period} <b className="st" data-s={e.status.toLowerCase()}>{e.status}</b></p>
              <h3>{e.degree}</h3>
              <p className="school">{e.institution}</p>
              <p>{e.description}</p>
              <div className="tags">{e.highlights.map((t) => <span key={t} className="pill">{t}</span>)}</div>
              {e.graduation && <p className="gradnote"><Icon n="cap" s={18} /> Expected graduation <b>{e.graduation}</b></p>}
            </div>
            <div className="fside">
              <h4 className="mono">Core focus</h4>
              <ul className="mods">{FOCUS_AREAS.map((m) => <li key={m}>{m}</li>)}</ul>
            </div>
          </article>
        ) : (
          <article key={e.degree} className="ecard reveal" style={v({ "--d": i * 0.1 + "s" })}>
            <div className="etop">
              <span className="eicon"><Icon n={e.icon} /></span>
              <p className="meta">{e.period} <b className="st" data-s={e.status.toLowerCase()}>{e.status}</b></p>
            </div>
            <h3>{e.degree}</h3>
            <p className="school">{e.institution}</p>
            <p className="small muted">{e.description}</p>
            <div className="tags">{e.highlights.map((t) => <span key={t} className="pill">{t}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
