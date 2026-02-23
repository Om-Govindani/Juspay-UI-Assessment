import React, { useState } from "react"
import Header from "../Header"
import RightBar from "../Rightbar"
import OrdersTable from "./OrdersTable"
import { useTheme } from "../../contexts/ThemeContext"

export default function OrdersPage({ showSidebar, setShowSidebar }) {
  const { themeStyles } = useTheme()
  const [showRightbar, setShowRightbar] = useState(true)

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col flex-1 min-w-0">
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          showRightbar={showRightbar}
          setShowRightbar={setShowRightbar}
        />

        <main
          className={`flex-1 p-6 overflow-y-auto transition-colors duration-200 ${themeStyles.textPrimary}`}
        >
          <div className="max-w-full">
            <OrdersTable />
          </div>
        </main>
      </div>
    </div>
  )
}