"use client"

import { useState, useEffect } from "react"
import { fetchWeatherData, mockWeatherData, celsiusToFahrenheit, type WeatherData } from "@/lib/weather-api"
import WeatherIcon from "@/components/weather-icon"
import ForecastCard from "@/components/forecast-card"
import WeatherDetails from "@/components/weather-details"
import LoadingSpinner from "@/components/loading-spinner"
import SearchBar from "@/components/search-bar"
import { formatFullDate } from "@/utils/date-utils"

export default function WeatherApp() {
  const [city, setCity] = useState("London")
  const [unit, setUnit] = useState<"C" | "F">("C")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchWeather(city)
  }, [city])

  const fetchWeather = async (cityName: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeatherData(cityName)
      setWeatherData(data)
    } catch (err) {
      console.error("Error:", err)
      setError("Failed to fetch weather data. Please try again.")
      // Use mock data as fallback
      setWeatherData({
        ...mockWeatherData,
        city: cityName,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (cityName: string) => {
    setCity(cityName)
  }

  // Get temperature based on selected unit
  const getTemperature = (temp: number): number => {
    if (unit === "F") {
      return celsiusToFahrenheit(temp)
    }
    return temp
  }

  if (loading && !weatherData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-white">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-sky-900 mb-6 text-center">Weather Forecast</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Current Weather */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transform transition-all hover:shadow-xl">
            <div>
              <div className="flex justify-center mb-6">
                <WeatherIcon iconCode={weatherData?.current?.icon || "01d"} size={100} className="text-sky-500" />
              </div>
              <div className="text-center">
                <h1 className="text-6xl font-bold text-sky-900">
                  {weatherData?.current ? `${Math.round(getTemperature(weatherData.current.temp))}°${unit}` : "18°C"}
                </h1>
                <p className="text-xl mt-2 text-sky-700 capitalize">
                  {weatherData?.current?.description || "Clear Sky"}
                </p>
              </div>
            </div>
            <div className="mt-auto text-center">
              <p className="text-lg font-medium text-sky-800">
                {weatherData?.current?.dt ? formatFullDate(weatherData.current.dt) : "20th May 2023"}
              </p>
              <p className="text-lg text-sky-700">
                {weatherData?.city || city}
                {weatherData?.country ? `, ${weatherData.country}` : ""}
              </p>
            </div>
          </div>

          {/* Right Panel - Search, Forecast, Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} unit={unit} onUnitChange={setUnit} />

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <p>{error}</p>
              </div>
            )}

            {/* Forecast */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-sky-900">3-Day Forecast</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {weatherData?.forecast?.map((day, index) => (
                  <ForecastCard
                    key={index}
                    timestamp={day.dt}
                    iconCode={day.weather[0].icon}
                    description={day.weather[0].description}
                    temperature={getTemperature(day.temp.day)}
                    unit={unit}
                  />
                ))}
              </div>
            </div>

            {/* Weather Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-sky-900">Today's Highlights</h2>
              <WeatherDetails
                windSpeed={weatherData?.current?.wind_speed || 0}
                humidity={weatherData?.current?.humidity || 0}
                unit={unit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
