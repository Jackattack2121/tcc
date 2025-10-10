"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"

interface LogEntry {
  id: string
  timestamp: string
  email?: string
  ipAddress?: string
  country?: string
  region?: string
  city?: string
  userAgent?: string
  source?: string
  referrer?: string
  coordinates?: { lat: number; lng: number }
  platform?: string
  language?: string
  screenWidth?: number
  screenHeight?: number
  timezone?: string
}

export default function UnsubscribeLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    try {
      const response = await fetch("/api/admin/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setAuthenticated(true)
        fetchLogs()
      } else {
        localStorage.removeItem("admin_token")
        router.push("/admin/login")
      }
    } catch (error) {
      localStorage.removeItem("admin_token")
      router.push("/admin/login")
    }
  }

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      const response = await fetch("/api/admin/unsubscribe-logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (error) {
      console.error("Error fetching logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  const filteredLogs = logs.filter(
    (log) =>
      log.email?.toLowerCase().includes(filter.toLowerCase()) ||
      log.ipAddress?.includes(filter) ||
      log.country?.toLowerCase().includes(filter.toLowerCase()) ||
      log.city?.toLowerCase().includes(filter.toLowerCase()) ||
      log.source?.toLowerCase().includes(filter.toLowerCase()),
  )

  if (!authenticated || loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {!authenticated ? "Checking authentication..." : "Loading Unsubscribe Logs..."}
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Unsubscribe Logs Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={fetchLogs}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400">Total Visits</h3>
            <p className="text-2xl font-bold">{logs.length}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400">With Email</h3>
            <p className="text-2xl font-bold">{logs.filter((log) => log.email).length}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400">Unique Countries</h3>
            <p className="text-2xl font-bold">{new Set(logs.map((log) => log.country).filter(Boolean)).size}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-sm text-gray-400">Today</h3>
            <p className="text-2xl font-bold">
              {logs.filter((log) => new Date(log.timestamp).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Filter by email, IP, country, city, or source..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-white focus:outline-none"
          />
        </div>

        {/* Logs Table */}
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left p-4">Timestamp</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">IP Address</th>
                  <th className="text-left p-4">Source</th>
                  <th className="text-left p-4">Device</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr key={log.id || index} className="border-t border-gray-700 hover:bg-gray-800">
                    <td className="p-4">
                      <div className="text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                        <div className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-mono">{log.email || "—"}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        {log.city && log.country
                          ? `${log.city}, ${log.region ? log.region + ", " : ""}${log.country}`
                          : log.country || "—"}
                        {log.coordinates && (
                          <div className="text-xs text-gray-400">
                            {log.coordinates.lat.toFixed(4)}, {log.coordinates.lng.toFixed(4)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-mono">{log.ipAddress || "—"}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{log.source || "Direct"}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs text-gray-400">
                        <div>{log.platform || "—"}</div>
                        {log.screenWidth && log.screenHeight && (
                          <div>
                            {log.screenWidth}×{log.screenHeight}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          const modal = document.createElement("div")
                          modal.className =
                            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                          modal.innerHTML = `
                            <div class="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
                              <div class="flex justify-between items-center mb-4">
                                <h3 class="text-lg font-bold text-white">Log Details</h3>
                                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">×</button>
                              </div>
                              <pre class="text-sm text-gray-300 whitespace-pre-wrap">${JSON.stringify(
                                log,
                                null,
                                2,
                              )}</pre>
                            </div>
                          `
                          document.body.appendChild(modal)
                        }}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              {filter ? "No logs match your filter" : "No unsubscribe visits logged yet"}
            </div>
          )}
        </div>

        {/* Export Button */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => {
              const dataStr = JSON.stringify(logs, null, 2)
              const dataBlob = new Blob([dataStr], { type: "application/json" })
              const url = URL.createObjectURL(dataBlob)
              const link = document.createElement("a")
              link.href = url
              link.download = `unsubscribe-logs-${new Date().toISOString().split("T")[0]}.json`
              link.click()
            }}
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Export JSON
          </button>
          <button
            onClick={() => {
              const csvContent = [
                "Timestamp,Email,IP Address,Country,Region,City,Source,Platform,User Agent",
                ...logs.map((log) =>
                  [
                    log.timestamp,
                    log.email || "",
                    log.ipAddress || "",
                    log.country || "",
                    log.region || "",
                    log.city || "",
                    log.source || "",
                    log.platform || "",
                    `"${log.userAgent || ""}"`,
                  ].join(","),
                ),
              ].join("\n")

              const dataBlob = new Blob([csvContent], { type: "text/csv" })
              const url = URL.createObjectURL(dataBlob)
              const link = document.createElement("a")
              link.href = url
              link.download = `unsubscribe-logs-${new Date().toISOString().split("T")[0]}.csv`
              link.click()
            }}
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>
  )
}
