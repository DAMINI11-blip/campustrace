import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="theme-toggle" onClick={() => setIsDark(!isDark)}>
      <span>{isDark ? "🌙" : "☀️"}</span>
      <span>{isDark ? "Dark" : "Light"}</span>
      <div className={`toggle-track ${isDark ? "active" : ""}`}>
        <div className={`toggle-thumb ${isDark ? "active" : ""}`} />
      </div>
    </div>
  );
}