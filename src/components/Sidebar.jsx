import React from 'react';
import { useTheme } from '../ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = ['light', 'dark', 'neon', 'vivis', 'life'];

  return (
    <div className="space-x-2">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-2 py-1 rounded ${theme === t ? 'bg-[var(--accent)] text-black' : 'bg-gray-300'}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
