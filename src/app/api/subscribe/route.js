export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return Response.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }
    // TODO: wire up to email service (Buttondown / ConvertKit / Mailchimp)
    console.log('[subscribe]', email);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
