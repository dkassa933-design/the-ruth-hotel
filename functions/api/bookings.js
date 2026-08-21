export async function onRequestPost({ request, env }) {
  try {
    const d = await request.json();

    for (const k of [
      "name",
      "email",
      "phone",
      "check_in",
      "check_out",
      "guests"
    ]) {
      if (!d[k]) {
        return Response.json(
          { error: "Missing " + k },
          { status: 400 }
        );
      }
    }

    if (d.check_out <= d.check_in) {
      return Response.json(
        { error: "Invalid dates" },
        { status: 400 }
      );
    }

    await env.DB.prepare(`
      INSERT INTO bookings
      (name, email, phone, check_in, check_out, guests, room_type, message, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `)
      .bind(
        String(d.name).slice(0, 120),
        String(d.email).slice(0, 160),
        String(d.phone).slice(0, 50),
        d.check_in,
        d.check_out,
        Number(d.guests),
        String(d.room_type || "").slice(0, 100),
        String(d.message || "").slice(0, 2000),
        "new"
      )
      .run();

    return Response.json({ ok: true });

  } catch (e) {
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}


export async function onRequestGet({ request, env }) {
  const token = new URL(request.url).searchParams.get("token");

  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { results } = await env.DB
    .prepare(
      "SELECT * FROM bookings ORDER BY created_at DESC LIMIT 200"
    )
    .all();

  return Response.json({ results });
}
