import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";

// ---- Edit your contact details here ----
const EMAIL = "r.ahamedasri@gmail.com"; // the contact form opens an email to this address
const BLURB = "Open to internships, collaborations and conversations about security and software. Send me a message and I'll get back to you.";
const CONTACTS = [
  { icon: "mail", label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: "linkedin", label: "LinkedIn", value: "linkedin.com/in/ahamedasri", href: "https://www.linkedin.com/in/ahamedasri" },
  { icon: "github", label: "GitHub", value: "github.com/r-ahamedasri", href: "https://github.com/r-ahamedasri" },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
    location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact">
      <div className="connect reveal">
        <div>
          <SectionTitle a="Let's" b="Connect" r={false} />
          <p className="lead">{BLURB}</p>
          <ul className="info">
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <span><Icon n={c.icon} /></span>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{c.value}</a>
              </li>
            ))}
          </ul>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label>Your name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" /></label>
          <label>Your email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" /></label>
          <label>Message<textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can I help you?" /></label>
          <button className="btn send" type="submit">Send message <Icon n="send" s={18} /></button>
        </form>
      </div>
    </section>
  );
}
