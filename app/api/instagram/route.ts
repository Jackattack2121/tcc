import { NextResponse } from "next/server"

// In a real implementation, you would use the Instagram Graph API
// This is a mock implementation for demonstration
export async function GET() {
  try {
    // Mock data structure similar to Instagram API response
    const mockLatestPost = {
      id: "latest",
      media_url:
        "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/newphotos/ED46FADE-BF07-4671-9AD4-DFE16B5F1511.jpeg",
      caption: "Latest culinary creation from our kitchen #culinary #food",
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(mockLatestPost)
  } catch (error) {
    console.error("Error fetching Instagram data:", error)
    return NextResponse.json({ error: "Failed to fetch Instagram data" }, { status: 500 })
  }
}
