"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion } from "framer-motion"

interface VideoGalleryProps {
  onClose: () => void
}

interface Video {
  id: string
  title: string
  thumbnail: string
}

const videos: Video[] = [
  {
    id: "DjZf-qLT9Xw",
    title: "Breakfast is served in Robe",
    thumbnail: "https://i.ytimg.com/vi/DjZf-qLT9Xw/maxresdefault.jpg",
  },
  {
    id: "flPIINe_mLI",
    title: "A wonderful 40th. Happy Birthday Matt!",
    thumbnail: "https://i.ytimg.com/vi/flPIINe_mLI/maxresdefault.jpg",
  },
  {
    id: "mWPKlVCNwf4",
    title: "Culinary Creative - How we do!",
    thumbnail: "https://i.ytimg.com/vi/mWPKlVCNwf4/maxresdefault.jpg",
  },
]

export const VideoGallery: React.FC<VideoGalleryProps> = ({ onClose }) => {
  const [activeVideo, setActiveVideo] = useState(videos[0])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100]"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-black rounded-lg shadow-2xl w-full max-w-5xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Standardized header */}
        <div className="bg-black py-12 flex items-center justify-center border-b border-gray-700">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            Latest Videos
          </motion.h2>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-2/3 h-64 md:h-auto mb-4 md:mb-0 md:mr-4">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="w-full md:w-1/3 overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-4">Our Shorts</h3>
              <div className="space-y-4">
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    className={`flex items-center space-x-4 p-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800 ${
                      activeVideo.id === video.id ? "bg-gray-800" : ""
                    }`}
                    onClick={() => setActiveVideo(video)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{video.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
          aria-label="Close Video Gallery"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  )
}
