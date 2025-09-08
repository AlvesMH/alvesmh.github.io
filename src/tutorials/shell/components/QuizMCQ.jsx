import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * QuizMCQ — multi-question, single-answer MCQ with two-step check
 *
 * Props
 * - questions: Array<{
 *     id?: string;
 *     prompt: React.ReactNode;
 *     options: Array<{ id?: string; label: React.ReactNode; correct?: boolean; rationale?: React.ReactNode }>;
 *   }>
 * - title?: string
 * - className?: string
 * - storageNamespace?: string  // optional, to namespace confidence stats in localStorage
 */

const LS_CONFIDENCE = (ns) => `${ns || "quiz"}:confidence`; // { [questionId]: { low, med, high } }

function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

function loadConfidence(ns) {
  return safeParse(localStorage.getItem(LS_CONFIDENCE(ns)), {});
}
function saveConfidence(ns, obj) {
  localStorage.setItem(LS_CONFIDENCE(ns), JSON.stringify(obj));
}

// Fisher-Yates shuffle (pure)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizMCQ({
  questions = [],
  // legacy props (single-question API)
  question,
  options,
  correctIndex,
  rationale,
  title,
  className = "",
  storageNamespace
}) {
  if (questions.length === 0 && question && Array.isArray(options)) {
    questions = [{
      prompt: question,
      options: options.map((label, i) => ({
        label,
        correct: i === (typeof correctIndex === "number" ? correctIndex : 0),
        rationale
      }))
    }];
  }

  // Normalise IDs so they are stable within this session
  const base = useMemo(() => {
    return questions.map((q, qi) => ({
      id: q.id || `q-${qi}`,
      prompt: q.prompt,
      options: q.options.map((o, oi) => ({ id: o.id || `o-${oi}`, label: o.label, correct: !!o.correct, rationale: o.rationale })),
    }));
  }, [questions]);

  // Build once-per-mount shuffled option orders per question (stable for the session)
  const [orderMap] = useState(() => {
    const m = new Map();
    base.forEach((q) => {
      const order = shuffle(q.options.map((_, i) => i));
      m.set(q.id, order);
    });
    return m;
  });

  // Question list and cursor (supports review mode where we swap to misses only)
  const [qIds, setQIds] = useState(() => base.map((q) => q.id));
  const [cursor, setCursor] = useState(0);
  const currentQ = useMemo(() => base.find((q) => q.id === qIds[cursor]), [base, qIds, cursor]);

  // Per-question interaction state
  // { [qid]: { selectedId, checked, locked, triedAgain, isCorrect, confidence?: 'low'|'med'|'high' } }
  const [state, setState] = useState({});

  // Track wrong answers for review mode
  const wrongSet = useMemo(() => {
    const s = new Set();
    for (const qid of qIds) {
      const st = state[qid];
      if (st?.checked && st?.isCorrect === false) s.add(qid);
    }
    return s;
  }, [qIds, state]);

  const inReview = useMemo(() => qIds.length > 0 && qIds.every((id) => wrongSet.has(id)), [qIds, wrongSet]);

  // Confidence stats (gentle nudge)
  const [confMap, setConfMap] = useState(() => loadConfidence(storageNamespace));
  useEffect(() => {
    setConfMap(loadConfidence(storageNamespace));
  }, [storageNamespace]);
  const lowConfidenceCount = useMemo(() => {
    let c = 0;
    for (const q of base) {
      const rec = confMap[q.id];
      if (!rec) continue;
      const { low = 0, med = 0, high = 0 } = rec;
      if (low > Math.max(med, high)) c++;
    }
    return c;
  }, [base, confMap]);

  function updateConfidence(qid, level) {
    setConfMap((prev) => {
      const next = { ...prev };
      const rec = next[qid] || { low: 0, med: 0, high: 0 };
      rec[level] = (rec[level] || 0) + 1;
      next[qid] = rec;
      saveConfidence(storageNamespace, next);
      return next;
    });
  }

  // Helpers
  const currentOptions = useMemo(() => {
    if (!currentQ) return [];
    const order = orderMap.get(currentQ.id) || currentQ.options.map((_, i) => i);
    return order.map((i) => currentQ.options[i]);
  }, [currentQ, orderMap]);

  const st = state[currentQ?.id] || {};

  function selectOption(optId) {
    if (!currentQ) return;
    if (st.locked) return; // locked after check until Try again or nav
    setState((prev) => ({ ...prev, [currentQ.id]: { ...st, selectedId: optId } }));
  }

  function checkAnswer() {
    if (!currentQ || !st.selectedId) return;
    const selected = currentQ.options.find((o) => o.id === st.selectedId);
    const isCorrect = !!selected?.correct;
    setState((prev) => ({
      ...prev,
      [currentQ.id]: { ...st, checked: true, locked: true, isCorrect },
    }));
  }

  function tryAgainOnce() {
    if (!currentQ || !st.checked || st.triedAgain) return;
    setState((prev) => ({
      ...prev,
      [currentQ.id]: { ...st, checked: false, locked: false, triedAgain: true },
    }));
  }

  function setConfidence(level) {
    if (!currentQ || !st.checked) return;
    // store locally and to localStorage
    setState((prev) => ({ ...prev, [currentQ.id]: { ...st, confidence: level } }));
    updateConfidence(currentQ.id, level);
  }

  function next() {
    setCursor((i) => Math.min(i + 1, qIds.length - 1));
  }
  function prev() {
    setCursor((i) => Math.max(i - 1, 0));
  }

  function reviewWrongOnes() {
    const misses = Array.from(wrongSet);
    if (misses.length === 0) return;
    setQIds(misses);
    setCursor(0);
  }

  function exitReview() {
    setQIds(base.map((q) => q.id));
    setCursor(0);
  }

  // Keyboard affordances for radios: allow arrow navigation between options
  const groupRef = useRef(null);
  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    function onKey(e) {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const inputs = el.querySelectorAll('input[type="radio"]');
      const arr = Array.from(inputs);
      const idx = arr.findIndex((n) => n === document.activeElement);
      const delta = e.key === "ArrowDown" ? 1 : -1;
      const nextIdx = Math.max(0, Math.min(arr.length - 1, idx + delta));
      const nextEl = arr[nextIdx];
      if (nextEl) nextEl.focus();
    }
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [currentQ?.id]);

  if (base.length === 0) {
    return (
      <div className={`rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600 ${className}`}>
        No questions.
      </div>
    );
  }

  const idxHuman = cursor + 1;
  const total = qIds.length;

  return (
    <div className={`mx-auto w-full max-w-3xl ${className}`}>
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          {title && <h3 className="truncate text-base font-semibold text-gray-900">{title}</h3>}
          <div className="text-xs text-gray-500">Question {idxHuman} of {total}{lowConfidenceCount ? ` • Revisit: ${lowConfidenceCount} low-confidence item${lowConfidenceCount>1?"s":""}` : ""}</div>
        </div>
        <div className="flex items-center gap-2">
          {wrongSet.size > 0 && !inReview && (
            <button onClick={reviewWrongOnes} className="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium hover:bg-gray-50">Review wrong ones ({wrongSet.size})</button>
          )}
          {inReview && (
            <button onClick={exitReview} className="rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium hover:bg-gray-50">Exit review</button>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="mb-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-3 text-gray-900">{currentQ?.prompt}</div>

        <fieldset ref={groupRef} className="space-y-2" aria-describedby={`${currentQ?.id}-desc`}>
          <legend className="sr-only">Choose one answer</legend>
          {currentOptions.map((opt) => {
            const name = `q-${currentQ.id}`;
            const checked = st.selectedId === opt.id;
            const correct = !!opt.correct;
            const showMark = st.checked && (checked || correct);
            const mark = checked ? (correct ? "✅" : "❌") : correct ? "✅" : "";
            return (
              <label key={opt.id} className={`group flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition ${
                checked ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
              } ${st.locked ? "opacity-80" : ""}`}>
                <input
                  type="radio"
                  name={name}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 checked:border-blue-600 checked:bg-blue-600"
                  checked={checked}
                  onChange={() => selectOption(opt.id)}
                  disabled={st.locked}
                  aria-describedby={`${currentQ.id}-desc`}
                />
                <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
                  <div className="min-w-0 text-gray-900">{opt.label}</div>
                  {showMark && <div className="ml-2 shrink-0 text-base">{mark}</div>}
                </div>
              </label>
            );
          })}
        </fieldset>

        {/* Rationale */}
        {st.checked && (
          <div id={`${currentQ?.id}-desc`} className="mt-3 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
            {(() => {
              const chosen = currentQ.options.find((o) => o.id === st.selectedId);
              return chosen?.rationale || (st.isCorrect ? "Correct!" : "That isn't quite right—try reviewing the key idea above.");
            })()}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={prev} disabled={cursor === 0} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 disabled:opacity-50 hover:bg-gray-50">← Prev</button>
          <button onClick={next} disabled={cursor === total - 1} className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 disabled:opacity-50 hover:bg-gray-50">Next →</button>
        </div>
        <div className="flex items-center gap-2">
          {!st.checked && (
            <button onClick={checkAnswer} disabled={!st.selectedId} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-blue-700">Check</button>
          )}
          {st.checked && !st.isCorrect && !st.triedAgain && (
            <button onClick={tryAgainOnce} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50">Try again</button>
          )}
        </div>
      </div>

      {/* Confidence check */}
      {st.checked && (
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <span>How confident were you?</span>
          {(["low", "med", "high"]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setConfidence(lvl)}
              className={`rounded-full border px-2.5 py-1 font-medium transition ${
                st.confidence === lvl ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {lvl === "low" ? "Low" : lvl === "med" ? "Med" : "High"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


