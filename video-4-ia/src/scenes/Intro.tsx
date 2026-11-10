import React from "react";
import { useCurrentFrame } from "remotion";
import { Bg, Caption, Icon } from "../components/Base";
import { C, display, body } from "../theme";
import { pop, lerp } from "../anim";
import { parseWords } from "../timing";

const TEXT = "una para *escribir* | otra para *buscar* | otra para *imágenes* | y otra para *videos*";
const CARDS = [
  { icon: "pen", label: "ESCRIBIR", key: "escribir" },
  { icon: "search", label: "BUSCAR", key: "buscar" },
  { icon: "image", label: "IMÁGENES", key: "imágenes" },
  { icon: "play", label: "VIDEOS", key: "videos" },
] as const;

export const Intro: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const words = parseWords("intro", TEXT);
  const times = CARDS.map((c) => words.find((w) => w.text.startsWith(c.key.slice(0, 5)))!.at);
  let active = -1;
  times.forEach((t, i) => {
    if (frame >= t) active = i;
  });
  return (
    <Bg dark={false} from={from}>
      <Caption id="intro" text={TEXT} dark={false} y={380} size={66} />
      <div
        style={{
          position: "absolute",
          top: 600,
          left: 90,
          right: 90,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
      >
        {CARDS.map((c, i) => {
          const s = pop(frame, times[i] - 2, 13);
          const on = i === active;
          const glow = lerp(frame, times[i], times[i] + 8, 0, 1);
          return (
            <div
              key={c.label}
              style={{
                height: 440,
                borderRadius: 48,
                border: `3px solid ${on ? C.blue : C.ink}`,
                background: on ? C.white : "rgba(255,255,255,0.55)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 30,
                transform: `scale(${(0.7 + 0.3 * s) * (on ? 1.03 : 1)}) translateY(${(1 - s) * 80}px)`,
                opacity: Math.min(1, s * 1.6),
                filter: `blur(${Math.max(0, 1 - s * 1.3) * 12}px)`,
                boxShadow: on ? `0 30px 80px rgba(37,99,235,${0.28 * glow})` : "0 10px 30px rgba(17,24,39,0.06)",
              }}
            >
              <div style={{ fontFamily: body, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3 }}>
                0{i + 1}
              </div>
              <Icon name={c.icon} size={150} color={on ? C.blue : C.ink} sw={1.6} />
              <div style={{ fontFamily: display, fontSize: 70, color: on ? C.blue : C.ink, letterSpacing: 1 }}>
                {c.label}
              </div>
            </div>
          );
        })}
      </div>
    </Bg>
  );
};
