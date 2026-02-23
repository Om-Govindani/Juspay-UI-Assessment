import React, { useMemo, useRef, useEffect } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useTheme } from "../../contexts/ThemeContext"

export default function LineChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const chartRef = useRef(null)

  const options = useMemo(() => ({
    chart: {
      type: "spline",
      backgroundColor: "transparent",
      height: 225,             
      spacing: [10, 10, 10, 10],
      animation: true,
    },

    title: { text: null },

    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      lineColor: isDark ? "#2f2f2f" : "#E5E7EB",
      tickLength: 0,
      labels: {
        style: {
          color: isDark ? "#9CA3AF" : "#6B7280",
          fontSize: "12px"
        }
      }
    },

    yAxis: {
      title: { text: null },
      tickAmount: 3,
      gridLineColor: isDark ? "#1f2937" : "#F3F4F6",
      labels: {
        style: {
          color: isDark ? "#9CA3AF" : "#9CA3AF",
          fontSize: "12px"
        }
      }
    },

    tooltip: {
      shared: true,
      backgroundColor: isDark ? "#111827" : "#ffffff",
      style: {
        color: isDark ? "#ffffff" : "#000000"
      },
      borderWidth: 0
    },

    legend: { enabled: false },

    plotOptions: {
      series: {
        marker: { enabled: false },
        animation: { duration: 400 },
        states: {
          hover: {
            lineWidth: 3
          }
        }
      }
    },

    series: [
      {
        name: "Previous Week",
        data: [12, 18, 14, 10, 15, 23],
        color: isDark ? "#93c5fd" : "#93c5fd",
        lineWidth: 2,
        fillColor: {
          linearGradient: [0, 0, 0, 200],
          stops: [
            [0, isDark ? "rgba(147,197,253,0.25)" : "rgba(147,197,253,0.25)"],
            [1, "rgba(147,197,253,0)"]
          ]
        },
        type: "areaspline"
      },

      {
        name: "Current Week",
        data: [14, 10, 12, 18, 20, 19],
        color: isDark ? "#ffffff" : "#111827",
        lineWidth: 2
      },

      {
        name: "Trend",
        data: [3, 8, 12, 16, 20, 18],
        dashStyle: "Dash",
        color: isDark ? "#ffffff" : "#111827",
        lineWidth: 2
      }
    ],

    credits: { enabled: false }

  }), [isDark])

  useEffect(() => {
    if (chartRef.current?.chart) {
      chartRef.current.chart.update(options, true, true)
    }
  }, [options])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartRef}
    />
  )
}