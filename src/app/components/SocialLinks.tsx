import { Icon } from "./Icon";

// ---- Edit your social links here (used by the Hero and the Footer) ----
const SOCIALS = [
  { icon: "github", label: "GitHub", href: "https://github.com/r-ahamedasri" },
  { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/ahamedasri" },
  { icon: "mail", label: "Email", href: "mailto:r.ahamedasri@gmail.com" },
];

export function SocialLinks() {
  return (
    <div className="socials">
      {SOCIALS.map(({ icon, label, href }) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label}><Icon n={icon} /></a>
      ))}
    </div>
  );
}
