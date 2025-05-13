import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  CloudSun,
  Droplets,
  WindIcon,
  Moon,
  CloudMoon,
} from "lucide-react"

interface WeatherIconProps {
  iconCode: string
  size?: number
  className?: string
}

export default function WeatherIcon({ iconCode, size = 24, className = "" }: WeatherIconProps) {
  // Map OpenWeatherMap icon codes to appropriate icons
  const getIcon = () => {
    // Clear sky
    if (iconCode === "01d") {
      return <Sun size={size} className={className} />
    }
    if (iconCode === "01n") {
      return <Moon size={size} className={className} />
    }

    // Few clouds
    if (iconCode === "02d") {
      return <CloudSun size={size} className={className} />
    }
    if (iconCode === "02n") {
      return <CloudMoon size={size} className={className} />
    }

    // Scattered clouds, broken clouds, overcast
    if (["03d", "03n", "04d", "04n"].includes(iconCode)) {
      return <Cloud size={size} className={className} />
    }

    // Shower rain
    if (["09d", "09n"].includes(iconCode)) {
      return <CloudDrizzle size={size} className={className} />
    }

    // Rain
    if (["10d", "10n"].includes(iconCode)) {
      return <CloudRain size={size} className={className} />
    }

    // Thunderstorm
    if (["11d", "11n"].includes(iconCode)) {
      return <CloudLightning size={size} className={className} />
    }

    // Snow
    if (["13d", "13n"].includes(iconCode)) {
      return <CloudSnow size={size} className={className} />
    }

    // Mist, fog, etc.
    if (["50d", "50n"].includes(iconCode)) {
      return <CloudFog size={size} className={className} />
    }

    // Default to sun if code not recognized
    return <Sun size={size} className={className} />
  }

  return getIcon()
}

export function HumidityIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <Droplets size={size} className={className} />
}

export function Wind({
  size = 24,
  className = "",
  rotation = 0,
}: { size?: number; className?: string; rotation?: number }) {
  return <WindIcon size={size} className={className} style={{ transform: `rotate(${rotation}deg)` }} />
}
