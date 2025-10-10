"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

interface PhotoModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
}

export function PhotoModal({ isOpen, onClose, imageUrl }: PhotoModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full h-full max-w-5xl max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="The Culinary Creative - Gourmet catering and private chef services in Adelaide"
            fill
            className="object-contain"
            priority
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
            aria-label="Close photo"
          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
