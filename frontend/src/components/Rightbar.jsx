import {
  Bug,
  UserPlus,
  Radio,
} from "lucide-react"

import { useTheme } from "../contexts/ThemeContext"

export default function RightBar() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const bgClass = isDark ? "bg-neutral-800" : "bg-[#F9F9F9]"
  const borderClass = isDark ? "border-white/10" : "border-[#1C1C1C1A]"
  const textPrimary = isDark ? "text-white" : "text-[#1C1C1C]"
  const textMuted = isDark ? "text-white/60" : "text-[#1C1C1C66]"

  return (
    <aside
      className={`
        w-[370px]
        h-screen overflow-y-scroll
        p-[20px]
        flex flex-col
        gap-[24px]
        font-inter
        transition-colors duration-300
        ${bgClass}
        border-l ${borderClass}
      `}
    >
      <SectionTitle isDark={isDark}>Notifications</SectionTitle>

      <div className="flex flex-col gap-[16px]">
        <NotificationItem
          icon={<Bug size={16} />}
          title="You have a bug that needs..."
          time="Just now"
          isDark={isDark}
        />
        <NotificationItem
          icon={<UserPlus size={16} />}
          title="New user registered"
          time="59 minutes ago"
          isDark={isDark}
        />
        <NotificationItem
          icon={<Bug size={16} />}
          title="You have a bug that needs..."
          time="12 hours ago"
          isDark={isDark}
        />
        <NotificationItem
          icon={<Radio size={16} />}
          title="Andi Lane subscribed to you"
          time="Today, 11:59 AM"
          isDark={isDark}
        />
      </div>

      <SectionTitle isDark={isDark}>Activities</SectionTitle>

      <div className="flex flex-col gap-[18px]">
        <ActivityItem name="You have a bug that needs..." time="Just now" isDark={isDark} />
        <ActivityItem name="Released a new version" time="59 minutes ago" isDark={isDark} />
        <ActivityItem name="Submitted a bug" time="12 hours ago" isDark={isDark} />
        <ActivityItem name="Modified A data in Page X" time="Today, 11:59 AM" isDark={isDark} />
        <ActivityItem name="Deleted a page in Project X" time="Feb 2, 2023" isDark={isDark} />
      </div>

      <SectionTitle isDark={isDark}>Contacts</SectionTitle>

      <div className="flex flex-col gap-[14px]">
        {[
          "Natali Craig",
          "Drew Cano",
          "Orlando Diggs",
          "Andi Lane",
          "Kate Morrison",
          "Koray Okumus",
        ].map((name) => (
          <ContactItem key={name} name={name} isDark={isDark} />
        ))}
      </div>
    </aside>
  )
}

function SectionTitle({ children, isDark }) {
  return (
    <div
      className={`text-[14px] font-medium ${
        isDark ? "text-white" : "text-[#1C1C1C]"
      }`}
    >
      {children}
    </div>
  )
}

function NotificationItem({ icon, title, time, isDark }) {
  return (
    <div className="flex gap-[12px] items-start">
      <div
        className={`
          w-[32px] h-[32px]
          flex items-center justify-center
          rounded-full
          ${isDark ? "bg-white/10 text-white" : "bg-[#EAEAEA] text-[#1C1C1C]"}
        `}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-[2px]">
        <span
          className={`text-[14px] font-normal ${
            isDark ? "text-white" : "text-[#1C1C1C]"
          }`}
        >
          {title}
        </span>
        <span
          className={`text-[12px] ${
            isDark ? "text-white/60" : "text-[#1C1C1C66]"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  )
}

function ActivityItem({ name, time, isDark }) {
  return (
    <div className="flex gap-[12px] items-start">
      <Avatar name={name} isDark={isDark} />

      <div className="flex flex-col gap-[2px]">
        <span
          className={`text-[14px] ${
            isDark ? "text-white" : "text-[#1C1C1C]"
          }`}
        >
          {name}
        </span>
        <span
          className={`text-[12px] ${
            isDark ? "text-white/60" : "text-[#1C1C1C66]"
          }`}
        >
          {time}
        </span>
      </div>
    </div>
  )
}

function ContactItem({ name, isDark }) {
  return (
    <div className="flex items-center gap-[12px]">
      <Avatar name={name} isDark={isDark} />
      <span
        className={`text-[14px] ${
          isDark ? "text-white" : "text-[#1C1C1C]"
        }`}
      >
        {name}
      </span>
    </div>
  )
}

function Avatar({ name, isDark }) {
  const initial = name.charAt(0).toUpperCase()

  return (
    <div
      className={`
        w-[32px] h-[32px]
        rounded-full
        flex items-center justify-center
        text-[14px] font-medium
        ${
          isDark
            ? "bg-white/10 text-white"
            : "bg-[#DADADA] text-[#1C1C1C]"
        }
      `}
    >
      {initial}
    </div>
  )
}