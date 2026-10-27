import { useState, type CSSProperties } from "react";
import { SectionTitle } from "./SectionTitle";

// ---- Edit your skills here ----
// Format: "Technology 70" (a 0-100 self-assessed estimate). Each card shows the average of its technologies.
// These are my own estimates of current comfort level, not certifications or test results.

type Tech = [name: string, level: number];
interface SubCategory { name: string; techs: Tech[] }
interface Category { tab: string; icon: string; title: string; description?: string; subs: SubCategory[] }

const s = (list: string): Tech[] =>
  list.split(",").map((p) => {
    const t = p.trim(), i = t.lastIndexOf(" ");
    return [t.slice(0, i), Number(t.slice(i + 1))];
  });
const sub = (name: string, list: string): SubCategory => ({ name, techs: s(list) });

const SKILL_CATEGORIES: Category[] = [
  {
    tab: "Software Engineering", icon: "code",
    title: "Software Engineering",
    description: "Software development, secure coding practices, application architecture, and problem-solving.",
    subs: [
      sub("Programming Languages", "Python 85, Java 75, C 55, C++ 50, JavaScript 70, TypeScript 60"),
      sub("Web Development", "HTML5 85, CSS3 80, JavaScript 70, TypeScript 60, React 70, Node.js 50"),
      sub("Application Development", "Java 75, Python 80, JavaFX 60, Spring Boot 40, REST APIs 65, JSON 80"),
      sub("Databases", "MySQL 75, PostgreSQL 55, SQLite 70, MongoDB 45, SQL 78, Database Design 65"),
      sub("Version Control & Collaboration", "Git 90, GitHub 90, GitLab 45, Branching 80, Merging 75, Pull Requests 80"),
      sub("Software Engineering Principles", "OOP 80, Data Structures 70, Algorithms 65, Design Patterns 50, Testing 55, Debugging 75"),
    ],
  },
  {
    tab: "Pen Testing & Security", icon: "shield",
    title: "Penetration Testing & Cybersecurity",
    description: "Ethical hacking, vulnerability assessment, penetration testing methodologies, and security analysis.",
    subs: [
      sub("Web Application Security", "Burp Suite 55, OWASP Top 10 65, SQL Injection 60, XSS 60, CSRF 50, Authentication Testing 45"),
      sub("Network Penetration Testing", "Nmap 65, Netcat 50, Port Scanning 70, Service Enumeration 55, Metasploit 45, Network Reconnaissance 55"),
      sub("Vulnerability Assessment", "Nessus 40, OpenVAS 40, CVE Research 55, CVSS 50, Vulnerability Scanning 55, Security Misconfigurations 50"),
      sub("Linux Security", "Linux Permissions 70, Bash 65, Privilege Escalation Fundamentals 40, SSH 65, System Hardening 45, Log Analysis 50"),
      sub("Security Testing & Exploitation", "Metasploit 45, Exploit Research 35, Proof of Concept Development 35, Payload Analysis 30, Security Validation 45, Remediation Testing 40"),
      sub("CTFs & Security Methodologies", "TryHackMe 60, Capture the Flag 50, OWASP Testing Guide 45, MITRE ATT&CK 45, Reconnaissance 55, Security Reporting 50"),
    ],
  },
  {
    tab: "Cloud & Infrastructure", icon: "cloud",
    title: "Cloud & Infrastructure",
    description: "Cloud computing fundamentals, infrastructure security, system administration, and deployment.",
    subs: [
      sub("Cloud Platforms", "AWS 45, Microsoft Azure 40, Google Cloud 35, IAM 45, Virtual Machines 65, Cloud Storage 50"),
      sub("Containers & Virtualization", "Docker 55, Kubernetes 30, VirtualBox 80, VMware 65, Container Images 50, Virtual Networks 55"),
      sub("DevOps & CI/CD", "GitHub Actions 50, CI/CD Pipelines 45, Jenkins 25, Automated Testing 45, Build Automation 45, Deployment Workflows 45"),
      sub("System Administration", "Linux Administration 65, Windows Administration 60, Users and Permissions 70, Services 55, Process Management 60, System Monitoring 50"),
      sub("Cloud Security", "Cloud IAM 40, Security Groups 45, Network ACLs 40, Secrets Management 40, Cloud Logging 35, Cloud Security Fundamentals 45"),
      sub("Infrastructure & Automation", "Bash 65, Python Automation 70, Infrastructure as Code 30, Terraform 25, Configuration Management 30, Environment Variables 70"),
    ],
  },
  {
    tab: "Networking", icon: "network",
    title: "Networking",
    description: "Network protocols, traffic analysis, network configuration, and network security.",
    subs: [
      sub("Networking Fundamentals", "TCP/IP 75, OSI Model 80, IPv4 80, IPv6 55, Subnetting 70, MAC Addresses 75"),
      sub("Network Protocols", "DNS 75, DHCP 70, HTTP/HTTPS 80, SSH 70, FTP/SFTP 60, SMTP 55"),
      sub("Routing & Switching", "Routers 65, Switches 65, VLANs 60, Static Routing 65, Dynamic Routing 45, Network Segmentation 55"),
      sub("Network Security", "Firewalls 60, ACLs 55, VPNs 55, IDS/IPS 45, Network Segmentation 55, Access Control 65"),
      sub("Network Analysis & Troubleshooting", "Wireshark 65, tcpdump 45, Ping 85, Traceroute 75, Netstat 65, Packet Analysis 60"),
      sub("Network Defense & Monitoring", "Cisco Networking Technologies 60, Log Analysis 50, Traffic Monitoring 50, Threat Detection 45, SIEM Fundamentals 40, Incident Investigation 40"),
    ],
  },
  {
    tab: "AI & Machine Learning", icon: "cpu",
    title: "Artificial Intelligence & Machine Learning",
    description: "AI technologies, machine learning fundamentals, and AI-powered development.",
    subs: [
      sub("Programming for AI", "Python 85, NumPy 70, Pandas 70, Matplotlib 65, Jupyter Notebook 75, Scikit-learn 60"),
      sub("Machine Learning", "Supervised Learning 60, Unsupervised Learning 50, Classification 60, Regression 60, Clustering 50, Model Evaluation 55"),
      sub("Deep Learning", "Neural Networks 55, PyTorch 50, TensorFlow 40, CNNs 45, Model Training 50, GPU Computing 35"),
      sub("Generative AI & LLMs", "Large Language Models 60, Prompt Engineering 75, Hugging Face 50, Ollama 55, Transformers 45, Model Inference 50"),
      sub("AI Application Development", "REST APIs 65, FastAPI 55, Flask 50, AI Integration 60, Embeddings 45, Vector Databases 40"),
      sub("AI for Cybersecurity", "AI-Assisted Threat Detection 40, Security Log Analysis 40, Anomaly Detection 40, Phishing Detection 45, Security Automation 45, AI-Assisted Vulnerability Analysis 35"),
    ],
  },
];

