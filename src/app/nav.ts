export const SECTIONS = ["home", "about", "skills", "projects", "journey", "certifications", "education", "contact"] as const;
export type SectionId = (typeof SECTIONS)[number];
