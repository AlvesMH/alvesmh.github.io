import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { ensureSlug, makePostPath } from '../utils/slugify';

// Fallback reading-time estimator (200 wpm) if your data doesn't provide it
function estimateMinutes(p) {
  const explicit = p.readingTime || p.readTime || p.readTimeMin || p.readingTimeMin || p.minutes;
  if (explicit) {
    const n = Number(String(explicit).match(/\d+/)?.[0]);
    return Number.isFinite(n) ? n : String(explicit);
 }

  const text =
    (p.content || p.markdown || p.excerpt || p.title || '').toString();
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(d) {
  try {
    // Old layout looks dd/mm/yyyy-ish; en-GB matches that
    return new Date(d).toLocaleDateString('en-GB');
  } catch {
    return '';
  }
}

export default function PostsGrid({ posts = [] }) {
  const items = posts.map(ensureSlug);

  if (!items.length) {
    return (
      <div className="bg-white border rounded-xl p-6 text-center text-gray-700">
        No posts found. Try clearing filters or search terms.
      </div>
    );
  }

  // OLD LOOK: stacked cards, not a multi-column grid
  return (
    <div className="space-y-6">
      {items.map((p) => {
        const minutes = estimateMinutes(p);
        const dateLabel = formatDate(p.date || p.publishedAt);
        const tags = Array.isArray(p.tags) ? p.tags : [];
        const category = p.category ? [p.category] : [];

        return (
          <article
            key={p.slug}
            className="bg-white border border-slate-200 rounded-xl shadow-sm px-5 py-4"
          >
            {/* Meta row: date • minutes */}
            <div className="flex items-center gap-4 text-sm text-slate-500">
              {dateLabel && (
                <div className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={p.date}>{dateLabel}</time>
                </div>
              )}
              <span aria-hidden="true">•</span>
              <div className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>{typeof minutes === 'number' ? `${minutes} min read` : minutes}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-slate-900 leading-snug">
              <Link to={makePostPath(p)} className="hover:text-blue-700">
                {p.title}
              </Link>
            </h3>

            {/* Excerpt */}
            {p.excerpt && (
              <p className="mt-2 text-slate-700">
                {p.excerpt}
              </p>
            )}

            {/* Pills: category first, then tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                ...(p.category ? [p.category] : []),
                ...(Array.isArray(p.tags) ? p.tags : [])
              ].map((t, i) => (
                <span
                  key={`${p.slug}-tag-${i}-${t}`}
                  className="inline-block rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Read more */}
            <div className="mt-3">
              <Link
                to={makePostPath(p)}
                className="inline-flex items-center text-blue-700 hover:underline font-medium"
                aria-label={`Read more about ${p.title}`}
              >
                Read More →
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

