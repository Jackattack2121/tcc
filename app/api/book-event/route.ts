import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const formData = await request.json()

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Resend API key is not set" }, { status: 500 })
  }

  try {
    const data = await resend.emails.send({
      from: "The Culinary Creative <tim@luxeandlens.co>",
      to: ["jamie@theculinarycreative.com.au"],
      subject: "New Event Booking Request",
      html: `
        <h2>New Event Booking Request</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Date:</strong> ${formData.date}</p>
        <p><strong>Guests:</strong> ${formData.guests}</p>
        <p><strong>Details:</strong> ${formData.details}</p>
      `,
    })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
