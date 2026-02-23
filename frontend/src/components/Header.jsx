import {
  PanelLeft,
  Star,
  Sun,
  Moon,
  Clock,
  Bell,
  LayoutGrid,
  Search
} from "lucide-react"

import { useTheme } from "../contexts/ThemeContext"

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"
  return (
    <header
      className={`
        h-[64px]
        w-full
        px-[24px]
        flex items-center justify-between
        font-inter
        transition-colors duration-300
        ${
          isDark
            ? "bg-neutral-900 border-b border-white/10"
            : "bg-white border-b border-[#1C1C1C30]"
        }
      `}
    >
      <div className="flex items-center gap-[16px]">
        <PanelLeft
          size={18}
          strokeWidth={1.5}
          className={isDark ? "text-white" : "text-neutral-900"}
        />

        <Star
          size={18}
          strokeWidth={1.5}
          className={isDark ? "text-white/60" : "text-neutral-900"}
        />

        <div className="flex items-center gap-[8px] text-[14px] leading-[20px]">
          <span className={isDark ? "text-white/60" : "text-neutral-900"}>
            Dashboards
          </span>

          <span className={isDark ? "text-white/40" : "text-neutral-900"}>
            /
          </span>

          <span
            className={
              isDark ? "text-white font-medium" : "text-neutral-900 font-medium"
            }
          >
            Default
          </span>
        </div>
      </div>
      <div className="flex items-center gap-[20px]">
        <div
          className={`
            w-[260px]
            h-[36px]
            flex items-center
            px-[12px]
            rounded-[8px]
            border
            transition-colors duration-300
            ${
              isDark
                ? "bg-neutral-900 border-white/10"
                : "bg-white border-[#1C1C1C1A]"
            }
          `}
        >
          <Search
            size={16}
            className={isDark ? "text-white/60" : "text-neutral-900"}
          />

          <input
            placeholder="Search"
            className={`
              ml-[8px]
              flex-1
              bg-transparent
              outline-none
              text-[14px]
              ${
                isDark
                  ? "text-white placeholder:text-white/50"
                  : "text-neutral-800 placeholder:text-neutral-800"
              }
            `}
          />

          <span
            className={`
              text-[12px]
              px-[6px]
              py-[2px]
              rounded-[4px]
              ${
                isDark
                  ? "bg-neutral-800 text-white/60"
                  : "bg-[#F3F3F3] text-neutral-900"
              }
            `}
          >
            ⌘K
          </span>
        </div>

        <button onClick={toggleTheme}>
          {isDark ? (
            <Sun size={18} className="text-white" />
          ) : (
            <Moon size={18} className="text-neutral-900" />
          )}
        </button>

        <Clock
          size={18}
          className={isDark ? "text-white/70" : "text-neutral-900"}
        />

        <Bell
          size={18}
          className={isDark ? "text-white/70" : "text-neutral-900"}
        />

        <LayoutGrid
          size={18}
          className={isDark ? "text-white/70" : "text-neutral-900"}
        />
      </div>
    </header>
  )
}