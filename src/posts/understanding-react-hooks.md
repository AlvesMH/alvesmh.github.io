# Understanding React Hooks in Depth

> **A comprehensive guide to React Hooks, covering **``**, **``**, and custom hooks with practical examples.**
>
> *Published: July 24, 2025  |  Tags: React · JavaScript · Frontend*

---

## 🏃‍♂️ Why You Should Care

React Hooks have been the default way to manage state and side‑effects in React since **v16.8**. They let you:

1. **Reuse logic** (write it once, share everywhere).
2. **Drop class components** (→ smaller bundles & fewer this‑bindings).
3. **Compose smaller hooks into larger ones** for expressive, declarative code.

If you still reach for class components out of habit—or you copy‑paste `useEffect` examples without really knowing why—they will *bite* you. This post demystifies them.

---

## 📚 Prerequisites

- Good grasp of ES6 syntax (arrow functions, destructuring)
- Basic React knowledge (JSX, props, component tree)
- Node ≥ 14 installed if you want to follow along locally

*(All demos were run with React 18.2 + Vite.)*

---

## 1 · `useState()` — Local State in a Function

```jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      You clicked {count} times
    </button>
  );
}
```

### 🔍 What actually happens?

| Phase      | Internals (simplified)                                    |
| ---------- | --------------------------------------------------------- |
| 1st render | `ReactCurrentDispatcher.useState(0)` → returns `[0, set]` |
| set call   | Schedules an *update queue* with new value                |
| Re‑render  | Dispatcher pops next `useState` call → delivers new state |

> **Gotcha #1:** **state updates batch** during events. `setCount(count+1); setCount(count+1);` ➜ `count` only +1, not +2.

### 🧩 When to split state

> If two pieces of data *update together*, keep them in the same state object; if they change independently, split them.

---

## 2 · `useEffect()` — Side‑Effects Without Classes

```jsx
import { useEffect, useState } from "react";

function GithubStars({ repo }) {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    async function fetchStars() {
      const res = await fetch(`https://api.github.com/repos/${repo}`);
      const json = await res.json();
      setStars(json.stargazers_count);
    }
    fetchStars();
  }, [repo]); // 🔑 re‑run only when `repo` changes

  return <span>★ {stars ?? "…"}</span>;
}
```

### Common patterns

| Pattern                | How                                             |
| ---------------------- | ----------------------------------------------- |
| **Subscriptions**      | Create in effect; return cleanup to unsubscribe |
| **Event listeners**    | Add in effect; clean up in return               |
| **Timeouts/intervals** | Set inside; clear in cleanup                    |

> **Gotcha #2:** **Race conditions**—cancel async calls in cleanup or guard against stale responses.

```jsx
useEffect(() => {
  let active = true;
  fetch(url).then(data => {
    if (active) setData(data);
  });
  return () => { active = false; };
}, [url]);
```

---

## 3 · Building Custom Hooks 🛠

A **custom hook** is just a function that **calls other hooks**. Convention: prefix with `use`.

### Example: `useMediaQuery()`

```jsx
import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = e => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// Usage
function Layout() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return isDesktop ? <DesktopNav /> : <MobileNav />;
}
```

### Rules of Hooks ✅

1. **Only call hooks at the top level** (never inside loops/conditions).
2. **Only call hooks from React functions** (components or other hooks).

React’s ESLint plugin enforces these.

---

## 4 · Performance Tips & Best Practices

| Tip                                                | Why it matters                            |
| -------------------------------------------------- | ----------------------------------------- |
| **Memoize expensive calcs** with `useMemo`         | Prevent costly recompute on every render  |
| **Stabilize callbacks** with `useCallback`         | Avoid unnecessary child re‑renders        |
| **Extract context value** with `useContext` + memo | Prevent prop‑drilling                     |
| **Keep effects focused**                           | Separate concerns; easier cleanup         |
| **Prefer derived data** over duplicating state     | Avoid divergence between sources of truth |

---

## 5 · Going Further

- `` for complex state machines
- ``** / **`` (React 18 concurrency)
- `` or **SWR** for remote data with caching

---

## 🚀 Conclusion

Hooks are not just syntactic sugar—they’re a **powerful composition model** that makes complex UIs easier to reason about. Mastering them means cleaner, more predictable code and a happier future‑you. 🌱

**Happy hooking, and let me know what cool custom hooks you build!**

---

### More Reading

- React Docs – [https://react.dev/learn](https://react.dev/learn)
- Kent C. Dodds – *Epic React Hooks*
- Overreacted – Dan Abramov’s blog

---
