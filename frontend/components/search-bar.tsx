"use client"

import type React from "react"

import { Search } from "lucide-react"
import { useState } from "react"

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
      setSearchInput("")
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search city..."
            className="bg-white px-4 py-2 text-black input input-block border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-500 hover:text-sky-700"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
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
