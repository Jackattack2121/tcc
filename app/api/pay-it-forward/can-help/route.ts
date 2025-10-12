import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const formData = await request.json()

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Resend API key is not set" }, { status: 500 })
  }

  try {
    // Email template for the person who wants to help
    const userEmailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You — You're Amazing</title>
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
                      <h1 style="color: #ffffff; font-size: 42px; font-weight: bold; margin: 0; line-height: 1.2;">Thank You — You're Amazing.</h1>
                    </td>
                  </tr>
                  
                  <!-- Body Text -->
                  <tr>
                    <td style="padding: 20px 40px; text-align: center;">
                      <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                        We just wanted to say a big thank you for stepping up to help.
                      </p>
                      <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                        Whether you're donating a meal, ingredients, your time or a kind word — it means the world to someone doing it tough.
                      </p>
                      <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                        We've received your message and we'll be in touch shortly with how you can get involved.
                      </p>
                      <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0 0 30px 0;">
                        You're the reason this works.
                      </p>
                      <p style="color: #ffffff; font-size: 18px; line-height: 1.6; margin: 0;">
                        Love from Jamie and the whole team at The Culinary Creative.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- CTA Button -->
                  <tr>
                    <td style="padding: 30px 40px; text-align: center;">
                      <a href="https://theculinarycreative.com.au" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 16px 40px; border-radius: 50px; border: 2px solid #ffffff;">
                        Return to Website
                      </a>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 40px 20px; text-align: center;">
                      <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 0;">
                        The Culinary Creative<br>
                        Adelaide, South Australia<br>
                        Thank you for spreading love.
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
          <title>New "I Can Help" Offer</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 30px; border-radius: 8px;">
            <h2 style="color: #0e0c0b; margin-top: 0;">New "I Can Help" Offer</h2>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 4px; margin-top: 20px;">
              <p><strong>Full Name:</strong> ${formData.fullName}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Phone:</strong> ${formData.phone}</p>
              <p><strong>What they can offer:</strong> ${formData.offer}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${formData.message}</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Send confirmation email to the helper
    await resend.emails.send({
      from: "The Culinary Creative <tim@luxeandlens.co>",
      to: [formData.email],
      subject: "Thank You for Helping — The Culinary Creative",
      html: userEmailTemplate,
    })

    // Send notification email to Jamie
    await resend.emails.send({
      from: "The Culinary Creative <tim@luxeandlens.co>",
      to: ["jamie@theculinarycreative.com.au"],
      subject: "New 'I Can Help' Offer — Pay It Forward",
      html: adminEmailTemplate,
    })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
