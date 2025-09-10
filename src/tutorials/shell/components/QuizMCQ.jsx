import React, { useEffect, useMemo, useRef, useState } from "react";
import seedrandom from "seedrandom";
import RichMarkdown from "./RichMarkdown";

/**
 * QuizMCQ — multi-question, single-answer MCQ with two-step check
 *
 * Accepts EITHER:
 *  - New shape: { prompt, options: [{label, correct?, rationale?}] }
 *  - Old shape: { question, options: string[], correctIndex, rationale }
 *
 * Props:
 * - questions: Array<Question>
 * - title?: string
 * - className?: string
 * - storageNamespace?: string
 */

const LS_CONFIDENCE = (ns) => `${ns || "quiz"}:confidence`;

function safeParse(json, fallback) {
  try { return json ? JSON.parse(json) : fallback; } catch { return fallback; }
}
function loadConfidence(ns) {
  return safeParse(localStorage.getItem(LS_CONFIDENCE(ns)), {});
}
function saveConfidence(ns, obj) {
  localStorage.setItem(LS_CONFIDENCE(ns), JSON.stringify(obj));
}

// Create [0,1,...,n-1] and shuffle with provided RNG (seeded)
function shuffleIndices(n, rng = Math.random) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizMCQ({
  questions = [],
  // legacy single-question API (optional)
  question,
  options,
  correctIndex,
  rationale,
  title,
  className = "",
  storageNamespace,
}) {
  // Legacy single-question support
  if (questions.length === 0 && question && Array.isArray(options)) {
    questions = [{
      prompt: question,
      options: options.map((label, i) => ({
        id: `o-${i}`,
        label,
        correct: i === (typeof correctIndex === "number" ? correctIndex : 0),
        rationale,
      })),
    }];
  }

  // Normalize to a single shape
  const base = useMemo(() => {
    return questions.map((q, qi) => {
      const prompt = q.prompt ?? q.question ?? q.text ?? q.title ?? "";

      // allow object or string options
      let opts = (q.options || []).map((o, i) => {
        if (o && typeof o === "object") {
          return {
            id: o.id ?? `o-${i}`,
            label: o.label ?? "",
            correct: !!o.correct,
            rationale: o.rationale,
          };
        }
        return { id: `o-${i}`, label: o, correct: false, rationale: undefined };
      });

      // mark correct via correctIndex if not already marked
      if (typeof q.correctIndex === "number"
          && q.correctIndex >= 0
          && q.correctIndex < opts.length
          && !opts.some(o => o.correct)) {
        opts[q.correctIndex].correct = true;
      }

      return {
        id: q.id ?? `q-${qi}`,
        prompt,
        options: opts,
        rationale: q.rationale,
      };
    });
  }, [questions]);

  // Stable per-question option order (seeded by namespace + qid)
  const orderMap = useMemo(() => {
    const m = new Map();
    for (const q of base) {
      const rnd = seedrandom(`${storageNamespace || "quiz"}:${q.id}`);
      m.set(q.id, shuffleIndices(q.options.length, rnd));
    }
    return m;
  }, [base, storageNamespace]);

  // Navigation / current question
  const [qIds, setQIds] = useState(() => base.map((q) => q.id));
  const [cursor, setCursor] = useState(0);
  const currentQ = useMemo(() => base.find((q) => q.id === qIds[cursor]), [base, qIds, cursor]);

  // Per-question UI state
  // state[qid] = { selectedId, checked, locked, triedAgain, isCorrect, confidence? }
  const [state, setState] = useState({});

  const wrongSet = useMemo(() => {
    const s = new Set();
    for (const qid of qIds) {
      const st = state[qid];
      if (st?.checked && st?.isCorrect === false) s.add(qid);
    }
    return s;
  }, [qIds, state]);

  const inReview = useMemo(() => qIds.length > 0 && qIds.every((id) => wrongSet.has(id)), [qIds, wrongSet]);

  // Confidence persistence
  const [confMap, setConfMap] = useState(() => loadConfidence(storageNamespace));
  useEffect(() => { setConfMap(loadConfidence(storageNamespace)); }, [storageNamespace]);

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

  const currentOptions = useMemo(() => {
    if (!currentQ) return [];
    const order = orderMap.get(currentQ.id) || currentQ.options.map((_, i) => i);
    return order.map((origIdx) => currentQ.options[origIdx]);
  }, [currentQ, orderMap]);

  const st = state[currentQ?.id] || {};

  function select(optId) {
    if (!currentQ) return;
    if (st.locked) return;
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
    setState((prev) => ({ ...prev, [currentQ.id]: { ...st, confidence: level } }));
    updateConfidence(currentQ.id, level);
  }

  function next() { setCursor((i) => Math.min(i + 1, qIds.length - 1)); }
  function prev() { setCursor((i) => Math.max(i - 1, 0)); }

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

  // Keyboard affordances inside options group
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

  const total = qIds.length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Top bar */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>Question {Math.min(cursor + 1, total)} of {total}</div>
        {title ? <div className="font-medium">{title}</div> : null}
      </div>

      {/* Question card */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        {/* Prompt */}
        <div className="mb-3 text-base font-medium text-gray-900">
          <RichMarkdown>{currentQ?.prompt || ""}</RichMarkdown>
        </div>

        {/* Options */}
        <div
          ref={groupRef}
          role="group"
          aria-labelledby={`${currentQ?.id}-label`}
          className="space-y-2"
        >
          {currentOptions.map((opt) => {
            const checked = st.selectedId === opt.id;
            const correct = !!opt.correct;
            const visualState = st.checked
              ? (correct ? "correct" : checked ? "wrong" : "neutral")
              : (checked ? "selected" : "neutral");

            return (
              <label
                key={opt.id}
                className={[
                  "flex items-center gap-3 rounded-lg border px-3 py-2 transition",
                  visualState === "correct" && "border-green-500 bg-green-50",
                  visualState === "wrong" && "border-red-500 bg-red-50",
                  visualState === "selected" && "border-blue-400 bg-blue-50",
                  visualState === "neutral" && "border-gray-200 hover:bg-gray-50",
                ].filter(Boolean).join(" ")}
              >
                <input
                  type="radio"
                  name={currentQ?.id}
                  value={opt.id}
                  checked={checked}
                  onChange={() => select(opt.id)}
                  disabled={st.checked && !st.triedAgain}
                  className="h-4 w-4"
                />
                <div className="min-w-0 flex-1">
                  <RichMarkdown>{opt.label ?? ""}</RichMarkdown>
                </div>
              </label>
            );
          })}
        </div>

        {/* Rationale */}
        {st.checked && (
          <div
            id={`${currentQ?.id}-desc`}
            className="mt-3 rounded-md bg-gray-50 p-3 text-sm text-gray-700"
          >
            {(() => {
              const chosen = currentQ.options.find((o) => o.id === st.selectedId);
              return (
                chosen?.rationale ??
                currentQ.rationale ??
                (st.isCorrect
                  ? "Correct!"
                  : "That isn't quite right—try reviewing the key idea above.")
              );
            })()}
          </div>
        )}

        {/* Controls */}
        <div className="mb-3 mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              disabled={cursor === 0}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 disabled:opacity-50 hover:bg-gray-50"
            >
              ← Prev
            </button>
            <button
              onClick={next}
              disabled={cursor === total - 1}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 disabled:opacity-50 hover:bg-gray-50"
            >
              Next →
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!st.checked && (
              <button
                onClick={checkAnswer}
                disabled={!st.selectedId}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-blue-700"
              >
                Check
              </button>
            )}
            {st.checked && !st.isCorrect && !st.triedAgain && (
              <button
                onClick={tryAgainOnce}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Try again
              </button>
            )}
          </div>
        </div>

        {/* Confidence check */}
        {st.checked && (
          <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <span>How confident were you?</span>
            {["low", "med", "high"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setConfidence(lvl)}
                className={`rounded-full border px-2.5 py-1 font-medium transition ${
                  st.confidence === lvl
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {lvl === "low" ? "Low" : lvl === "med" ? "Med" : "High"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

