export async function POST(req) {
  try {
    const data = await req.json();
    const { role, location, level, salary, companySize } = data;
    if (!role || !salary) {
      return Response.json({ ok: false, error: 'Missing fields' }, { status: 400 });
    }
    // TODO: store to database (Postgres / Supabase / PlanetScale)
    console.log('[salary-submit]', { role, location, level, salary, companySize });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
}
