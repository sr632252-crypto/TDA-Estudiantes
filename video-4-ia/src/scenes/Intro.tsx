import React from "react";
import { useCurrentFrame } from "remotion";
import { Bg, Caption, Icon } from "../components/Base";
import { Img, staticFile } from "remotion";
import { C, display, body } from "../theme";
import { pop, lerp } from "../anim";
import { parseWords } from "../timing";

const TEXT = "una para *escribir* | otra para *buscar* | otra para *imágenes* | y otra para *videos*";
const CARDS = [
  { icon: "pen", label: "ESCRIBIR", key: "escribir", img: "escribir" },
  { icon: "search", label: "BUSCAR", key: "buscar", img: "buscar" },
  { icon: "image", label: "IMÁGENES", key: "imágenes", img: "imagenes" },
  { icon: "play", label: "VIDEOS", key: "videos", img: "videos" },
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
          top: 560,
          left: 70,
          right: 150,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
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
                height: 420,
                position: "relative",
                overflow: "hidden",
                borderRadius: 48,
                border: `3px solid ${on ? C.blue : C.ink}`,
                background: on ? C.white : "rgba(255,255,255,0.55)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingBottom: 34,
                gap: 14,
                transform: `scale(${(0.7 + 0.3 * s) * (on ? 1.03 : 1)}) translateY(${(1 - s) * 80}px)`,
                opacity: Math.min(1, s * 1.6),
                filter: `blur(${Math.max(0, 1 - s * 1.3) * 12}px)`,
                boxShadow: on ? `0 30px 80px rgba(37,99,235,${0.28 * glow})` : "0 10px 30px rgba(17,24,39,0.06)",
              }}
            >
              <Img src={staticFile(`img/${c.img}.jpg`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.15 - 0.1 * glow})`, filter: on ? "none" : "grayscale(0.6)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,24,39,0.05) 20%, rgba(17,24,39,0.88) 100%)" }} />
              <div style={{ position: "absolute", top: 24, left: 26, fontFamily: body, fontWeight: 800, fontSize: 28, color: C.white, letterSpacing: 3 }}>
                0{i + 1}
              </div>
              <div style={{ position: "relative", width: 96, height: 96, borderRadius: 30, background: on ? C.blue : "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={c.icon} size={58} color={C.white} sw={1.8} />
              </div>
              <div style={{ position: "relative", fontFamily: display, fontSize: 64, color: C.white, letterSpacing: 1 }}>
                {c.label}
              </div>
            </div>
          );
        })}
      </div>
    </Bg>
  );
};
