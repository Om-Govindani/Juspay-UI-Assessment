import React, { useMemo, useRef, useEffect } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useTheme } from "../../contexts/ThemeContext"

const salesData = [
  { name: "Direct", y: 38.6, amount: "$300.56", color: "#111827" },
  { name: "Affiliate", y: 17.4, amount: "$135.18", color: "#A7F3D0" },
  { name: "Sponsored", y: 21.0, amount: "$154.02", color: "#A5B4FC" },
  { name: "E-mail", y: 8.0, amount: "$48.96", color: "#BAE6FD" }
]

export default function DonutChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const chartRef = useRef(null)

  const options = useMemo(() => ({
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 145,
      animation: true
    },

    title: { text: null },

    tooltip: {
      pointFormat: "<b>{point.y}%</b>",
      backgroundColor: isDark ? "#1f2937" : "#374151",
      style: { color: "#ffffff" },
      borderWidth: 0,
      borderRadius: 8
    },

    plotOptions: {
      pie: {
        innerSize: "70%",
        borderWidth: 0,
        dataLabels: { enabled: false },
        allowPointSelect: true,
        cursor: "pointer",
        states: {
          hover: {
            brightness: 0.05
          }
        }
      }
    },

    legend: { enabled: false },

    series: [{
      name: "Sales",
      data: salesData.map(s => ({
        name: s.name,
        y: s.y,
        color: s.color
      }))
    }],

    credits: { enabled: false }

  }), [isDark])

  useEffect(() => {
    if (chartRef.current?.chart) {
      chartRef.current.chart.update(options, true, true)
    }
  }, [options])

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="relative">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
        />
      </div>
      <div className="flex flex-col gap-3 text-sm">
        {salesData.map(item => (
          <div key={item.name} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
            <span className="text-neutral-400">{item.amount}</span>
          </div>
        ))}
      </div>

    </div>
  )
}