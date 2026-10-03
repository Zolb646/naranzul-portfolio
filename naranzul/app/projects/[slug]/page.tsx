import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Space } from "@/components/space";
import { getProject, projects } from "@/lib/projects";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project?.title ?? "Study not found",
    description: project
      ? `${project.title}. A provisional spatial study; actual project information and photography are pending.`
      : undefined,
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getProject(project.next)!;
  return (
    <main id="main" className="project-page">
      <div className="project-back">
        <Link className="text-link" href="/index">
          Back to index
        </Link>
        <span>{project.number} / 03</span>
      </div>
      <header className="project-heading">
        <p className="quiet-label">Provisional spatial study</p>
        <h1>{project.title}</h1>
        <p>{project.theme}</p>
      </header>
      <div className="project-opening">
        <Space
          scene={project.scene}
          asset={project.entry}
          label="Entry photograph required"
          eager
        />
        <aside>
          <span className="quiet-label">Content pending</span>
          <p>
            This is an editorial framework, not a completed interior project.
          </p>
          <dl>
            <div>
              <dt>Location</dt>
              <dd>{project.metadata?.location ?? "[To be supplied]"}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.metadata?.year ?? "[To be supplied]"}</dd>
            </div>
            <div>
              <dt>Area</dt>
              <dd>{project.metadata?.area ?? "[To be supplied]"}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{project.metadata?.role ?? "[To be supplied]"}</dd>
            </div>
          </dl>
        </aside>
      </div>
      <div className="story">
        {project.story.map((block, i) =>
          block.kind === "note" ? (
            <section className="story-note" key={i}>
              <h2>{block.title}</h2>
              <p>{block.text}</p>
            </section>
          ) : block.kind === "pair" ? (
            <section
              className="story-pair"
              aria-label="Material and context"
              key={i}
            >
              <Space
                scene={block.scene}
                label={block.label}
                asset={block.asset}
              />
              <Space
                scene={project.scene}
                label={block.detail}
                asset={block.contextAsset}
              />
            </section>
          ) : (
            <div className={`story-image story-image-${block.scene}`} key={i}>
              <Space
                scene={block.scene}
                label={block.label}
                asset={block.asset}
              />
            </div>
          ),
        )}
      </div>
      <section className="project-credits">
        <h2>Designer’s notes & credits</h2>
        <p>[Designer’s own reflection required.]</p>
        <p>[Collaborators and photography credits required.]</p>
      </section>
      <section className="next-project">
        <div>
          <p className="quiet-label">The next threshold</p>
          <h2>
            <Link href={`/projects/${next.slug}`}>{next.title}</Link>
          </h2>
          <Link className="text-link" href={`/projects/${next.slug}`}>
            View study <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <Link href={`/projects/${next.slug}`} aria-label={`View ${next.title}`}>
          <Space
            scene={next.scene}
            asset={next.entry}
            label="Next project photograph pending"
          />
        </Link>
      </section>
    </main>
  );
}
