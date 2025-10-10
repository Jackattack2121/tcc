"use client"

import type React from "react"
import { X } from "lucide-react"

interface AboutUsProps {
  onClose: () => void
}

export const AboutUs: React.FC<AboutUsProps> = ({ onClose }) => (
  <div className="bg-neutral-800 p-8 rounded-lg shadow-lg relative max-w-2xl w-full mx-4">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
      aria-label="Close About Us"
    >
      <X size={24} />
    </button>
    <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
    <p className="text-lg text-white">
      The Culinary Creative is a collective of passionate food enthusiasts, expert chefs, and innovative restaurateurs.
      Our mission is to push the boundaries of culinary experiences and create unforgettable moments through food.
    </p>
    <p className="text-lg text-white mt-4">
      Founded in 2010, we've grown from a single restaurant to a diverse portfolio of culinary ventures, each with its
      unique flavor and character. Our team is dedicated to sourcing the finest ingredients, crafting exquisite dishes,
      and providing exceptional service.
    </p>
    <p className="text-lg text-white mt-4">
      Whether you're dining at one of our restaurants, attending a cooking class, or engaging us for catering, you can
      expect nothing but the best from The Culinary Creative. Join us on this gastronomic journey as we continue to
      innovate and inspire in the world of food.
    </p>
  </div>
)
