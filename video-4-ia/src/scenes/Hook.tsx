import React from "react";
import { useCurrentFrame } from "remotion";
import { Bg, Caption, Icon, Photo, DARK_OVERLAY } from "../components/Base";
import { C, display, serif } from "../theme";
import { blurIn, lerp, pop } from "../anim";
import { startF, parseWords } from "../timing";

const ICONS = ["pen", "search", "image", "play"] as const;

export const Hook: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const a = startF("hook1");
  const four = pop(frame, a, 11);
  const iaAt = a + 11;
  const days = parseWords("hook2", "que te pueden ayudar | todos los *días*");
  const chipStart = days.find((w) => w.text === "todos")!.at;
  // ligera deriva de cámara
  const drift = lerp(frame, from, from + 110, 0, 1);
  return (
    <Bg dark from={from}>
      <Photo name="hook" from={from} dur={110} overlay={DARK_OVERLAY} />
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 0,
          right: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 26,
          transform: `scale(${1 + drift * 0.04})`,
        }}
      >
        <div
          style={{
            fontFamily: display,
            fontSize: 620,
            lineHeight: 0.82,
            color: C.blue,
            transform: `scale(${0.55 + 0.45 * four}) translateY(${(1 - four) * 60}px)`,
            opacity: Math.min(1, four * 2),
            filter: `blur(${Math.max(0, 1 - four * 1.4) * 18}px) drop-shadow(0 0 60px rgba(37,99,235,0.45))`,
          }}
        >
          4
        </div>
        <div
          style={{
            fontFamily: serif,
            fontSize: 330,
            lineHeight: 0.9,
            color: C.white,
            textShadow: "0 0 40px rgba(255,255,255,0.55), 0 0 90px rgba(37,99,235,0.8)",
            ...blurIn(frame, iaAt, 9, 40),
          }}
        >
          IA
        </div>
      </div>
      <Caption id="hook2" text="que te pueden ayudar | todos los *días*" dark y={1180} size={70} />
      <div style={{ position: "absolute", top: 1380, left: 0, right: 80, display: "flex", justifyContent: "center", gap: 30 }}>
        {ICONS.map((n, i) => {
          const s = pop(frame, chipStart + i * 4, 10);
          return (
            <div
              key={n}
              style={{
                width: 140,
                height: 140,
                borderRadius: 40,
                border: "2px solid rgba(255,255,255,0.18)",
                background: i === 0 ? C.blue : "rgba(17,24,39,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${s}) rotate(${(1 - s) * -20}deg)`,
                opacity: Math.min(1, s * 1.5),
                boxShadow: i === 0 ? "0 0 50px rgba(37,99,235,0.6)" : "none",
              }}
            >
              <Icon name={n} size={74} color={C.white} sw={1.8} />
            </div>
          );
        })}
      </div>
    </Bg>
  );
};
