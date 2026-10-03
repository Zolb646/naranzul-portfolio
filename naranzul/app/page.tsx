import Link from "next/link";
import { Space } from "@/components/space";
import { projects } from "@/lib/projects";
export default function Home() {
  const [first, second, third] = projects;
  return (
    <main id="main">
      <section className="entrance" aria-labelledby="exhibition-title">
        <div className="entrance-copy">
          <p className="quiet-label">An exhibition in progress</p>
          <h1 id="exhibition-title">Thresholds</h1>
          <p className="entrance-line">
            On space,{" "}
            <br />
            and the space between.
          </p>
          <p className="preview-note">
            Three spatial studies.{" "}
            <br />A framework for work yet to be introduced.
          </p>
        </div>
        <Link
          className="entrance-image"
          href={`/projects/${first.slug}`}
          aria-label={`View ${first.title}`}
        >
          <Space
            scene={first.scene}
            asset={first.entry}
            label="Entry photograph pending"
            eager
          />
        </Link>
        <div className="entrance-caption">
          <span className="sequence">01 / 03</span>
          <Link href={`/projects/${first.slug}`}>
            {first.title}
            <span className="text-link">
              View study <span aria-hidden="true">↗</span>
            </span>
          </Link>
          <a className="continue" href="#further">
            Continue below <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section className="exhibition-intro" id="further">
        <span className="quiet-label">The exhibition</span>
        <p>
          A doorway. A passage.
          <br />A surface catching light.
        </p>
        <span className="intro-note">
          A proposed reading of the work.
          <br />
          All images are abstract placeholders.
        </span>
      </section>
      <section
        className="project-composition passage-composition"
        aria-labelledby="second-title"
      >
        <Link
          className="main-space"
          href={`/projects/${second.slug}`}
          aria-label={`View ${second.title}`}
        >
          <Space
            scene="passage"
            asset={second.entry}
            label="Circulation photograph pending"
          />
        </Link>
        <div className="composition-aside">
          <span className="sequence">02 / 03</span>
          <h2 id="second-title">
            <Link href={`/projects/${second.slug}`}>{second.title}</Link>
          </h2>
          <p>{second.theme}</p>
          <Link className="text-link" href={`/projects/${second.slug}`}>
            View study <span aria-hidden="true">↗</span>
          </Link>
          <Space scene="detail" label="Detail pending" />
        </div>
      </section>
      <section
        className="project-composition light-composition"
        aria-labelledby="third-title"
      >
        <div className="light-copy">
          <span className="sequence">03 / 03</span>
          <h2 id="third-title">
            <Link href={`/projects/${third.slug}`}>
              Where light <br />
              settles
            </Link>
          </h2>
          <p>{third.theme}</p>
          <Link className="text-link" href={`/projects/${third.slug}`}>
            View study <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <Link
          href={`/projects/${third.slug}`}
          className="main-space"
          aria-label={`View ${third.title}`}
        >
          <Space
            scene="light"
            asset={third.entry}
            label="Daylight photograph pending"
          />
        </Link>
      </section>
      <div className="exhibition-end">
        <p>Another way to look.</p>
        <Link className="text-link" href="/index">
          Explore the index <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}
