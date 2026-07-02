import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, company, email, phone, message, challenges, service } = await request.json()

    await resend.emails.send({
      from: 'Coventry Analytics Website <onboarding@resend.dev>',
      to: 'info.coventryanalytics@gmail.com',
      replyTo: email,
      subject: `New Booking Request — ${name} (${company})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Strategy Call Booking</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#64748b;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;">Company</td><td style="padding:8px 0;font-weight:600;">${company}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;font-weight:600;">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;">Phone</td><td style="padding:8px 0;">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;">Service</td><td style="padding:8px 0;">${service || 'Not specified'}</td></tr>
          </table>
          ${challenges && challenges.length > 0 ? `
          <h3>Selected Challenges:</h3>
          <ul style="background:#f1f5f9;padding:16px 16px 16px 32px;border-radius:8px;">
            ${challenges.map(c => `<li>${c}</li>`).join('')}
          </ul>` : ''}
          ${message ? `<h3>Additional Notes:</h3><p style="background:#f1f5f9;padding:16px;border-radius:8px;">${message.replace(/\n/g, '<br>')}</p>` : ''}
          <a href="mailto:${email}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">Reply to ${name}</a>
        </div>
      `,
    })

    // Send confirmation to the user
    await resend.emails.send({
      from: 'Coventry Analytics <onboarding@resend.dev>',
      to: email,
      subject: 'Your Strategy Call Request — Coventry Analytics',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 16px;">
          <h1 style="color: #60a5fa;">Request Received, ${name.split(' ')[0]}!</h1>
          <p style="color: #94a3b8;">Thank you for reaching out. We'll be in touch within 2 hours to confirm your call time.</p>

          <div style="background: #1e293b; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <h3 style="color: #f1f5f9; margin-top: 0;">What happens next:</h3>
            <ul style="color: #94a3b8; padding-left: 20px; line-height: 2;">
              <li>We review your submission (usually within the hour)</li>
              <li>We email you to confirm a time that works</li>
              <li>30-minute video call — honest assessment, no pitch</li>
              <li>Written summary of findings within 24 hours</li>
            </ul>
          </div>

          <p style="color: #cbd5e1;">While you wait, you might find it useful to complete the <a href="https://coventryanalytics.co.uk/tools/business-health-score" style="color:#60a5fa;">Business Health Score</a> — it takes 8 minutes and will help us make the most of our call together.</p>

          <hr style="border-color: #334155; margin: 24px 0;" />
          <p style="color: #475569; font-size: 12px; text-align: center;">Coventry Analytics Ltd · Coventry, UK</p>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Book form error:', error)
    return Response.json({ success: false }, { status: 500 })
  }
}
