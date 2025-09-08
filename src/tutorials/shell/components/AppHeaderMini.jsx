// FILE: src/components/AppHeaderMini.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import tutorials from "../../tutorialsIndex";
const TUTORIALS = tutorials;

/**
 * Breadcrumbs with NO progress/memory dependence.
 * Pass tutorialSlug and optional sectionTitle from each page.
 */
function useBreadcrumbs({ tutorialSlug: propSlug, sectionTitle: propSectionTitle }) {
  const { slug: routeSlug } = useParams();
  const slug = propSlug || routeSlug || null;

  const tutorial = useMemo(
    () => (slug ? TUTORIALS.find((t) => t.slug === slug) : null),
    [slug]
  );

  const sectionTitle = propSectionTitle || null;

  return {
    items: [
      { label: "Tutorials", to: "/tutorials" },
      tutorial ? { label: tutorial.title, to: `/tutorials/${tutorial.slug}` } : null,
      sectionTitle ? { label: sectionTitle } : null,
    ].filter(Boolean),
  };
}

export default function AppHeaderMini({ tutorialSlug, sectionTitle, className = "" }) {
  const { items } = useBreadcrumbs({ tutorialSlug, sectionTitle });

  return (
    <header className={`sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur ${className}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <nav aria-label="Breadcrumb" className="truncate">
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              {items.map((it, i) => (
                <li key={i} className="flex items-center gap-2">
                  {it.to ? (
                    <Link to={it.to} className="truncate hover:text-gray-900 hover:underline">
                      {it.label}
                    </Link>
                  ) : (
                    <span className="truncate text-gray-900 font-medium">{it.label}</span>
                  )}
                  {i < items.length - 1 && <span className="text-gray-300">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-4 text-xs">
          <Link to="/" className="font-medium text-gray-500 hover:text-gray-900">Back to Blog</Link>
          <Link to="/tutorials" className="font-medium text-gray-500 hover:text-gray-900">All Tutorials</Link>
        </div>
      </div>
    </header>
  );
}

