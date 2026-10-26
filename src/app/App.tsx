import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { WhatIDoSection } from "./components/WhatIDoSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { JourneySection } from "./components/JourneySection";
import { CertificationSection } from "./components/CertificationSection";
import { EducationSection } from "./components/EducationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  // Enhanced scroll reveal observer with spring entry and dynamic DOM tracking
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const observeNewElements = () => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        reveal.observe(el);
      });
    };

    observeNewElements();

    const mo = new MutationObserver(observeNewElements);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      reveal.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <Analytics />
      <ParticleCanvas />
      <CustomCursor />
      <SmoothScroll />
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <WhatIDoSection />
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
