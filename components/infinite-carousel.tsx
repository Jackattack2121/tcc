"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface InfiniteCarouselProps {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  isTopCarousel?: boolean
}

export function InfiniteCarousel({
  children,
  className,
  isOpen = false,
  isTopCarousel = false,
}: InfiniteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkDesktop()
    window.addEventListener("resize", checkDesktop)

    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div
        className={cn(
          "overflow-x-auto whitespace-nowrap transition-all duration-500",
          isTopCarousel ? "w-screen ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]" : "w-full",
          {
            "opacity-0": isOpen,
          },
          className,
        )}
      >
        <div className="inline-flex">
          {React.Children.map(children, (child) => (
            <div
              className="inline-block"
              style={{
                width: "250px",
                margin: "0",
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-x-auto whitespace-nowrap transition-all duration-500",
        isTopCarousel ? "w-screen ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]" : "w-full",
        {
          "opacity-0": isOpen,
        },
        className,
      )}
    >
      <div className={cn("inline-flex", isTopCarousel && isDesktop ? "w-screen" : "")}>
        {React.Children.map(children, (child) => (
          <div
            className="inline-block"
            style={{
              width: isTopCarousel && isDesktop ? `${100 / React.Children.count(children)}vw` : "250px",
              margin: "0",
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