const ICONS: Record<string, string> = {
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  cloud: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  network: "M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM5 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 8v4m0 0l-7 4m7-4l7 4",
  cpu: "M6 6h12v12H6zM9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4",
  check: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 12l3 3 5-6",
};
const Ico = ({ n, s = 20 }: { n: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[n]} /></svg>
);

// A card's percentage is the average of the technology levels listed in the SKILL_CATEGORIES list at the top of this file
const average = (sub: SubCategory) => Math.round(sub.techs.reduce((sum, t) => sum + t[1], 0) / sub.techs.length);

const SkillCard = ({ sub, i }: { sub: SubCategory; i: number }) => {
  const level = average(sub);
  return (
    <article className="skcard reveal" style={{ "--d": `${i * 0.07}s` } as CSSProperties}>
      <div className="sktop"><Ico n="check" /><h4>{sub.name}</h4><b>{level}%</b></div>
      <p className="sktech" title={sub.techs.map((t) => `${t[0]} ${t[1]}%`).join(" · ")}>{sub.techs.map((t) => t[0]).join(" · ")}</p>
      <div className="sbar" role="progressbar" aria-label={sub.name} aria-valuenow={level} aria-valuemin={0} aria-valuemax={100}>
        <i style={{ "--w": `${level}%`, "--d": `${0.2 + i * 0.07}s` } as CSSProperties} />
      </div>
    </article>
  );
};

function SkillTabs() {
  const [tab, setTab] = useState(0);
  const c = SKILL_CATEGORIES[tab];
  return (
    <div className="skills reveal">
      <div className="stabs" role="tablist" aria-label="Skill SKILL_CATEGORIES">
        {SKILL_CATEGORIES.map((x, i) => (
          <button key={x.tab} role="tab" aria-selected={tab === i} aria-controls="skpanel" className={tab === i ? "on" : ""} onClick={() => setTab(i)}>
            <Ico n={x.icon} /><span>{x.tab}</span>
          </button>
        ))}
      </div>
      <div id="skpanel" role="tabpanel" key={tab} className="spanel">
        {c.description && <p className="strip"><b>Focus:</b> {c.description}</p>}
        <div className="sgrid">{c.subs.map((s, i) => <SkillCard key={s.name} sub={s} i={i} />)}</div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills">
      <div className="skills-head reveal">
        <SectionTitle a="Technical" b="Skills" r={false} />
        <p className="skills-note lead">
          Each bar averages my own self-assessed levels for the technologies listed on the card. They are estimates, not certifications or test results.
        </p>
      </div>
      <SkillTabs />
    </section>
  );
}
