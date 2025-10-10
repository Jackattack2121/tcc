"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Quote } from "lucide-react"

interface ContentCardProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  backgroundVideo?: string
  link?: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  isPhotoCard?: boolean
}

interface QuoteCardProps {
  text: string
  author: string
  className?: string
}

const CARD_DIMENSIONS = "w-full h-[450px] lg:h-[500px] flex-none"

export function ContentCard({
  title,
  subtitle,
  backgroundImage,
  backgroundVideo,
  link,
  className,
  onClick,
  isPhotoCard = false,
}: ContentCardProps) {
  const content = (
    <div
      className={cn(
        `relative ${CARD_DIMENSIONS} overflow-hidden`,
        "group hover:scale-[0.98] transition-transform duration-300",
        "flex flex-col",
        className,
      )}
      style={{ minWidth: isPhotoCard ? "250px" : "auto" }}
    >
      {backgroundVideo ? (
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : backgroundImage ? (
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt={title || "Content background"}
          fill
          className="object-cover"
        />
      ) : null}
      {!isPhotoCard && <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors" />}
      <div className="relative z-10 p-6 flex-grow flex flex-col justify-between">
        {title && <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>}
        {subtitle && (
          <p className="text-sm text-white/80 overflow-wrap-break-word whitespace-normal overflow-wrap-break-word leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick) {
      onClick(e)
    }
  }

  if (onClick) {
    return (
      <div onClick={handleClick} className="block cursor-pointer">
        {content}
      </div>
    )
  }

  if (link) {
    return (
      <div onClick={handleClick} className="block cursor-pointer">
        {content}
      </div>
    )
  }

  return content
}

export function QuoteCard({ text, author, className }: QuoteCardProps) {
  return (
    <div
      className={cn(
        `relative ${CARD_DIMENSIONS} bg-white p-6`,
        "group hover:scale-[0.98] transition-transform duration-300",
        "flex flex-col justify-between",
        className,
      )}
      style={{ minWidth: "250px" }}
    >
      <div className="flex-grow flex items-center justify-center mb-4">
        <p
          className="text-[18px] leading-relaxed font-sans text-black text-center w-full"
          style={{
            wordWrap: "break-word",
            whiteSpace: "normal",
            overflowWrap: "break-word",
          }}
        >
          "{text}"
        </p>
      </div>
      <div className="text-center w-full mb-8">
        <p className="text-base font-medium text-black">{author}</p>
      </div>
      <Quote className="absolute bottom-4 right-4 w-8 h-8 text-[#4ade80]" />
    </div>
  )
}
