import React, { useMemo, useState } from "react"
import {
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Calendar,
  MoreHorizontal
} from "lucide-react"
import { useTheme } from "../../contexts/ThemeContext"


function generateData(count = 35) {
  const firstNames = ["Aarav", "Vihaan", "Aditya", "Arjun", "Reyansh", "Ishaan", "Kabir", "Rudra", "Aryan", "Krishna"]
  const lastNames = ["Sharma", "Verma", "Gupta", "Mehta", "Kapoor", "Reddy", "Nair", "Patel", "Singh", "Malhotra"]

  const projects = [
    "Landing Page",
    "CRM Admin",
    "Client Portal",
    "Dashboard UI",
    "Mobile App",
    "Ecommerce",
    "Analytics Panel",
    "Marketing Site"
  ]

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Ahmedabad",
    "Kolkata"
  ]

  const statuses = ["In Progress", "Complete", "Pending", "Approved", "Rejected"]

  return Array.from({ length: count }).map((_, i) => {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)]
    const last = lastNames[Math.floor(Math.random() * lastNames.length)]
    const project = projects[Math.floor(Math.random() * projects.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    return {
      id: `#CM${9800 + i}`,
      user: `${first} ${last}`,
      project,
      address: `${Math.floor(Math.random() * 999)} ${city}`,
      date: `${Math.floor(Math.random() * 12) + 1} hrs ago`,
      status
    }
  })
}

const statusColor = {
  "In Progress": "text-blue-400",
  "Complete": "text-emerald-400",
  "Pending": "text-sky-400",
  "Approved": "text-yellow-400",
  "Rejected": "text-gray-400",
}

