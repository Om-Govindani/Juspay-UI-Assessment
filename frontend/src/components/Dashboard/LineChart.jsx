import React, { useMemo, useRef, useEffect } from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useTheme } from "../../contexts/ThemeContext"

export default function LineChart() {
  const { themeStyles } = useTheme()
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
      tickAmount: 3,
      gridLineColor: themeStyles.chartGrid,
      labels: {
        style: {
          color: themeStyles.chartAxis,
          fontSize: "12px"
        }
      }
    },

    tooltip: {
      shared: true,
      backgroundColor: themeStyles.donutTooltipBg,
      style: {
        color: "#ffffff"
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
        color: themeStyles.chartLineSecondary,
        lineWidth: 2,
        fillColor: {
          linearGradient: [0, 0, 0, 200],
          stops: [
            [0, "rgba(147,197,253,0.25)"],
            [1, "rgba(147,197,253,0)"]
          ]
        },
        type: "areaspline"
      },

      {
        name: "Current Week",
        data: [14, 10, 12, 18, 20, 19],
        color: themeStyles.chartLinePrimary,
        lineWidth: 2
      },

      {
        name: "Trend",
        data: [3, 8, 12, 16, 20, 18],
        dashStyle: "Dash",
        color: themeStyles.chartLinePrimary,
        lineWidth: 2
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
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartRef}
    />
  )
}