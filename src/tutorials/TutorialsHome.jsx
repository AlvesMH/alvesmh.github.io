import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AppHeaderMini from "./shell/components/AppHeaderMini";
import AppFooterMini from "./shell/components/AppFooterMini";
import tutorials from "./tutorialsIndex";

/**
 * TutorialsHome.jsx — “All Tutorials” hub
 * - No progress/memory features.
 * - Lists every tutorial and its sections (and subtopics where provided).
 * - Responsive: 2 columns on large screens (card grid), stacked on mobile.
 */

// Map all possible cover assets under src/tutorials
const coverMap = import.meta.glob(
  "./tutorials/**/*.{png,jpg,jpeg,webp,avif,svg}",
  { query: '?url', import: 'default' });

// Resolve tut.image / tut.cover / inferred defaults to a real URL
function getCoverUrl(tut) {
  const cand = [tut.image, tut.cover].filter(Boolean);

  // 1) any absolute or http(s) path: return as-is
  for (const c of cand) {
    if (c && (c.startsWith("/") || /^https?:\/\//i.test(c))) return c;
  }

  // 2) try direct match by end of path (e.g., "cover.jpg" or "foo/cover.png")
  for (const c of cand) {
    if (!c) continue;
    const key = Object.keys(coverMap).find(k => k.endsWith("/" + c) || k.endsWith(c));
    if (key) return coverMap[key];
  }

  // 3) common conventions by slug (cover/hero/thumb in same folder)
  const guesses = [
    `./tutorials/${tut.slug}/cover.jpg`,
    `./tutorials/${tut.slug}/cover.png`,
    `./tutorials/${tut.slug}/cover.webp`,
    `./tutorials/${tut.slug}/hero.jpg`,
    `./tutorials/${tut.slug}/thumb.jpg`,
  ];
  for (const g of guesses) if (coverMap[g]) return coverMap[g];

  // 4) give up → undefined (we’ll render a placeholder)
  return undefined;
}


export default function TutorialsHome() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return tutorials;
    return tutorials.filter((t) => {
      const title = (t.title || "").toLowerCase();
      const summary = (t.summary || t.description || "").toLowerCase();
      const inSections =
        Array.isArray(t.sections) &&
        t.sections.some(s =>
          (s.title || "").toLowerCase().includes(needle) ||
          (Array.isArray(s.children) &&
          s.children.some(c => (c.title || "").toLowerCase().includes(needle)))
        );
      return title.includes(needle) || summary.includes(needle) || inSections;
    });
  }, [q]);

  return (
    <>
      <AppHeaderMini />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            All Tutorials
          </h1>
          <p className="mt-2 text-slate-700 max-w-3xl">
            Browse the full catalog. Each tutorial is split into sequential sections with flashcards and quizzes.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tutorials…"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-600 focus:outline-none"
            aria-label="Search tutorials"
          />
        </div>

        {/* Grid */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tut) => (
            <article
              key={tut.slug}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Cover */}
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                {(() => {
                  const url = getCoverUrl(tut);
                  if (!url) {
                    // Nice placeholder with the tutorial initial
                    const initial = (tut.title || "?").trim().charAt(0).toUpperCase();
                    return (
                      <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-slate-300 select-none">
                        {initial}
                      </div>
                    );
                  }
                  return (
                    <img
                      src={url}
                      alt={tut.imageAlt || tut.title || ""}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  );
                })()}
                {/* Make whole cover clickable (keeps your CTA below too) */}
                <Link
                  to={tut.href || `/tutorials/${tut.slug}`}
                  className="absolute inset-0 ring-inset focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  aria-label={`Open ${tut.title}`}
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-base font-semibold text-gray-900">
                  <Link to={tut.href || `/tutorials/${tut.slug}`} className="hover:underline">
                    {tut.title}
                  </Link>
                </h2>
                {tut.summary && (
                  <p className="mt-1 text-sm text-gray-600">{tut.summary}</p>
                )}

                {/* Sections */}
                {Array.isArray(tut.sections) && tut.sections.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Sections
                    </div>
                    <ul className="space-y-1">
                      {tut.sections.map((sec) => (
                        <li key={sec.id || sec.slug}>
                          <Link
                            to={sec.href}
                            className="text-sm text-blue-700 hover:text-blue-900 hover:underline"
                          >
                            {sec.title}
                          </Link>

                          {/* Subtopics (optional) */}
                          {Array.isArray(sec.children) && sec.children.length > 0 && (
                            <ul className="mt-1 ml-4 list-disc space-y-0.5 text-sm text-gray-700">
                              {sec.children.map((child) => (
                                <li key={child.id || child.slug}>
                                  <Link
                                    to={child.href}
                                    className="text-blue-700 hover:text-blue-900 hover:underline"
                                  >
                                    {child.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-4">
                  <Link
                    to={tut.href || `/tutorials/${tut.slug}`}
                    className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-100"
                  >
                    Open tutorial →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center text-sm text-gray-600">
            No tutorials match your search. Try another query.
          </div>
        )}
      </main>

      <AppFooterMini />
    </>
  );
}
