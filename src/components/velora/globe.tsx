"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

// Land mask derived from Natural Earth (public domain): 240×120 cells, run-length encoded.
const LAND = "_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0HDBH_0_0_0211r_0_0wI1ZI118D3R6_0Z143121D2ZK8m7_0Q42284184ZM322S1M412_0M128231B7Xp7EHF611w522ABFPn4EL21G141uE271ADMo3833Y76L1D4J31A252DANU4E46$D1BG3A2B162D8LSBH32_0416127h1814387ISH222G1_0D4u585EB1J_0m152v3A79A7G8181_0W615n14212688C5F_0pAo513413A6V92_0h9mB6D5V92_0R29H6116WA622j93_0P33P4BU9Bb375311_0FA5N3GV7Ba3663_0FC5L2KX2FW21352112_0HC5h11X1GU3142_0U83mmU2241_0V82mk12X_0byf44W_0aze44X_0W12zhdL13182v_02c12fA1931272v33yaf85318852u34yaf841141K2q61_Yh65232131G2j1572_Wi683322F3h4371_01Wi52621422_012343_02VkBF11u4226_04RkDGw55_08PkH337w52_0BOl_0P_0J11G32ld1n_0I21A92ig1l_0K218A2hX1A211g_0M217tY1A12231Z11_0M12693gZ2E5X21_0P66143ea1E6E1Fy1W7336212aa1D9A4921_0X7146123Za2BA95912_0Z9mb29C68982_0U9jc17E5911871_0Y7hjG5B872_0a4ifK4B87111_0a354Ze23G4B2158111_0a2211BUiH3B231B1_0cHUhH112A2E4_0eEUfK2B2E2_0fHS73UU22274_0jIeQW21264_0jKdPY545_0jKdOa3371321_0bNbMc4351352_0YQYMd425136213_0TTWKf3521321111941_0LVVIh2A19713_0LVVIi5H741_0KUVJk411113177_0PTWJq122E2_0PSXIz1_0bQXJ51s432_0UPYJ52o11533_0UOYJ34n923E1_0HMXJ34mHK1_0BLYG54mH_0WKZG54jL_0VKaF53iOA1_0JJbF53iP_0TGeE63hR_0RGgCsQ_0RGgCsQ_0RFiAtR_0QFiAuP_0REk8v92E_0RDl6x67B_0RB_0r1CAE1_0CB_0_057G1_0BB_0_065H3_098_0_0V2_098_0_0C3F4_098_0_0D2F2_0B7_0_0T3_0C5_0_0U3_0D6_0_0_0i7_0R1_0_0H5_0_0_0k452_0_0_0f4_0_0_0m4_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0_0w2_0_0_0k2_0_0_0l3_0C6G82W_0Z2_08I6n_0S6l131135S2w_0K9Yr2_03v45398U_0zYI5SU_0yUtQ_0_01OvR_0_05M31sH55_0_09Up44477_0_03T_014_0_0JT_0_0_0Q7E141_0_0_0_0_0_0_0_0_0_0_0_0_0_0w";
const RLE = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$_";
let mask: Uint8Array | undefined;
const isLand = (lat: number, lng: number) => {
  if (!mask) {
    mask = new Uint8Array(28800);
    let p = 0;
    let v = 0;
    for (const c of LAND) {
      mask.fill(v, p, (p += RLE.indexOf(c)));
      v ^= 1;
    }
  }
  return mask[((90 - lat) / 1.5 | 0) * 240 + ((lng + 180) / 1.5 | 0)];
};

const RAD = Math.PI / 180;
const vec = (lat: number, lng: number) => {
  const c = Math.cos(lat * RAD);
  return [c * Math.sin(lng * RAD), Math.sin(lat * RAD), c * Math.cos(lng * RAD)];
};

export interface GlobeMarker {
  /** Latitude in degrees */
  lat: number;
  /** Longitude in degrees */
  lng: number;
  /** Name drawn beside the marker and included in the accessible name */
  label?: string;
}

export interface GlobeArc {
  /** Start as [lat, lng] */
  from: [number, number];
  /** End as [lat, lng] */
  to: [number, number];
}

interface GlobeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Highlighted points, as { lat, lng, label? } */
  markers?: GlobeMarker[];
  /** Great-circle connections, as { from: [lat, lng], to: [lat, lng] } */
  arcs?: GlobeArc[];
  /** [lat, lng] facing the viewer on first paint */
  center?: [number, number];
  /** Auto-rotation in degrees per second (negative spins west); 0 turns it off */
  speed?: number;
  /** Points sampled over the sphere; roughly 3 in 10 land and become dots */
  samples?: number;
  /** Land dot color: any CSS color, var() tokens included */
  dotColor?: string;
  /** Marker and arc color: any CSS color, var() tokens included */
  accentColor?: string;
  /** Accessible name; generated from marker labels when omitted */
  label?: string;
}

