// Utility functions for unsubscribe logging

export interface UnsubscribeVisitData {
  // URL Parameters
  email?: string
  token?: string
  source?: string

  // Timestamps
  timestamp: string
  serverTimestamp?: string

  // Browser Information
  userAgent: string
  language: string
  languages: string[]
  platform: string
  cookieEnabled: boolean
  onLine: boolean

  // Screen Information
  screenWidth: number
  screenHeight: number
  screenColorDepth: number
  screenPixelDepth: number
  windowWidth: number
  windowHeight: number

  // Location Information
  timezone: string
  estimatedLocation: string
  latitude?: number
  longitude?: number
  accuracy?: number
  altitude?: number
  altitudeAccuracy?: number
  heading?: number
  speed?: number

  // Navigation Information
  url: string
  referrer: string

  // Server Information
  ipAddress?: string
  acceptLanguage?: string
  acceptEncoding?: string
  connection?: string
  host?: string
  origin?: string
  referer?: string

  // CDN/Hosting Information
  cfRay?: string
  cfIpCountry?: string
  cfConnectingIp?: string
  vercelForwardedFor?: string
  vercelIpCountry?: string
  vercelIpRegion?: string
  vercelIpCity?: string
}

export function formatVisitLog(data: UnsubscribeVisitData): string {
  return `
=== UNSUBSCRIBE PAGE VISIT ===
Timestamp: ${data.serverTimestamp || data.timestamp}
Email: ${data.email || "Not provided"}
Token: ${data.token || "Not provided"}
Source: ${data.source || "Direct"}

IP Information:
- IP Address: ${data.ipAddress || "Unknown"}
- Country: ${data.vercelIpCountry || data.cfIpCountry || "Unknown"}
- Region: ${data.vercelIpRegion || "Unknown"}
- City: ${data.vercelIpCity || "Unknown"}

Device Information:
- User Agent: ${data.userAgent}
- Platform: ${data.platform}
- Language: ${data.language}
- Screen Resolution: ${data.screenWidth}x${data.screenHeight}
- Window Size: ${data.windowWidth}x${data.windowHeight}
- Color Depth: ${data.screenColorDepth}
- Timezone: ${data.timezone}

Navigation:
- URL: ${data.url}
- Referrer: ${data.referrer}

${
  data.latitude && data.longitude
    ? `
GPS Location:
- Coordinates: ${data.latitude}, ${data.longitude}
- Accuracy: ${data.accuracy}m
`
    : ""
}
=== END LOG ===
  `
}

// Database schema example (for when you implement a proper database)
export const unsubscribeVisitSchema = `
CREATE TABLE unsubscribe_visits (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  token VARCHAR(255),
  source VARCHAR(100),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address INET,
  user_agent TEXT,
  language VARCHAR(10),
  platform VARCHAR(50),
  screen_width INTEGER,
  screen_height INTEGER,
  window_width INTEGER,
  window_height INTEGER,
  timezone VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  accuracy DECIMAL(10, 2),
  url TEXT,
  referrer TEXT,
  country VARCHAR(2),
  region VARCHAR(100),
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
