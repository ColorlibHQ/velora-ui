"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

// Land mask derived from Natural Earth (public domain): 240×120 cells, run-length encoded.
const LAND = "_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0HDBH_0_0_0211r_0_0wI1ZI118D3R6_0Z143121D2ZK8m7_0Q42284184ZM322S1M412_0M128231B7Xp7EHF611w522ABFPn4EL21G141uE271ADMo3833Y76L1D4J31A252DANU4E46$D1BG3A2B162D8LSBH32_0416127h1814387ISH222G1_0D4u585EB1J_0m152v3A79A7G8181_0W615n14212688C5F_0pAo513413A6V92_0h9mB6D5V92_0R29H6116WA622j93_0P33P4BU9Bb375311_0FA5N3GV7Ba3663_0FC5L2KX2FW21352112_0HC5h11X1GU3142_0U83mmU2241_0V82mk12X_0byf44W_0aze44X_0W12zhdL13182v_02c12fA1931272v33yaf85318852u34yaf841141K2q61_Yh65232131G2j1572_Wi683322F3h4371_01Wi52621422_012343_02VkBF11u4226_04RkDGw55_08PkH337w52_0BOl_0P_0J11G32ld1n_0I21A92ig1l_0K218A2hX1A211g_0M217tY1A12231Z11_0M12693gZ2E5X21_0P66143ea1E6E1Fy1W7336212aa1D9A4921_0X7146123Za2BA95912_0Z9mb29C68982_0U9jc17E5911871_0Y7hjG5B872_0a4ifK4B87111_0a354Ze23G4B2158111_0a2211BUiH3B231B1_0cHUhH112A2E4_0eEUfK2B2E2_0fHS73UU22274_0jIeQW21264_0jKdPY545_0jKdOa3371321_0bNbMc4351352_0YQYMd425136213_0TTWKf3521321111941_0LVVIh2A19713_0LVVIi5H741_0KUVJk411113177_0PTWJq122E2_0PSXIz1_0bQXJ51s432_0UPYJ52o11533_0UOYJ34n923E1_0HMXJ34mHK1_0BLYG54mH_0WKZG54jL_0VKaF53iOA1_0JJbF53iP_0TGeE63hR_0RGgCsQ_0RGgCsQ_0RFiAtR_0QFiAuP_0REk8v92E_0RDl6x67B_0RB_0r1CAE1_0CB_0_057G1_0BB_0_065H3_098_0_0V2_098_0_0C3F4_098_0_0D2F2_0B7_0_0T3_0C5_0_0U3_0D6_0_0_0i7_0R1_0_0H5_0_0_0k452_0_0_0f4_0_0_0m4_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0w2_0_0_0k2_0_0_0l3_0C6G82W_0Z2_08I6n_0S6l131135S2w_0K9Yr2_03v45398U_0zYI5SU_0yUtQ_0_01OvR_0_05M31sH55_0_09Up44477_0_03T_014_0_0JT_0_0_0Q7E141_0_0_0_0_0_0_0_0_0_0_0_0_0_0w";
const RLE = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_";
let dots = "";
// One zero-length, round-capped subpath per land cell on a 3° grid (84°N to 60°S).
const landDots = () => {
  if (!dots) {
    const m = new Uint8Array(28800);
    let p = 0;
    let v = 0;
    for (const c of LAND) {
      m.fill(v, p, (p += RLE.indexOf(c)));
      v ^= 1;
    }
    for (let y = 0; y < 48; y++)
      for (let x = 0; x < 120; x++) {
        const o = (y + 2) * 480 + x * 2;
        if (m[o] + m[o + 1] + m[o + 240] + m[o + 241] > 1) dots += `M${x} ${y}h0`;
      }
  }
  return dots;
};
const at = (lat: number, lng: number) => [(lng + 180) / 3 - 0.5, (84 - lat) / 3 - 0.5];

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export interface WorldMapMarker {
  /** Latitude in degrees */
  lat: number;
  /** Longitude in degrees */
  lng: number;
  /** Text shown in a pill above the marker and used in the accessible name */
  label?: string;
  /** Ring that pulses outward from this marker */
  pulse?: boolean;
}

export interface WorldMapArc {
  /** Start as [lat, lng] */
  from: [number, number];
  /** End as [lat, lng] */
  to: [number, number];
}

interface WorldMapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Highlighted points, as { lat, lng, label?, pulse? } */
  markers?: WorldMapMarker[];
  /** Curved connections, as { from: [lat, lng], to: [lat, lng] } */
  arcs?: WorldMapArc[];
  /** Seconds for one highlight to travel along an arc (including a short rest) */
  duration?: number;
  /** Accessible name; generated from the arcs and marker labels when omitted */
  label?: string;
}

