import React from "react"
import { useTheme } from "../../contexts/ThemeContext"

const rows = [
  ["ASOS Ridley High Waist", "$79.49", 82, "$6,518.18"],
  ["Marco Lightweight Shirt", "$128.50", 37, "$4,754.50"],
  ["Half Sleeve Shirt", "$39.99", 64, "$2,559.36"],
  ["Lightweight Jacket", "$20.00", 184, "$3,680.00"],
  ["Marco Shoes", "$79.49", 64, "$1,965.81"],
]

export default function TopProductsTable() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div>
      <table className="w-full text-sm mt-6">
        <thead>
          <tr className="text-left text-[14px] text-neutral-400">
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className={`border-t ${isDark ? "border-neutral-800" : "border-gray-100"} h-12`}>
              <td className="py-2">{r[0]}</td>
              <td className="py-2">{r[1]}</td>
              <td className="py-2">{r[2]}</td>
              <td className="py-2">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}