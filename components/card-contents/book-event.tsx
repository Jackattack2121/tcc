"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface BookEventProps {
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  date: string
  guests: string
  details: string
}

export const BookEvent: React.FC<BookEventProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    details: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

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
    if (errors[name as keyof FormData]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.guests) newErrors.guests = "Number of guests is required"
    else if (isNaN(Number(formData.guests))) newErrors.guests = "Must be a number"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/book-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        guests: "",
        details: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
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
        className="bg-black rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Standardized header */}
        <div className="bg-black py-12 flex items-center justify-center border-b border-gray-700">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            Book Your Culinary Experience
          </motion.h2>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
          <p className="text-white mb-6">
            Whether you're looking for private chef services, food event planning, or a chef's table experience in
            Adelaide, fill out the form below to start planning your bespoke culinary journey.
          </p>
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-500 text-white p-4 rounded-md mb-4"
              >
                Thank you for your booking request. We'll get back to you soon!
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-500 text-white p-4 rounded-md mb-4"
              >
                There was an error submitting your request. Please try again later.
              </motion.div>
            )}
          </AnimatePresence>
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full bg-black text-white border-gray-700 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full bg-black text-white border-gray-700 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <Input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-black text-white border-gray-700"
            />

            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full bg-black text-white border-gray-700 ${errors.date ? "border-red-500" : ""}`}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

            <Input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={handleInputChange}
              className={`w-full bg-black text-white border-gray-700 ${errors.guests ? "border-red-500" : ""}`}
            />
            {errors.guests && <p className="text-red-500 text-sm">{errors.guests}</p>}

            <Textarea
              name="details"
              placeholder="Event Details"
              value={formData.details}
              onChange={handleInputChange}
              className="w-full bg-black text-white border-gray-700"
              rows={4}
            />

            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </motion.form>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          aria-label="Close Book Event"
        >
          <X size={24} />
        </button>
      </motion.div>
    </motion.div>
  )
}