/**
 * Dotted equirectangular world map with markers and curved connection arcs
 * that carry a travelling highlight. Dots use `currentColor` — recolor them
 * with a text utility on `className`. Animation pauses while hovered.
 */
export function WorldMap({
  markers = [],
  arcs = [],
  duration = 4,
  label,
  className,
  ...props
}: WorldMapProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  // Static on the server and during hydration; animates once the client knows.
  const animate = !useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => true);

  useEffect(() => {
    const el = ref.current;
    const svg = el?.querySelector("svg");
    if (!el || !svg) return;
    const pause = () => svg.pauseAnimations();
    const play = () => svg.unpauseAnimations();
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", play);
    return () => {
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", play);
    };
  }, []);

  const place = ([lat, lng]: [number, number]) =>
    markers.find((m) => Math.abs(m.lat - lat) + Math.abs(m.lng - lng) < 0.5)?.label ??
    `${Math.abs(lat)}°${lat < 0 ? "S" : "N"} ${Math.abs(lng)}°${lng < 0 ? "W" : "E"}`;
  const names = markers.flatMap((m) => m.label ?? []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={
        label ??
        `World map${
          arcs.length
            ? ` showing ${arcs.length} connection${arcs.length > 1 ? "s" : ""}: ${arcs
                .map((a) => `${place(a.from)} to ${place(a.to)}`)
                .join(", ")}`
            : names.length
              ? ` marking ${names.join(", ")}`
              : ""
        }`
      }
      {...props}
      data-slot="world-map"
      className={cn("relative w-full select-none text-muted-foreground/45", className)}
    >
      <svg viewBox="-0.5 -0.5 120 48" className="block h-auto w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={id}>
            <stop offset="0" style={{ stopColor: "var(--brand-from)" }} />
            <stop offset="0.5" style={{ stopColor: "var(--brand-via)" }} />
            <stop offset="1" style={{ stopColor: "var(--brand-to)" }} />
          </linearGradient>
        </defs>
        <path d={landDots()} stroke="currentColor" strokeWidth={0.5} strokeLinecap="round" />
        {arcs.map(({ from, to }, i) => {
          const [x1, y1] = at(...from);
          const [x2, y2] = at(...to);
          const lift = Math.hypot(x2 - x1, y2 - y1) * 0.3;
          const d = `M${x1} ${y1}Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - lift} ${x2} ${y2}`;
          return (
            <g key={i} fill="none" strokeLinecap="round">
              <path d={d} stroke={`url(#${id})`} strokeOpacity={0.6} strokeWidth={0.22} />
              {animate && (
                <path
                  d={d}
                  pathLength={1}
                  strokeDasharray="0.2 1.2"
                  strokeDashoffset={0.2}
                  strokeWidth={0.4}
                  className="stroke-brand"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0.2;-1;-1"
                    keyTimes="0;0.75;1"
                    calcMode="spline"
                    keySplines="0.45 0 0.25 1;0 0 1 1"
                    dur={`${duration}s`}
                    begin={`${(i * duration) / Math.max(arcs.length, 2)}s`}
                    repeatCount="indefinite"
                  />
                </path>
              )}
              {[x1, x2].map((cx, k) => (
                <circle key={k} cx={cx} cy={k ? y2 : y1} r={0.45} className="fill-brand" />
              ))}
            </g>
          );
        })}
        {markers.map((m, i) => {
          const [x, y] = at(m.lat, m.lng);
          return (
            <g key={i} className="fill-brand">
              {m.pulse && animate && (
                <circle cx={x} cy={y} r={0.7} opacity={0}>
                  <animate attributeName="r" values="0.7;3" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={x} cy={y} r={1.3} opacity={0.2} />
              <circle cx={x} cy={y} r={0.65} className="stroke-background" strokeWidth={0.25} />
            </g>
          );
        })}
      </svg>
      {markers.map((m, i) => {
        if (!m.label) return null;
        const [x, y] = at(m.lat, m.lng);
        return (
          <span
            key={i}
            aria-hidden
            className="absolute -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] whitespace-nowrap rounded-full border bg-card/90 px-2 py-0.5 text-[10px] font-medium text-foreground shadow-sm backdrop-blur-sm"
            style={{ left: `${((x + 0.5) / 120) * 100}%`, top: `${((y + 0.5) / 48) * 100}%` }}
          >
            {m.label}
          </span>
        );
      })}
    </div>
  );
}
