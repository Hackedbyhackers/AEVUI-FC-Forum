// src/components/ThemeSwitcher.js
import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const themes = ["neon", "vivid", "life", "dark"];

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-1 rounded border ${
            theme === t ? "bg-blue-600 text-white" : "bg-white text-black"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
