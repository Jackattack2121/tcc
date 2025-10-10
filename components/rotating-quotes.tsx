"use client"

import type React from "react"
import { useState, useEffect } from "react"

const quotes = [
  {
    text: "Without experimentation, a willingness to ask questions and try new things, we shall surely become static, repetitive, and moribund.",
    author: "Anthony Bourdain",
  },
  {
    text: "Food is our common ground, a universal experience.",
    author: "James Beard",
  },
  {
    text: "Good food is the foundation of genuine happiness.",
    author: "Auguste Escoffier",
  },
]

export const RotatingQuotes: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length)
    }, 10000) // Change quote every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg my-8 text-center">
      <p className="text-xl text-white mb-2">"{quotes[currentQuote].text}"</p>
      <p className="text-sm text-gray-400">— {quotes[currentQuote].author}</p>
    </div>
  )
}
