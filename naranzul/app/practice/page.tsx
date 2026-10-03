import type { Metadata } from "next";
import Link from "next/link";
import { practice } from "@/lib/projects";
import { Space } from "@/components/space";
export const metadata: Metadata = { title: "Practice" };
export default function Practice() {
  return (
    <main id="main" className="practice-page">
      <div className="page-heading">
        <div>
          <p className="quiet-label">Behind the work</p>
          <h1>Practice</h1>
        </div>
        <p>Biography & correspondence</p>
      </div>
      <div className="practice-layout">
        <div className="practice-visual">
          <Space scene="detail" label="Studio or process photograph required" />
          <p className="small-note">
            A place for the working process.
            <br />
            Sketches, samples, and decisions in progress.
          </p>
        </div>
        <div className="practice-copy">
          <h2>{practice.name}</h2>
          <p className="practice-bio">
            [A short biography in the designer’s own words. Include where the
            practice is based, the work it undertakes, and the designer’s role.]
          </p>
          <section>
            <h3>Approach</h3>
            <p>
              [Describe one recurring design decision. Explain it through an
              actual project, material, or spatial constraint.]
            </p>
          </section>
          <section id="correspondence">
            <h3>Correspondence</h3>
            <p>
              For project conversations, editorial enquiries, and collaboration.
            </p>
            {practice.email ? (
              <a className="email-link" href={`mailto:${practice.email}`}>
                {practice.email}
              </a>
            ) : (
              <p className="pending-contact">[Contact email to be supplied]</p>
            )}
          </section>
          <section>
            <h3>About this preview</h3>
            <p>
              Thresholds is a proposed exhibition direction. The spatial
              drawings are abstract placeholders, not photographs or
              representations of completed work. Study titles are provisional.
            </p>
          </section>
          <Link className="text-link" href="/index">
            Return to the exhibition <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
