import React from "react";
import { useCurrentFrame } from "remotion";
import { Bg, Caption, Icon, Logo } from "../components/Base";
import { C, display, body } from "../theme";
import { blurIn, blurOut, lerp, pop } from "../anim";
import { startF, endF, parseWords } from "../timing";

const T1 = "*guarda* este consejo";
const T2 = "y *comenta* | qué quieres *aprender*";
export const Cta: React.FC<{ from: number; outro: number }> = ({ from, outro }) => {
  const frame = useCurrentFrame();
  const c2 = startF("cta2");
  const save = parseWords("cta1", T1)[0].at + 2;
  const comment = parseWords("cta2", T2).find((w) => w.text === "comenta")!.at + 2;
  const learn = parseWords("cta2", T2).find((w) => w.text === "aprender")!.at;
  const phone = pop(frame, from, 16);
  const sv = pop(frame, save, 8);
  const cm = pop(frame, comment, 8);
  const msg = "Quiero aprender a crear videos con IA";
  const n = Math.round(lerp(frame, comment + 6, endF("cta2") + 6, 0, msg.length, (x) => x));
  const saved = frame >= save;
  const commented = frame >= comment;
  if (frame >= outro) {
    // cierre con logo
    const o = pop(frame, outro, 14);
    return (
      <Bg dark={false} from={outro}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 46 }}>
          <div style={{ transform: `scale(${0.6 + 0.4 * o})`, opacity: Math.min(1, o * 1.5) }}>
            <Logo size={300} color={C.blue} progress={lerp(frame, outro, outro + 20, 0, 1)} />
          </div>
          <div style={{ fontFamily: display, fontSize: 130, color: C.ink, letterSpacing: 5, ...blurIn(frame, outro + 8, 10, 40) }}>JAMES LARREA</div>
          <div style={{ fontFamily: body, fontWeight: 600, fontSize: 44, color: C.muted, ...blurIn(frame, outro + 14, 10, 20) }}>
            Sígueme para aprender <span style={{ color: C.blue, fontWeight: 800 }}>IA fácil</span>
          </div>
        </div>
      </Bg>
    );
  }
  return (
    <Bg dark={false} from={from}>
      <Caption id="cta1" text={T1} dark={false} y={300} size={72} hideAt={c2 - 1} />
      <Caption id="cta2" text={T2} dark={false} y={300} size={72} />
      <div style={{ position: "absolute", top: 480, left: 250, width: 580, height: 1180, borderRadius: 70, border: `4px solid ${C.ink}`, background: C.white, transform: `translateY(${(1 - phone) * 300}px)`, opacity: Math.min(1, phone * 1.5), overflow: "hidden", boxShadow: "0 50px 120px rgba(17,24,39,0.15)", ...(frame >= outro - 6 ? blurOut(frame, outro - 6) : {}) }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "40px 44px", fontFamily: body, fontWeight: 800, fontSize: 34, color: C.ink }}>
          <span>Reels</span>
          <div style={{ width: 36, height: 36, borderRadius: 10, border: `3px solid ${C.ink}` }} />
        </div>
        {/* contenido del reel */}
        <div style={{ margin: "0 40px", height: 640, borderRadius: 36, background: C.ink, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
            <span style={{ fontFamily: display, fontSize: 220, color: C.blue, lineHeight: 0.85 }}>4</span>
            <span style={{ fontFamily: display, fontSize: 120, color: C.white, lineHeight: 0.9 }}>IA</span>
          </div>
          <div style={{ fontFamily: body, color: "rgba(255,255,255,0.7)", fontWeight: 700, fontSize: 30, letterSpacing: 2 }}>PARA TODOS LOS DÍAS</div>
        </div>
        {/* acciones */}
        <div style={{ position: "absolute", right: 40, top: 360, display: "flex", flexDirection: "column", gap: 34, alignItems: "center" }}>
          <Icon name="heart" size={64} color={C.ink} sw={2} />
          <div style={{ transform: `scale(${commented ? 1 + 0.35 * Math.sin(Math.min(1, cm) * Math.PI) : 1})` }}>
            <Icon name="comment" size={64} color={commented ? C.blue : C.ink} fill={commented ? C.blue : "none"} sw={2} />
          </div>
          <Icon name="send" size={60} color={C.ink} sw={2} />
          <div style={{ transform: `scale(${saved ? 1 + 0.45 * Math.sin(Math.min(1, sv) * Math.PI) : 1})` }}>
            <Icon name="bookmark" size={64} color={saved ? C.blue : C.ink} fill={saved ? C.blue : "none"} sw={2} />
          </div>
        </div>
        {/* barra inferior */}
        <div style={{ position: "absolute", left: 40, bottom: 120, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Logo size={30} color={C.white} />
          </div>
          <div style={{ fontFamily: body, fontWeight: 800, fontSize: 30, color: C.ink }}>jameslarrea</div>
        </div>
        {/* comentario */}
        {commented && (
          <div style={{ position: "absolute", left: 30, right: 30, bottom: 26, padding: "22px 26px", borderRadius: 28, background: C.gray, fontFamily: body, fontWeight: 600, fontSize: 28, color: C.ink, ...blurIn(frame, comment + 2, 8, 40) }}>
            {msg.slice(0, n)}
            <span style={{ display: "inline-block", width: 3, height: 28, marginLeft: 3, background: C.blue, opacity: Math.floor(frame / 8) % 2 }} />
          </div>
        )}
      </div>
      {/* toast guardado */}
      {saved && frame < c2 + 4 && (
        <div style={{ position: "absolute", top: 1700, width: "100%", display: "flex", justifyContent: "center", ...(frame >= c2 - 4 ? blurOut(frame, c2 - 4) : {}) }}>
          <div style={{ transform: `scale(${sv})`, display: "flex", alignItems: "center", gap: 14, padding: "18px 34px", borderRadius: 999, background: C.blue, color: C.white, fontFamily: body, fontWeight: 800, fontSize: 36, boxShadow: "0 20px 60px rgba(37,99,235,0.35)" }}>
            <Icon name="check" size={40} color={C.white} sw={3} /> Guardado
          </div>
        </div>
      )}
      {frame >= learn && (
        <div style={{ position: "absolute", top: 1700, width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ transform: `scale(${pop(frame, learn, 10)})`, display: "flex", alignItems: "center", gap: 14, padding: "18px 34px", borderRadius: 999, background: C.ink, color: C.white, fontFamily: body, fontWeight: 800, fontSize: 36 }}>
            <Icon name="comment" size={36} color={C.white} sw={2.4} /> ¡Te leo en comentarios!
          </div>
        </div>
      )}
    </Bg>
  );
};
