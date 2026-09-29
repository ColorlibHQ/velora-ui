/**
 * POST /api/waitlist — adds an email to the Velora Pro waitlist in Sendy.
 *
 * The list uses double opt-in: Sendy emails a confirmation link and only
 * confirmed addresses count. Sendy's API needs a key, so this runs server
 * side: it keeps SENDY_API_KEY (a Pages secret) off the client, validates
 * input, catches bots with a honeypot, passes the visitor's IP and country,
 * and turns Sendy's plain-text replies into clear states.
 */
const SENDY_URL = "https://sendy.colorlib.com/subscribe";
// Sendy list 13, "Velora UI - Pro Waitlist" (Colorlib brand), double opt-in.
const SENDY_LIST = "UKkE8uUjTYAcfLu1eWu5Cw";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export async function onRequestPost({ request, env }) {
  if (!env.SENDY_API_KEY) {
    console.error("waitlist: SENDY_API_KEY secret is not set");
    return json({ ok: false, status: "error", message: "The waitlist is temporarily unavailable." }, 503);
  }

  let data;
  try {
    const type = request.headers.get("Content-Type") ?? "";
    data = type.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, status: "invalid", message: "Send an email address." }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return json({ ok: true, status: "pending" });
  }

  const email = String(data.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return json({ ok: false, status: "invalid", message: "That email address doesn't look right." }, 400);
  }

  const form = new URLSearchParams({
    api_key: env.SENDY_API_KEY,
    list: SENDY_LIST,
    email,
    boolean: "true",
    gdpr: "true",
    referrer: "https://velora.colorlib.com/pricing",
  });
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) form.set("ipaddress", ip);
  const country = request.headers.get("CF-IPCountry");
  if (country && /^[A-Z]{2}$/.test(country) && country !== "XX" && country !== "T1") {
    form.set("country", country);
  }

  let reply;
  try {
    const res = await fetch(SENDY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    reply = (await res.text()).trim();
  } catch {
    return json({ ok: false, status: "error", message: "We couldn't reach our mailing service. Please try again." }, 502);
  }

  if (reply === "1" || reply === "true") return json({ ok: true, status: "pending" });
  if (/already subscribed/i.test(reply)) return json({ ok: true, status: "already" });
  if (/invalid|bounced|suppressed|blocked/i.test(reply)) {
    return json({ ok: false, status: "invalid", message: "That email address can't receive our emails." }, 400);
  }
  console.error(`waitlist: unexpected Sendy reply: ${reply.slice(0, 120)}`);
  return json({ ok: false, status: "error", message: "Something went wrong. Please try again." }, 502);
}

export function onRequest() {
  return json({ ok: false, message: "Use POST." }, 405);
}
