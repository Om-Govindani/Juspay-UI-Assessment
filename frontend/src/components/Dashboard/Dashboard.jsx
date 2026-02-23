import React from "react"
import { useTheme } from "../../contexts/ThemeContext"
import StatsCard from "./StatsCard"
import BarChart from "./BarChart"
import LineChart from "./LineChart"
import MapChart from "./MapChart"
import DonutChart from "./DonutChart"
import TopProductsTable from "./TopProductsTable"
import Header from "../Header"
import RightBar from "../Rightbar"

export default function Dashboard({showSidebar , setShowSidebar}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className='flex flex-row w-full'>
      <div>
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <main className={`p-6 max-h-screen max-w-[1250px] overflow-y-scroll font-inter transition-colors duration-200 ${isDark ? "text-white" : "text-neutral-900"}`}>
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-6">
                <div className="grid grid-cols-2 gap-6">
                  <StatsCard title="Customers" value="3,781" meta="+11.01%" highlight />
                  <StatsCard title="Orders" value="1,219" meta="-0.03%" />
                  <StatsCard title="Revenue" value="$695" meta="+15.03%" />
                  <StatsCard title="Growth" value="30.1%" meta="+6.08%" highlight />
                </div>
              </div>

              <div className="col-span-6">
                <Card title="Projections vs Actuals">
                  <div className="w-full">
                    <BarChart />
                  </div>
                </Card>
              </div>

              <div className="col-span-9">
                  
                <Card title="Revenue">
                  <LineChart />
                </Card>
              </div>

              <div className="col-span-3">
                <Card title="Revenue by Location">
                  <MapChart />
                </Card>
              </div>

              <div className="col-span-9">
                <Card title="Top Selling Products">
                  <TopProductsTable />
                </Card>
              </div>

              <div className="col-span-3">
                <Card title="Total Sales">
                  <DonutChart legendOnly />
                </Card>
              </div>

              </div>
          </main>
      </div>
      <RightBar />
    </div>
  )
}


function Card({ title, children }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  return (
    <div className={`rounded-xl p-5 shadow-sm transition-colors duration-200 ${isDark ? "bg-neutral-800" : "bg-neutral-100"}`}>
      {title && <div className={`text-sm ${isDark ? "text-white" : "text-neutral-800"} font-medium mb-4`}>{title}</div>}
      <div>{children}</div>
    </div>
  )
}