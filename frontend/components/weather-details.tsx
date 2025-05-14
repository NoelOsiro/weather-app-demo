import { Wind } from "./weather-icon"

interface WeatherDetailsProps {
  windSpeed: number
  windDirection: number
  humidity: number
  unit: "C" | "F"
}

function getCardinalDirection(degree: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
}
function getHumidityColor(humidity: number): string {
  if (humidity <= 30) return "bg-yellow-400";
  if (humidity <= 60) return "bg-sky-600";
  return "bg-green-500";
}


export default function WeatherDetails({ windSpeed, humidity, unit, windDirection }: WeatherDetailsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Wind Status */}
      <div className="bg-sky-50 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <h3 className="text-center mb-4 text-sky-800 font-medium">Wind Status</h3>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold mb-4 text-sky-900">
            {Math.round(windSpeed)} {unit === "C" ? "m/s" : "mph"}
          </p>
          <div className="flex flex-row items-center justify-center gap-2">
            <div
              className="p-2 rounded-full border border-sky-200 bg-white transform transition-transform"
              style={{ rotate: `${windDirection}deg` }}
              title={`Direction: ${windDirection}°`}
            >
              <Wind size={20} className="text-sky-600" />
            </div>
            <span className="text-sm text-sky-700">{getCardinalDirection(windDirection)}</span>
          </div>
        </div>
      </div>


      {/* Humidity */}
      <div className="bg-sky-50 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <h3 className="text-center mb-4 text-sky-800 font-medium">Humidity</h3>
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold mb-4 text-sky-900">{humidity}%</p>
          <div className="w-full bg-sky-100 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all ${getHumidityColor(humidity)}`}
              style={{ width: `${humidity}%` }}
            ></div>
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
