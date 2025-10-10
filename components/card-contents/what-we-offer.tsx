"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface WhatWeOfferProps {
  onClose: () => void
}

interface OfferingItem {
  title: string
  shortDescription: string
  expandedDescription: string
  image: string
}

const offeringItems: OfferingItem[] = [
  {
    title: "Intimate Guest Experience",
    shortDescription: "Chef's table experiences and personalized dining for small groups in an intimate setting.",
    expandedDescription:
      "Perfect for those looking to enjoy an intimate dining experience at home, our private chef services are curated to provide a warm and inviting atmosphere. Whether it's a romantic dinner, a close family celebration, or a small reunion, we ensure an exclusive setting with a customized menu tailored to your tastes. Our chefs craft each dish with attention to detail, offering a memorable experience with personalised service in Adelaide and surrounding areas.",
    image:
      "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/B6DE07BE-65EE-4C4D-86C9-DC1E088A680C-ePXAgectSJOqurBHpjqNqsKFR1wByq.JPG",
  },
  {
    title: "Stand-Up Dining",
    shortDescription: "Innovative food event planning concepts for social events and corporate gatherings.",
    expandedDescription:
      "Our stand-up dining experience is designed for those who love to mingle and enjoy an interactive food experience. Perfect for cocktail parties, networking events, and celebrations, this setup includes hand-crafted canapés, gourmet bites, and live chef stations where food is prepared fresh in front of your guests. The ambiance encourages social interaction while offering a seamless and sophisticated dining option. Ideal for corporate food events that leave a lasting impression.",
    image:
      "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new%20images/IMG_9621_1-pm6oeSUlbqjeSXkHqiFrREpayL6ntP.jpg",
  },
  {
    title: "Grazing",
    shortDescription: "Curated grazing tables and gourmet catering services for casual yet sophisticated dining.",
    expandedDescription:
      "Grazing tables are a stunning and relaxed way to present food, offering a variety of gourmet cheeses, artisan bread, seasonal fruits, cured meats, dips, and decadent desserts. Whether for a casual gathering or an elegant event, our grazing tables are carefully curated for both aesthetic appeal and delicious flavors. They serve as a centerpiece for any occasion, allowing guests to indulge at their own pace. Our bespoke catering approach ensures each grazing table is uniquely designed for your event.",
    image:
      "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new%20images/IMG_9632_1-AVz2B6gRp814iRffmBSI9t6VGLff50.jpg",
  },
  {
    title: "Corporate Dining",
    shortDescription: "Tailored corporate food events and business meeting catering solutions.",
    expandedDescription:
      "Impress clients, partners, and colleagues with our refined corporate dining experiences. From formal seated luncheons to business networking dinners, we provide elegant and efficient catering options tailored to your event needs. Our team ensures seamless service with high-quality ingredients, presentation, and menu customization to align with your corporate branding and guest preferences. We also offer corporate team building cooking classes as a unique way to foster collaboration and creativity.",
    image: "https://afcks0sjupys5isr.public.blob.vercel-storage.com/TCC/standupmenu-Sc5ngr9UjIrrAWlIqEiqR2DDnKGKAx.jpg",
  },
  {
    title: "Weddings & Special Occasions",
    shortDescription: "Bespoke culinary experiences and luxury dining for your special day in Adelaide.",
    expandedDescription:
      "Celebrate life's most cherished moments with an unforgettable dining experience. Whether it's an engagement party or a grand wedding reception, we provide exquisite menus tailored to your vision. From plated fine dining to buffet-style feasts, our chefs craft dishes that complement the theme and style of your event. We work closely with you to ensure every detail, from flavors to presentation, enhances the magic of your special day. Our wedding menu tasting experiences allow you to sample and perfect your menu before the big day.",
    image:
      "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/dc18d3_c4635e7387b9487ea87b5ea557beb9f7~mv2-u7s4lkg49FBJfYPf01X6Gng9FzkcnH.png",
  },
]

const AccordionItem: React.FC<{ item: OfferingItem; isOpen: boolean; toggleOpen: () => void; index: number }> = ({
  item,
  isOpen,
  toggleOpen,
  index,
}) => {
  // Determine if image should be on the left or right (even indices on right, odd on left)
  const imageOnRight = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-700 last:border-b-0"
    >
      <button
        className="w-full py-4 px-6 text-left flex justify-between items-center focus:outline-none bg-black"
        onClick={toggleOpen}
      >
        <span className="text-xl font-semibold text-white">{item.title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-8 bg-black">
              <div
                className={`flex flex-col ${imageOnRight ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-start`}
              >
                {/* Text content */}
                <div className="flex-1 space-y-3 md:w-1/2">
                  <p className="text-white font-medium text-lg">{item.shortDescription}</p>
                  <p className="text-gray-300 text-sm">{item.expandedDescription}</p>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2 h-[300px] relative rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const WhatWeOffer: React.FC<WhatWeOfferProps> = ({ onClose }) => {
  const [openItem, setOpenItem] = useState<number | null>(null)

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
    setOpenItem(openItem === index ? null : index)
  }

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
        className="bg-black rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Standardized header */}
        <div className="bg-black py-12 flex items-center justify-center border-b border-gray-700">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            What We Offer
          </motion.h2>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
          <div className="space-y-2">
            {offeringItems.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openItem === index}
                toggleOpen={() => toggleItem(index)}
                index={index}
              />
            ))}
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          aria-label="Close What We Offer"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  )
}
