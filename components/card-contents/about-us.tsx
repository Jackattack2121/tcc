"use client"

import type React from "react"
import { useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

interface AboutUsProps {
  onClose: () => void
}

export const AboutUs: React.FC<AboutUsProps> = ({ onClose }) => {
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
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-black rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full z-10"
          aria-label="Close About Us"
        >
          <X size={24} />
        </button>

        {/* Black header with title */}
        <div className="bg-black py-12 flex items-center justify-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            About
          </motion.h2>
        </div>

        <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-grow bg-black">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <p className="text-lg text-white leading-relaxed">
              The Culinary Creative has been a dream of mine for over 10 years. I started cooking with my mum at a very
              young age, and my whole life I have never been happier than when I am feeding people.
            </p>
            <p className="text-lg text-white leading-relaxed">
              I think food is at the heart of relationships and love, wherever you go in the world, good food is a
              language that we all speak. After spending a decade in various commercial kitchens and professional
              cooking positions I have decided to build my brand offering luxury dining experiences and private chef
              services in Adelaide.
            </p>
            <p className="text-lg text-white leading-relaxed">
              The Culinary Creative is about going back to basics, bringing the love back into your kitchen through the
              universal language of food, for you and your loved ones to enjoy! We specialize in intimate dining
              experiences at home and corporate food events that create lasting memories.
            </p>

            {/* Signature with increased spacing */}
            <div className="flex justify-end w-full my-12">
              <div className="w-48">
                <Image
                  src="https://afcks0sjupys5isr.public.blob.vercel-storage.com/TCC/dc18d3_c6e0c207c86e44ab967ca1ef32a91967~mv2-0gg8ZiXHOaSgXqeS7Y2wjbaNEwtel7.png"
                  alt="Jamie Carter Signature - Executive Chef & Founder of The Culinary Creative"
                  width={200}
                  height={100}
                  layout="responsive"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mx-auto max-w-md"
          >
            {/* Chef Jamie photo with adjusted aspect ratio to show full image */}
            <div className="relative w-full h-auto mb-4">
              <Image
                src="https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/latest/IMG_6590-BMEBygRo7O6TzM944s7EVZ4ZRF1POw.JPG"
                alt="Chef Jamie Carter - Private Chef for Special Occasions in Adelaide"
                width={500}
                height={750}
                layout="responsive"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <h4 className="text-xl font-semibold text-white text-center mt-4">Chef Jamie Carter</h4>
            <p className="text-gray-300 text-center">Executive Chef & Founder | Seasonal Menu Development Consultant</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
