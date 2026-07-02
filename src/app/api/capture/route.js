import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email, source, score, maturityLevel } = await request.json()

    // Notify the business owner
    await resend.emails.send({
      from: 'Coventry Analytics <onboarding@resend.dev>',
      to: 'info.coventryanalytics@gmail.com',
      subject: `New Business Health Score Lead — Score: ${score}/100`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">New Lead from Business Health Score</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Score:</strong> ${score}/100</p>
          <p><strong>Maturity Level:</strong> ${maturityLevel}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
          <hr />
          <p>This lead came from the free Business Health Score tool. They have opted to receive their report by email.</p>
          <a href="mailto:${email}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">Reply to ${email}</a>
        </div>
      `,
    })

    // Send confirmation to the user
    await resend.emails.send({
      from: 'Coventry Analytics <onboarding@resend.dev>',
      to: email,
      subject: `Your Business Health Score: ${score}/100 — ${maturityLevel}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 16px;">
          <h1 style="color: #60a5fa; margin-bottom: 8px;">Your Business Health Score</h1>
          <p style="color: #94a3b8; margin-bottom: 24px;">Here's a summary of your results from Coventry Analytics.</p>

          <div style="background: #1e293b; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
            <div style="font-size: 64px; font-weight: 900; color: #fff;">${score}</div>
            <div style="color: #94a3b8; margin-bottom: 8px;">out of 100</div>
            <div style="display:inline-block;background:#2563eb20;color:#60a5fa;border:1px solid #2563eb40;padding:4px 16px;border-radius:20px;font-weight:600;">${maturityLevel}</div>
          </div>

          <p style="color: #cbd5e1; margin-bottom: 24px;">Your full results and personalised recommendations are available on the website. We've saved your results so you can return to them at any time.</p>

          <div style="margin-bottom: 24px;">
            <h3 style="color: #f1f5f9; margin-bottom: 12px;">What happens next?</h3>
            <ul style="color: #94a3b8; padding-left: 20px; line-height: 1.8;">
              <li>Review your dimension scores and top recommendations</li>
              <li>Identify your single highest-priority area to improve</li>
              <li>Book a free 30-minute strategy call if you want expert guidance</li>
            </ul>
          </div>

          <a href="https://coventryanalytics.co.uk/book" style="display:block;background:#2563eb;color:#fff;padding:16px 24px;border-radius:10px;text-decoration:none;text-align:center;font-weight:600;margin-bottom:16px;">Book a Free Strategy Call</a>
          <a href="https://coventryanalytics.co.uk/tools/business-health-score" style="display:block;background:#1e293b;color:#60a5fa;padding:16px 24px;border-radius:10px;text-decoration:none;text-align:center;font-weight:600;border:1px solid #334155;">View My Results Again</a>

          <hr style="border-color: #334155; margin: 24px 0;" />
          <p style="color: #475569; font-size: 12px; text-align: center;">Coventry Analytics Ltd · Coventry, UK · <a href="https://coventryanalytics.co.uk" style="color:#60a5fa;">coventryanalytics.co.uk</a></p>
          <p style="color: #475569; font-size: 12px; text-align: center;">You received this because you completed the Business Health Score tool.</p>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Email capture error:', error)
    return Response.json({ success: false, error: 'Email send failed' }, { status: 500 })
  }
}
