"use client"

import type React from "react"
import { Search } from "lucide-react"
import { useState } from "react"
import GeolocationButton from "./geolocation-button"

interface SearchBarProps {
  onSearch: (city: string) => void
  unit: "C" | "F"
  onUnitChange: (unit: "C" | "F") => void
}

export default function SearchBar({ onSearch, unit, onUnitChange }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      onSearch(searchInput)
      setSearchInput("") // Clear input after submitting
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <form onSubmit={handleSubmit} className="flex w-full sm:flex-1 gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search city..."
            className="bg-white px-4 py-2 text-black w-full border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute bg-sky-500 right-0 top-0 bottom-0 px-4 py-2 text-white hover:text-gray-700 rounded-r-md"
          >
            <Search size={20} />
          </button>
        </div>
      </form>


      <GeolocationButton
        onLocationDetected={(city) => {
          setSearchInput(city)
        }}
      />

      <div className="flex border rounded-lg overflow-hidden">
        <button
          className={`px-4 py-2 transition-colors ${unit === "C" ? "bg-sky-500 text-white" : "bg-white text-sky-800 hover:bg-sky-100"}`}
          onClick={() => onUnitChange("C")}
        >
          °C
        </button>
        <button
          className={`px-4 py-2 transition-colors ${unit === "F" ? "bg-sky-500 text-white" : "bg-white text-sky-800 hover:bg-sky-100"}`}
          onClick={() => onUnitChange("F")}
        >
          °F
        </button>
      </div>
    </div>
  )
}
