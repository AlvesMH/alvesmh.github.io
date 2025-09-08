// FILE: src/components/Shell.jsx
import React, { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppHeaderMini from "./AppHeaderMini";
import AppFooterMini from "./AppFooterMini";
import { TUTORIALS } from "../data/tutorials";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const PROGRESS_KEY = "tutorial_progress";

function safeParse(json, fallback) { try { return json ? JSON.parse(json) : fallback; } catch { return fallback; } }

function updateProgress({ slug, sectionId, sectionTitle, totalSections }) {
  if (!slug) return;
  const store = safeParse(localStorage.getItem(PROGRESS_KEY), {});
  const cur = store[slug] || { sectionsCompleted: [], totalSections: totalSections || undefined };
  const set = new Set(Array.isArray(cur.sectionsCompleted) ? cur.sectionsCompleted : []);
  if (sectionId) set.add(sectionId);
  const updated = {
    ...cur,
    sectionsCompleted: Array.from(set),
    lastSectionId: sectionId || cur.lastSectionId || null,
    lastSectionTitle: sectionTitle || cur.lastSectionTitle || null,
    updatedAt: Date.now(),
  };
  store[slug] = updated;
  store.__lastVisited__ = { slug, sectionId: updated.lastSectionId, sectionTitle: updated.lastSectionTitle, visitedAt: Date.now() };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
}

export default function Shell({
  children,
  className = "",
  tutorialSlug: propSlug,
  sections: propSections, // [{id/slug, title}]
  currentSectionId: propSectionId,
  currentSectionTitle: propSectionTitle,
  onNavigateSection, // (nextId) => void, optional
}) {
  const { slug: routeSlug } = useParams();
  const loc = useLocation();
  const navigate = useNavigate();
  const slug = propSlug || routeSlug || null;

  const tutorial = useMemo(() => (slug ? TUTORIALS.find(t => t.slug === slug) : null), [slug]);
  const sections = useMemo(() => {
    const fromProps = propSections && propSections.length ? propSections : (tutorial?.sections || []);
    return fromProps.map((s, idx) => ({
      id: s.id || s.slug || String(idx),
      title: s.title || s.name || `Section ${idx + 1}`,
    }));
  }, [propSections, tutorial]);

  const urlSection = new URLSearchParams(loc.search).get("section") || (loc.hash ? loc.hash.replace(/^#/, "") : null);
  const currentId = propSectionId || urlSection || (sections[0]?.id || null);
  const currentIndex = Math.max(0, sections.findIndex(s => s.id === currentId));
  const currentTitle = propSectionTitle || sections[currentIndex]?.title || null;

  const prev = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const next = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  const goSection = (target) => {
    if (!target) return;
    if (typeof onNavigateSection === "function") {
      onNavigateSection(target.id);
    } else if (slug) {
      // Fallback: prefer query param if supported by your pages; otherwise use hash
      const sp = new URLSearchParams(loc.search);
      sp.set("section", target.id);
      navigate({ pathname: `/tutorials/${slug}`, search: `?${sp.toString()}` }, { replace: false });
      // Also set hash for pages that rely on it
      setTimeout(() => { try { window.location.hash = target.id; } catch {} }, 0);
    }
  };

  const markCompleteAndNext = () => {
    updateProgress({ slug, sectionId: currentId, sectionTitle: currentTitle, totalSections: sections.length });
    if (next) goSection(next);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <AppHeaderMini tutorialSlug={slug} sectionId={currentId} sectionTitle={currentTitle} />

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          {children}
        </div>

        {/* Prev/Next nav */}
        <nav className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            {prev ? (
              <button
                onClick={() => goSection(prev)}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" /> {prev.title}
              </button>
            ) : (
              <span className="text-xs text-gray-400">Start</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateProgress({ slug, sectionId: currentId, sectionTitle: currentTitle, totalSections: sections.length })}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              title="Mark this section complete"
            >
              <Check className="h-4 w-4" /> Mark complete
            </button>
            {next ? (
              <button
                onClick={markCompleteAndNext}
                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <span className="text-xs text-gray-400">End</span>
            )}
          </div>
        </nav>
      </main>

      <AppFooterMini />
    </div>
  );
}
