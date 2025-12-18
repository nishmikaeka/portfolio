"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`relative inline-flex h-15 w-15 items-center justify-center rounded-md text-zinc-950 hover:bg-zinc-100 focus:outline-none hover:scale-110 dark:text-zinc-50 dark:hover:bg-zinc-800 ${className}`}
        >
            <Sun className="h-6 w-6 rotate-[90deg] scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100" />
            <Moon className="absolute h-6 w-6 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-[90deg] dark:scale-0" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
