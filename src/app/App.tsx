import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { CustomCursor } from "./components/CustomCursor";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { JourneySection } from "./components/JourneySection";
import { CertificationSection } from "./components/CertificationSection";
import { EducationSection } from "./components/EducationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  // fade/slide elements in as they scroll into view
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, []);

  return (
    <>
      <Analytics />
      <ParticleCanvas />
      <CustomCursor />
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <CertificationSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
