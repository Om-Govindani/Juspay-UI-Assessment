import React, { useMemo, useRef, useEffect } from "react"
import Highcharts from "highcharts/highmaps"
import HighchartsReact from "highcharts-react-official"
import worldGeo from "@highcharts/map-collection/custom/world.geo.json"
import { useTheme } from "../../contexts/ThemeContext"

const cityData = [
  { name: "New York", value: 72, lat: 40.7128, lon: -74.006 },
  { name: "San Francisco", value: 39, lat: 37.7749, lon: -122.4194 },
  { name: "Sydney", value: 25, lat: -33.8688, lon: 151.2093 },
  { name: "Singapore", value: 61, lat: 1.3521, lon: 103.8198 }
]

export default function RevenueByLocation() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const chartRef = useRef(null)

  const options = useMemo(() => ({
    chart: {
      map: worldGeo,
      backgroundColor: "transparent",
      height: 85,
      animation: true,
      spacing: [0, 0, 0, 0]
    },

    title: { text: null },

    mapNavigation: { enabled: false },

    tooltip: {
      pointFormat: "{point.name}",
      backgroundColor: isDark ? "#111827" : "#ffffff",
      style: { color: isDark ? "#ffffff" : "#000000" },
      borderWidth: 0
    },

    series: [
      {
        mapData: worldGeo,
        data: [],
        borderWidth: 0,
        nullColor: isDark ? "#e6f2f8" : "#62758A",
        showInLegend: false
      },
      {
            type: "mappoint",
            data: cityData.map(c => ({
                name: c.name,
                lat: c.lat,
                lon: c.lon
            })),
            color: isDark ? "#ffffff" : "#111827",
            marker: {
                radius: 4,
                fillColor: isDark ? "#ffffff" : "#111827"
            },
            showInLegend: false,
            zIndex: 5
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
    <div className="flex flex-col">

      {/* MAP */}
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={options}
        ref={chartRef}
      />

      {/* CITY LIST */}
      <div className="flex flex-col gap-4">
        {cityData.map(city => (
          <CityRow key={city.name} city={city} isDark={isDark} />
        ))}
      </div>
    </div>
  )
}

function CityRow({ city, isDark }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[12px] font-light">
        <span>{city.name}</span>
        <span className="text-neutral-400">{city.value}K</span>
      </div>

      <div className={`w-full h-[2px] rounded-full ${
        isDark ? "bg-neutral-700" : "bg-neutral-200"
      }`}>
        <div
          className={`h-[2px] rounded-full transition-all duration-500 ${
            isDark ? "bg-[#6a9faf]" : "bg-blue-400"
          }`}
          style={{ width: `${city.value}%` }}
        />
      </div>
    </div>
  )
}