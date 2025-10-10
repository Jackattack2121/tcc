import { verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export interface AdminUser {
  email: string
  role: string
  exp: number
}

export function verifyAdminToken(token: string): AdminUser | null {
  try {
    const decoded = verify(token, JWT_SECRET) as AdminUser
    return decoded
  } catch (error) {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = verify(token, JWT_SECRET) as AdminUser
    return decoded.exp < Math.floor(Date.now() / 1000)
  } catch (error) {
    return true
  }
}
