import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = verifyAdminToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // In production, you would query your database here
    // For now, return sample data structure that matches what the logging API creates

    const sampleLogs = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        email: "user@example.com",
        ipAddress: "203.123.45.67",
        country: "Australia",
        region: "South Australia",
        city: "Adelaide",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        platform: "Win32",
        language: "en-US",
        screenWidth: 1920,
        screenHeight: 1080,
        timezone: "Australia/Adelaide",
        source: "newsletter",
        referrer: "https://mailchimp.com",
        coordinates: { lat: -34.9285, lng: 138.6007 },
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        email: "test@gmail.com",
        ipAddress: "192.168.1.100",
        country: "Australia",
        region: "Victoria",
        city: "Melbourne",
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        platform: "MacIntel",
        language: "en-AU",
        screenWidth: 1440,
        screenHeight: 900,
        timezone: "Australia/Melbourne",
        source: "campaign_2024",
        referrer: "https://theculinarycreative.com.au",
      },
    ]

    return NextResponse.json({
      success: true,
      logs: sampleLogs,
      total: sampleLogs.length,
    })
  } catch (error) {
    console.error("Error fetching unsubscribe logs:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}
