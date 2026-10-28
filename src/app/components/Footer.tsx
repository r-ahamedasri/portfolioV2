import { SocialLinks } from "./SocialLinks";

// ---- Edit your footer here (social links are in SocialLinks.tsx) ----
const LOGO = "AA";
const NAME = "Ahamed Asri";

export function Footer() {
  return (
    <footer className="foot">
      <div>
        <a className="logo" href="#home" aria-label="Back to top">{LOGO}<span>.</span></a>
        <p className="muted small">© {new Date().getFullYear()} {NAME}. All rights reserved.</p>
      </div>
      <SocialLinks />
    </footer>
  );
}
