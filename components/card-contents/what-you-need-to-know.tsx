"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface WhatYouNeedToKnowProps {
  onClose: () => void
}

interface FAQItem {
  title: string
  shortDescription: string
  expandedText: string
}

const faqItems: FAQItem[] = [
  {
    title: "How It Works",
    shortDescription:
      "Click to expand and learn about our booking process and expectations for your culinary experience.",
    expandedText:
      "Our booking process is simple and seamless. Once you choose your desired experience, our team will coordinate with you to finalize the details. We offer personalized consultations to ensure every detail aligns with your vision. Whether it's an intimate dinner or a large-scale event, we guarantee a smooth and stress-free planning experience.",
  },
  {
    title: "Cost",
    shortDescription: "Understand our pricing structure and what's included in your dining package.",
    expandedText:
      "Our pricing varies based on the number of guests, menu selections, and any additional customizations. Each package includes food preparation, service, and clean-up. Contact us for a detailed quote tailored to your event's unique needs.",
  },
  {
    title: "Do We Have to Supply Anything?",
    shortDescription: "Find out what we provide and what you might need to prepare for your event.",
    expandedText:
      "We provide everything needed for an exceptional dining experience, including chefs, servers, and high-quality ingredients. However, some clients prefer to supply specific tableware, decorations, or beverages. Let us know your preferences, and we'll work with you to create the perfect setup.",
  },
  {
    title: "Do We Travel?",
    shortDescription: "Information about our service areas and travel policies for events.",
    expandedText:
      "Yes, we offer on-site catering for a variety of locations. Travel fees may apply depending on the distance from our main locations. If your event is outside our standard service area, contact us to discuss special arrangements.",
  },
  {
    title: "Further Questions?",
    shortDescription: "Get in touch with our team for any additional inquiries or special requests.",
    expandedText:
      "We're happy to assist with any questions you may have! Whether it's dietary restrictions, special accommodations, or unique requests, our team is here to help. Reach out via our contact form or give us a call, and we'll be glad to assist.",
  },
]

const AccordionItem: React.FC<{ item: FAQItem; isOpen: boolean; toggleOpen: () => void }> = ({
  item,
  isOpen,
  toggleOpen,
}) => {
  return (
    <div className="border-b border-gray-700 last:border-b-0">
      <button
        className="w-full py-4 px-6 text-left flex justify-between items-center focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-semibold text-white">{item.title}</span>
        <ChevronDown
          className={`w-5 h-5 text-white transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="py-4 px-6 text-gray-300">
              <p className="mb-2">{item.shortDescription}</p>
              <p>{item.expandedText}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const WhatYouNeedToKnow: React.FC<WhatYouNeedToKnowProps> = ({ onClose }) => {
  const [openItems, setOpenItems] = useState<number[]>([])

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

  const toggleItem = (index: number) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index) ? prevOpenItems.filter((item) => item !== index) : [...prevOpenItems, index],
    )
  }

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
        className="bg-black rounded-lg shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            What You Need to Know
          </motion.h2>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openItems.includes(index)}
                toggleOpen={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          aria-label="Close What You Need to Know"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  )
}