export default function OrdersTable() {
  const { themeStyles } = useTheme()
  const [statusFilter, setStatusFilter] = useState("All")
  const [showFilter, setShowFilter] = useState(false)

  const rowsData = useMemo(() => generateData(35), [])
  const [q, setQ] = useState("")  
  const [sort, setSort] = useState({ key: null, dir: null })
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(() => new Set())

  const pageSize = 10

  const filtered = useMemo(() => {
  const query = q.trim().toLowerCase()

  let arr = rowsData.filter(r => {
    const matchesSearch =
      r.id.toLowerCase().includes(query) ||
      r.user.toLowerCase().includes(query) ||
      r.project.toLowerCase().includes(query) ||
      r.address.toLowerCase().includes(query) ||
      r.date.toLowerCase().includes(query) ||
      r.status.toLowerCase().includes(query)

    const matchesStatus =
      statusFilter === "All" || r.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (sort.key) {
    arr = arr.slice().sort((a, b) => {
      const ka = a[sort.key]
      const kb = b[sort.key]

      if (ka < kb) return sort.dir === "asc" ? -1 : 1
      if (ka > kb) return sort.dir === "asc" ? 1 : -1
      return 0
    })
  }

  return arr
}, [rowsData, q, sort, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  if (page > totalPages) setPage(totalPages)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  /* selection helpers */
  const toggleRow = id => {
    setSelected(prev => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })
  }
  const toggleAllOnPage = () => {
    const idsOnPage = paginated.map(r => r.id)
    setSelected(prev => {
      const s = new Set(prev)
      const allSelected = idsOnPage.every(id => s.has(id))
      if (allSelected) {
        idsOnPage.forEach(id => s.delete(id))
      } else {
        idsOnPage.forEach(id => s.add(id))
      }
      return s
    })
  }

  const toggleSort = key => {
    setSort(prev => {
      if (prev.key !== key) return { key, dir: "asc" }
      if (prev.dir === "asc") return { key, dir: "desc" }
      return { key: null, dir: null }
    })
  }

  return (
    <div className={`rounded-xl overflow-hidden transition-colors`}>

      <div className={`flex items-center justify-between gap-2 p-2 rounded-md ${themeStyles.cardBg}`}>
        <div className="flex items-center gap-3">
          <button className={`p-2 rounded-md`} title="New">
            <Plus size={16} className={themeStyles.textPrimary} />
          </button>

          <div className="relative">
            <button
                className={`p-2 rounded-md`}
                title="Filter"
                onClick={() => setShowFilter(prev => !prev)}
            >
                <SlidersHorizontal size={16} className={themeStyles.textPrimary} />
            </button>

            {showFilter && (
                <div className={`absolute mt-2 rounded-md shadow-md p-2 z-50 w-32 ${themeStyles.cardBg}`}>
                {["All", "In Progress", "Complete", "Pending", "Approved", "Rejected"].map(status => (
                    <div
                    key={status}
                    onClick={() => {
                        setStatusFilter(status)
                        setShowFilter(false)
                        setPage(1)
                    }}
                    className={`px-3 py-1 text-sm cursor-pointer hover:opacity-70 ${themeStyles.textPrimary}`}
                    >
                    {status}
                    </div>
                ))}
                </div>
            )}
            </div>

          <button
            className={`p-2 rounded-md`}
            title="Sort by Date"
            onClick={() => toggleSort("date")}
          >
            <ArrowUpDown size={16} className={themeStyles.textPrimary} />
          </button>
        </div>

        <div className={`flex items-center gap-2`}>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1) }}
            placeholder="Search"
            className={`px-3 py-2 rounded-md text-sm outline-none min-w-[180px] ${themeStyles.inputBg} ${themeStyles.textPrimary}`}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className={`${themeStyles.textMuted} text-left`}>
            <tr>
              <th className="p-2">
                <input
                  type="checkbox"
                  onChange={toggleAllOnPage}
                  checked={paginated.length > 0 && paginated.every(r => selected.has(r.id))}
                />
              </th>

              <th className="p-2 cursor-pointer select-none" onClick={() => toggleSort("id")}>
                Order ID
                {sort.key === "id" && <span className="ml-2 text-xs">({sort.dir})</span>}
              </th>

              <th className="p-2">User</th>

              <th className="p-2 cursor-pointer select-none" onClick={() => toggleSort("project")}>
                Project
                {sort.key === "project" && <span className="ml-2 text-xs">({sort.dir})</span>}
              </th>

              <th className="p-2">Address</th>

              <th className="p-2 cursor-pointer select-none" onClick={() => toggleSort("date")}>
                Date
                {sort.key === "date" && <span className="ml-2 text-xs">({sort.dir})</span>}
              </th>

              <th className="p-2">Status</th>

              <th className="p-2" />
            </tr>
          </thead>

          <tbody>
            {paginated.map((r, idx) => (
              <tr
                key={r.id}
                className={`border-t ${themeStyles.tableBorder} transition-colors hover:${themeStyles.surfaceBg === "bg-white" ? "bg-black/2" : ""} hover:bg-black/5`}
              >
                <td className="p-2 ">
                  <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleRow(r.id)} />
                </td>

                <td className="p-2 ">{r.id}</td>

                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-neutral-700 ${avatarColor(r.user)}}`}>
                      {r.user.charAt(0)}
                    </div>
                    <div className={`${themeStyles.textPrimary}`}>{r.user}</div>
                  </div>
                </td>

                <td className="p-2 ">{r.project}</td>

                <td className="p-2 ">{r.address}</td>

                <td className="p-2 ">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className={themeStyles.textMuted} />
                    <span className={themeStyles.textMuted}>{r.date}</span>
                  </div>
                </td>

                <td className="p-4 ">
                  <span className={`text-xs font-medium ${statusColor[r.status]}`}>
                    ● <span className="ml-1">{r.status}</span>
                  </span>
                </td>

                <td className="p-4 ">
                  <MoreHorizontal size={16} className={themeStyles.textMuted} />
                </td>
              </tr>
            ))}

            {paginated.length === 0 && (
              <tr>
                <td colSpan={8} className={`p-6 text-center ${themeStyles.textMuted}`}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <div className="flex items-center justify-center gap-3 p-2">
        <button
          className={`px-3 py-1 rounded ${themeStyles.surfaceBg}`}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageIndex = i + 1
          const active = pageIndex === page
          return (
            <button
              key={i}
              onClick={() => setPage(pageIndex)}
              className={`px-3 py-1 rounded ${active ? themeStyles.highlightCard : themeStyles.surfaceBg}`}
            >
              {pageIndex}
            </button>
          )
        })}

        <button
          className={`px-3 py-1 rounded ${themeStyles.surfaceBg}`}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          ›
        </button>
      </div>
    </div>
  )
}

function avatarColor(name) {
  const colors = [
    "bg-red-100 text-red-700",
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-indigo-100 text-indigo-700",
  ]

  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}