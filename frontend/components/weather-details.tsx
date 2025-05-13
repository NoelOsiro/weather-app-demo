import { Wind } from "./weather-icon"

interface WeatherDetailsProps {
  windSpeed: number
  humidity: number
  unit: "C" | "F"
}

export default function WeatherDetails({ windSpeed, humidity, unit }: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Wind Status */}
      <div className="bg-sky-50 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <h3 className="text-center mb-4 text-sky-800 font-medium">Wind Status</h3>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold mb-4 text-sky-900">
            {Math.round(windSpeed)} {unit === "C" ? "m/s" : "mph"}
          </p>
          <div className="flex items-center justify-center">
            <div className="p-2 rounded-full border border-sky-200 bg-white">
              <Wind size={20} className="text-sky-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Humidity */}
      <div className="bg-sky-50 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <h3 className="text-center mb-4 text-sky-800 font-medium">Humidity</h3>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold mb-4 text-sky-900">{humidity}%</p>
          <div className="w-full bg-sky-100 rounded-full h-2.5">
            <div className="bg-sky-600 h-2.5 rounded-full" style={{ width: `${humidity}%` }}></div>
          </div>
          <div className="flex justify-between w-full mt-1 text-xs text-sky-700">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  )
}
