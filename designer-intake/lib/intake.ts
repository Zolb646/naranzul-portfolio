/** The content brief is independent of the public portfolio data. */
export type Field = {
  key: string;
  label: string;
  hint?: string;
  required?: boolean;
  type?: "text" | "email" | "url" | "textarea" | "select";
  options?: string[];
};
export const profileFields: Field[] = [
  {
    key: "name",
    label: "Сайт дээр харагдах нэр",
    required: true,
    hint: "Монгол болон латин бичлэгийг хамт оруулж болно.",
  },
  { key: "studio", label: "Студи / брэндийн нэр" },
  {
    key: "title",
    label: "Мэргэжлийн нэршил",
    required: true,
    hint: "Жишээ: интерьер дизайнер, интерьер архитектор.",
  },
  { key: "location", label: "Үйл ажиллагаа явуулдаг хот, улс", required: true },
  {
    key: "bio",
    label: "Өөрийн тухай",
    type: "textarea",
    required: true,
    hint: "80–150 орчим үг. Ямар орон зай дээр ажилладаг, өөрийн үүрэг, туршлагаа өөрийн үгээр бичээрэй.",
  },
  {
    key: "background",
    label: "Боловсрол, туршлага, мэргэжлийн гишүүнчлэл",
    type: "textarea",
    hint: "Сургууль, мэргэжил, он; өмнөх студи, албан тушаал. Сайтад нийтлэхийг хүссэн мэдээллээ л оруулна.",
  },
  {
    key: "approach",
    label: "Таны дизайны арга барил",
    type: "textarea",
    required: true,
    hint: "Нэг бодит шийдвэрээр тайлбарлаарай. Яагаад тэр материалыг сонгосон, гэрэл эсвэл хөдөлгөөний асуудлыг хэрхэн шийдсэн бэ?",
  },
  {
    key: "principles",
    label: "Таны бүтээлийг тодорхойлох 3–5 шинж",
    hint: "Материал, уур амьсгал, орон зайн зарчим, зайлсхийдэг шийдлүүд.",
  },
  {
    key: "portrait",
    label: "Хөрөг зургийн хавтас / файлын холбоос",
    type: "url",
    hint: "Google Drive, Dropbox зэрэг. Өндөр нягтралтай эх зураг; үзэх эрхийг нээсэн эсэхээ шалгана уу.",
  },
  { key: "portraitCredit", label: "Хөрөг зургийн кредит, ашиглах зөвшөөрөл" },
  {
    key: "processImages",
    label: "Ажлын явц, студийн зураг, ноорог зургийн холбоос",
    type: "url",
  },
  { key: "cv", label: "CV / танилцуулгын холбоос", type: "url" },
];
export const contactFields: Field[] = [
  {
    key: "replyEmail",
    label: "Тантай холбогдох хувийн имэйл",
    type: "email",
    required: true,
    hint: "Ажлын харилцаанд ашиглана. Сайт дээр автоматаар нийтлэхгүй.",
  },
  {
    key: "publicEmail",
    label: "Сайт дээр нийтлэх имэйл",
    type: "email",
    required: true,
  },
  {
    key: "phone",
    label: "Нийтлэх утас / WhatsApp",
    hint: "Заавал биш. Нийтэд харагдах дугаар оруулна уу.",
  },
  { key: "instagram", label: "Instagram холбоос", type: "url" },
  {
    key: "otherLinks",
    label: "Бусад холбоос",
    type: "textarea",
    hint: "LinkedIn, Behance, хэвлэлд гарсан материал — нэг мөрөнд нэг холбоос.",
  },
  {
    key: "collaboration",
    label: "Ямар хамтын ажиллагаанд нээлттэй вэ?",
    type: "textarea",
    hint: "Төслийн төрөл, байршил, редакцын ярилцлага, студийн хамтын ажиллагаа гэх мэт.",
  },
  { key: "languages", label: "Харилцах боломжтой хэлүүд" },
];
export const directionFields: Field[] = [
  {
    key: "audience",
    label: "Сайтыг хамгийн түрүүнд хэнд зориулж байна вэ?",
    type: "textarea",
    required: true,
    hint: "Архитектор, студи, редактор, хувийн захиалагч гэх мэт. Тэд тантай ямар зорилгоор холбогдох вэ?",
  },
  {
    key: "siteLanguage",
    label: "Сайтын үндсэн хэл",
    type: "select",
    required: true,
    options: ["Англи", "Монгол", "Монгол + Англи"],
  },
  {
    key: "references",
    label: "Таалагддаг сайт, сэтгүүл, үзэсгэлэн",
    type: "textarea",
    hint: "Холбоос болон яг юу нь таалагддагийг бичээрэй.",
  },
  {
    key: "avoid",
    label: "Зайлсхийх өнгө, хэв маяг, шийдлүүд",
    type: "textarea",
  },
  {
    key: "brandAssets",
    label: "Лого, өнгө, фонт, брэндийн материалын холбоос",
    type: "url",
    hint: "Фонтын лиценз байгаа бол хамт оруулна уу. Брэндийн материалгүй бол хоосон үлдээж болно.",
  },
  {
    key: "domain",
    label: "Хүсэж буй эсвэл эзэмшдэг домэйн",
    hint: "Нэвтрэх нэр, нууц үг оруулах шаардлагагүй.",
  },
  { key: "deadline", label: "Нийтлэхээр төлөвлөж буй хугацаа" },
  { key: "notes", label: "Нэмэлт хүсэлт, асуулт", type: "textarea" },
];
export const projectFields: Field[] = [
  { key: "title", label: "Төслийн нэр", required: true },
  {
    key: "category",
    label: "Төслийн төрөл",
    type: "select",
    required: true,
    options: [
      "Орон сууц",
      "Хувийн байшин",
      "Ресторан / кафе",
      "Оффис",
      "Худалдаа / үйлчилгээ",
      "Зочлох үйлчилгээ",
      "Бусад",
    ],
  },
  {
    key: "location",
    label: "Хот, улс",
    required: true,
    hint: "Хувийн орон сууцны нарийн хаяг хэрэггүй.",
  },
  { key: "year", label: "Он / хугацаа", required: true },
  { key: "area", label: "Талбай (м²)" },
  {
    key: "status",
    label: "Төлөв",
    type: "select",
    options: ["Хэрэгжсэн", "Хэрэгжиж байгаа", "Концепц / рендер"],
  },
  {
    key: "role",
    label: "Таны гүйцэтгэсэн үүрэг",
    required: true,
    hint: "Бие даан, багийн гишүүн, концепц, зураг төсөл, гүйцэтгэлийн хяналт гэх мэт.",
  },
  {
    key: "brief",
    label: "Анхны нөхцөл, даалгавар",
    type: "textarea",
    required: true,
    hint: "Ямар асуудал, хязгаарлалт байсан бэ? Захиалагчийн нэрийг нууцлах бол бичихгүй.",
  },
  {
    key: "concept",
    label: "Гол санаа, шийдвэр",
    type: "textarea",
    required: true,
    hint: "Орон зайг хэрхэн өөрчилсөн бэ? Яагаад тэр шийдлийг сонгосон бэ?",
  },
  {
    key: "materials",
    label: "Материал, өнгө, хийц",
    type: "textarea",
    hint: "Бодит материалын нэр, гадаргуу, уулзвар, захиалгат эдлэл болон сонгосон шалтгаан.",
  },
  {
    key: "journey",
    label: "Орон зайгаар нэвтрэх дараалал",
    type: "textarea",
    hint: "Орох үед юу харагддаг, өрөөнүүд яаж холбогддог, хаана түр саатдаг вэ?",
  },
  {
    key: "light",
    label: "Гэрэлтэй ажилласан шийдэл",
    type: "textarea",
    hint: "Байгалийн ба хиймэл гэрэл, чиглэл, сүүдэр, өдрийн өөрчлөлт.",
  },
  { key: "detail", label: "Онцолж харуулах деталь", type: "textarea" },
  {
    key: "reflection",
    label: "Дизайнерын тэмдэглэл",
    type: "textarea",
    hint: "Энэ төслөөс сурсан зүйл, хамгийн чухал шийдвэр, эргээд өөрөөр хийх зүйл.",
  },
  {
    key: "images",
    label: "Өндөр нягтралтай зургийн хавтас",
    type: "url",
    required: true,
    hint: "Өрөөний ерөнхий зураг, босго, материалын деталь, гэрэл, эцсийн кадр. Original файлуудыг хуваалцана уу.",
  },
  {
    key: "imageNotes",
    label: "Зургийн нэр, тайлбар, дараалал",
    type: "textarea",
    hint: "Жишээ: 01-entry.jpg — орох өнцөг; 02-living.jpg — ерөнхий орон зай. Нүүрэнд онцлох болон mobile-д тохирох босоо кадрыг тэмдэглээрэй.",
  },
  {
    key: "drawings",
    label: "План, огтлол, ноорог, барилгын деталь",
    type: "url",
    hint: "Байгаа бол PDF эсвэл зургийн хавтас. Нууц мэдээлэл, нарийн хаягийг арилгана уу.",
  },
  {
    key: "credits",
    label: "Хамтран ажиллагчид ба кредит",
    type: "textarea",
    hint: "Архитектор, гүйцэтгэгч, тавилга, гэрэлтүүлэг болон багийн үүргийг ялгаж бичнэ.",
  },
  {
    key: "photographer",
    label: "Гэрэл зурагчин / рендерийн автор",
    required: true,
  },
  {
    key: "permissions",
    label: "Зураг болон төслийг нийтлэх эрх",
    type: "select",
    required: true,
    options: [
      "Нийтлэх зөвшөөрөлтэй",
      "Зөвшөөрөл авахаар хүлээж байгаа",
      "Одоогоор нийтэлж болохгүй",
    ],
  },
  {
    key: "restrictions",
    label: "Нууцлал, нийтлэх хязгаарлалт",
    type: "textarea",
    hint: "Нэр нууцлах, тодорхой зураг хасах, нийтлэх огноо, кредит бичих шаардлага.",
  },
];
export type ProjectBrief = { id: string; values: Record<string, string> };
export type IntakeDraft = {
  version: 1;
  values: Record<string, string>;
  projects: ProjectBrief[];
  consent: boolean;
};
export const blankDraft = (): IntakeDraft => ({
  version: 1,
  values: {},
  projects: [{ id: crypto.randomUUID(), values: {} }],
  consent: false,
});
export const sections = [
  {
    id: "profile",
    title: "Таны тухай",
    description:
      "Дизайнерын нэр, өөрийн үгээр бичсэн танилцуулга, хөрөг зураг.",
    fields: profileFields,
  },
  {
    id: "contact",
    title: "Холбоо ба хамтын ажиллагаа",
    description:
      "Нийтэд харагдах холбоо барих мэдээлэл болон ажлын харилцааны имэйл.",
    fields: contactFields,
  },
  {
    id: "direction",
    title: "Сайтын чиглэл",
    description: "Үзэгч, хэл, брэндийн материал, хүсэж буй мэдрэмж.",
    fields: directionFields,
  },
];
export function safeUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol);
  } catch {
    return false;
  }
}
export function validateDraft(draft: IntakeDraft): string[] {
  const errors: string[] = [];
  function check(
    fields: Field[],
    values: Record<string, string>,
    prefix: string,
  ) {
    for (const field of fields) {
      const value = (values[field.key] ?? "").trim();
      if (field.required && !value) errors.push(`${prefix}${field.label}`);
      else if (
        value &&
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        errors.push(`${prefix}${field.label}: имэйлээ шалгана уу`);
      else if (value && field.type === "url" && !safeUrl(value))
        errors.push(`${prefix}${field.label}: http(s) холбоос оруулна уу`);
      else if (value && field.options && !field.options.includes(value))
        errors.push(`${prefix}${field.label}: сонголтоо шалгана уу`);
      if (value.length > 10000)
        errors.push(`${prefix}${field.label}: 10,000 тэмдэгтээс хэтэрсэн`);
    }
  }
  check(
    [...profileFields, ...contactFields, ...directionFields],
    draft.values,
    "",
  );
  if (!draft.projects.length || draft.projects.length > 20)
    errors.push("1–20 төсөл оруулна уу");
  draft.projects.forEach((project, i) =>
    check(projectFields, project.values, `Төсөл ${i + 1}: `),
  );
  if (!draft.consent) errors.push("Мэдээлэл боловсруулах зөвшөөрөл");
  return errors;
}
export function parseDraft(input: unknown): IntakeDraft | null {
  if (!input || typeof input !== "object") return null;
  const d = input as Record<string, unknown>;
  const values = (v: unknown): v is Record<string, string> =>
    !!v &&
    typeof v === "object" &&
    !Array.isArray(v) &&
    Object.values(v).every(
      (item) => typeof item === "string" && item.length <= 10000,
    );
  if (
    d.version !== 1 ||
    !values(d.values) ||
    typeof d.consent !== "boolean" ||
    !Array.isArray(d.projects) ||
    d.projects.length < 1 ||
    d.projects.length > 20
  )
    return null;
  if (
    !d.projects.every(
      (p) =>
        p && typeof p.id === "string" && p.id.length <= 100 && values(p.values),
    )
  )
    return null;
  if (new Set(d.projects.map((p) => p.id)).size !== d.projects.length)
    return null;
  return d as IntakeDraft;
}
export function readableBrief(draft: IntakeDraft): string {
  const lines = ["ДИЗАЙНЕРЫН ПОРТФОЛИО — МЭДЭЭЛЛИЙН БАГЦ", ""];
  const append = (fields: Field[], values: Record<string, string>) =>
    fields.forEach((f) =>
      lines.push(f.label, values[f.key]?.trim() || "(Оруулаагүй)", ""),
    );
  sections.forEach((s) => {
    lines.push(`## ${s.title}`, "");
    append(s.fields, draft.values);
  });
  draft.projects.forEach((p, i) => {
    lines.push(`## Төсөл ${i + 1}`, "");
    append(projectFields, p.values);
  });
  lines.push(
    "Мэдээлэл боловсруулах зөвшөөрөл: " + (draft.consent ? "Тийм" : "Үгүй"),
  );
  return lines.join("\n");
}
