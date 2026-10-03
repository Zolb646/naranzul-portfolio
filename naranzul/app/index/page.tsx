import type { Metadata } from "next";
import { ProjectIndex } from "@/components/project-index";
export const metadata: Metadata = { title: "Index" };
export default function Index() {
  return (
    <main id="main" className="index-page">
      <div className="page-heading">
        <div>
          <p className="quiet-label">The exhibition</p>
          <h1>Index of spaces</h1>
        </div>
        <p>
          Three provisional studies.
          <br />
          Actual projects will take their place.
        </p>
      </div>
      <ProjectIndex />
    </main>
  );
}
