import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const formData = await request.json()

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Resend API key is not set" }, { status: 500 })
  }

  try {
    // Email template for the person who needs help
    const userEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>We've Got You</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0e0c0b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0e0c0b;">
            <tr>
              <td style="padding: 40px 20px; text-align: center;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #0e0c0b;">
                  <!-- Logo -->
                  <tr>
                    <td style="padding: 40px 20px; text-align: center;">
                      <img src="https://hhwjr1eiavvhkdwe.public.blob.vercel-storage.com/logo.png" alt="The Culinary Creative" style="max-width: 200px; height: auto;">
                    </td>
                  </tr>
                  
                  <!-- Headline -->
                  <tr>
                    <td style="padding: 20px 40px; text-align: center;">
                      <h1 style="color: #ffffff; font-size: 42px; font-weight: bold; margin: 0; line-height: 1.2;">We've Got You.</h1>
                    </td>
                  </tr>
                  
                  <!-- Body Text -->
                  <tr>
                    <td style="padding: 20px 40px; text-align: center;">
                      <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                        Thanks for reaching out. It takes courage to ask for help — and we want you to know you're not alone.
                      </p>
                      <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                        We've received your message and we'll do everything we can to connect you with a meal or support as soon as possible.
                      </p>
                      <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                        In the meantime, be kind to yourself. You're seen, you matter, and you're part of our community.
                      </p>
                      <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0;">
                        Love from Jamie and the whole team at The Culinary Creative.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 40px 20px; text-align: center;">
                      <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0;">
                        The Culinary Creative<br>
                        Adelaide, South Australia<br>
                        This email was sent with kindness.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

    // Email template for Jamie (notification)
    const adminEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New "I Need Help" Request</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 30px; border-radius: 8px;">
            <h2 style="color: #0e0c0b; margin-top: 0;">New "I Need Help" Request</h2>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 4px; margin-top: 20px;">
              <p><strong>First Name:</strong> ${formData.firstName || "Not provided"}</p>
              <p><strong>Suburb/Postcode:</strong> ${formData.suburb}</p>
              <p><strong>Contact Method:</strong> ${formData.contactMethod}</p>
              ${formData.contactMethod === "phone" ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ""}
              ${formData.contactMethod === "email" ? `<p><strong>Email:</strong> ${formData.email}</p>` : ""}
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${formData.message}</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send confirmation email to the user (only if they provided email)
    if (formData.contactMethod === "email" && formData.email) {
      await resend.emails.send({
        from: "The Culinary Creative <tim@luxeandlens.co>",
        to: [formData.email],
        subject: "We've Got You — The Culinary Creative",
        html: userEmailTemplate,
      })
    }

    // Send notification email to Jamie
    await resend.emails.send({
      from: "The Culinary Creative <tim@luxeandlens.co>",
      to: ["jamie@theculinarycreative.com.au"],
      subject: "New 'I Need Help' Request — Pay It Forward",
      html: adminEmailTemplate,
    })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
