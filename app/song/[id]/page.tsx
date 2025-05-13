"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import songs from "@/data/songs.json"

// Define a more permissive type that matches your actual data
type SongData = {
  id: string;
  number: number;
  title: string;
  lyrics: string;
  [key: string]: any; // This allows any additional properties
};

export default function SongPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  // Use type assertion to tell TypeScript what the actual shape is
  const song = songs.find((s) => s.id === params.id) as SongData | undefined;

  if (!song) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="mr-2" size={16} />
          Tilbage
        </Button>
        <h1 className="text-2xl font-bold">Sang ikke fundet</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-8">
        <ArrowLeft className="mr-2" size={16} />
        Tilbage
      </Button>

      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <span className="text-gray-500 text-lg">#{song.number}</span>
          <h1 className="text-3xl font-bold">{song.title}</h1>
          
          {/* Use optional chaining and nullish coalescing for safety */}
          {song.author && <p className="text-gray-600">Af {song.author}</p>}
          {song.composer && <p className="text-gray-600">Musik: {song.composer}</p>}
        </div>

        {song.lyrics && (
          <div className="prose max-w-none">
            {song.lyrics.split("\n\n").map((verse, i) => (
              <p key={i} className="whitespace-pre-line mb-6">
                {verse}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
