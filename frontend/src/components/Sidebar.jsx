import { useState } from "react"
import {
  LayoutDashboard,
  ShoppingBag,
  Folder,
  BookOpen,
  User,
  IdCard,
  Settings,
  FileText,
  MessageCircle,
  ChevronRight
} from "lucide-react"

import { CgProfile } from "react-icons/cg"

import { useTheme } from "../contexts/ThemeContext"

export default function Sidebar() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [openMenu, setOpenMenu] = useState("User Profile") // default open

  const toggleMenu = (menu) => {
    setOpenMenu(prev => (prev === menu ? null : menu))
  }

  return (
    <aside
      className={`
        w-[240px]
        h-screen overflow-y-scroll
        transition-colors duration-300
        pt-[20px] pb-[20px] px-[22px]
        flex flex-col gap-[14px]
        font-inter
        ${
          isDark
            ? "bg-neutral-900 border-r border-white/10"
            : "bg-white border-r border-[#1C1C1C30]"
        }
      `}
    >
      <div className="flex items-center gap-[12px]">
        <CgProfile color={isDark ? "white" : "#1C1C1C"} size={22}/>
        <span className={`text-[14px] font-medium ${isDark ? "text-white" : "text-neutral-900"}`}>
          ByeWind
        </span>
      </div>

      <SectionTitle isDark={isDark}>Favorites</SectionTitle>
      <DotItem isDark={isDark} label="Overview" />
      <DotItem isDark={isDark} label="Projects" />

      <SectionTitle isDark={isDark}>Dashboards</SectionTitle>

      <ActiveItem
        isDark={isDark}
        icon={<LayoutDashboard size={16} strokeWidth={1.5} />}
        label="Default"
      />

      <NavItem isDark={isDark} icon={<ShoppingBag size={16} />} label="eCommerce" />
      <NavItem isDark={isDark} icon={<Folder size={16} />} label="Projects" />
      <NavItem isDark={isDark} icon={<BookOpen size={16} />} label="Online Courses" />

      <SectionTitle isDark={isDark}>Pages</SectionTitle>

      <AccordionItem
        label="User Profile"
        icon={<User size={16} />}
        isDark={isDark}
        isOpen={openMenu === "User Profile"}
        onClick={() => toggleMenu("User Profile")}
      >
        {["Overview", "Projects", "Campaigns", "Documents", "Followers"].map(item => (
          <SubItem key={item} label={item} isDark={isDark} />
        ))}
      </AccordionItem>

      <AccordionItem
        label="Account"
        icon={<IdCard size={16} />}
        isDark={isDark}
        isOpen={openMenu === "Account"}
        onClick={() => toggleMenu("Account")}
      >
        <SubItem label="Settings" isDark={isDark} />
        <SubItem label="Billing" isDark={isDark} />
      </AccordionItem>

      <AccordionItem
        label="Corporate"
        icon={<Settings size={16} />}
        isDark={isDark}
        isOpen={openMenu === "Corporate"}
        onClick={() => toggleMenu("Corporate")}
      >
        <SubItem label="Teams" isDark={isDark} />
        <SubItem label="Policies" isDark={isDark} />
      </AccordionItem>

      <AccordionItem
        label="Blog"
        icon={<FileText size={16} />}
        isDark={isDark}
        isOpen={openMenu === "Blog"}
        onClick={() => toggleMenu("Blog")}
      >
        <SubItem label="All Posts" isDark={isDark} />
        <SubItem label="Categories" isDark={isDark} />
      </AccordionItem>

      <AccordionItem
        label="Social"
        icon={<MessageCircle size={16} />}
        isDark={isDark}
        isOpen={openMenu === "Social"}
        onClick={() => toggleMenu("Social")}
      >
        <SubItem label="Messages" isDark={isDark} />
        <SubItem label="Followers" isDark={isDark} />
      </AccordionItem>

    </aside>
  )
}

function SectionTitle({ children, isDark }) {
  return (
    <div
        className={`text-[12px] font-light leading-[16px] mt-[10px] ${
            isDark ? "text-white/50" : "text-neutral-900"
        }`}
    >
        {children}
    </div>
  )
}

function DotItem({ label, isDark }) {
  return (
    <div className="flex items-center gap-[12px]">
        <div
            className={`w-[6px] h-[6px] rounded-full ${
                isDark ? "bg-white/40" : "bg-neutral-900"
            }`}
        />
        <span
            className={`text-[14px] leading-[20px] ${
                isDark ? "text-white" : "text-neutral-900"
            }`}
        >
            {label}
        </span>
    </div>
  )
}

function NavItem({ icon, label, isDark }) {
  return (
    <div
        className={`flex gap-[12px] px-[2px] py-[6px] rounded-[8px]
        text-[14px] leading-[20px] cursor-pointer transition-colors duration-200
        ${
            isDark
            ? "text-white hover:bg-white/10"
            : "text-neutral-900 hover:bg-black/5"
        }`}
    >
        <ChevronRight
            size={14}
            className={isDark ? "text-white/50" : "text-neutral-900"}
        />
        {icon}
        <span>{label}</span>
        </div>
    )
}

function ActiveItem({ icon, label, isDark }) {
  return (
    <div
      className={`relative flex items-center gap-[12px] px-[8px] py-[6px]
        rounded-[8px] text-[14px] leading-[20px]
        ${
          isDark
            ? "bg-white/10 text-white"
            : "bg-[#ECECEC] text-neutral-800"
        }`}
    >
        <div
            className={`absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-full ${
                isDark ? "bg-white" : "bg-neutral-800"
            }`}
        />
        <div className="ml-[6px] flex items-center gap-[12px]">
            {icon}
            <span>{label}</span>
        </div>
    </div>
  )
}

function AccordionItem({ icon, label, isDark, isOpen, onClick, children }) {
  return (
    <div className="flex flex-col">
      <div
        onClick={onClick}
        className={`
          flex items-center gap-[12px]
          px-[2px] py-[6px]
          rounded-[8px] transition-all duration-100
          cursor-pointer
          text-[14px]
          ${
            isDark
              ? "text-white hover:bg-white/10"
              : "text-neutral-800 hover:bg-black/5"
          }
        `}
      >
        <ChevronRight
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
        {icon}
        <span>{label}</span>
      </div>

      {isOpen && (
        <div className="ml-[40px] flex flex-col gap-[8px] mt-[4px] transition-all ease">
          {children}
        </div>
      )}
    </div>
  )
}

function SubItem({ label, isDark }) {
  return (
    <span
      className={`ml-4 text-[14px] leading-[20px] cursor-pointer ${
        isDark ? "text-white/90" : "text-neutral-800"
      }`}
    >
      {label}
    </span>
  )
}