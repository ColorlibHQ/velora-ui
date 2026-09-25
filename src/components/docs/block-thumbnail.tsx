"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_WIDTH = 1280;

/** A live block preview scaled down to fit its card. Decorative. */
export function BlockThumbnail({ src }: { src: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / FRAME_WIDTH)
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden
      className="relative aspect-[16/10] overflow-hidden bg-background"
    >
      <iframe
        src={src}
        title=""
        tabIndex={-1}
        loading="lazy"
        style={{ width: FRAME_WIDTH, height: FRAME_WIDTH / 1.6, transform: `scale(${scale})` }}
        className="pointer-events-none absolute top-0 left-0 origin-top-left"
      />
    </div>
  );
}
