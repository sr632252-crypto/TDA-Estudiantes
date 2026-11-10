import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { C, body } from "../theme";
import { blurIn, lerp } from "../anim";
import { parseWords } from "../timing";

export const Bg: React.FC<{ dark: boolean; children?: React.ReactNode; from: number }> = ({
  dark,
  children,
  from,
}) => {
  const frame = useCurrentFrame();
  const p = lerp(frame, from, from + 10, 0, 1);
  return (
    <AbsoluteFill
      style={{
        background: dark
          ? `radial-gradient(120% 80% at 50% 45%, #1B2436 0%, ${C.ink} 70%)`
          : `radial-gradient(120% 80% at 50% 45%, ${C.white} 0%, ${C.gray} 85%)`,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${1.05 - 0.05 * p})`, filter: `blur(${(1 - p) * 8}px)` }}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Subtítulo cinético: muestra un bloque de palabras a la vez, palabra por palabra.
export const Caption: React.FC<{
  id: string;
  text: string;
  dark: boolean;
  y?: number;
  size?: number;
  hideAt?: number;
}> = ({ id, text, dark, y = 430, size = 62, hideAt }) => {
  const frame = useCurrentFrame();
  const words = parseWords(id, text);
  const first = words[0].at;
  const lastChunk = words[words.length - 1].chunk;
  const end = hideAt ?? Infinity;
  if (frame < first - 1 || frame >= end) return null;
  let cur = 0;
  for (const w of words) if (w.at <= frame) cur = w.chunk;
  const shown = words.filter((w) => w.chunk === cur);
  void lastChunk;
  const base = dark ? "rgba(255,255,255,0.88)" : C.ink;
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: 60,
        right: 140,
        textAlign: "center",
        fontFamily: body,
        fontSize: size,
        lineHeight: 1.2,
        letterSpacing: -1,
        color: base,
        fontWeight: 500,
      }}
    >
      {shown.map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: "0.26em",
            ...blurIn(frame, w.at, 7, 18),
            color: w.hi ? (dark ? C.white : C.blue) : base,
            fontWeight: w.hi ? 800 : 500,
            textShadow: w.hi
              ? dark
                ? `0 0 26px rgba(37,99,235,0.95), 0 0 8px rgba(255,255,255,0.5)`
                : `0 0 22px rgba(37,99,235,0.35)`
              : "none",
          }}
        >
          {w.text}
        </span>
      ))}
    </div>
  );
};

export const Pill: React.FC<{ text: string; dark: boolean; at: number; y?: number }> = ({
  text,
  dark,
  at,
  y = 250,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div style={{ position: "absolute", top: y, left: 0, right: 80, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          ...blurIn(frame, at, 8, 14),
          fontFamily: body,
          fontWeight: 700,
          fontSize: 30,
          letterSpacing: 4,
          padding: "14px 30px",
          borderRadius: 999,
          color: dark ? C.white : C.ink,
          border: `2px solid ${dark ? "rgba(255,255,255,0.25)" : "rgba(17,24,39,0.18)"}`,
          background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ width: 14, height: 14, borderRadius: 7, background: C.blue, boxShadow: `0 0 14px ${C.blue}` }} />
        {text}
      </div>
    </div>
  );
};

type IconName = "pen" | "search" | "image" | "play" | "heart" | "comment" | "send" | "bookmark" | "check" | "scissors" | "globe" | "spark";
export const Icon: React.FC<{ name: IconName; size: number; color: string; sw?: number; fill?: string }> = ({
  name,
  size,
  color,
  sw = 2,
  fill = "none",
}) => {
  const p = { fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, React.ReactNode> = {
    pen: (
      <>
        <path {...p} d="M16.5 3.5l4 4L8 20H4v-4z" />
        <path {...p} d="M14 6l4 4" />
      </>
    ),
    search: (
      <>
        <circle {...p} cx="10.5" cy="10.5" r="6.5" />
        <path {...p} d="M15.5 15.5L21 21" />
      </>
    ),
    image: (
      <>
        <rect {...p} x="3" y="4" width="18" height="16" rx="3" />
        <circle {...p} cx="9" cy="9.5" r="1.8" />
        <path {...p} d="M3.5 17l5-5 4 4 3-3 5 5" />
      </>
    ),
    play: (
      <>
        <rect {...p} x="3" y="4" width="18" height="16" rx="3" />
        <path {...p} d="M10 9l5 3-5 3z" />
      </>
    ),
    heart: <path {...p} fill={fill} d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
    comment: <path {...p} fill={fill} d="M4 5h16v11H9l-5 4z" />,
    send: <path {...p} fill={fill} d="M21 3L3 10.5l7 3 3 7z" />,
    bookmark: <path {...p} fill={fill} d="M6 3h12v18l-6-4.5L6 21z" />,
    check: <path {...p} d="M5 12.5l4.5 4.5L19 7.5" />,
    scissors: (
      <>
        <circle {...p} cx="6" cy="6.5" r="3" />
        <circle {...p} cx="6" cy="17.5" r="3" />
        <path {...p} d="M8.5 8L20 18M8.5 16L20 6" />
      </>
    ),
    globe: (
      <>
        <circle {...p} cx="12" cy="12" r="9" />
        <path {...p} d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
    spark: <path {...p} fill={fill} d="M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
};

// Foto real a pantalla completa con movimiento lento (Ken Burns) y capa de color de la paleta
export const Photo: React.FC<{
  name: string;
  from: number;
  dur?: number;
  overlay?: string;
  pos?: string;
  zoom?: [number, number];
  style?: React.CSSProperties;
}> = ({ name, from, dur = 150, overlay, pos = "center", zoom = [1.12, 1.0], style }) => {
  const frame = useCurrentFrame();
  const z = lerp(frame, from, from + dur, zoom[0], zoom[1], (x) => x);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", ...style }}>
      <Img
        src={staticFile(`img/${name}.jpg`)}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos, transform: `scale(${z})` }}
      />
      {overlay && <div style={{ position: "absolute", inset: 0, background: overlay }} />}
    </div>
  );
};
export const DARK_OVERLAY =
  "linear-gradient(180deg, rgba(17,24,39,0.82) 0%, rgba(17,24,39,0.55) 40%, rgba(17,24,39,0.7) 70%, rgba(17,24,39,0.95) 100%)";
