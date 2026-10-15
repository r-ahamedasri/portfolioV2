# Portfolio

Personal portfolio website built with React, TypeScript and Vite.

## Setup (Windows PowerShell)

```powershell
npm install
npm run dev
```

Build for production (output goes to `dist/`):

```powershell
npm run build
npm run preview
```

## Where to edit things

Every section is one file in `src/app/components/`, with its content in a clearly marked block at the top
(look for the `// ---- Edit ... here ----` comments).

| What | File |
| --- | --- |
| Name, roles, intro, CV link | `HeroSection.tsx` |
| About text, photo, goals | `AboutSection.tsx` |
| Skills and percentages | `SkillsSection.tsx` |
| Projects | `ProjectsSection.tsx` |
| Timeline | `JourneySection.tsx` |
| Certificates and badges | `CertificationSection.tsx` |
| Education | `EducationSection.tsx` |
| Email, links, contact text | `ContactSection.tsx` |
| GitHub / LinkedIn / email icons | `SocialLinks.tsx` |
| Logo and nav links | `NavBar.tsx` |
| Footer text | `Footer.tsx` |
| Colors | CSS variables at the top of `src/styles/index.css` |

## Images and files (put them in `public/`)

- `profile.png` for the hero portrait (transparent PNG works best)
- `about.jpg` for the About photo
- `AhamedAsri_Resume.pdf` for the Download CV button
- `certifications/certificate-01.png ... certificate-06.png` and `badge-01.png ... badge-08.png`
  (a placeholder shows until the files exist)

## License

MIT
