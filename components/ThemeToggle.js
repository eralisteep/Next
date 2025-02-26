'use client'

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <>
    {theme === "dark" ? (
      <Sun onClick={toggleTheme} style={{ marginLeft: "10px" }}>
        Сменить на светлую тему
      </Sun>
    ) : (
      <Moon onClick={toggleTheme} style={{ marginLeft: "10px" }}>
        Сменить на темную тему
      </Moon>
    )}
    </>
  )
}
