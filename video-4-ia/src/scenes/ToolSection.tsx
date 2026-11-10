import React from "react";
import { useCurrentFrame } from "remotion";
import { Bg, Caption, Pill, Photo, DARK_OVERLAY } from "../components/Base";
import { C, display } from "../theme";
import { blurIn, blurOut, lerp, pop } from "../anim";
import { startF, endF } from "../timing";

export type MockProps = { frame: number; t0: number; t1: number; dark: boolean };

export const ToolSection: React.FC<{
  from: number;
  n: number;
  pre: string; // prefijo de ids: w, b, i, v
  label: string; // "para *escribir*"
  name: string;
  nameSize: number;
  caption3: string;
  pill: string;
  dark: boolean;
  photo: string;
  Mock: React.FC<MockProps>;
}> = ({ from, n, pre, label, name, nameSize, caption3, pill, dark, photo, Mock }) => {
  const frame = useCurrentFrame();
  const p1 = startF(pre + "1");
  const p2 = startF(pre + "2");
  const p3 = startF(pre + "3");
  const e3 = endF(pre + "3");
  const fg = C.white; // sobre la foto siempre es claro
  const photoOut = lerp(frame, p3 - 4, p3 + 6, 1, 0);
  const num = pop(frame, p1 - 2, 14);
  const letters = name.split("");
  const ordinal = ["la primera", "la segunda", "la tercera", "y la cuarta"][n - 1];
  return (
    <Bg dark={dark} from={from}>
      {photoOut > 0 && (
        <div style={{ position: "absolute", inset: 0, opacity: photoOut, filter: `blur(${(1 - photoOut) * 20}px)` }}>
          <Photo name={photo} from={from} dur={p3 - from} overlay={DARK_OVERLAY} />
        </div>
      )}
      {/* Número grande */}
      {frame < p2 + 6 && (
        <div style={{ position: "absolute", top: 640, left: 0, right: 80, textAlign: "center", ...(frame >= p2 - 2 ? blurOut(frame, p2 - 2) : {}) }}>
          <div
            style={{
              fontFamily: display,
              fontSize: 560,
              lineHeight: 1,
              color: C.blue,
              transform: `scale(${0.6 + 0.4 * num}) translateY(${(1 - num) * 120}px)`,
              opacity: Math.min(1, num * 2),
              filter: `blur(${Math.max(0, 1 - num * 1.4) * 16}px)`,
              textShadow: "0 0 80px rgba(37,99,235,0.6)",
            }}
          >
            0{n}
          </div>
        </div>
      )}
      <Caption id={pre + "1"} text={`${ordinal} | ${label}`} dark y={430} size={70} hideAt={p2 - 1} />

      {/* Nombre de la herramienta */}
      {frame >= p2 - 3 && frame < p3 + 8 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...(frame >= p3 - 2 ? blurOut(frame, p3 - 2, 7) : {}),
          }}
        >
          <div style={{ fontFamily: display, fontSize: nameSize, color: fg, display: "flex", letterSpacing: 2 }}>
            {letters.map((ch, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  whiteSpace: "pre",
                  ...blurIn(frame, p2 - 3 + i * 1.5, 8, 70),
                  color: i === 0 ? C.blue : fg,
                  textShadow: "0 0 40px rgba(37,99,235,0.6)",
                }}
              >
                {ch}
              </span>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              top: 1180,
              width: lerp(frame, p2 + 4, p2 + 16, 0, 420),
              height: 8,
              borderRadius: 4,
              background: C.blue,
              boxShadow: `0 0 24px ${C.blue}`,
            }}
          />
        </div>
      )}

      <Pill text={pill} dark={dark} at={p3 - 2} />
      <Caption id={pre + "3"} text={caption3} dark={dark} y={400} size={64} />
      {frame >= p3 - 4 && <Mock frame={frame} t0={p3} t1={e3} dark={dark} />}
    </Bg>
  );
};
