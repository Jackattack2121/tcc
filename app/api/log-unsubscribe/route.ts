import { type NextRequest, NextResponse } from "next/server"

// In a production environment, you would use a proper database
// For now, we'll use a simple logging approach that could be extended

export async function POST(request: NextRequest) {
  try {
    const visitorData = await request.json()

    // Get additional server-side information
    const serverData = {
      ...visitorData,
      serverTimestamp: new Date().toISOString(),
      ipAddress: request.ip || request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent"),
      acceptLanguage: request.headers.get("accept-language"),
      acceptEncoding: request.headers.get("accept-encoding"),
      connection: request.headers.get("connection"),
      host: request.headers.get("host"),
      origin: request.headers.get("origin"),
      referer: request.headers.get("referer"),
      // Cloudflare headers (if using Cloudflare)
      cfRay: request.headers.get("cf-ray"),
      cfIpCountry: request.headers.get("cf-ipcountry"),
      cfConnectingIp: request.headers.get("cf-connecting-ip"),
      // Vercel headers
      vercelForwardedFor: request.headers.get("x-vercel-forwarded-for"),
      vercelIpCountry: request.headers.get("x-vercel-ip-country"),
      vercelIpRegion: request.headers.get("x-vercel-ip-region"),
      vercelIpCity: request.headers.get("x-vercel-ip-city"),
    }

    // Log to console (in production, you'd save to database)
    console.log("=== UNSUBSCRIBE PAGE VISIT ===")
    console.log("Timestamp:", serverData.serverTimestamp)
    console.log("Email:", serverData.email || "Not provided")
    console.log("IP Address:", serverData.ipAddress)
    console.log("Location Info:", {
      country: serverData.vercelIpCountry || serverData.cfIpCountry,
      region: serverData.vercelIpRegion,
      city: serverData.vercelIpCity,
      timezone: serverData.timezone,
    })
    console.log("Device Info:", {
      userAgent: serverData.userAgent,
      platform: serverData.platform,
      language: serverData.language,
      screen: `${serverData.screenWidth}x${serverData.screenHeight}`,
      window: `${serverData.windowWidth}x${serverData.windowHeight}`,
    })
    console.log("Source Info:", {
      source: serverData.source,
      referrer: serverData.referrer || serverData.referer,
      url: serverData.url,
    })
    if (serverData.latitude && serverData.longitude) {
      console.log("GPS Coordinates:", {
        lat: serverData.latitude,
        lng: serverData.longitude,
        accuracy: serverData.accuracy,
      })
    }
    console.log("Full Data:", JSON.stringify(serverData, null, 2))
    console.log("=== END LOG ===")

    // Here you would typically save to a database
    // Example with a hypothetical database:
    /*
    await db.unsubscribeVisits.create({
      data: serverData
    })
    */

    // You could also send to external analytics services
    // Example: Google Analytics, Mixpanel, etc.

    // For file-based logging (not recommended for production)
    // You could write to a log file here

    return NextResponse.json({
      success: true,
      message: "Visit logged successfully",
      timestamp: serverData.serverTimestamp,
    })
  } catch (error) {
    console.error("Error logging unsubscribe visit:", error)
    return NextResponse.json({ success: false, error: "Failed to log visit" }, { status: 500 })
  }
}
