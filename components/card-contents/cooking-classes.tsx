"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CookingClassesProps {
  onClose: () => void
}

export const CookingClasses: React.FC<CookingClassesProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  const classes = [
    {
      name: "French Cuisine Masterclass",
      description: "Master the art of French cooking in our 4-week intensive course.",
      image:
        "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/dc18d3_7026fc27bd6f439cbc91c92fec843d3b~mv2-2nB8Dd8619Rq5b4A8NG57DamvwkDpn.jpg",
    },
    {
      name: "Italian Pasta Workshop",
      description: "Learn to make authentic Italian pasta from scratch in this hands-on workshop.",
      image:
        "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/dc18d3_7ed0c2b963054a33b2c8de943cf058bf~mv2-EQecLOFUXRKVUBRAlIdi50jV8lk52I.jpg",
    },
    {
      name: "Sushi Rolling Techniques",
      description: "Discover the secrets of perfect sushi rolling in this Japanese cuisine class.",
      image:
        "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/dc18d3_9fb11ce100f94b98b60483e8b379c5ac~mv2-ZBidPTZBvftIyLsAopXazxZylePiqq.png",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100] overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-black rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Cooking Classes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {classes.map((cookingClass, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <div className="aspect-video relative">
                  <Image
                    src={cookingClass.image || "/placeholder.svg"}
                    alt={cookingClass.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{cookingClass.name}</h3>
                  <p className="text-gray-300">{cookingClass.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white">Contact Us for More Information</h3>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-800 text-white border-gray-700"
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-800 text-white border-gray-700"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white border-gray-700"
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-800 text-white border-gray-700"
              rows={4}
            />
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
              Send Inquiry
            </Button>
          </motion.form>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          aria-label="Close Cooking Classes"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  )
}
