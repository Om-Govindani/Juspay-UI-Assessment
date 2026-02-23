import React from "react"
import { useTheme } from "../../contexts/ThemeContext"
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";

export default function StatsCard({ title, value, meta, highlight }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const bg = highlight ? (isDark ? "bg-blue-300/70" : "bg-sky-100") : (isDark ? "bg-neutral-800" : "bg-white")

  return (
    <div className={`rounded-xl p-8 ${bg} shadow-sm`}>
      <div className={`text-sm ${isDark ? "text-white" : "text-neutral-900"}`}>{title}</div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-2xl font-semibold">{value}</div>
        {meta && <div className={`text-sm ${isDark ? "text-white" : "text-neutral-900"} flex`}>{meta}<IoIosTrendingUp size={12}/></div>}
      </div>
    </div>
  )
}