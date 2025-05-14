"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface GeolocationButtonProps {
  onLocationDetected: (city: string) => void
}

export default function GeolocationButton({ onLocationDetected }: GeolocationButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const detectLocation = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
          )

          if (!response.ok) {
            throw new Error("Failed to get location name")
          }

          const data = await response.json()
          if (data && data.length > 0) {
            onLocationDetected(data[0].name) // Pass the city name to the parent
          } else {
            setError("Location not found")
          }
        } catch (err) {
          setError("Failed to detect location")
          console.error(err)
        } finally {
          setIsLoading(false)
        }
      },
      (err) => {
        console.error(err)
        setError("Unable to retrieve your location")
        setIsLoading(false)
      },
    )
  }

  return (
    <button
      onClick={detectLocation}
      disabled={isLoading}
      className="btn bg-gray-400 hover:bg-sky-400"
      title="Detect my location"
      aria-label="Detect my location"
    >
      <MapPin className={`h-5 w-5 ${isLoading ? "animate-pulse" : ""}`} />
      {error && <span className="sr-only">{error}</span>} {/* Screen-reader only error message */}
    </button>
  )
}
