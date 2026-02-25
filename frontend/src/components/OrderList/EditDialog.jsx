import { useEffect, useState } from "react"
import { useTheme } from "../../contexts/ThemeContext"

export default function EditDialog({ row, onClose, onSave }) {
  const { themeStyles, theme } = useTheme()
  const [form, setForm] = useState(row)

  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", escClose)
    return () => window.removeEventListener("keydown", escClose)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className={`w-[420px] p-6 rounded-2xl shadow-xl transition-colors ${themeStyles.cardBg}`}>

        <div className="flex justify-between items-center mb-5">
          <h2 className={`text-lg font-semibold ${themeStyles.textPrimary}`}>
            Edit Order
          </h2>
        </div>

        <div className="flex flex-col gap-4">

          <FormField
            label="User"
            value={form.user}
            onChange={(v) => handleChange("user", v)}
          />

          <FormField
            label="Project"
            value={form.project}
            onChange={(v) => handleChange("project", v)}
          />

          <FormField
            label="Address"
            value={form.address}
            onChange={(v) => handleChange("address", v)}
          />

          <div className="flex flex-col gap-1">
            <label className={`text-xs ${themeStyles.textMuted}`}>
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className={`
                px-3 py-2 rounded-lg border outline-none text-sm
                transition-all duration-200
                ${themeStyles.inputBg}
                ${themeStyles.textPrimary}
                ${theme === "dark"
                  ? "border-white/10 focus:border-blue-400"
                  : "border-neutral-300 focus:border-blue-500"}
              `}
            >
              <option>In Progress</option>
              <option>Complete</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">

            <button
              onClick={onClose}
              className={`
                px-4 py-2 rounded-lg text-sm border
                transition-all duration-200
                ${theme === "dark"
                  ? "border-white/20 hover:bg-white/10 text-white"
                  : "border-neutral-300 hover:bg-neutral-100 text-neutral-800"}
              `}
            >
              Cancel
            </button>

            <button
              onClick={() => onSave(form)}
              className="px-4 py-2 rounded-lg text-sm bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
            >
              Save Changes
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}

function FormField({ label, value, onChange }) {
  const { themeStyles, theme } = useTheme()

  return (
    <div className="flex flex-col gap-1">
      <label className={`text-xs ${themeStyles.textMuted}`}>
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          px-3 py-2 rounded-lg border outline-none text-sm
          transition-all duration-200
          ${themeStyles.inputBg}
          ${themeStyles.textPrimary}
          ${theme === "dark"
            ? "border-white/10 focus:border-blue-400"
            : "border-neutral-300 focus:border-blue-500"}
        `}
      />
    </div>
  )
}