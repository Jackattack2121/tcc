"use client"

import { useEffect, useState } from "react"
import { ContentCard } from "./content-card"
import { Loader2 } from "lucide-react"

interface InstagramPost {
  media_url: string
  caption: string
}

const CARD_DIMENSIONS = "w-[300px] h-[300px]"

export function InstagramCard() {
  const [latestPost, setLatestPost] = useState<InstagramPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLatestPost() {
      try {
        const response = await fetch("/api/instagram")
        if (!response.ok) throw new Error("Failed to fetch Instagram post")
        const data = await response.json()
        setLatestPost(data)
      } catch (err) {
        setError("Could not load latest Instagram post")
        console.error("Instagram fetch error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestPost()
  }, [])

  if (isLoading) {
    return (
      <div className={`${CARD_DIMENSIONS} bg-neutral-900 flex items-center justify-center`}>
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    )
  }

  if (error || !latestPost) {
    return (
      <ContentCard
        title="Follow Us on Instagram"
        subtitle="@theculinarycreative"
        backgroundImage="https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/newphotos/ED46FADE-BF07-4671-9AD4-DFE16B5F1511.jpeg"
        link="https://www.instagram.com/theculinarycreative/"
      />
    )
  }

  return (
    <ContentCard
      title="Latest on Instagram"
      subtitle={latestPost.caption}
      backgroundImage={latestPost.media_url}
      link="https://www.instagram.com/theculinarycreative/"
    />
  )
}
