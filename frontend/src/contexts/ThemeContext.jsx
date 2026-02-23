import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

const lightTheme = {
  layoutBg: "bg-white",
  cardBg: "bg-neutral-100",
  surfaceBg: "bg-white",
  sidebarBg: "bg-white",

  textPrimary: "text-neutral-900",
  textSecondary: "text-neutral-800",
  textMuted: "text-neutral-400",

  borderPrimary: "border-[#1C1C1C30]",
  borderSecondary: "border-[#1C1C1C1A]",
  tableBorder: "border-gray-100",

  inputBg: "bg-white",
  inputBorder: "border-[#1C1C1C1A]",
  kbdBg: "bg-[#F3F3F3]",

  highlightCard: "bg-sky-100",

  progressBg: "bg-neutral-200",
  progressFill: "bg-blue-400",

  mapBase: "#62758A",

  chartAxis: "#6B7280",
  chartGrid: "#F3F4F6",
  chartLinePrimary: "#111827",
  chartLineSecondary: "#93c5fd",
  chartBarPrimary: "#93c5fd",
  chartBarSecondary: "rgba(147,197,253,0.35)",

  donutTooltipBg: "#374151"
}

// 🔹 DARK THEME TOKENS
const darkTheme = {
  layoutBg: "bg-neutral-900",
  cardBg: "bg-neutral-800",
  surfaceBg: "bg-neutral-800",
  sidebarBg: "bg-neutral-900",

  textPrimary: "text-white",
  textSecondary: "text-white",
  textMuted: "text-white/60",

  borderPrimary: "border-white/10",
  borderSecondary: "border-white/10",
  tableBorder: "border-neutral-800",

  inputBg: "bg-neutral-900",
  inputBorder: "border-white/10",
  kbdBg: "bg-neutral-800",

  highlightCard: "bg-blue-300/70",

  progressBg: "bg-neutral-700",
  progressFill: "bg-[#6a9faf]",

  mapBase: "#e6f2f8",

  chartAxis: "#9CA3AF",
  chartGrid: "#1f2937",
  chartLinePrimary: "#ffffff",
  chartLineSecondary: "#93c5fd",
  chartBarPrimary: "#93c5fd",
  chartBarSecondary: "rgba(147,197,253,0.35)",

  donutTooltipBg: "#1f2937"
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  })

  useEffect(() => {
    const root = document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  const themeStyles = theme === "dark" ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}