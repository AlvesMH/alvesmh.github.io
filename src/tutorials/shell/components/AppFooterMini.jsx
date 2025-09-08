// FILE: src/components/AppFooterMini.jsx
import React from "react";

export default function AppFooterMini({ className = "" }) {
  return (
    <footer className={`mt-10 border-t border-gray-200 bg-white ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-gray-500 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Hugo Martins — Tutorials</div>
          <div className="flex items-center gap-3">
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/tutorials" className="hover:underline">All Tutorials</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
