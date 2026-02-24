import {
  PanelLeft,
  PanelRight,
  Star,
  Sun,
  Moon,
  Clock,
  Bell,
  LayoutGrid,
  Search
} from "lucide-react"

import { useTheme } from "../contexts/ThemeContext"

export default function Header({showSidebar , setShowSidebar , showRightbar , setShowRightbar}) {
  const { theme , themeStyles, toggleTheme } = useTheme()

  const toggleSidebar = () => setShowSidebar(!showSidebar)
  const toggleRightbar = () => setShowRightbar(!showRightbar)
  return (
    <header
  className={`
    h-[64px]
    w-full
    px-4 lg:px-[24px]
    flex items-center justify-between
    font-inter border-b
    transition-colors duration-300
    ${themeStyles.layoutBg} ${themeStyles.borderPrimary}
  `}
>
  <div className="flex items-center gap-3 lg:gap-[16px]">

    <PanelLeft
      size={18}
      strokeWidth={1.5}
      className={`${themeStyles.textPrimary} cursor-pointer`}
      onClick={toggleSidebar}
    />

    <Star
      size={18}
      strokeWidth={1.5}
      className={`hidden md:block ${themeStyles.textMuted}`}
    />

    <div className="gap-[8px] text-[14px] lg:text-[14px] leading-[20px]">
      <span className={themeStyles.textMuted}>
        Dashboards
      </span>

      <span className={themeStyles.textMuted}>
        /
      </span>

      <span className={`${themeStyles.textPrimary} font-medium`}>
        Default
      </span>
    </div>
  </div>

  <div className="flex items-center gap-3 lg:gap-[20px]">
    <div
      className={`
        hidden sm:flex
        w-[160px] md:w-[220px] lg:w-[260px]
        h-[36px]
        items-center
        px-[12px]
        rounded-[8px]
        border
        transition-colors duration-300
        ${themeStyles.layoutBg}
        ${themeStyles.borderPrimary}
      `}
    >
      <Search
        size={16}
        className={themeStyles.textMuted}
      />

      <input
        placeholder="Search"
        className={`
          ml-[8px]
          flex-1
          bg-transparent
          outline-none
          text-[14px]
          ${themeStyles.textPrimary}
          placeholder:opacity-60
        `}
      />

      <span
        className={`
          hidden lg:block
          text-[12px]
          px-[6px]
          py-[2px]
          rounded-[4px]
          ${themeStyles.kbdBg}
          ${themeStyles.textMuted}
        `}
      >
        ⌘K
      </span>
    </div>


    <button onClick={toggleTheme}>
      {theme === "dark" ? (
        <Sun size={18} className={themeStyles.textPrimary} />
      ) : (
        <Moon size={18} className={themeStyles.textPrimary} />
      )}
    </button>

    
    <Clock size={18} className={`hidden md:block ${themeStyles.textMuted}`} />
    <Bell size={18} className={`hidden md:block ${themeStyles.textMuted}`} />
    <LayoutGrid size={18} className={`hidden md:block ${themeStyles.textMuted}`} />

    
    <PanelRight
      size={18}
      strokeWidth={1.5}
      className={`${themeStyles.textPrimary} cursor-pointer`}
      onClick={toggleRightbar}
    />
  </div>
</header>
  )
}