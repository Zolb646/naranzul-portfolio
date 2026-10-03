"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  sections,
  projectFields,
  parseDraft,
  validateDraft,
  safeUrl,
  type Field,
  type IntakeDraft,
} from "@/lib/intake";
import { localField, optionLabel, t, type Language } from "@/lib/english";
import {
  clearDraft,
  getStorageStatus,
  updateDraft,
  useDraft,
} from "@/lib/draft-store";

const stepNames = [
  ["Таны тухай", "About you"],
  ["Холбоо барих", "Contact"],
  ["Сайтын чиглэл", "Direction"],
  ["Төслүүд", "Projects"],
  ["Хянах ба татах", "Review & download"],
];
function download(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function textExport(draft: IntakeDraft, lang: Language) {
  const lines = [
    t(
      lang,
      "ПОРТФОЛИО — ДИЗАЙНЕРЫН МЭДЭЭЛЭЛ",
      "PORTFOLIO — DESIGNER CONTENT BRIEF",
    ),
    new Date().toISOString(),
    "",
  ];
  const add = (
    fields: Field[],
    values: Record<string, string>,
    isProject = false,
  ) =>
    fields.forEach((f) => {
      const field = localField(f, lang, isProject);
      lines.push(
        field.label,
        optionLabel(values[f.key]?.trim() || "—", lang),
        "",
      );
    });
  sections.forEach((s, i) => {
    lines.push(`## ${stepNames[i][lang === "mn" ? 0 : 1]}`, "");
    add(s.fields, draft.values);
  });
  draft.projects.forEach((p, i) => {
    lines.push(`## ${t(lang, "Төсөл", "Project")} ${i + 1}`, "");
    add(projectFields, p.values, true);
  });
  lines.push(
    t(
      lang,
      "Мэдээллийг сайт бэлтгэхэд ашиглах зөвшөөрөл: ",
      "Permission to use this information to prepare the portfolio: ",
    ) + (draft.consent ? t(lang, "Тийм", "Yes") : t(lang, "Үгүй", "No")),
  );
  return lines.join("\n");
}

export function BriefForm() {
  const draft = useDraft();
  const [lang, setLang] = useState<Language>("mn");
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [reset, setReset] = useState(false);
  const [pendingImport, setPendingImport] = useState<IntakeDraft | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const importer = useRef<HTMLInputElement>(null);
  const tr = (mn: string, en: string) => t(lang, mn, en);
  const requiredTotal =
    sections.flatMap((s) => s.fields).filter((f) => f.required).length +
    draft.projects.length * projectFields.filter((f) => f.required).length;
  const filled =
    sections
      .flatMap((s) => s.fields)
      .filter((f) => f.required && draft.values[f.key]?.trim()).length +
    draft.projects.reduce(
      (sum, p) =>
        sum +
        projectFields.filter((f) => f.required && p.values[f.key]?.trim())
          .length,
      0,
    );
  const missing = validateDraft(draft);
  const navigate = (next: number) => {
    setStep(next);
    setStatus("");
    requestAnimationFrame(() => {
      heading.current?.focus();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  };
  const change = (key: string, value: string, projectId?: string) => {
    setStatus("");
    updateDraft(
      projectId
        ? {
            ...draft,
            projects: draft.projects.map((p) =>
              p.id === projectId
                ? { ...p, values: { ...p.values, [key]: value } }
                : p,
            ),
          }
        : { ...draft, values: { ...draft.values, [key]: value } },
    );
  };
  const exportFile = (format: "json" | "txt", asDraft = false) => {
    if (!asDraft && missing.length) {
      setShowErrors(true);
      setStatus(
        tr(
          "Шаардлагатай талбаруудыг гүйцээж, имэйл болон холбоосуудаа шалгана уу.",
          "Complete the required fields and check your emails and links.",
        ),
      );
      return;
    }
    const basename = `portfolio-brief-${asDraft ? "draft-" : ""}${new Date().toISOString().slice(0, 10)}`;
    download(
      `${basename}.${format}`,
      format === "json"
        ? JSON.stringify(
            {
              ...draft,
              exportedAt: new Date().toISOString(),
              status: asDraft ? "draft" : "complete",
            },
            null,
            2,
          )
        : textExport(draft, lang),
      format === "json"
        ? "application/json;charset=utf-8"
        : "text/plain;charset=utf-8",
    );
    setStatus(
      tr(
        "Татах хүсэлт илгээгдлээ. Файлаа Downloads хавтаснаас шалгаад сайт хөгжүүлэгчдээ илгээнэ үү.",
        "Download requested. Check your Downloads folder, then send the file to your website developer.",
      ),
    );
  };
  async function importFile(file: File | undefined) {
    if (!file) return;
    try {
      if (file.size > 8_000_000) throw Error();
      const parsed = parseDraft(JSON.parse(await file.text()));
      if (!parsed) throw Error();
      setPendingImport(parsed);
      setStatus("");
    } catch {
      setStatus(
        tr(
          "Файлыг уншиж чадсангүй. Энэ сайтаас татсан, 8 MB-аас бага JSON файлыг сонгоно уу.",
          "Unable to read this file. Choose a JSON backup from this site smaller than 8 MB.",
        ),
      );
    }
    if (importer.current) importer.current.value = "";
  }
  function renderField(
    original: Field,
    values: Record<string, string>,
    projectId?: string,
  ) {
    const field = localField(original, lang, !!projectId);
    const id = `${projectId ?? "profile"}-${field.key}`;
    const value = values[field.key] ?? "";
    const invalid =
      showErrors &&
      ((field.required && !value.trim()) ||
        (field.type === "email" &&
          value &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ||
        (field.type === "url" && value && !safeUrl(value)));
    const shared = {
      id,
      name: id,
      value,
      onChange: (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => change(field.key, event.target.value, projectId),
      required: field.required,
      "aria-invalid": !!invalid,
      "aria-describedby": field.hint ? `${id}-hint` : undefined,
    };
    return (
      <div
        key={id}
        className={`field ${field.type === "textarea" ? "wide" : ""}`}
      >
        <label htmlFor={id}>
          {field.label}
          {field.required && (
            <span className="required" aria-label={tr("Заавал", "Required")}>
              {" "}
              *
            </span>
          )}
        </label>
        {field.hint && (
          <p id={`${id}-hint`} className="field-hint">
            {field.hint}
          </p>
        )}
        {field.type === "textarea" ? (
          <textarea {...shared} rows={4} maxLength={10000} />
        ) : field.type === "select" ? (
          <select {...shared}>
            <option value="">{tr("Сонгоно уу", "Select an option")}</option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {optionLabel(o, lang)}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...shared}
            type={field.type ?? "text"}
            maxLength={10000}
            autoComplete={
              field.type === "email"
                ? "email"
                : field.key === "name"
                  ? "name"
                  : "off"
            }
          />
        )}
        {invalid && (
          <span className="field-error">
            {tr("Энэ талбарыг шалгана уу.", "Please check this field.")}
          </span>
        )}
      </div>
    );
  }
  function reviewFields(
    fields: Field[],
    values: Record<string, string>,
    isProject = false,
  ) {
    return (
      <dl className="review-values">
        {fields.map((f) => (
          <div key={f.key}>
            <dt>{localField(f, lang, isProject).label}</dt>
            <dd className={!values[f.key]?.trim() ? "empty-value" : ""}>
              {optionLabel(
                values[f.key]?.trim() ||
                  tr(
                    f.required ? "Заавал бөглөнө" : "Оруулаагүй",
                    f.required ? "Required — missing" : "Not supplied",
                  ),
                lang,
              )}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  return (
    <div className="brief-app" lang={lang}>
      <a className="skip-link" href="#content">
        {tr("Маягт руу очих", "Skip to form")}
      </a>
      <header className="brief-header">
        <Link href="/" className="wordmark">
          <span className="mark" aria-hidden="true">
            ▤
          </span>
          <span>
            Portfolio
            <span className="wordmark-sub">
              {tr("Агуулгын бэлтгэл", "Content collection")}
            </span>
          </span>
        </Link>
        <div className="header-tools">
          <span className="local-label">
            <span aria-hidden="true" />{" "}
            {tr("Зөвхөн таны төхөөрөмж дээр", "Stays on your device")}
          </span>
          <div className="language" role="group" aria-label="Language / Хэл">
            {(["mn", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={lang === l}
                onClick={() => {
                  setLang(l);
                  document.documentElement.lang = l;
                  setStatus("");
                }}
              >
                {l === "mn" ? "MN" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="brief-layout">
        <aside className="sidebar">
          <p className="eyebrow">
            {tr("Таны портфолионы эхлэл", "Your portfolio starts here")}
          </p>
          <h1>{tr("Бүтээлийнхээ тухай ярья.", "Let’s document your work.")}</h1>
          <p className="sidebar-intro">
            {tr(
              "Өөрийн үгээр бичээрэй. Бид эдгээр мэдээллээр таны орон зайг харах өнцгийг сайт дээр илэрхийлнэ.",
              "Write in your own words. This material will help your website express the way you see space.",
            )}
          </p>
          <nav aria-label={tr("Маягтын хэсгүүд", "Form sections")}>
            {stepNames.map((names, i) => (
              <button
                type="button"
                key={names[1]}
                className={step === i ? "active" : ""}
                aria-current={step === i ? "step" : undefined}
                onClick={() => navigate(i)}
              >
                <span className="step-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{names[lang === "mn" ? 0 : 1]}</span>
                <span className="step-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            ))}
          </nav>
          <div className="progress-block">
            <div>
              <span>{tr("Бөглөсөн талбар", "Required fields filled")}</span>
              <span>
                {filled} / {requiredTotal}
              </span>
            </div>
            <progress max={requiredTotal} value={filled} />
            <p>
              {tr(
                "Хэсэгчлэн бөглөөд дараа үргэлжлүүлж болно.",
                "You can work in stages and return later.",
              )}
            </p>
          </div>
          <div className="file-tools">
            <button type="button" onClick={() => exportFile("json", true)}>
              {tr("Ноорог татах (.json)", "Download draft (.json)")}
            </button>
            <button type="button" onClick={() => importer.current?.click()}>
              {tr("Хадгалсан файлаа нээх", "Import saved file")}
            </button>
            <input
              ref={importer}
              type="file"
              accept=".json,application/json"
              className="visually-hidden"
              tabIndex={-1}
              aria-label={tr("JSON файл сонгох", "Choose JSON file")}
              onChange={(e) => void importFile(e.target.files?.[0])}
            />
          </div>
          <p className="save-status" role="status">
            {getStorageStatus() === "unavailable"
              ? tr(
                  "Автомат хадгалалт боломжгүй. Нооргоо файл болгон татаж нөөцлөөрэй.",
                  "Local saving is unavailable. Download a draft backup.",
                )
              : getStorageStatus() === "saved"
                ? tr("Энэ браузерт хадгалагдсан", "Saved in this browser")
                : tr(
                    "Бөглөх үед автоматаар хадгална",
                    "Saves locally as you type",
                  )}
          </p>
        </aside>
        <main id="content" className="form-main">
          <div className="section-heading">
            <span className="eyebrow">
              {tr("Хэсэг", "Part")} {step + 1} / 5
            </span>
            <h2 ref={heading} tabIndex={-1}>
              {stepNames[step][lang === "mn" ? 0 : 1]}
            </h2>
            <p>
              {step < 3
                ? lang === "mn"
                  ? sections[step].description
                  : [
                      "Your name, biography, approach and portrait.",
                      "Separate your private correspondence details from public contact information.",
                      "Your audience, language, brand materials and preferred direction.",
                    ][step]
                : step === 3
                  ? tr(
                      "Төсөл бүрийг тусад нь оруулна. Дээш байрласан төслийг түрүүлж онцлоно.",
                      "Add each project separately. Projects at the top will be featured first.",
                    )
                  : tr(
                      "Хариултуудаа шалгаад файл болгон татаж, сайт хөгжүүлэгчдээ илгээнэ үү.",
                      "Review your answers, download a file, and send it to your website developer.",
                    )}
            </p>
          </div>
          {status && (
            <div className="notice" role="status">
              {status}
            </div>
          )}
          {pendingImport && (
            <div className="notice confirm-box" role="alert">
              <p>
                {tr(
                  "Одоогийн нооргийг импортлох файлаар солих уу? Эхлээд нооргоо татаж нөөцөлж болно.",
                  "Replace the current draft with the imported file? You can download a backup first.",
                )}
              </p>
              <button
                type="button"
                onClick={() => {
                  updateDraft(pendingImport);
                  setPendingImport(null);
                  setShowErrors(false);
                  navigate(0);
                }}
              >
                {tr("Файлыг нээх", "Replace draft")}
              </button>
              <button type="button" onClick={() => setPendingImport(null)}>
                {tr("Болих", "Cancel")}
              </button>
            </div>
          )}
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 4) navigate(step + 1);
              else exportFile("json");
            }}
          >
            {step < 3 && (
              <>
                <p className="required-note">
                  {tr(
                    "* Заавал бөглөх талбар. Бусдыг материал бэлэн болмогц нэмэж болно.",
                    "* Required field. Other details can be added when available.",
                  )}
                </p>
                {step === 0 && (
                  <div className="guide">
                    <strong>
                      {tr(
                        "Эхлээд бэлтгэх зүйлс",
                        "Useful things to have ready",
                      )}
                    </strong>
                    <p>
                      {tr(
                        "Товч намтар, хөрөг зураг, 3 орчим онцлох төсөл, эх зурагтай хавтас. Зураг хавсаргахын оронд үзэх эрхтэй хавтасны холбоосыг оруулна.",
                        "A short biography, a portrait, around three selected projects, and folders of original images. Provide accessible folder links rather than uploading files here.",
                      )}
                    </p>
                  </div>
                )}
                <div className="fields-grid">
                  {sections[step].fields.map((f) =>
                    renderField(f, draft.values),
                  )}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="guide">
                  <strong>
                    {tr(
                      "Зурагт хэрэгтэй дараалал",
                      "A useful photographic sequence",
                    )}
                  </strong>
                  <p>
                    {tr(
                      "Орох өнцөг → ерөнхий орон зай → материал → өрөөнүүдийн холбоо → деталь → гэрэл → эцсийн кадр. Зураг бүрийн файлын нэр, тайлбар, кредитийг тэмдэглээрэй.",
                      "Entrance → establishing view → materials → connected rooms → details → light → closing view. Include filenames, captions and credits.",
                    )}
                  </p>
                  <p>
                    {tr(
                      "Хувийн хаяг, захиалагчийн нууц мэдээлэл, нэвтрэх нууц үг бүү оруулаарай.",
                      "Do not include private addresses, confidential client details or account passwords.",
                    )}
                  </p>
                </div>
                {draft.projects.map((project, index) => (
                  <section className="project-form" key={project.id}>
                    <header>
                      <div>
                        <span className="eyebrow">
                          {tr("Төсөл", "Project")}{" "}
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3>
                          {project.values.title ||
                            tr("Шинэ төсөл", "Untitled project")}
                        </h3>
                      </div>
                      <div className="project-actions">
                        <button
                          type="button"
                          disabled={index === 0}
                          aria-label={tr(
                            "Төслийг дээш зөөх",
                            "Move project up",
                          )}
                          onClick={() => {
                            const ps = [...draft.projects];
                            [ps[index - 1], ps[index]] = [
                              ps[index],
                              ps[index - 1],
                            ];
                            updateDraft({ ...draft, projects: ps });
                          }}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          disabled={index === draft.projects.length - 1}
                          aria-label={tr(
                            "Төслийг доош зөөх",
                            "Move project down",
                          )}
                          onClick={() => {
                            const ps = [...draft.projects];
                            [ps[index + 1], ps[index]] = [
                              ps[index],
                              ps[index + 1],
                            ];
                            updateDraft({ ...draft, projects: ps });
                          }}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          disabled={draft.projects.length === 1}
                          onClick={() => setRemoveId(project.id)}
                        >
                          {tr("Хасах", "Remove")}
                        </button>
                      </div>
                    </header>
                    {removeId === project.id && (
                      <div className="confirm-box" role="alert">
                        <p>
                          {tr(
                            "Энэ төслийг нооргоос хасах уу?",
                            "Remove this project from the draft?",
                          )}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            updateDraft({
                              ...draft,
                              projects: draft.projects.filter(
                                (p) => p.id !== project.id,
                              ),
                            });
                            setRemoveId(null);
                          }}
                        >
                          {tr("Тийм, хасах", "Yes, remove")}
                        </button>
                        <button type="button" onClick={() => setRemoveId(null)}>
                          {tr("Болих", "Cancel")}
                        </button>
                      </div>
                    )}
                    <div className="fields-grid">
                      {projectFields.map((f) =>
                        renderField(f, project.values, project.id),
                      )}
                    </div>
                  </section>
                ))}
                <button
                  className="add-project"
                  type="button"
                  disabled={draft.projects.length >= 20}
                  onClick={() => {
                    updateDraft({
                      ...draft,
                      projects: [
                        ...draft.projects,
                        { id: crypto.randomUUID(), values: {} },
                      ],
                    });
                    setStatus(
                      tr(
                        "Шинэ төсөл доор нэмэгдлээ.",
                        "A new project has been added below.",
                      ),
                    );
                  }}
                >
                  ＋ {tr("Төсөл нэмэх", "Add another project")}
                </button>
                <p className="field-hint">
                  {tr(
                    "Хамгийн ихдээ 20 төсөл. Бэлэн болсон 1–3 төслөөс эхэлж болно.",
                    "Up to 20 projects. You can start with 1–3 that are ready.",
                  )}
                </p>
              </>
            )}
            {step === 4 && (
              <>
                {showErrors && missing.length > 0 && (
                  <div className="error-summary" role="alert">
                    <h3>
                      {tr(
                        "Гүйцээх мэдээлэл байна",
                        "Some details still need attention",
                      )}
                    </h3>
                    <p>
                      {tr(
                        "Доорх хэсгүүдийг нээж, заавал бөглөх талбарууд, имэйл болон холбоосоо шалгана уу.",
                        "Use Edit below to check required fields, email addresses and links.",
                      )}
                    </p>
                  </div>
                )}
                {sections.map((section, index) => (
                  <section className="review-section" key={section.id}>
                    <header>
                      <h3>{stepNames[index][lang === "mn" ? 0 : 1]}</h3>
                      <button type="button" onClick={() => navigate(index)}>
                        {tr("Засах", "Edit")}
                      </button>
                    </header>
                    {reviewFields(section.fields, draft.values)}
                  </section>
                ))}
                {draft.projects.map((p, index) => (
                  <section className="review-section" key={p.id}>
                    <header>
                      <h3>
                        {tr("Төсөл", "Project")} {index + 1}:{" "}
                        {p.values.title || tr("Нэр оруулаагүй", "Untitled")}
                      </h3>
                      <button type="button" onClick={() => navigate(3)}>
                        {tr("Засах", "Edit")}
                      </button>
                    </header>
                    {reviewFields(projectFields, p.values, true)}
                  </section>
                ))}
                <label className="consent">
                  <input
                    type="checkbox"
                    checked={draft.consent}
                    onChange={(e) =>
                      updateDraft({ ...draft, consent: e.target.checked })
                    }
                  />
                  <span>
                    {tr(
                      "Энэ мэдээллийг миний портфолио сайтыг бэлтгэхэд ашиглаж болно. Нийтлэх хязгаарлалт, зургийн эрх болон кредитийг тус бүрд нь тэмдэглэсэн.",
                      "This information may be used to prepare my portfolio. I have noted publication restrictions, image permissions and credits where relevant.",
                    )}
                  </span>
                </label>
                <div className="download-panel">
                  <h3>
                    {tr(
                      "Бэлэн болсон багцаа татах",
                      "Download your content brief",
                    )}
                  </h3>
                  <p>
                    {tr(
                      "JSON нь бүх мэдээллийг хадгалж, энд дахин нээх боломжтой. TXT нь уншихад хялбар хувилбар. Зургийн файлууд орохгүй, хавтасны холбоосууд багтана.",
                      "JSON preserves every field and can be imported here later. TXT is a readable copy. Image files are not included; your folder links are.",
                    )}
                  </p>
                  <div>
                    <button
                      className="primary"
                      type="button"
                      onClick={() => exportFile("json")}
                    >
                      {tr("Мэдээлэл татах (.json)", "Download brief (.json)")}{" "}
                      <span aria-hidden="true">↓</span>
                    </button>
                    <button
                      className="secondary"
                      type="button"
                      onClick={() => exportFile("txt")}
                    >
                      {tr("Унших хувилбар (.txt)", "Readable copy (.txt)")}
                    </button>
                  </div>
                  <p className="field-hint">
                    {tr(
                      "Энэ сайт мэдээллийг автоматаар бидэнд илгээхгүй. Татсан файлаа өөрөө дамжуулна уу.",
                      "This site does not send us your answers. Please share the downloaded file yourself.",
                    )}
                  </p>
                </div>
                <div className="reset-area">
                  <button type="button" onClick={() => setReset(true)}>
                    {tr(
                      "Энэ төхөөрөмж дээрх нооргийг арилгах",
                      "Clear the draft on this device",
                    )}
                  </button>
                  {reset && (
                    <div className="confirm-box" role="alert">
                      <p>
                        {tr(
                          "Хадгалсан бүх хариулт арилна. Эхлээд файл татаж авсан эсэхээ шалгана уу.",
                          "All locally saved answers will be removed. Make sure you have downloaded a backup.",
                        )}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          clearDraft();
                          setReset(false);
                          setShowErrors(false);
                          navigate(0);
                        }}
                      >
                        {tr("Арилгах", "Clear draft")}
                      </button>
                      <button type="button" onClick={() => setReset(false)}>
                        {tr("Болих", "Cancel")}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="form-navigation">
              {step > 0 ? (
                <button
                  className="secondary"
                  type="button"
                  onClick={() => navigate(step - 1)}
                >
                  ← {tr("Өмнөх", "Back")}
                </button>
              ) : (
                <span />
              )}
              {step < 4 && (
                <button className="primary" type="submit">
                  {tr("Үргэлжлүүлэх", "Continue")}{" "}
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </form>
          <footer className="form-footer">
            <span>
              Portfolio / {tr("Агуулгын бэлтгэл", "Content collection")}
            </span>
            <p>
              {tr(
                "Хариултууд энэ браузерт хадгалагдана. Өөр төхөөрөмж рүү шилжихээс өмнө JSON нооргоо татаж аваарай.",
                "Answers are stored in this browser. Download a JSON backup before switching devices.",
              )}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
