// src/components/atoms/DarkModeToggle.tsx
// Atomic component — a button to toggle dark mode

"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./Button";

export const DarkModeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    const initialDark = stored ? JSON.parse(stored) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('darkMode', JSON.stringify(newDark));
    document.documentElement.classList.toggle('dark', newDark);
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleDarkMode} aria-label="Toggle dark mode">
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
};