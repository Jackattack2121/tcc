"use client"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { InfiniteCarousel } from "@/components/infinite-carousel"
import { ContentCard } from "@/components/content-card"
import { AboutUs } from "@/components/card-contents/about-us"
import { BookEvent } from "@/components/card-contents/book-event"
import { VideoGallery } from "@/components/card-contents/video-gallery"
import { OurMenus } from "@/components/card-contents/our-menus"
import { WhatWeOffer } from "@/components/card-contents/what-we-offer"
import { PayItForward } from "@/components/card-contents/pay-it-forward"
import { Gallery } from "@/components/gallery"
import { PhotoModal } from "@/components/photo-modal"

// Add proper heading structure and SEO-friendly content

type PopupContent = "about" | "book" | "videos" | "menus" | "offer" | "payitforward" | "gallery" | null

export default function Home() {
  const [openPopup, setOpenPopup] = useState<PopupContent>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showCarousels, setShowCarousels] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const scrollPositionRef = useRef(0)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleOpenPopup = useCallback((content: PopupContent) => {
    // Save current scroll position before opening popup
    scrollPositionRef.current = window.scrollY

    // Add a class to prevent body scrolling while popup is open
    document.body.style.overflow = "hidden"

    setOpenPopup(content)
    setShowCarousels(false)
  }, [])

  const handleClosePopup = useCallback(() => {
    setOpenPopup(null)
    setShowCarousels(true)

    // Re-enable scrolling
    document.body.style.overflow = ""

    // Use setTimeout to restore scroll position after the UI has updated
    setTimeout(() => {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "auto", // Use 'auto' instead of 'smooth' to prevent visible scrolling
      })
    }, 50)
  }, [])

  const handlePhotoClick = useCallback((imageUrl: string) => {
    // Also save scroll position when opening photo modal
    scrollPositionRef.current = window.scrollY
    document.body.style.overflow = "hidden"
    setSelectedPhoto(imageUrl)
  }, [])

  const handleClosePhoto = useCallback(() => {
    setSelectedPhoto(null)
    document.body.style.overflow = ""

    // Use setTimeout to restore scroll position after the UI has updated
    setTimeout(() => {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "auto",
      })
    }, 50)
  }, [])

  const renderPopupContent = () => {
    switch (openPopup) {
      case "about":
        return <AboutUs onClose={handleClosePopup} />
      case "book":
        return <BookEvent onClose={handleClosePopup} />
      case "videos":
        return <VideoGallery onClose={handleClosePopup} />
      case "menus":
        return <OurMenus onClose={handleClosePopup} />
      case "offer":
        return <WhatWeOffer onClose={handleClosePopup} />
      case "payitforward":
        return <PayItForward onClose={handleClosePopup} />
      case "gallery":
        return <Gallery onClose={handleClosePopup} />
      default:
        return null
    }
  }

  // Featured photos to be displayed at the beginning of the bottom carousel
  const featuredPhotos = [
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/latest/IMG_0386-qde8BdwnosyU9zGSf4jbVbgqor1si2.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/latest/IMG_1150-cR8CBL9RJfU53eZhoVe5caGJ7l3bjy.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/latest/IMG_1158-f8nUVAy8vtd10KGb60GIRtoPuHPJRA.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/latest/IMG_1216-11J5k8SxG8fqxP0IKgQra5PLpes8OW.jpg",
  ]

  const images = [
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/1F2EBF4F-BBE3-447C-BD7C-5E98DB841880-0QZ8RhKz820TRknQuaxpaux3aQVnaK.JPG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/59DA38C4-E194-41A4-BA25-AF6B4A3FFE23-y1lw8XHduYrHm4yJsbSa2o2tnqOTGC.JPG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/640A7563-FFA2-42FC-8AD1-8443E43F2B03-SG0mfdfiWh3RjS3ECZ9SMG2y3rDGmI.JPG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/B6DE07BE-65EE-4C4D-86C9-DC1E088A680C-ePXAgectSJOqurBHpjqNqsKFR1wByq.JPG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/B824FED4-BA66-4907-B88F-955CE57C4758-bW20IfUoD7ctgNDvrLKotss1kgIQqs.JPG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/Day%204%20Cooking%20Demo%20by%20Jamie%20Luke-11-KALJVGsmZKIvlH2VyEFhz46NrfYHfB.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/Day%204%20Cooking%20Demo%20by%20Jamie%20Luke-11-Zc88tR55pvWwA7sbUgBC7l7UrPr02L.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/ED46FADE-BF07-4671-9AD4-DFE16B5F1511-qCo0qJGGRKT4NV1WhNXD7wC7BlcOSd.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/FullSizeRender-NXEqfZMeEeyEoycRvWcJFJccrxO38R.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_0030-fgItGimlOlpiHwPru5svsL8c3XHKPl.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_6351-downcx81fYa60POHfe1EvnYVvDuBJd.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_6356-gm7J6ZR7GgMhYvBqHdPk5en5cHjjT9.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_6366-ldNheHUGW4Cvl9nTK78hBvsh9h1sGN.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_6374-mhDxnn9VtJw5lGg98aj50oUtpixZLo.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_6380-ly1NMLwBu5bYRq5WcleHd4gJsxqyxh.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_6669-60zqBAlH3WTSoeuVdawMAmqQvAtPpY.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_6847_jpg-wZGkJXOmxFWT30BykZylsCYOjLCYtP.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_6857_jpg-vcgwtF1AyNuf07DO2pCub9bDAPkFH0.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_7836-hODbAHz1YfI8W6kXWokJG2kGI1KVhC.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_8246-wcxOePkSf6MZIBAuaPcXOpWbpbKeQJ.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_8483-snUNqpPUWjZj48BBJCbCCPIB3hB28k.JPG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_8484-bzOBcLNrC1A4NJMJ2d7rHjTNgryvvH.JPG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_8754-rCRHWCKtEXWrRxm6ZdBqBMDgUMqHx8.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_8755-2j33npGPxhHdsYCoSjYiI5eRzUrm98.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_8860-H4WPeleO9WavD8AVWLLtUs63g6Luma.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_8880-zxJAePdefWali3WHK5IHsDG64xGrdY.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_9189-jRrcfWlbjtUR0u1nzMiOYzE6Kr5beB.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_9461-B6MdHACaDsHh3NwsHtBSvmUWJTBDPr.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/IMG_9633-kocUdctNuuMgMlj7pfKhUFYxJrDRaK.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/_MG_0101-1kVTFk6YYvKbXa9YUvPIALLcNW7pJ4.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/_MG_0101-S3NkF2ZGzgjs0nfwqqQCOI32E4yj8I.JPEG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/_MG_9930-TI0dvwiJmRAXqvK6Ha9EOv7txsqJVO.JPEG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/_MG_9941-iqLdmzpzkXCyG1tVHioZxje8e6nX9G.JPEG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/_MG_9956-d2vDj6Uh8iL6wvH6nHVkkuHWj9JLVQ.JPEG",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/jamie1-R3Q9hHwzkOgoOSqOVYO4uiTk56og1R.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/jamie2-5zekDsWlvb5ccJwcSufhXTd555vXKu.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/jamie3-igUsuPV8jj43D1USbyltNj0MPZA8cI.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new-website/jamie4-fspTU3L2JUXVaitPdZiqodkL84uIe1.jpg",
  ]

  // Add the new images array after the existing images array (around line 150)

  // Add this new array of images to be featured at the beginning of the carousel
  const newImages = [
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/311ADB75-702C-4161-B13A-DE543347265E-x10Y1AEJbZ34JcSj0FwgO6RkeTqQUv.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/65A648B6-96D2-4B00-9ADA-A9D0A05BE073-soUvJmpwPuJKuFIvRPa6YmR3EVCk4H.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/B33AD860-2D51-4991-B029-81E53056DB50-cDJNlCqPtuFyu6Mbd95d4QmyNTtk9l.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_0660-HPBEeC5T5zc4CH0SmehnRbY6sw4Moq.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_0671-xNBi2g2ffGCXbRCDNgaKQRPoh1HCYw.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_0677-Z9buk8z02zc2e8sBQQhmJTm5va3WI9.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_0710-VXA3gbgTFxTDtGVyaRFMaDqBNP7O4V.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1064-CqWFCKMOB0YYOMQ85goC5y87rCy3Xp.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1069-iDuAgUMxOatzga8pOkICsyoqnK7l0H.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1184-cOTvav7AWQvnX4z1IRliKg69TPIQAa.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1621-qvYJClwjocmHBnTQ4Pp1pJDocdCTVJ.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1626-1T5mjtaYZZWgDJwIs7vZGkVmiqCAIe.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1627-9PtqsfyV1DhZZZMgknOr9In1tgFg9d.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1896-DVMiRsI0uFOtAjW7yVBO8PMABqNxYZ.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1943-kDvgtkTQ6XT1bJog0Wwv5EOLcfsnqu.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1944-Z59fNDOf5JP1t9Ap9t07w2DRTKheql.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1945-xyodkE4s7wCQZtwu3xKfViGSPNDn8j.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1950-S7azUpwZbxvP9voHdfGpEMBxywFXTw.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1959-NFXRwx0qGVTMeSTrUx5Pe8DPTyiuN0.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1977-sdBE7mnOaqtArKbdicVViI1ERTebR9.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1989-g7jDheGAHbFytEf5zExLu3BWjqNeBb.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1990-zfRTwCbWOiC3VBQrAD1prL8f6PP8HH.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1991-UI7trvbZpxy7H14PGTWEnhk0tI8V05.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1992-QV2Kc5pAkazpA6W8Akyvy0SPnOvMPm.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1996-3faTC01FxH85aECowF4O394A3vQK77.jpg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinary/IMG_1998-ksPgZOUwSZApC8h7vwIR6u1611umLw.jpg",
  ]

  // Add this new array of latest images to be featured at the very beginning of the carousel
  const latestImages = [
    // Newly uploaded images from 2025-10-10
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-112.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-129.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-13.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-139.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-145.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-2.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-20.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-31.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-36.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-4.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-42.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-52.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-55.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-59.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-6.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-63.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-78.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-83.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-92.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-93.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-94.jpg",
    "https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/gallery/2025-10-10/High%20res-96.jpg",
    // Previous images
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_1238-a1TlNIcwy5TN7vwl9NFRBr8zm6xVIm.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2028-gncp5s2sFLSnQqt7wP8bYUCheh5uEg.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2078-21HPLnyZAhBpbsLZ6I4EA3o2HEy1vd.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2082-7v0EkG2tuzeM0ytf5PAz9ZsD7PaUez.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2123-D6Z21hVFY3PAaBtz5aZPPKnOx4ICAm.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2295-34dq0mIzfblqRb6AwibIIiV2PYtSx3.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2473-mc5w4HNpo4nGeiOTNvM5kuost7EkYL.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2477-mD6U2gXsfv0lNz0db4J7NOt2A8piCz.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2485-0elOwjBaEWto9TJSaMqXbeA4t6E6Zt.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2597-7TlcrtSKdU8MRhA5ekY1jHiz4liakL.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2731-IYPvcPQW6wq8YNWfN7xavL211E5sXM.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2801-rQuRRIcUObQRaWFb8dQx6PWAZAgdeK.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2804-ir7anzIYFd29LpqzvR78WOCP7pPvD9.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2807-a3o34QwUEPpxdIPVLIiYqn9NIpqsmE.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2813-L7FlJ3zODO6C9c7IEVWX8cBLZCWwS8.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2975-qHt6xlxWg42Vwc9vlxHm0T7D0El3OD.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2982-vDlDaJmbdkrcZoXC8O6jkVdX8ujhcU.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2987-PconOGNLddpz60K7NP7qzUOLgewB8R.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_2988-A4YHfY98l6SysZdHQPamjfIc5jGc4q.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3024-di2Ts6oZLq1rw1FtXJH8maNyRJ0b3y.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3032-4PYReyYWjmFCOGltsFdzPbgwBF74Gw.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3033-qSLyj4KJeGcxFyaSb12aPPuadQ2Moh.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3035-Z4hjPBUl6UreO9fqjpEIXvajtUeoWw.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3041-tvzpjPQg6wWa2Pe3SHa5UJi7i6XE9e.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3044-JAdq9o3jkQ98a16Wa20ryn4wEBLcAa.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3047-An8dowv26wW0yNxUvMJ2OSw63c9Hst.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3051-FGQGNKM8PLSUvBOZ2IDPtxcp5OCHW6.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3056-8JKcSPfJnK43pkvY5fcTmBoXSOTsWV.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3059-APb23G2SCecNMszr4gA44h9Skp0BTo.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3060-oc9HW4sM36wZQcWf1ZU10EXzA0xh2b.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3066-9YT2LvQbrTuR0wk5qd4wabyZFqRbWm.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3071-YsLT9nfArGy0WX2b2KaxnlZBWBNvwb.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3072-cc0lw4S2NYd44lv9v8mdU23VFxAITE.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3079-ItNWPFkfaslNc7OVg7lh3Cko8nsXuz.jpeg",
    "https://afcks0sjupys5isr.public.blob.vercel-storage.com/Jamie%20Latest%2024/IMG_3084-U2wA9oOfNZr0CyvRjkJgYvA4uYZsnK.jpeg",
  ]

  // Create the latest image cards
  const latestImageCards = latestImages.map((image, index) => (
    <ContentCard
      key={`latest-${index}`}
      backgroundImage={image}
      onClick={() => handlePhotoClick(image)}
      isPhotoCard={true}
    />
  ))

  // Then modify the code that creates the new image cards (around line 250)
  // Create the new image cards
  const newImageCards = newImages.map((image, index) => (
    <ContentCard
      key={`new-${index}`}
      backgroundImage={image}
      onClick={() => handlePhotoClick(image)}
      isPhotoCard={true}
    />
  ))

  // Randomly select images for the bottom carousel (excluding the featured photos)
  // Use useMemo with mounted state to prevent hydration mismatch
  const shuffled = useMemo(() => {
    if (!mounted) return images // Return unshuffled on server
    return [...images].sort(() => 0.5 - Math.random())
  }, [mounted])

  const contentCards = [
    <ContentCard
      key="menus"
      title="Our Menus"
      subtitle="Explore our diverse culinary offerings featuring seasonal ingredients and gourmet catering options"
      backgroundImage="https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/dc18d3_7026fc27bd6f439cbc91c92fec843d3b~mv2-2nB8Dd8619Rq5b4A8NG57DamvwkDpn.jpg"
      onClick={() => handleOpenPopup("menus")}
    />,
    <ContentCard
      key="about"
      title="About"
      subtitle="Discover our passion for culinary excellence and private chef services in Adelaide"
      backgroundVideo="https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/jamiecook3-7Z9Qz9iIhuV6eyKFL5u90RC3vuLLsW.mp4"
      onClick={() => handleOpenPopup("about")}
    />,
    <ContentCard
      key="book"
      title="Book an Event"
      subtitle="Food event planning and private chef services for your next celebration"
      backgroundImage="https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new%20images/IMG_6933_jpg_1-k065TliEClai0kKDEJTIdc2x2Z7A8G.jpg"
      onClick={() => handleOpenPopup("book")}
    />,
    <ContentCard
      key="offer"
      title="What We Offer"
      subtitle="Luxury dining experiences and bespoke catering for special occasions"
      backgroundImage="https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/new%20images/IMG_6847_jpg_1-D6B5H0AUi4keqaOaemcDutcgqjwvry.jpg"
      onClick={() => handleOpenPopup("offer")}
    />,
    <ContentCard
      key="payitforward"
      title="Pay It Forward"
      subtitle="Help us feed someone doing it tough — or let us know if you need a meal."
      backgroundVideo="https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/charity.mp4"
      onClick={() => handleOpenPopup("payitforward")}
      hasWarmGlow={true}
      hasHeartSticker={true}
    />,
  ]

  // Create the featured photo cards
  const featuredPhotoCards = featuredPhotos.map((image, index) => (
    <ContentCard
      key={`featured-${index}`}
      backgroundImage={image}
      onClick={() => handlePhotoClick(image)}
      isPhotoCard={true}
    />
  ))

  // Create the rest of the photo cards
  const otherPhotoCards = shuffled.map((image, index) => (
    <ContentCard
      key={`image-${index}`}
      backgroundImage={image}
      onClick={() => handlePhotoClick(image)}
      isPhotoCard={true}
    />
  ))

  // Update the bottomCarouselItems array to include the latest images at the very beginning:
  // Update the bottomCarouselItems array to include the latest images at the very beginning
  const bottomCarouselItems = [...latestImageCards, ...newImageCards, ...featuredPhotoCards, ...otherPhotoCards]

  return (
    <main className="min-h-screen bg-black py-6 flex flex-col items-center overflow-hidden">
      <h1 className="sr-only">The Culinary Creative - Private Chef Services & Gourmet Catering in Adelaide</h1>

      {/* Add structured content for SEO */}
      <div className="sr-only">
        <h2>Private Chef Services Adelaide</h2>
        <p>
          Experience luxury dining with Chef Jamie Carter's private chef services in Adelaide. We specialize in intimate
          dining experiences, corporate food events, and bespoke catering for special occasions.
        </p>

        <h2>Our Culinary Services</h2>
        <ul>
          <li>Chef's Table Experiences - Intimate dining with seasonal South Australian ingredients</li>
          <li>Corporate Food Events - Professional catering for business functions</li>
          <li>Luxury Wedding Catering - Bespoke menus for your special day</li>
          <li>Grazing Tables & Canapés - Gourmet options for social events</li>
          <li>Private Dining Experiences - Personalized menus in your home</li>
        </ul>

        <h2>About Chef Jamie Carter</h2>
        <p>
          Executive Chef Jamie Carter brings over 10 years of commercial kitchen experience to create unforgettable
          culinary experiences in Adelaide and surrounding areas.
        </p>
      </div>

      <div className="mb-6 w-full max-w-[150px] sm:max-w-[200px]">
        <div className="relative w-full pt-[75%]">
          <Image
            src="https://afcks0sjupys5isr.public.blob.vercel-storage.com/TCC/tcc-logo-7UUpkuaagjw2CdCASy7vhDMgDnBy1h.png"
            alt="The Culinary Creative Logo - Private Chef Services in Adelaide"
            fill
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            priority
          />
        </div>
      </div>

      <div className="w-full space-y-8 relative">
        <AnimatePresence>
          {showCarousels && (
            <motion.div initial={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -100 }} transition={{ duration: 0.5 }}>
              <h2 className="sr-only">Our Culinary Services</h2>
              <InfiniteCarousel className="w-full" isTopCarousel={true}>
                {contentCards}
              </InfiniteCarousel>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCarousels && (
            <motion.div initial={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={{ duration: 0.5 }}>
              <h2 className="sr-only">Culinary Gallery</h2>
              <InfiniteCarousel className="w-full overflow-x-auto">{bottomCarouselItems}</InfiniteCarousel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>{openPopup && renderPopupContent()}</AnimatePresence>

      <PhotoModal isOpen={!!selectedPhoto} onClose={handleClosePhoto} imageUrl={selectedPhoto || ""} />

      <footer className="mt-8 text-center text-xs text-gray-500">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-2">
            © {new Date().getFullYear()} The Culinary Creative. Private Chef Services & Gourmet Catering in Adelaide.
          </p>
          <p className="mb-2">
            Specialising in luxury dining experiences, corporate food events, chef's table experiences, and bespoke
            catering services across Adelaide, South Australia.
          </p>
          <p className="mb-2">
            <strong>Services:</strong> Private Chef Adelaide | Corporate Catering | Wedding Catering | Chef's Table
            Experience | Grazing Tables | Food Event Planning
          </p>
          <p className="mt-1">
            Website designed by{" "}
            <a
              href="https://www.luxeandlens.co"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400 transition-colors"
            >
              Luxe & Lens Co
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}
