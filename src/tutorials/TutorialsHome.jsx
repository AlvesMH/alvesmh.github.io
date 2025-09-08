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
export default function TutorialsHome() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return tutorials;
    return tutorials.filter((t) => {
      const title = (t.title || "").toLowerCase();
      const summary = (t.summary || t.description || "").toLowerCase();
      return title.includes(needle) || summary.includes(needle);
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
              {(tut.image || tut.cover) && (
                <img
                  src={tut.image || tut.cover}
                  alt=""
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
              )}

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
