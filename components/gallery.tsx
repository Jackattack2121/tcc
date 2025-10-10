"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface GalleryProps {
  onClose: () => void
}

const images = [
  "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/gallery-1-YMZokpNumMdmYmgHehvvONhWbySyCC.jpg",
  "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/gallery-2-EQecLOFUXRKVUBRAlIdi50jV8lk52I.jpg",
  "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/gallery-3-zBidPTZBvftIyLsAopXazxZylePiqq.jpg",
  "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/gallery-4-As5Fw2u3SbJxLWkW7wgctDH31PNR8r.jpg",
  "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/gallery-5-VNVyzZKWjDPOpeqpnbgTvCBRtAknBX.jpg",
]

export const Gallery: React.FC<GalleryProps> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      <div className="relative w-full max-w-4xl aspect-video">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close Gallery"
        >
          <X size={24} />
        </button>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Gallery image ${currentIndex + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 transition-colors rounded-full p-2 text-white"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 transition-colors rounded-full p-2 text-white"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  )
}
