import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="quiet-label">404</p>
      <h1>This room isn’t here.</h1>
      <p>The page may have moved, or the address may be incomplete.</p>
      <Link className="text-link" href="/index">
        Return to the index
      </Link>
    </main>
  );
}
