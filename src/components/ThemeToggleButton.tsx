// components/ThemeToggleButton.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Button from shadcn/ui
import { Sun, Moon } from "lucide-react"; // Icons for light/dark modes

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Set initial theme from localStorage or default to light
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme as "light" | "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // Persist theme
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost" // Styling variant from shadcn/ui
      size="sm" // Small button
      className="flex items-center gap-2"
    >
      {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </Button>
  );
};

export default ThemeToggleButton;
