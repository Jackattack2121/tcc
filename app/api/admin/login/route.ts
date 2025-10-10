import { type NextRequest, NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

const ADMIN_EMAIL = "admin@theculinarycreative.com.au"
const ADMIN_PASSWORD = "Culinary123"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Log login attempt
    console.log("=== ADMIN LOGIN ATTEMPT ===")
    console.log("Email:", email)
    console.log("IP:", request.ip || request.headers.get("x-forwarded-for"))
    console.log("User Agent:", request.headers.get("user-agent"))
    console.log("Timestamp:", new Date().toISOString())

    // Validate credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate JWT token
      const token = sign(
        {
          email: ADMIN_EMAIL,
          role: "admin",
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
        },
        JWT_SECRET,
      )

      console.log("Login successful for:", email)
      console.log("=== END LOGIN LOG ===")

      return NextResponse.json({
        success: true,
        token,
        message: "Login successful",
      })
    } else {
      console.log("Login failed - Invalid credentials")
      console.log("=== END LOGIN LOG ===")

      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
