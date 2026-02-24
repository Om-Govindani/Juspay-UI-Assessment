import {
  Bug,
  UserPlus,
  Radio,
  PanelRight 
} from "lucide-react"

import { useTheme } from "../contexts/ThemeContext"

export default function RightBar({showRightbar , setShowRightbar}) {
  const { theme,themeStyles } = useTheme()

  return (
    <aside
      className={`
        "w-[280px]" fixed lg:static
        h-screen overflow-y-scroll
        p-[20px] right-0 top-0 z-40
        flex flex-col
        gap-[24px]
        font-inter
        transition-all duration-300
        ${themeStyles.sidebarBg}
        border-l ${themeStyles.borderSecondary}
        ${showRightbar ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0
      `}
    >
      <SectionTitle >Notifications</SectionTitle>

      <div 
        className="absolute top-6 right-3"
        onClick={()=>setShowRightbar(!showRightbar)}
      >
        <PanelRight color={theme === "dark" ? "white" : "dark"} size={18}/>
      </div>
      <div className="flex flex-col gap-[16px]">
        <NotificationItem
          icon={<Bug size={16} />}
          title="You have a bug that needs..."
          time="Just now"
        />
        <NotificationItem
          icon={<UserPlus size={16} />}
          title="New user registered"
          time="59 minutes ago"
        />
        <NotificationItem
          icon={<Bug size={16} />}
          title="You have a bug that needs..."
          time="12 hours ago"
        />
        <NotificationItem
          icon={<Radio size={16} />}
          title="Andi Lane subscribed to you"
          time="Today, 11:59 AM"
        />
      </div>

      <SectionTitle >Activities</SectionTitle>

      <div className="flex flex-col gap-[18px]">
        <ActivityItem name="You have a bug that needs..." time="Just now" />
        <ActivityItem name="Released a new version" time="59 minutes ago" />
        <ActivityItem name="Submitted a bug" time="12 hours ago" />
        <ActivityItem name="Modified A data in Page X" time="Today, 11:59 AM" />
        <ActivityItem name="Deleted a page in Project X" time="Feb 2, 2023"/>
      </div>

      <SectionTitle >Contacts</SectionTitle>

      <div className="flex flex-col gap-[14px]">
        {[
          "Natali Craig",
          "Drew Cano",
          "Orlando Diggs",
          "Andi Lane",
          "Kate Morrison",
          "Koray Okumus",
        ].map((name) => (
          <ContactItem key={name} name={name} />
        ))}
      </div>
    </aside>
  )
}

function SectionTitle({ children }) {
  const {themeStyles} = useTheme();
  return (
    <div
      className={`text-[14px] font-medium ${themeStyles.textPrimary}`}
    >
      {children}
    </div>
  )
}


function NotificationItem({ icon, title, time }) {
  const { themeStyles } = useTheme()

  return (
    <div className="flex gap-[12px] items-start">
      <div
        className={`
          w-[32px] h-[32px]
          flex items-center justify-center
          rounded-full
          ${themeStyles.cardBg}
          ${themeStyles.textPrimary}
        `}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-[2px]">
        <span className={`text-[14px] ${themeStyles.textPrimary}`}>
          {title}
        </span>
        <span className={`text-[12px] ${themeStyles.textMuted}`}>
          {time}
        </span>
      </div>
    </div>
  )
}

function ActivityItem({ name, time }) {
  const { themeStyles } = useTheme()

  return (
    <div className="flex gap-[12px] items-start">
      <Avatar name={name} />
      <div className="flex flex-col gap-[2px]">
        <span className={`text-[14px] ${themeStyles.textPrimary}`}>
          {name}
        </span>
        <span className={`text-[12px] ${themeStyles.textMuted}`}>
          {time}
        </span>
      </div>
    </div>
  )
}

function ContactItem({ name }) {
  const { themeStyles } = useTheme()

  return (
    <div className="flex items-center gap-[12px]">
      <Avatar name={name} />
      <span className={`text-[14px] ${themeStyles.textPrimary}`}>
        {name}
      </span>
    </div>
  )
}

function Avatar({ name }) {
  const { themeStyles } = useTheme()
  const initial = name.charAt(0).toUpperCase()

  return (
    <div
      className={`
        w-[32px] h-[32px]
        rounded-full
        flex items-center justify-center
        text-[14px] font-medium
        ${themeStyles.cardBg}
        ${themeStyles.textPrimary}
      `}
    >
      {initial}
    </div>
  )
}