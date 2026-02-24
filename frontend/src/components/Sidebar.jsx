import { useState } from "react"
import {
  PanelLeft,
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

import { IoCloseOutline } from "react-icons/io5";

import { CgProfile } from "react-icons/cg"

import { useTheme } from "../contexts/ThemeContext"

export default function Sidebar({showSidebar , setShowSidebar}) {
  const { theme , themeStyles } = useTheme()
  const [openMenu, setOpenMenu] = useState("User Profile")
  const toggleMenu = (menu) => {
    setOpenMenu(prev => (prev === menu ? null : menu))
  }

  return (
    <aside
      className={`
        fixed lg:static z-40
        ${showSidebar ? "w-[240px]" : "w-0"}
        h-screen overflow-y-scroll
        transition-all duration-300
        pt-[20px] pb-[20px] px-[22px]
        flex flex-col gap-[14px]
        font-inter border-r lg:translate-x-0
        ${themeStyles.sidebarBg} ${themeStyles.borderPrimary}
        ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
      `}
    >
      <div className="flex items-center gap-[12px]">
        <CgProfile color={theme === "dark" ? "white" : "black"} size={22}/>
        <span className={`text-[14px] font-medium ${themeStyles.textPrimary}`}>
          ByeWind
        </span>
      </div>
      <div 
        className="absolute top-6 right-3"
        onClick={()=>setShowSidebar(!showSidebar)}
      >
        <PanelLeft color={theme === "dark" ? "white" : "black"} size={18}/>
      </div>
      <SectionTitle>Favorites</SectionTitle>
      <DotItem label="Overview" />
      <DotItem label="Projects" />

      <SectionTitle >Dashboards</SectionTitle>

      <ActiveItem
        icon={<LayoutDashboard size={16} strokeWidth={1.5} />}
        label="Default"
      />

      <div>
        <NavItem icon={<ShoppingBag size={16} />} label="eCommerce" />
        <NavItem icon={<Folder size={16} />} label="Projects" />
        <NavItem icon={<BookOpen size={16} />} label="Online Courses" />
      </div>
      <SectionTitle >Pages</SectionTitle>

      <AccordionItem
        label="User Profile"
        icon={<User size={16} />}
        isOpen={openMenu === "User Profile"}
        onClick={() => toggleMenu("User Profile")}
      >
        {["Overview", "Projects", "Campaigns", "Documents", "Followers"].map(item => (
          <SubItem key={item} label={item} />
        ))}
      </AccordionItem>

      <AccordionItem
        label="Account"
        icon={<IdCard size={16} />}
        isOpen={openMenu === "Account"}
        onClick={() => toggleMenu("Account")}
      >
        <SubItem label="Settings"/>
        <SubItem label="Billing"/>
      </AccordionItem>

      <AccordionItem
        label="Corporate"
        icon={<Settings size={16} />}
        isOpen={openMenu === "Corporate"}
        onClick={() => toggleMenu("Corporate")}
      >
        <SubItem label="Teams" />
        <SubItem label="Policies" />
      </AccordionItem>

      <AccordionItem
        label="Blog"
        icon={<FileText size={16} />}
        isOpen={openMenu === "Blog"}
        onClick={() => toggleMenu("Blog")}
      >
        <SubItem label="All Posts"/>
        <SubItem label="Categories" />
      </AccordionItem>

      <AccordionItem
        label="Social"
        icon={<MessageCircle size={16} />}
        isOpen={openMenu === "Social"}
        onClick={() => toggleMenu("Social")}
      >
        <SubItem label="Messages" />
        <SubItem label="Followers" />
      </AccordionItem>

    </aside>
  )
}

function SectionTitle({ children}) {
  const { themeStyles } = useTheme()
  return (
    <div
        className={`text-[12px] font-light leading-[16px] mt-[10px] ${themeStyles.textMuted}`}
    >
        {children}
    </div>
  )
}

function DotItem({ label }) {
  const { themeStyles } = useTheme()
  return (
    <div className="flex items-center gap-[12px]">
      <div className={`w-[6px] h-[6px] rounded-full ${themeStyles.textMuted}`} />
      <span className={`text-[14px] ${themeStyles.textPrimary}`}>
        {label}
      </span>
    </div>
  )
}

function NavItem({ icon, label }) {
  const { themeStyles } = useTheme()
  return (
    <div
      className={`
        flex gap-[12px] px-[2px] py-[6px] rounded-[8px]
        text-[14px] cursor-pointer transition-colors duration-200
        ${themeStyles.textPrimary}
        hover:bg-black/5 dark:hover:bg-white/10
      `}
    >
      <ChevronRight size={14} className={themeStyles.textMuted} />
      {icon}
      <span>{label}</span>
    </div>
  )
}

function ActiveItem({ icon, label }) {
  const { themeStyles } = useTheme()
  return (
    <div
      className={`
        relative flex items-center gap-[12px] px-[8px] py-[6px]
        rounded-[8px] text-[14px]
        ${themeStyles.cardBg}
        ${themeStyles.textPrimary}
      `}
    >
      <div className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-full bg-current" />
      <div className="ml-[6px] flex items-center gap-[12px]">
        {icon}
        <span>{label}</span>
      </div>
    </div>
  )
}

function AccordionItem({ icon, label, isOpen, onClick, children }) {
  const { themeStyles } = useTheme()

  return (
    <div className="flex flex-col">
      <div
        onClick={onClick}
        className={`
          flex items-center gap-[12px]
          px-[2px] py-[6px]
          rounded-[8px]
          cursor-pointer
          text-[14px]
          ${themeStyles.textPrimary}
          hover:bg-black/5 dark:hover:bg-white/10
        `}
      >
        <ChevronRight
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          } ${themeStyles.textMuted}`}
        />
        {icon}
        <span>{label}</span>
      </div>

      {isOpen && (
        <div className="ml-[40px] flex flex-col gap-[8px] mt-[4px]">
          {children}
        </div>
      )}
    </div>
  )
}


function SubItem({ label }) {
  const { themeStyles } = useTheme()
  return (
    <span className={`ml-4 text-[14px] cursor-pointer ${themeStyles.textMuted}`}>
      {label}
    </span>
  )
}