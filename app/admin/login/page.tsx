"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Store auth token
        localStorage.setItem("admin_token", data.token)
        router.push("/admin/unsubscribe-logs")
      } else {
        setError(data.error || "Invalid credentials")
      }
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mb-8 w-full max-w-[200px] mx-auto">
            <div className="relative w-full pt-[75%]">
              <Image
                src="https://afcks0sjupys5isr.public.blob.vercel-storage.com/TCC/tcc-logo-7UUpkuaagjw2CdCASy7vhDMgDnBy1h.png"
                alt="The Culinary Creative Logo"
                fill
                style={{ objectFit: "cover", objectPosition: "center 30%" }}
                priority
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-gray-400">Access unsubscribe logs and analytics</p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white focus:z-10"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-400 text-white bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white focus:z-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-md text-sm">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500">Authorized access only. All login attempts are logged.</p>
        </div>
      </div>
    </div>
  )
}
