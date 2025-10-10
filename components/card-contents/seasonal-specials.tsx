"use client"

import type React from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface SeasonalSpecialsProps {
  onClose: () => void
}

export const SeasonalSpecials: React.FC<SeasonalSpecialsProps> = ({ onClose }) => {
  const specials = [
    {
      name: "Summer Citrus Salad",
      description: "A refreshing blend of seasonal citrus fruits, mixed greens, and a light vinaigrette.",
      image:
        "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/summer-citrus-salad-zBidPTZBvftIyLsAopXazxZylePiqq.jpg",
    },
    {
      name: "Grilled Peach Dessert",
      description: "Juicy grilled peaches served with vanilla ice cream and a drizzle of local honey.",
      image:
        "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/grilled-peach-dessert-As5Fw2u3SbJxLWkW7wgctDH31PNR8r.jpg",
    },
    {
      name: "Herb-Crusted Lamb",
      description: "Tender lamb chops coated with fresh herbs and served with seasonal vegetables.",
      image:
        "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/herb-crusted-lamb-VNVyzZKWjDPOpeqpnbgTvCBRtAknBX.jpg",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg relative w-full max-w-3xl mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Close Seasonal Specials"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Seasonal Specials</h2>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {specials.map((special, index) => (
            <div key={index} className="bg-neutral-700 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-1/3 aspect-square relative">
                <Image
                  src={special.image || "/placeholder.svg"}
                  alt={special.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="w-full sm:w-2/3">
                <h3 className="text-xl font-semibold text-white mb-2">{special.name}</h3>
                <p className="text-gray-300">{special.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-white mt-6">
          Our seasonal specials are available for a limited time. Visit us soon to experience these unique flavors!
        </p>
      </div>
    </div>
  )
}
