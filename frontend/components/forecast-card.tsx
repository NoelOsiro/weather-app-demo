import WeatherIcon from "./weather-icon"
import { formatDate } from "@/utils/date-utils"

interface ForecastCardProps {
  timestamp: number
  iconCode: string
  description: string
  temperature: number
  unit: "C" | "F"
}

export default function ForecastCard({ timestamp, iconCode, description, temperature, unit }: ForecastCardProps) {
  return (
    <div className="bg-sky-50 rounded-lg shadow-md p-4 text-center transition-all hover:shadow-lg hover:scale-105">
      <p className="font-medium mb-3 text-sky-800">{formatDate(timestamp)}</p>
      <div className="flex justify-center mb-3">
        <WeatherIcon iconCode={iconCode} size={48} className="text-sky-600" />
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-sm font-semibold text-sky-900">
        {Math.round(temperature)}°{unit}
      </p>
    </div>
  )
}
