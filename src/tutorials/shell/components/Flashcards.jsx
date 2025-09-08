import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
    <div className={`mx-auto w-full max-w-3xl ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          {title && <h3 className="truncate text-base font-semibold text-gray-900">{title}</h3>}
          <div className="text-xs text-gray-500">Space=flip • ←/→=prev/next • 1/2/3=Again/Hard/Easy</div>
        </div>
        <div className="flex items-center gap-2">
          <Toggle active={shuffleOn} onClick={() => setShuffleOn((v) => !v)}>Shuffle</Toggle>
          <Toggle active={reverse} onClick={() => setReverse((v) => !v)}>Reverse</Toggle>
        </div>
      </div>

      {showHelper && (
        <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Tip: rate with 1/2/3. <button onClick={() => { localStorage.setItem(LS_HELP, "1"); setShowHelper(false); }} className="ml-2 underline">Got it</button>
        </div>
      )}

      {baseCards.length === 0 && (
        <div className="rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-600">No cards yet.</div>
      )}

      {current && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Flashcard"
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={(e) => { if (e.key === "Enter") setFlipped((f) => !f); }}
          className="relative mb-3 min-h-[200px] cursor-pointer select-none rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-transform hover:shadow-md"
        >
          <div className="mx-auto max-w-prose text-gray-900">{content}</div>
          <div className="pointer-events-none absolute bottom-2 right-3 text-[10px] uppercase tracking-wide text-gray-400">{flipped ? "Back" : "Front"}</div>
        </div>
      )}

      {/* Rating buttons */}
      <div className="mb-3 grid grid-cols-3 gap-2">
        <button onClick={() => rate("again")} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">
          Again <span className="ml-1 text-[10px] text-gray-500">[1]</span>
        </button>
        <button onClick={() => rate("hard")} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">
          Hard <span className="ml-1 text-[10px] text-gray-500">[2]</span>
        </button>
        <button onClick={() => rate("easy")} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">
          Easy <span className="ml-1 text-[10px] text-gray-500">[3]</span>
        </button>
      </div>

      {/* Nav + Progress */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <button onClick={prev} className="rounded-md border border-gray-200 bg-white px-2 py-1 hover:bg-gray-50">← Prev</button>
          <button onClick={next} className="rounded-md border border-gray-200 bg-white px-2 py-1 hover:bg-gray-50">Next →</button>
        </div>
        <div>
          Card {progressIndex} of {Math.max(1, total)} • {streak} in a row
        </div>
      </div>
    </div>
  );
}
