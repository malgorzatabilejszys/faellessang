"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpAZ } from 'lucide-react'
import songs from "@/data/songs.json"

// Define a more permissive type that matches your actual data
type SongData = {
  id: string;
  number: number;
  title: string;
  lyrics: string;
  [key: string]: any; // This allows any additional properties
};

export default function Home() {
  // Use type assertion to tell TypeScript what the actual shape is
  const typedSongs = songs as SongData[];
  const [filteredSongs, setFilteredSongs] = useState<SongData[]>(typedSongs)
  const [searchQuery, setSearchQuery] = useState("")
  const [letterFilter, setLetterFilter] = useState<string | null>(null)
  const [numberFilter, setNumberFilter] = useState<string>("")

  // Generate alphabet for letter filtering
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

  useEffect(() => {
    let result = [...typedSongs]

    // Apply search filter
    if (searchQuery) {
      result = result.filter((song) => song.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply letter filter
    if (letterFilter) {
      result = result.filter((song) => song.title.charAt(0).toUpperCase() === letterFilter)
    }

    // Apply number filter
    if (numberFilter) {
      result = result.filter((song) => song.number.toString().startsWith(numberFilter))
    }

    setFilteredSongs(result)
  }, [searchQuery, letterFilter, numberFilter, typedSongs])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Højskolesangbogen</h1>

      {/* Search and filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Søg efter sangtitel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <ArrowUpAZ className="mr-1" size={18} />
          <Button
            variant={letterFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setLetterFilter(null)}
          >
            Alle
          </Button>
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={letterFilter === letter ? "default" : "outline"}
              size="sm"
              onClick={() => setLetterFilter(letter)}
            >
              {letter}
            </Button>
          ))}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Filtrér efter nummer..."
            value={numberFilter}
            onChange={(e) => setNumberFilter(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      {/* Song list */}
      <div className="space-y-2">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <Link
              key={song.id}
              href={`/song/${song.id}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="font-mono text-gray-500 w-12">{song.number}</span>
                <span className="font-medium">{song.title}</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">Ingen sange fundet</p>
        )}
      </div>
    </main>
  )
}
