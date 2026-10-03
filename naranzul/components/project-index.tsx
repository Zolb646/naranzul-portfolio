"use client";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Space } from "./space";
import { projects } from "@/lib/projects";
let selection = projects[0].slug;
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function snapshot() {
  try {
    const saved = sessionStorage.getItem("thresholds-index");
    if (projects.some((p) => p.slug === saved)) return saved!;
  } catch {}
  return selection;
}
function select(slug: string) {
  selection = slug;
  try {
    sessionStorage.setItem("thresholds-index", slug);
  } catch {}
  listeners.forEach((listener) => listener());
}
export function ProjectIndex() {
  const active = useSyncExternalStore(
    subscribe,
    snapshot,
    () => projects[0].slug,
  );
  const project = projects.find((p) => p.slug === active)!;
  return (
    <div className="index-layout">
      <div className="index-list">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            onMouseEnter={() => select(p.slug)}
            onFocus={() => select(p.slug)}
            onClick={() => select(p.slug)}
            className={`index-entry ${active === p.slug ? "is-active" : ""}`}
          >
            <span className="sequence">{p.number}</span>
            <div>
              <h2>{p.title}</h2>
              <p>{p.theme}</p>
              <span className="index-status">Placeholder study</span>
            </div>
            <span className="index-arrow" aria-hidden="true">
              ↗
            </span>
            <div className="mobile-index-image">
              <Space
                scene={p.scene}
                asset={p.entry}
                label="Project photograph pending"
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="index-preview">
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.title}`}
        >
          <Space
            key={project.slug}
            scene={project.scene}
            asset={project.entry}
            label="Project photograph pending"
          />
        </Link>
        <p>
          {project.number} / 03 <span>{project.title}</span>
        </p>
      </div>
    </div>
  );
}
