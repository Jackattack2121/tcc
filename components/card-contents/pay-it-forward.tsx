"use client"

import { useState } from "react"
import { X, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PayItForwardProps {
  onClose: () => void
}

type Tab = "need-help" | "can-help"

export function PayItForward({ onClose }: PayItForwardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("need-help")
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Form states for "I Need Help"
  const [needHelpForm, setNeedHelpForm] = useState({
    firstName: "",
    suburb: "",
    contactMethod: "email",
    phone: "",
    email: "",
    message: "",
  })

  // Form states for "I Can Help"
  const [canHelpForm, setCanHelpForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    offer: "ingredients",
    message: "",
  })

  const handleNeedHelpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/pay-it-forward/need-help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(needHelpForm),
      })

      if (!response.ok) {
        throw new Error("Failed to send form")
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your form. Please try again.")
    }
  }

  const handleCanHelpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/pay-it-forward/can-help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(canHelpForm),
      })

      if (!response.ok) {
        throw new Error("Failed to send form")
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your form. Please try again.")
    }
  }

  const resetAndClose = () => {
    setIsSubmitted(false)
    setNeedHelpForm({ firstName: "", suburb: "", contactMethod: "email", phone: "", email: "", message: "" })
    setCanHelpForm({ fullName: "", email: "", phone: "", offer: "ingredients", message: "" })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={resetAndClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-2xl bg-zinc-900 rounded-xl text-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Success Message */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <h2 className="text-3xl font-bold mb-4">Thank you.</h2>
                <p className="text-zinc-300 text-lg">
                  We've received your form and someone will be in touch as soon as possible.
                </p>
                <button
                  onClick={resetAndClose}
                  className="mt-8 px-6 py-3 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors font-medium"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">We'd love to help</h2>
                  <p className="text-zinc-400">
                    Whether you need support or want to give back, we're here to connect our community.
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-zinc-700">
                  <button
                    onClick={() => setActiveTab("need-help")}
                    className={`pb-3 px-2 font-medium transition-colors border-b-2 ${
                      activeTab === "need-help"
                        ? "text-white border-white"
                        : "text-zinc-400 border-transparent hover:text-zinc-300"
                    }`}
                  >
                    I Need Help
                  </button>
                  <button
                    onClick={() => setActiveTab("can-help")}
                    className={`pb-3 px-2 font-medium transition-colors border-b-2 ${
                      activeTab === "can-help"
                        ? "text-white border-white"
                        : "text-zinc-400 border-transparent hover:text-zinc-300"
                    }`}
                  >
                    I Can Help
                  </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === "need-help" ? (
                    <motion.form
                      key="need-help"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onSubmit={handleNeedHelpSubmit}
                      className="space-y-4"
                    >
                      {/* First Name */}
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-zinc-300">
                          First Name <span className="text-zinc-500">(optional)</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={needHelpForm.firstName}
                          onChange={(e) => setNeedHelpForm({ ...needHelpForm, firstName: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                          placeholder="First name"
                        />
                      </div>

                      {/* Suburb or Postcode */}
                      <div>
                        <label htmlFor="suburb" className="block text-sm font-medium mb-2 text-zinc-300">
                          Suburb or Postcode
                        </label>
                        <input
                          type="text"
                          id="suburb"
                          value={needHelpForm.suburb}
                          onChange={(e) => setNeedHelpForm({ ...needHelpForm, suburb: e.target.value })}
                          required
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                          placeholder="Enter suburb or postcode"
                        />
                      </div>

                      {/* Preferred Contact Method */}
                      <div>
                        <label htmlFor="contactMethod" className="block text-sm font-medium mb-2 text-zinc-300">
                          Preferred contact method
                        </label>
                        <select
                          id="contactMethod"
                          value={needHelpForm.contactMethod}
                          onChange={(e) => setNeedHelpForm({ ...needHelpForm, contactMethod: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="none">None — just leave a message</option>
                        </select>
                      </div>

                      {/* Conditional Phone Input */}
                      {needHelpForm.contactMethod === "phone" && (
                        <div>
                          <label htmlFor="needHelpPhone" className="block text-sm font-medium mb-2 text-zinc-300">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="needHelpPhone"
                            value={needHelpForm.phone}
                            onChange={(e) => setNeedHelpForm({ ...needHelpForm, phone: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="0412 345 678"
                          />
                        </div>
                      )}

                      {/* Conditional Email Input */}
                      {needHelpForm.contactMethod === "email" && (
                        <div>
                          <label htmlFor="needHelpEmail" className="block text-sm font-medium mb-2 text-zinc-300">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="needHelpEmail"
                            value={needHelpForm.email}
                            onChange={(e) => setNeedHelpForm({ ...needHelpForm, email: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="you@example.com"
                          />
                        </div>
                      )}

                      {/* Message */}
                      <div>
                        <label htmlFor="needHelpMessage" className="block text-sm font-medium mb-2 text-zinc-300">
                          Message
                        </label>
                        <textarea
                          id="needHelpMessage"
                          value={needHelpForm.message}
                          onChange={(e) => setNeedHelpForm({ ...needHelpForm, message: e.target.value })}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                          placeholder="Tell us what you need — no judgment."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="relative">
                        <button
                          type="submit"
                          className="w-full py-4 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors text-lg"
                        >
                          Let's Do This Together
                        </button>
                        {/* Heart sticker */}
                        <div className="absolute -right-[25px] top-1/2 -translate-y-1/2">
                          <div className="relative">
                            {/* Sticker shadow */}
                            <div className="absolute inset-0 bg-black/20 blur-sm translate-y-1" />
                            {/* Sticker background */}
                            <div className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-full p-4 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                              {/* Glossy effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                              <Heart className="w-10 h-10 text-white fill-white relative z-10" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="can-help"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleCanHelpSubmit}
                      className="space-y-4"
                    >
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-zinc-300">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={canHelpForm.fullName}
                          onChange={(e) => setCanHelpForm({ ...canHelpForm, fullName: e.target.value })}
                          required
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                          placeholder="Full name"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-300">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={canHelpForm.email}
                          onChange={(e) => setCanHelpForm({ ...canHelpForm, email: e.target.value })}
                          required
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                          placeholder="you@company.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2 text-zinc-300">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={canHelpForm.phone}
                          onChange={(e) => setCanHelpForm({ ...canHelpForm, phone: e.target.value })}
                          required
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                          placeholder="0412 345 678"
                        />
                      </div>

                      {/* What can you offer? */}
                      <div>
                        <label htmlFor="offer" className="block text-sm font-medium mb-2 text-zinc-300">
                          What can you offer?
                        </label>
                        <select
                          id="offer"
                          value={canHelpForm.offer}
                          onChange={(e) => setCanHelpForm({ ...canHelpForm, offer: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        >
                          <option value="ingredients">Ingredients</option>
                          <option value="time">Time</option>
                          <option value="delivery">Delivery Help</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="canHelpMessage" className="block text-sm font-medium mb-2 text-zinc-300">
                          Message
                        </label>
                        <textarea
                          id="canHelpMessage"
                          value={canHelpForm.message}
                          onChange={(e) => setCanHelpForm({ ...canHelpForm, message: e.target.value })}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                          placeholder="Tell us more or leave any special notes."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="relative">
                        <button
                          type="submit"
                          className="w-full py-4 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors text-lg"
                        >
                          Let's Do This Together
                        </button>
                        {/* Heart sticker */}
                        <div className="absolute -right-[25px] top-1/2 -translate-y-1/2">
                          <div className="relative">
                            {/* Sticker shadow */}
                            <div className="absolute inset-0 bg-black/20 blur-sm translate-y-1" />
                            {/* Sticker background */}
                            <div className="relative bg-gradient-to-br from-red-600 to-red-800 rounded-full p-4 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                              {/* Glossy effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                              <Heart className="w-10 h-10 text-white fill-white relative z-10" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
