/**
 * velora.colorlib.com/demos/* → the velora-demos Pages project, which hosts
 * the Velora Pro template demos (built from the private velora-templates repo).
 * That project only answers requests carrying X-Velora-Proxy; it redirects
 * direct visitors back here. Demo screens are sample dashboards, so they are
 * noindexed; the /templates/<name> pages are the ones meant to rank.
 */
const UPSTREAM = "https://velora-demos.pages.dev";

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const headers = new Headers(request.headers);
  headers.set("X-Velora-Proxy", "1");
  const upstream = await fetch(`${UPSTREAM}${url.pathname}${url.search}`, {
    method: request.method,
    headers,
    redirect: "manual",
  });

  const out = new Headers(upstream.headers);
  const location = out.get("Location");
  if (location?.startsWith(UPSTREAM)) out.set("Location", location.slice(UPSTREAM.length));
  out.set("X-Robots-Tag", "noindex");
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: out });
}
