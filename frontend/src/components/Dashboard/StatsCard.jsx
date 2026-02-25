import React from "react"
import { useTheme } from "../../contexts/ThemeContext"
import { IoIosTrendingUp } from "react-icons/io"
import { IoIosTrendingDown } from "react-icons/io"

export default function StatsCard({ title, value, meta, highlight }) {
  const { themeStyles } = useTheme()

  const bgClass = highlight
    ? themeStyles.highlightCard
    : themeStyles.surfaceBg

  return (
    <div className={`rounded-xl p-8 ${bgClass} shadow-sm hover:shadow-xl transition-all duration-200`}>
      <div className={`text-xs lg:text-sm ${themeStyles.textPrimary}`}>
        {title}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className={`text-md lg:text-2xl font-semibold ${themeStyles.textPrimary}`}>
          {value}
        </div>

        {meta && (
          <div className={`text-[10px] lg:text-sm flex items-center gap-1 ${themeStyles.textPrimary}`}>
            {meta}
            <IoIosTrendingUp size={12} />
          </div>
        )}
      </div>
    </div>
  )
}