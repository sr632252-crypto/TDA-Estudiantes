import React from "react";
import { useCurrentFrame } from "remotion";
import { Bg, Caption, Logo } from "../components/Base";
import { C, display, body } from "../theme";
import { blurIn, lerp, pop } from "../anim";
import { startF, parseWords } from "../timing";

const B3 = "sin palabras *complicadas*";
export const Brand: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const a = startF("brand1");
  const b2 = startF("brand2");
  const b3 = startF("brand3");
  const draw = lerp(frame, a - 2, a + 22, 0, 1);
  const name = "JAMES LARREA";
  const up = lerp(frame, b2 - 4, b2 + 8, 0, 1);
  const jargon = ["algoritmos", "tokens", "prompt engineering", "redes neuronales"];
  const comp = parseWords("brand3", B3).find((w) => w.text === "complicadas")!.at;
  return (
    <Bg dark from={from}>
      <Caption id="brand1" text="en" dark y={430} size={70} hideAt={b2 - 1} />
      <Caption id="brand2" text="te enseñamos a usar | la *inteligencia artificial*" dark y={430} size={66} hideAt={b3 - 1} />
      <Caption id="brand3" text={B3} dark y={430} size={70} />
      <div style={{ position: "absolute", top: 640 - up * 60, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 50, transform: `scale(${1 - up * 0.18})` }}>
        <div style={{ filter: `drop-shadow(0 0 ${30 * draw}px rgba(37,99,235,0.8))` }}>
          <Logo size={340} color={C.white} progress={draw} />
        </div>
        <div style={{ fontFamily: display, fontSize: 150, color: C.white, letterSpacing: 6, display: "flex" }}>
          {name.split("").map((ch, i) => (
            <span key={i} style={{ display: "inline-block", whiteSpace: "pre", ...blurIn(frame, a + 6 + i * 1.3, 8, 50) }}>{ch}</span>
          ))}
        </div>
      </div>
      {/* jerga tachada */}
      <div style={{ position: "absolute", top: 1330, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {jargon.map((j, i) => {
          const at = b3 + i * 3;
          if (frame < at) return null;
          const strike = lerp(frame, comp + i * 3, comp + i * 3 + 8, 0, 1);
          return (
            <div key={j} style={{ position: "relative", fontFamily: body, fontWeight: 600, fontSize: 48, color: `rgba(255,255,255,${0.75 - strike * 0.4})`, ...blurIn(frame, at, 7, 16) }}>
              {j}
              <div style={{ position: "absolute", left: -10, top: "54%", height: 5, borderRadius: 3, width: `calc(${strike * 100}% + ${strike * 20}px)`, background: C.blue, boxShadow: `0 0 14px ${C.blue}` }} />
            </div>
          );
        })}
        {frame >= comp + 18 && (
          <div style={{ marginTop: 20, fontFamily: display, fontSize: 90, color: C.blue, transform: `scale(${pop(frame, comp + 18, 9)})`, textShadow: "0 0 40px rgba(37,99,235,0.6)" }}>
            FÁCIL Y CLARO
          </div>
        )}
      </div>
    </Bg>
  );
};
