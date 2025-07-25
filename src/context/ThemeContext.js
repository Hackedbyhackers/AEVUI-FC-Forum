import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("forum-theme") || "life");

  useEffect(() => {
  document.documentElement.classList.remove("neon", "vivid", "life");
  document.documentElement.classList.add(theme);
}, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
