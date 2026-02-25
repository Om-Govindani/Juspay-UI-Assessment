import {React , useState} from "react"
import { useTheme } from "../../contexts/ThemeContext"
import StatsCard from "./StatsCard"
import BarChart from "./BarChart"
import LineChart from "./LineChart"
import MapChart from "./MapChart"
import DonutChart from "./DonutChart"
import TopProductsTable from "./TopProductsTable"
import Header from "../Header"
import RightBar from "../Rightbar"

export default function Dashboard({showSidebar , setShowSidebar, showRightbar , setShowRightbar }) {
  const { themeStyles } = useTheme()
  return (
    <div className="flex w-full h-screen">
      <div className="flex-col flex-1 min-w-0">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} showRightbar={showRightbar} setShowRightbar={setShowRightbar} />
          <main className={`p-6 max-h-screen overflow-y-scroll overflow-x-hidden font-inter transition-colors duration-200 ${themeStyles.textPrimary}`}>
            <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-12 gap-6 mb-16">
              <div className="col-span-6 ">
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

              <div className="col-span-6 lg:col-span-9">
                  
                <Card title="Revenue">
                  <LineChart />
                </Card>
              </div>

              <div className="col-span-6 lg:col-span-3">
                <Card title="Revenue by Location">
                  <MapChart />
                </Card>
              </div>

              <div className="col-span-6 lg:col-span-9">
                <Card title="Top Selling Products">
                  <TopProductsTable />
                </Card>
              </div>

              <div className="col-span-6 lg:col-span-3">
                <Card title="Total Sales">
                  <DonutChart legendOnly />
                </Card>
              </div>

              </div>
          </main>
      </div>
      {showRightbar && <RightBar showRightbar={showRightbar} setShowRightbar={setShowRightbar}/>}
    </div>
  )
}


function Card({ title, children }) {
  const { themeStyles } = useTheme()
  return (
    <div className={`rounded-xl p-5 shadow-sm ${themeStyles.cardBg} hover:shadow-xl transition-all duration-200`}>
      {title && <div className={`text-sm ${themeStyles.textSecondary} font-medium mb-4`}>{title}</div>}
      <div>{children}</div>
    </div>
  )
}