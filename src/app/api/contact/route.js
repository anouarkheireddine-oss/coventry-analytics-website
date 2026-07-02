import { Resend } from 'resend'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, subject, message } = await request.json()

    await resend.emails.send({
      from: 'Coventry Analytics Website <onboarding@resend.dev>',
      to: 'info.coventryanalytics@gmail.com',
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h3>Message:</h3>
          <p style="background:#f1f5f9;padding:16px;border-radius:8px;">${message.replace(/\n/g, '<br>')}</p>
          <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">Reply to ${name}</a>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json({ success: false }, { status: 500 })
  }
}
