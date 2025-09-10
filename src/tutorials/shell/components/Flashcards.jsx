import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Flashcards — session-based practice with simple re-queueing.
 *
 * Works with either prop name: `deck` (preferred) or legacy `cards`.
 * A card can be:
 *   - { id?, front, back }
 *   - [front, back]
 *   - string (front only)
 *
 * Features:
 *  - Flip (click card / Space). Prev/Next (←/→). Rate Again/Hard/Easy (1/2/3)
 *  - Re-queue: Again → soon, Hard → later, Easy → end of queue
 *  - Shuffle & Reverse toggles (persisted to localStorage)
 *  - Progress: "Card X of N • Y in a row"
 *  - "Add to deck" integration: dispatch `flashcards:add` with { front, back }
 *  - Safe against infinite update loops (no default [] prop; guarded effects)
 */

const LS_PREFIX = "flashcards:";
const LS_SHUFFLE = `${LS_PREFIX}shuffle`;
const LS_REVERSE = `${LS_PREFIX}reverse`;
const LS_HELP = `${LS_PREFIX}helper_shown`;

function Toggle({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function RenderCardContent({ content }) {
  if (!content) return null;

  let expr = content.trim();
  let displayMode = false;

  // Detect and strip delimiters
  if (expr.startsWith("$$") && expr.endsWith("$$")) {
    expr = expr.slice(2, -2);
    displayMode = true;
  } else if (expr.startsWith("\\[") && expr.endsWith("\\]")) {
    expr = expr.slice(2, -2);
    displayMode = true;
  } else if (expr.startsWith("\\(") && expr.endsWith("\\)")) {
    expr = expr.slice(2, -2);
    displayMode = false;
  } else if (expr.startsWith("$") && expr.endsWith("$")) {
    expr = expr.slice(1, -1);
    displayMode = false;
  }

  try {
    const html = katex.renderToString(expr, {
      displayMode,
      throwOnError: false,
      macros: { "\\P": "\\mathbb{P}" },
    });
    return (
      <div
        className="katex-content text-2xl sm:text-3xl md:text-4xl text-center"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Flashcards({ deck: deckProp, cards, title, className = "" }) {
  // Normalise input (accept either `deck` or legacy `cards`). Avoid default [] that changes identity.
  const baseCards = useMemo(() => {
    const raw = Array.isArray(deckProp) ? deckProp : Array.isArray(cards) ? cards : [];
    const normal = raw.map((c) =>
      typeof c === "string"
        ? { front: c, back: "" }
        : Array.isArray(c)
        ? { front: c[0], back: c[1] ?? "" }
        : c || { front: "", back: "" }
    );
    return normal.map((c, i) => ({ id: c.id || `card-${i}`, front: c.front, back: c.back }));
  }, [deckProp, cards]);

  // Toggles (persisted)
  const [shuffleOn, setShuffleOn] = useState(() => localStorage.getItem(LS_SHUFFLE) === "1");
  const [reverse, setReverse] = useState(() => localStorage.getItem(LS_REVERSE) === "1");
  const [showHelper, setShowHelper] = useState(() => localStorage.getItem(LS_HELP) !== "1");

  useEffect(() => { localStorage.setItem(LS_SHUFFLE, shuffleOn ? "1" : "0"); }, [shuffleOn]);
  useEffect(() => { localStorage.setItem(LS_REVERSE, reverse ? "1" : "0"); }, [reverse]);

  // Build id→card map and initial queue exactly once per (cards, shuffleOn)
  const [cardsMap, setCardsMap] = useState(() => new Map());
  const [queue, setQueue] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    // Re-initialise session when source deck or shuffle changes
    const map = new Map();
    baseCards.forEach((c) => map.set(c.id, c));
    const ids = baseCards.map((c) => c.id);
    const ordered = shuffleOn ? shuffle(ids) : ids;
    setCardsMap(map);
    setQueue(ordered.slice(1)); // everything except first
    setCurrentId(ordered[0] || null);
    setFlipped(false);
    setStreak(0);
    setSeen(new Set(ordered[0] ? [ordered[0]] : []));
    setHistory([]);
  }, [baseCards, shuffleOn]);

  // Interaction state
  const [flipped, setFlipped] = useState(false);
  const toggle = useCallback(() => {
    setFlipped(v => !v);
  }, []);
  const [streak, setStreak] = useState(0);
  const [seen, setSeen] = useState(() => new Set()); // unique cards seen this session
  const [history, setHistory] = useState([]); // back stack of ids

  const current = currentId ? cardsMap.get(currentId) : null;
  const total = cardsMap.size;
  const progressIndex = Math.min(Math.max(1, seen.size), Math.max(1, total));

  const content = useMemo(() => {
    if (!current) return null;
    const front = reverse ? current.back : current.front;
    const back = reverse ? current.front : current.back;
    return flipped ? back : front;
  }, [current, reverse, flipped]);

  // Helpers
  const goTo = useCallback((id, { pushHistory = true } = {}) => {
    if (!id) return;
    if (pushHistory && currentId) setHistory((h) => h.concat(currentId));
    setCurrentId(id);
    setFlipped(false);
    setSeen((s) => (s.has(id) ? s : new Set(s).add(id)));
  }, [currentId]);

  const nextFromQueue = useCallback(() => {
    setQueue((q) => {
      const nextId = q[0];
      const rest = q.slice(1);
      if (nextId) goTo(nextId, { pushHistory: true });
      return rest;
    });
  }, [goTo]);

  const requeueAt = useCallback((id, indexFromFront) => {
    setQueue((q) => {
      const idx = Math.max(0, Math.min(indexFromFront, q.length));
      const copy = q.slice();
      copy.splice(idx, 0, id);
      return copy;
    });
  }, []);

  const rate = useCallback((level) => {
    if (!currentId) return;
    setStreak((s) => (level === "easy" ? s + 1 : 0));
    if (level === "again") requeueAt(currentId, Math.min(2, queue.length));
    else if (level === "hard") requeueAt(currentId, Math.min(4, queue.length));
    else if (level === "easy") requeueAt(currentId, queue.length);
    nextFromQueue();
  }, [currentId, queue.length, requeueAt, nextFromQueue]);

  const next = useCallback(() => {
    if (!currentId) return;
    // neutral skip → push to end
    requeueAt(currentId, queue.length);
    nextFromQueue();
  }, [currentId, queue.length, requeueAt, nextFromQueue]);

  const prev = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const copy = h.slice();
      const prevId = copy.pop();
      if (currentId) setQueue((q) => [currentId, ...q.filter((id) => id !== prevId)]);
      goTo(prevId, { pushHistory: false });
      return copy;
    });
  }, [currentId, goTo]);

  // Keyboard shortcuts (bind only when there are cards)
  const onKeyDown = useCallback((e) => {
    const tag = (e.target && e.target.tagName) || "";
    if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
    if (e.key === " ") { e.preventDefault(); setFlipped((f) => !f); }
    else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    else if (e.key === "1") { e.preventDefault(); rate("again"); }
    else if (e.key === "2") { e.preventDefault(); rate("hard"); }
    else if (e.key === "3") { e.preventDefault(); rate("easy"); }
  }, [next, prev, rate]);

  useEffect(() => {
    if (baseCards.length === 0) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown, baseCards.length]);

  // Add-from-content event (append new card into this session)
  useEffect(() => {
    function onAdd(e) {
      const { front, back } = (e && e.detail) || {};
      if (!front && !back) return;
      const id = `custom-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
      setCardsMap((prev) => new Map(prev).set(id, { id, front: String(front || ""), back: String(back || "") }));
      setQueue((prev) => prev.concat(id));
      if (!currentId) setCurrentId(id);
    }
    window.addEventListener("flashcards:add", onAdd);
    return () => window.removeEventListener("flashcards:add", onAdd);
  }, [currentId]);

  // UI
return (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
    {/* Header / Progress */}
    <div className="mb-4 flex items-center justify-between">
      <div className="text-xs sm:text-sm text-slate-600">
        Card{" "}
        <span className="font-semibold text-slate-900">
          {(progressIndex ?? 0) + 1}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-900">
          {Math.max(1, total)}
        </span>
      </div>
      <div
        className="text-[11px] sm:text-xs font-medium tabular-nums text-slate-500"
        aria-label="Current streak"
        title="Correct in a row"
      >
        🔥 Streak: <span className="text-slate-900">{streak}</span>
      </div>
    </div>

    {/* Progress bar */}
    <div className="mb-5 h-2 w-full rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200/50">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-[width] duration-300 ease-out"
        style={{ width: `${(progressIndex / Math.max(1, total)) * 100}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={Math.max(1, total)}
        aria-valuenow={progressIndex}
      />
    </div>

    {/* Flashcard */}
    <AnimatePresence mode="wait">
      <motion.button
        key={flipped ? `${progressIndex}-b` : `${progressIndex}-f`}
        type="button"
        initial={{ rotateY: 90, opacity: 0.2 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: -90, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={toggle}
        className={[
          "relative mx-auto mb-6 aspect-[5/3] w-full max-w-3xl select-none rounded-2xl",
          "bg-gradient-to-br from-white to-slate-50 p-4 sm:p-6 text-center shadow-sm ring-1 ring-slate-200",
          "hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        ].join(" ")}
        aria-label={flipped ? "Show front" : "Show back"}
        title="Click or press Space to flip"
      >
        {/* Centered content */}
        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto max-w-3xl leading-snug text-slate-900 text-xl sm:text-2xl md:text-3xl">
            {/* Math-aware renderer */}
            <RenderCardContent content={content} />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-2 right-3 text-[10px] uppercase tracking-wide text-slate-400">
          {flipped ? "Back" : "Front"}
        </div>

        {/* subtle top accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-blue-500/70 to-indigo-500/70" />
      </motion.button>
    </AnimatePresence>

    {/* Rating buttons */}
    <div className="mb-4 grid grid-cols-3 gap-2">
      <button
        type="button"
        onClick={() => rate("again")}
        className={[
          "rounded-lg border px-3 py-2 text-sm font-medium",
          "bg-white border-slate-200 text-slate-800 hover:bg-slate-50",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 active:scale-[0.98]"
        ].join(" ")}
        title="Mark as Again (1)"
      >
        <span className="inline-flex items-center justify-center gap-1">
          <span className="hidden sm:inline">Again</span>
          <span className="sm:ml-1 text-[10px] text-slate-500">[1]</span>
        </span>
      </button>

      <button
        type="button"
        onClick={() => rate("hard")}
        className={[
          "rounded-lg border px-3 py-2 text-sm font-medium",
          "bg-white border-slate-200 text-slate-800 hover:bg-slate-50",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 active:scale-[0.98]"
        ].join(" ")}
        title="Mark as Hard (2)"
      >
        <span className="inline-flex items-center justify-center gap-1">
          <span className="hidden sm:inline">Hard</span>
          <span className="sm:ml-1 text-[10px] text-slate-500">[2]</span>
        </span>
      </button>

      <button
        type="button"
        onClick={() => rate("easy")}
        className={[
          "rounded-lg border px-3 py-2 text-sm font-medium",
          "bg-white border-slate-200 text-slate-800 hover:bg-slate-50",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 active:scale-[0.98]"
        ].join(" ")}
        title="Mark as Easy (3)"
      >
        <span className="inline-flex items-center justify-center gap-1">
          <span className="hidden sm:inline">Easy</span>
          <span className="sm:ml-1 text-[10px] text-slate-500">[3]</span>
        </span>
      </button>
    </div>

    {/* Navigation */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={prev}
          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-800 hover:bg-slate-50 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          title="Previous (←)"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={next}
          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-800 hover:bg-slate-50 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          title="Next (→)"
        >
          Next →
        </button>
      </div>

      <div className="text-[11px] sm:text-xs text-slate-500" aria-live="polite">
        {(progressIndex ?? 0) + 1} / {Math.max(1, total)} • {streak} in a row
      </div>
    </div>

    {/* Helper hint */}
    <p className="mt-3 text-[11px] sm:text-xs text-slate-400">
      Tip: press <kbd className="rounded border border-slate-300 px-1">Space</kbd> to flip,{" "}
      <kbd className="rounded border border-slate-300 px-1">1</kbd>/<kbd className="rounded border border-slate-300 px-1">2</kbd>/<kbd className="rounded border border-slate-300 px-1">3</kbd> to rate,{" "}
      <kbd className="rounded border border-slate-300 px-1">←</kbd>/<kbd className="rounded border border-slate-300 px-1">→</kbd> to navigate.
    </p>
  </div>
);
}