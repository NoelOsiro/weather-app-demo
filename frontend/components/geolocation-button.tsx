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
            `https://api.weatherapi.com/v1/search.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}`,
          )

          if (!response.ok) {
            throw new Error("Failed to get location name")
          }

          const data = await response.json()
          if (data && data.length > 0) {
            onLocationDetected(data[0].name)
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
      className="btn btn-square"
      title="Detect my location"
      aria-label="Detect my location"
    >
      <MapPin className={`h-5 w-5 ${isLoading ? "animate-pulse" : ""}`} />
      {error && <span className="sr-only">{error}</span>}
    </button>
  )
}
