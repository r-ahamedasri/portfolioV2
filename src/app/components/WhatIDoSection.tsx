import { Icon, v } from "./Icon";
import { SectionTitle } from "./SectionTitle";

const INTRO =
  "Applying technical skills to analyze vulnerabilities, automate tasks, and understand security challenges across digital environments.";

const SERVICES = [
  {
    icon: "shield",
    title: "Ethical Hacking & Vulnerability Assessment",
    description:
      "Investigating potential security weaknesses, exploring attack surfaces, and understanding how vulnerabilities can be identified and assessed.",
  },
  {
    icon: "terminal",
    title: "Security Scripting & Automation",
    description:
      "Using Python to streamline repetitive tasks, process security-related data, and develop scripts that support cybersecurity workflows.",
  },
  {
    icon: "network",
    title: "Network Analysis",
    description:
      "Examining network traffic, understanding communication protocols, and investigating suspicious activity to identify potential security issues.",
  },
  {
    icon: "browser",
    title: "Secure Application Testing",
    description:
      "Exploring web application vulnerabilities, testing security controls, and understanding common threats such as injection attacks and authentication weaknesses.",
  },
];

export function WhatIDoSection() {
  return (
    <section id="what-i-do" className="what-i-do">
      <div className="what-i-do-heading reveal">
        <SectionTitle a="What I" b="Do" r={false} />
        <p className="lead">{INTRO}</p>
      </div>
      <div className="services-grid">
        {SERVICES.map((service, index) => (
          <article
            className="service-card reveal"
            key={service.title}
            style={v({ "--d": `${(index % 2) * 0.1}s` })}
          >
            <span className="service-icon">
              <Icon n={service.icon} s={22} />
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
