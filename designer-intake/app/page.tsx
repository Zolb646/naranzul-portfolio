import { BriefForm } from "@/components/brief-form";
export default function Page() {
  return (
    <>
      <BriefForm />
      <noscript>
        <div className="no-script">
          Энэ маягтыг бөглөх, файл татахын тулд JavaScript-ийг идэвхжүүлнэ үү. /
          Enable JavaScript to complete and download this form.
        </div>
      </noscript>
    </>
  );
}
