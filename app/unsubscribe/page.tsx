"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function UnsubscribePage() {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const logVisit = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const email = urlParams.get("email")
        const token = urlParams.get("token")
        const source = urlParams.get("source")

        // Gather browser and system information
        const visitorData = {
          email: email,
          token: token,
          source: source,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          language: navigator.language,
          languages: navigator.languages,
          platform: navigator.platform,
          cookieEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine,
          screenWidth: screen.width,
          screenHeight: screen.height,
          screenColorDepth: screen.colorDepth,
          screenPixelDepth: screen.pixelDepth,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          url: window.location.href,
          referrer: document.referrer,
          // Get approximate location from timezone
          estimatedLocation: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }

        // Try to get more detailed location info if geolocation is available
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const locationData = {
                ...visitorData,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                speed: position.coords.speed,
              }

              // Send data with location
              fetch("/api/log-unsubscribe", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(locationData),
              })
            },
            () => {
              // Send data without location if permission denied
              fetch("/api/log-unsubscribe", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(visitorData),
              })
            },
          )
        } else {
          // Send data without geolocation
          await fetch("/api/log-unsubscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(visitorData),
          })
        }

        setIsLogged(true)
      } catch (error) {
        console.error("Error logging unsubscribe visit:", error)
        setIsLogged(true) // Still show the page even if logging fails
      }
    }

    logVisit()
  }, [])

  return (
    <main className="min-h-screen bg-black py-12 flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-12 w-full max-w-[200px] sm:max-w-[250px]">
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

      {/* Success Message */}
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Successfully Unsubscribed</h1>

        <div className="space-y-4 text-lg text-white leading-relaxed">
          <p>You have been successfully unsubscribed from The Culinary Creative email service.</p>

          <p>
            We're sorry to see you go! You will no longer receive promotional emails, updates about our culinary
            experiences, or notifications about special events.
          </p>

          <p>If you change your mind, you can always resubscribe by contacting us directly or through our website.</p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 space-y-4">
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
          >
            Return to Homepage
          </Link>

          <div className="text-sm text-gray-400">
            <p>
              Questions? Contact us at{" "}
              <a href="mailto:jamie@theculinarycreative.com.au" className="text-white hover:text-gray-300 underline">
                jamie@theculinarycreative.com.au
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} The Culinary Creative. Private Chef Services & Gourmet Catering in Adelaide.</p>
      </footer>
    </main>
  )
}
