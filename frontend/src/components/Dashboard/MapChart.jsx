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
  const { themeStyles } = useTheme()
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
      backgroundColor: themeStyles.donutTooltipBg,
      style: { color: "#ffffff" },
      borderWidth: 0
    },

    series: [
      {
        mapData: worldGeo,
        data: [],
        borderWidth: 0,
        nullColor: themeStyles.mapBase,
        showInLegend: false
      },
      {
        type: "mappoint",
        data: cityData.map(c => ({
          name: c.name,
          lat: c.lat,
          lon: c.lon
        })),
        color: themeStyles.textPrimary,
        marker: {
          radius: 4,
          fillColor: themeStyles.textPrimary
        },
        showInLegend: false,
        zIndex: 5
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
    <div className="flex flex-col">

      <HighchartsReact
        highcharts={Highcharts}
        constructorType="mapChart"
        options={options}
        ref={chartRef}
      />

      <div className="flex flex-col gap-4">
        {cityData.map(city => (
          <CityRow key={city.name} city={city} />
        ))}
      </div>
    </div>
  )
}

function CityRow({ city }) {
  const { themeStyles } = useTheme()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-[12px] font-light">
        <span className={themeStyles.textPrimary}>
          {city.name}
        </span>
        <span className={themeStyles.textMuted}>
          {city.value}K
        </span>
      </div>

      <div className={`w-full h-[2px] rounded-full ${themeStyles.progressBg}`}>
        <div
          className={`h-[2px] rounded-full transition-all duration-500 ${themeStyles.progressFill}`}
          style={{ width: `${city.value}%` }}
        />
      </div>
    </div>
  )
}