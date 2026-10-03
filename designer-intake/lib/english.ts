import type { Field } from "./intake";
export type Language = "mn" | "en";
const fields: Record<string, [string, string?]> = {
  name: [
    "Name to display",
    "Include both local and Latin spellings if applicable.",
  ],
  studio: ["Studio / brand name"],
  title: [
    "Professional title",
    "For example: interior designer or interior architect.",
  ],
  location: [
    "City and country",
    "A private residence’s exact address is not needed.",
  ],
  bio: [
    "About you",
    "Around 80–150 words. Describe the spaces you work on, your role, and your experience in your own words.",
  ],
  background: [
    "Education, experience and professional memberships",
    "Include institutions, qualifications, dates and previous roles you want published.",
  ],
  approach: [
    "Your design approach",
    "Explain one actual decision: why a material was chosen, or how you resolved light or circulation.",
  ],
  principles: [
    "3–5 characteristics of your work",
    "Materials, atmosphere, spatial principles, and decisions you tend to avoid.",
  ],
  portrait: [
    "Portrait photo link",
    "Share a high-resolution original via Drive, Dropbox or similar. Check that the recipient can open it.",
  ],
  portraitCredit: ["Portrait credit and usage permission"],
  processImages: ["Studio, process and sketch folder link"],
  cv: ["CV / profile document link"],
  replyEmail: [
    "Private correspondence email",
    "For project communication only. This will not automatically appear on the portfolio.",
  ],
  publicEmail: ["Email to publish on the portfolio"],
  phone: [
    "Public phone / WhatsApp",
    "Optional. Only provide a number you want made public.",
  ],
  instagram: ["Instagram URL"],
  otherLinks: [
    "Other links",
    "LinkedIn, Behance or press coverage. One link per line.",
  ],
  collaboration: [
    "What collaborations are you open to?",
    "Project types, locations, editorial enquiries and studio partnerships.",
  ],
  languages: ["Languages you work in"],
  audience: [
    "Who is the website for?",
    "Architects, studios, editors, private clients: why should they get in touch?",
  ],
  siteLanguage: ["Portfolio language"],
  references: [
    "Websites, publications or exhibitions you like",
    "Include links and explain exactly what you like about each.",
  ],
  avoid: ["Colours, styles or treatments to avoid"],
  brandAssets: [
    "Logo, fonts and brand assets link",
    "Include font licences where available. Leave blank if there is no existing identity.",
  ],
  domain: [
    "Preferred or existing domain",
    "Do not include account passwords or login credentials.",
  ],
  deadline: ["Preferred launch timeframe"],
  notes: ["Additional notes or questions"],
  category: ["Project type"],
  year: ["Year / timeframe"],
  area: ["Area (m²)"],
  status: ["Project status"],
  role: [
    "Your role",
    "Independent designer, team member, concept, detailed design, or site supervision.",
  ],
  brief: [
    "Original brief and constraints",
    "What problem needed solving? Omit client names that must remain private.",
  ],
  concept: [
    "Core concept and design decision",
    "How did you change the space, and why did you choose this solution?",
  ],
  materials: [
    "Materials, colours and construction",
    "Actual materials, finishes, junctions, bespoke elements and reasons for their selection.",
  ],
  journey: [
    "The journey through the space",
    "What is visible at the entrance? How do rooms connect? Where does someone pause?",
  ],
  light: [
    "Light and shadow",
    "Daylight, artificial lighting, orientation, shadows and changes through the day.",
  ],
  detail: ["A detail worth looking at closely"],
  reflection: [
    "Designer’s reflection",
    "What you learned, your most important decision, or what you would do differently.",
  ],
  images: [
    "High-resolution project photo folder",
    "Include establishing views, thresholds, material details, light and a closing image. Share original files.",
  ],
  imageNotes: [
    "Image filenames, captions and sequence",
    "Example: 01-entry.jpg — entrance; 02-living.jpg — wide view. Identify a cover image and vertical mobile crops.",
  ],
  drawings: [
    "Plans, sections, sketches and construction drawings",
    "PDF or image folder if available. Remove sensitive information and precise private addresses.",
  ],
  credits: [
    "Collaborators and credits",
    "Architect, contractor, furniture, lighting and individual team roles.",
  ],
  photographer: ["Photographer / visualisation author"],
  permissions: ["Permission to publish the project and images"],
  restrictions: [
    "Confidentiality and publication restrictions",
    "Names to withhold, images to exclude, embargo dates or required credits.",
  ],
};
const options: Record<string, string> = {
  Англи: "English",
  Монгол: "Mongolian",
  "Монгол + Англи": "Mongolian + English",
  "Орон сууц": "Apartment",
  "Хувийн байшин": "House",
  "Ресторан / кафе": "Restaurant / café",
  Оффис: "Office",
  "Худалдаа / үйлчилгээ": "Retail / commercial",
  "Зочлох үйлчилгээ": "Hospitality",
  Бусад: "Other",
  Хэрэгжсэн: "Completed",
  "Хэрэгжиж байгаа": "In progress",
  "Концепц / рендер": "Concept / visualisation",
  "Нийтлэх зөвшөөрөлтэй": "Permission granted",
  "Зөвшөөрөл авахаар хүлээж байгаа": "Permission pending",
  "Одоогоор нийтэлж болохгүй": "Not for publication",
};
export const optionLabel = (value: string, lang: Language) =>
  lang === "en" ? (options[value] ?? value) : value;
export function localField(
  field: Field,
  lang: Language,
  project = false,
): Field {
  if (lang === "mn") return field;
  const translated = fields[field.key];
  return {
    ...field,
    label:
      project && field.key === "title"
        ? "Project name"
        : (translated?.[0] ?? field.label),
    hint: translated?.[1],
  };
}
export const t = (lang: Language, mn: string, en: string) =>
  lang === "mn" ? mn : en;