/**
 * Dotted 2D-canvas globe with markers and animated great-circle arcs.
 * Drag (with inertia) or use the arrow keys to rotate; auto-rotation pauses
 * while hovered or focused. Give it a width — height follows (it is square).
 */
export function Globe({
  markers = [],
  arcs = [],
  center = [20, 10],
  speed = 6,
  samples = 12000,
  dotColor = "var(--muted-foreground)",
  accentColor = "var(--brand)",
  label,
  className,
  ...props
}: GlobeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const view = useRef<{ lat: number; lng: number; vx: number; vy: number }>(null);
  const [lat0, lng0] = center;

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;
    const v = (view.current ??= { lat: lat0, lng: lng0, vx: 0, vy: 0 });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fibonacci lattice: evenly spaced samples, kept where the mask says land.
    const dots: number[] = [];
    for (let i = 0; i < samples; i++) {
      const lat = Math.asin(1 - (2 * i + 1) / samples) / RAD;
      const lng = ((i * 137.508) % 360) - 180;
      if (isLand(lat, lng)) dots.push(...vec(lat, lng));
    }
    const pins = markers.map((m) => vec(m.lat, m.lng));
    const S = 40;
    const paths = arcs.map(({ from, to }) => {
      const a = vec(...from);
      const b = vec(...to);
      const w = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
      const pts: number[][] = [];
      for (let s = 0; s <= S && w > 1e-3; s++) {
        const t = s / S;
        const k = (1 + Math.min(w, 1.6) * 0.12 * Math.sin(Math.PI * t)) / Math.sin(w);
        const p = Math.sin((1 - t) * w) * k;
        const q = Math.sin(t * w) * k;
        pts.push([a[0] * p + b[0] * q, a[1] * p + b[1] * q, a[2] * p + b[2] * q]);
      }
      return pts;
    });

    let w = 0, h = 0, R = 0, raf = 0, last = 0;
    let inView = true, hover = false, focus = false;
    let drag: { x: number; y: number } | null = null;
    let dot = "", accent = "", text = "", font = "";

    const resolve = () => {
      const cs = getComputedStyle(root);
      canvas.style.color = dotColor;
      dot = getComputedStyle(canvas).color;
      canvas.style.color = accentColor;
      accent = getComputedStyle(canvas).color;
      text = cs.color;
      font = `500 11px ${cs.fontFamily}`;
    };

    const draw = (t: number) => {
      const cl = Math.cos(v.lng * RAD), sl = Math.sin(v.lng * RAD);
      const ct = Math.cos(v.lat * RAD), st = Math.sin(v.lat * RAD);
      const cx = w / 2, cy = h / 2;
      // Rotate so (v.lat, v.lng) faces the viewer; returns [x, y, depth].
      const proj = (x: number, y: number, z: number) => {
        const z0 = x * sl + z * cl;
        return [x * cl - z * sl, y * ct - z0 * st, y * st + z0 * ct];
      };
      const disc = (x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.arc(cx + x * R, cy - y * R, r, 0, 7);
      };
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = dot;
      const r = Math.max(0.8, R / 130);
      for (let i = 0; i < dots.length; i += 3) {
        const [x, y, z] = proj(dots[i], dots[i + 1], dots[i + 2]);
        if (z <= 0) continue;
        ctx.globalAlpha = 0.12 + 0.78 * z;
        disc(x, y, r * (0.6 + 0.4 * z));
        ctx.fill();
      }

      ctx.fillStyle = ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      paths.forEach((pts, k) => {
        const head = reduced ? 2 : ((t / 2.8 + k * 0.37) % 1.5) * 1.1;
        const seen = pts.map((p) => {
          const q = proj(p[0], p[1], p[2]);
          return q[2] > 0 || q[0] * q[0] + q[1] * q[1] > 1 ? q : null;
        });
        for (let s = 0; s < S; s++) {
          const a = seen[s], b = seen[s + 1];
          if (!a || !b) continue;
          const d = head - s / S;
          ctx.globalAlpha = reduced ? 0.7 : d > 0 && d < 0.35 ? 1 - d / 0.35 : 0.2;
          ctx.beginPath();
          ctx.moveTo(cx + a[0] * R, cy - a[1] * R);
          ctx.lineTo(cx + b[0] * R, cy - b[1] * R);
          ctx.stroke();
        }
        const tip = seen[Math.round(head * S)];
        if (tip && head <= 1) {
          ctx.globalAlpha = 1;
          disc(tip[0], tip[1], 2.2);
          ctx.fill();
        }
        for (const e of [seen[0], seen[S]]) {
          if (!e) continue;
          ctx.globalAlpha = 0.9;
          disc(e[0], e[1], 2);
          ctx.fill();
        }
      });

      ctx.font = font;
      pins.forEach((p, k) => {
        const [x, y, z] = proj(p[0], p[1], p[2]);
        if (z <= 0) return;
        const fade = Math.min(1, z * 4);
        ctx.globalAlpha = fade;
        disc(x, y, 3);
        ctx.fill();
        const ph = reduced ? 0.4 : (t * 0.6 + k * 0.29) % 1;
        ctx.globalAlpha = fade * (1 - ph) * 0.7;
        disc(x, y, 3 + ph * 11);
        ctx.stroke();
        const name = markers[k].label;
        if (name && z > 0.3) {
          ctx.globalAlpha = Math.min(1, (z - 0.3) * 4) * 0.85;
          ctx.fillStyle = text;
          ctx.fillText(name, cx + x * R + 8, cy - y * R + 4);
          ctx.fillStyle = accent;
        }
      });
      ctx.globalAlpha = 1;
    };

    const moving = () => drag || Math.abs(v.vx) + Math.abs(v.vy) > 0.01;
    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      if (!drag) {
        v.lng += v.vx;
        v.lat += v.vy;
        v.vx *= 0.9;
        v.vy *= 0.9;
        if (!reduced && !hover && !focus) v.lng -= speed * dt;
      }
      v.lat = Math.max(-70, Math.min(70, v.lat));
      draw(now / 1000);
      last = now;
      if (inView && !document.hidden && (!reduced || moving())) {
        raf = requestAnimationFrame(frame);
      } else last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = root.clientWidth;
      h = root.clientHeight;
      R = Math.min(w, h) * 0.42;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      kick();
    };

    const onDown = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY };
      v.vx = v.vy = 0;
      root.setPointerCapture(e.pointerId);
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const k = 57 / R;
      v.vx = -(e.clientX - drag.x) * k;
      v.vy = (e.clientY - drag.y) * k;
      v.lng += v.vx;
      v.lat += v.vy;
      drag = { x: e.clientX, y: e.clientY };
      kick();
    };
    const onUp = () => {
      drag = null;
      kick();
    };
    const onKey = (e: KeyboardEvent) => {
      const d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (!d) return;
      e.preventDefault();
      if (reduced) {
        v.lng += d[0] * 15;
        v.lat += d[1] * 15;
      } else {
        v.vx += d[0];
        v.vy += d[1];
      }
      kick();
    };
    const flag = (e: Event) => {
      if (e.type.startsWith("pointer")) hover = e.type === "pointerenter";
      else focus = e.type === "focus";
      kick();
    };
    const onTheme = () => {
      resolve();
      kick();
    };

    const events: [string, EventListener][] = [
      ["pointerdown", onDown as EventListener],
      ["pointermove", onMove as EventListener],
      ["pointerup", onUp],
      ["pointercancel", onUp],
      ["keydown", onKey as EventListener],
      ["pointerenter", flag],
      ["pointerleave", flag],
      ["focus", flag],
      ["blur", flag],
    ];
    for (const [n, f] of events) root.addEventListener(n, f);
    document.addEventListener("visibilitychange", kick);
    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      kick();
    });
    io.observe(root);
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
    resolve();

    return () => {
      cancelAnimationFrame(raf);
      for (const [n, f] of events) root.removeEventListener(n, f);
      document.removeEventListener("visibilitychange", kick);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, [markers, arcs, samples, speed, dotColor, accentColor, lat0, lng0]);

  const names = markers.flatMap((m) => m.label ?? []);

  return (
    <div
      ref={rootRef}
      role="img"
      tabIndex={0}
      aria-label={
        label ??
        `Globe${names.length ? ` marking ${names.join(", ")}` : ""}${
          arcs.length ? `, ${arcs.length} connection${arcs.length > 1 ? "s" : ""}` : ""
        }`
      }
      {...props}
      data-slot="globe"
      className={cn(
        "relative aspect-square w-full max-w-md cursor-grab touch-pan-y select-none rounded-full outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-background bg-radial-[at_30%_25%] from-brand/12 to-transparent to-75% shadow-[0_0_70px_-12px_color-mix(in_oklab,var(--brand)_45%,transparent)] ring-1 ring-brand/15"
      />
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-radial from-transparent from-70% to-brand/20"
      />
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />
    </div>
  );
}
