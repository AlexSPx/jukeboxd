import { useEffect, useState } from "preact/hooks";

enum ThemeType {
  light = "light",
  dark = "dark",
}

const localStorageToThemeType = (theme: string | null) => {
  if (!theme) return null;
  if (theme === "light") return ThemeType.light;
  if (theme === "dark") return ThemeType.dark;
  return null;
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType | undefined | null>(() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorageToThemeType(localStorage.getItem("theme"));
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return ThemeType.dark;
    }
    return ThemeType.light;
  });

  const handleClick = () => {
    console.log("click");

    setTheme(theme === ThemeType.light ? ThemeType.dark : ThemeType.light);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (!theme) return;
    if (theme === ThemeType.light) root.classList.remove(ThemeType.dark);
    else root.classList.add(ThemeType.dark);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
      aria-label="Toggle between Dark and Light mode"
      onClick={() => handleClick()}
    >
      {theme === "light" ? "🌙" : "🌞"}
    </button>
  );
}