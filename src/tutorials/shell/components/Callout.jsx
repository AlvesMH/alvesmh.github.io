import React, { useEffect, useMemo, useRef, useState } from "react";
import { Info, AlertTriangle, Lightbulb, Sigma, AlertOctagon, ChevronDown, ChevronUp, Check } from "lucide-react";

const PROGRESS_KEY = "tutorial_progress";

function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

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
  // also set last visited pointer
  store.__lastVisited__ = {
    slug,
    sectionId: updated.lastSectionId,
    sectionTitle: updated.lastSectionTitle,
    visitedAt: Date.now(),
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
}

const THEMES = {
  info: {
    label: "Information",
    icon: Info,
    border: "border-blue-200",
    bg: "bg-blue-50",
    text: "text-blue-900",
    iconColor: "text-blue-700",
    ring: "focus-visible:ring-blue-600",
    divider: "border-blue-200",
  },
  warn: {
    label: "Warning",
    icon: AlertTriangle,
    border: "border-amber-200",
    bg: "bg-amber-50",
    text: "text-amber-900",
    iconColor: "text-amber-700",
    ring: "focus-visible:ring-amber-600",
    divider: "border-amber-200",
  },
  idea: {
    label: "Key idea",
    icon: Lightbulb,
    border: "border-violet-200",
    bg: "bg-violet-50",
    text: "text-violet-900",
    iconColor: "text-violet-700",
    ring: "focus-visible:ring-violet-600",
    divider: "border-violet-200",
  },
  proof: {
    label: "Proof",
    icon: Sigma,
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    text: "text-emerald-900",
    iconColor: "text-emerald-700",
    ring: "focus-visible:ring-emerald-600",
    divider: "border-emerald-200",
  },
  pitfall: {
    label: "Common pitfall",
    icon: AlertOctagon,
    border: "border-rose-200",
    bg: "bg-rose-50",
    text: "text-rose-900",
    iconColor: "text-rose-700",
    ring: "focus-visible:ring-rose-600",
    divider: "border-rose-200",
  },
};

/**
 * Callout component
 *
 * Props:
 * - variant: 'info' | 'warn' | 'idea' | 'proof' | 'pitfall' (default: 'info')
 * - title?: string (optional heading; falls back to variant label)
 * - children: ReactNode (callout content)
 * - actionLabel?: string (shows a single bottom action row when provided)
 * - onAction?: () => void (optional custom handler)
 * - actionKey?: string (if provided and onAction not set, sets localStorage flag `callout:<key>:done`)
 * - progress?: { slug: string; sectionId?: string; sectionTitle?: string; totalSections?: number }
 *       When provided, clicking the action updates consolidated progress under `tutorial_progress`.
 * - defaultCollapsedLines?: number (default 4)
 * - allowCollapse?: boolean (default true)
 * - startCollapsed?: boolean (default true)
 * - className?: string
 */
export default function Callout({
  variant = "info",
  title,
  children,
  actionLabel,
  onAction,
  actionKey,
  progress,
  defaultCollapsedLines = 4,
  allowCollapse = true,
  startCollapsed = true,
  className = "",
}) {
  const theme = THEMES[variant] || THEMES.info;
  const Icon = theme.icon;

  const contentRef = useRef(null);
  const [collapsed, setCollapsed] = useState(startCollapsed && allowCollapse);
  const [exceeds, setExceeds] = useState(false);
  const [maxHeight, setMaxHeight] = useState(undefined);
  const [didAction, setDidAction] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const styles = window.getComputedStyle(el);
    const lineHeightStr = styles.lineHeight;
    let lineHeight = parseFloat(lineHeightStr);
    if (!Number.isFinite(lineHeight)) {
      // Fallback if `normal` or couldn't parse
      lineHeight = 24;
    }
    const maxH = lineHeight * defaultCollapsedLines;
    setMaxHeight(maxH);

    // Measure if content exceeds the collapse threshold
    const ro = new ResizeObserver(() => {
      const tooTall = el.scrollHeight > maxH + 1; // +1 to account for rounding
      setExceeds(tooTall);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [defaultCollapsedLines]);

  const ariaLabel = useMemo(() => title || theme.label, [title, theme.label]);

  const handleAction = () => {
    try {
      if (onAction) onAction();
      else if (actionKey) localStorage.setItem(`callout:${actionKey}:done`, "1");
      if (progress && progress.slug) updateProgress(progress);
      setDidAction(true);
    } catch {
      // swallow errors silently; this is a best-effort UX feature
    }
  };

  const containerCls = `${theme.bg} ${theme.border} ${theme.text} ${className} relative w-full rounded-xl border`;
  const headerIconCls = `${theme.iconColor}`;
  const actionBtnCls = `inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-medium shadow-sm ${theme.ring} ${theme.border} bg-white/70 text-gray-900 hover:bg-white`;

  return (
    <section role="note" aria-label={ariaLabel} className={containerCls}>
      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <div className="mt-0.5">
          <Icon className={`h-5 w-5 ${headerIconCls}`} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold leading-6">
            {title || theme.label}
          </h4>
          {/* Body */}
          <div
            ref={contentRef}
            className={`mt-1 text-sm/6 text-gray-800`}
            style={collapsed && exceeds ? { maxHeight, overflow: "hidden" } : undefined}
          >
            {children}
          </div>

          {/* Collapse / Expand control */}
          {allowCollapse && exceeds && (
            <div className="mt-1">
              <button
                type="button"
                onClick={() => setCollapsed((v) => !v)}
                className={`inline-flex items-center gap-1 text-xs font-medium underline-offset-2 hover:underline ${theme.iconColor}`}
                aria-expanded={!collapsed}
              >
                {collapsed ? (
                  <>
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                    Expand details
                  </>
                ) : (
                  <>
                    <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                    Collapse
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action line */}
      {actionLabel && (
        <div className={`flex items-center justify-between gap-3 border-t px-4 py-2 ${theme.divider}`}>
          <div className="text-xs text-gray-700">Quick action</div>
          <div className="flex items-center gap-2">
            {didAction && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium text-gray-800">
                <Check className="h-3.5 w-3.5" /> Saved
              </span>
            )}
            <button type="button" onClick={handleAction} className={actionBtnCls}>
              {actionLabel}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function PopNote({ label, children }) {
  return <Callout type="idea" title={label}>{children}</Callout>;
}