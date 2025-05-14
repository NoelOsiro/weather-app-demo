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
  const getIcon = () => {
    // Clear sky
    if (iconCode === "01d") {
      return <Sun size={size} className={`text-yellow-400 ${className}`} />
    }
    if (iconCode === "01n") {
      return <Moon size={size} className={`text-indigo-400 ${className}`} />
    }

    // Few clouds
    if (iconCode === "02d") {
      return <CloudSun size={size} className={`text-yellow-300 ${className}`} />
    }
    if (iconCode === "02n") {
      return <CloudMoon size={size} className={`text-indigo-300 ${className}`} />
    }

    // Scattered/broken/overcast clouds
    if (["03d", "03n", "04d", "04n"].includes(iconCode)) {
      return <Cloud size={size} className={`text-gray-400 ${className}`} />
    }

    // Shower rain
    if (["09d", "09n"].includes(iconCode)) {
      return <CloudDrizzle size={size} className={`text-blue-400 ${className}`} />
    }

    // Rain
    if (["10d", "10n"].includes(iconCode)) {
      return <CloudRain size={size} className={`text-blue-600 ${className}`} />
    }

    // Thunderstorm
    if (["11d", "11n"].includes(iconCode)) {
      return <CloudLightning size={size} className={`text-purple-600 ${className}`} />
    }

    // Snow
    if (["13d", "13n"].includes(iconCode)) {
      return <CloudSnow size={size} className={`text-cyan-300 ${className}`} />
    }

    // Mist, fog, etc.
    if (["50d", "50n"].includes(iconCode)) {
      return <CloudFog size={size} className={`text-gray-300 ${className}`} />
    }

    // Fallback
    return <Sun size={size} className={`text-yellow-400 ${className}`} />
  }

  return getIcon()
}

export function HumidityIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return <Droplets size={size} className={`text-blue-400 ${className}`} />
}

export function Wind({
  size = 24,
  className = "",
  rotation = 0,
}: { size?: number; className?: string; rotation?: number }) {
  return (
    <WindIcon
      size={size}
      className={`text-slate-500 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  )
}
