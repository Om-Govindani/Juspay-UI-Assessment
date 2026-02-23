import React, { useMemo, useRef, useEffect } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useTheme } from "../../contexts/ThemeContext"

export default function BarChart({ height = 220 }) {
  const { themeStyles } = useTheme()
  const chartRef = useRef(null)

  const options = useMemo(() => ({
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: 200,
    },

    title: { text: null },

    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      lineColor: themeStyles.chartGrid,
      tickLength: 0,
      labels: {
        style: {
          color: themeStyles.chartAxis,
          fontSize: "12px"
        }
      }
    },

    yAxis: {
      title: { text: null },
      gridLineColor: themeStyles.chartGrid,
      tickAmount: 3,
      labels: {
        style: {
          color: themeStyles.chartAxis,
          fontSize: "12px"
        }
      }
    },

    legend: { enabled: false },

    tooltip: {
      shared: true,
      backgroundColor: themeStyles.donutTooltipBg,
      style: {
        color: "#ffffff"
      },
      borderWidth: 0
    },

    plotOptions: {
      column: {
        grouping: false,
        borderRadius: 6,
        borderWidth: 0,
      }
    },

    series: [
      {
        name: "Projected",
        data: [22, 25, 21, 28, 18, 24],
        color: themeStyles.chartBarSecondary,
        pointPlacement: -0.1,
        pointWidth: 24,
        zIndex: 1
      },
      {
        name: "Actual",
        data: [18, 20, 17, 22, 14, 20],
        color: themeStyles.chartBarPrimary,
        pointPlacement: -0.1,
        pointWidth: 24,
        zIndex: 2
      }
    ],

    credits: { enabled: false }

  }), [themeStyles])

  useEffect(() => {
    if (chartRef.current?.chart) {
      chartRef.current.chart.update(options, true, true)
    }
  }, [options])

  return (
    <div style={{ width: "100%" }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  )
}