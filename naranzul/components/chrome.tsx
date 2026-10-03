import Link from "next/link";
import { practice } from "@/lib/projects";
export function Header() {
  return (
    <header className="site-header">
      <Link className="identity" href="/">
        {practice.name}
        <span>Interior designer</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/index">Index</Link>
        <Link href="/practice">Practice</Link>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/">
        Thresholds<span>An exhibition in progress</span>
      </Link>
      <p>
        Concept preview
        <br />
        Project photographs & information pending
      </p>
      <Link href="/practice">Practice & correspondence</Link>
    </footer>
  );
}
