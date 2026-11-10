import React from "react";
import { C, body, display } from "../theme";
import { Icon } from "../components/Base";
import { blurIn, lerp, pop } from "../anim";
import { parseWords } from "../timing";
import { MockProps } from "./ToolSection";
import { CAP } from "./copy";

const wordAt = (id: string, text: string, w: string) =>
  parseWords(id, text).find((x) => x.text.toLowerCase().startsWith(w))!.at;

const typed = (text: string, frame: number, a: number, b: number) => {
  const n = Math.round(lerp(frame, a, b, 0, text.length, (x) => x));
  return text.slice(0, n);
};
const Caret: React.FC<{ frame: number; color: string }> = ({ frame, color }) => (
  <span style={{ display: "inline-block", width: 4, height: "1em", marginLeft: 4, verticalAlign: "-0.12em", background: color, opacity: Math.floor(frame / 8) % 2 ? 0 : 1 }} />
);

const Card: React.FC<{ frame: number; at: number; top: number; height: number; dark: boolean; children: React.ReactNode; width?: number }> = ({
  frame, at, top, height, dark, children, width = 900,
}) => {
  const s = pop(frame, at, 15);
  return (
    <div
      style={{
        position: "absolute", top, left: (1080 - width) / 2, width, height, borderRadius: 48,
        background: dark ? "#1A2336" : C.white,
        border: dark ? "2px solid rgba(255,255,255,0.12)" : `3px solid ${C.ink}`,
        boxShadow: dark ? "0 40px 120px rgba(0,0,0,0.45)" : "0 40px 100px rgba(17,24,39,0.12)",
        transform: `translateY(${(1 - s) * 160}px) scale(${0.92 + 0.08 * s})`,
        opacity: Math.min(1, s * 1.5), filter: `blur(${Math.max(0, 1 - s * 1.4) * 14}px)`,
        overflow: "hidden", fontFamily: body,
      }}
    >
      {children}
    </div>
  );
};

const Done: React.FC<{ frame: number; at: number; text: string; top: number; dark: boolean }> = ({ frame, at, text, top, dark }) => {
  const s = pop(frame, at, 10);
  if (frame < at) return null;
  return (
    <div style={{ position: "absolute", top, width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{
        transform: `scale(${s})`, display: "flex", alignItems: "center", gap: 14, padding: "18px 34px", borderRadius: 999,
        background: C.blue, color: C.white, fontFamily: body, fontWeight: 800, fontSize: 36,
        boxShadow: `0 20px 60px rgba(37,99,235,${dark ? 0.6 : 0.35})`,
      }}>
        <Icon name="check" size={40} color={C.white} sw={3} /> {text}
      </div>
    </div>
  );
};

// ---------- 1. Escribir: chat ----------
export const ChatMock: React.FC<MockProps> = ({ frame, t0, t1, dark }) => {
  const ask = "Escríbeme un correo para pedir una cita con el doctor.";
  const ans = "¡Hola, Dr. Ramírez! Quisiera agendar una cita para el martes por la mañana. Quedo atento a su confirmación. Saludos.";
  const idea = wordAt("w3", CAP.w3, "idea");
  const red = wordAt("w3", CAP.w3, "redacta");
  const seg = wordAt("w3", CAP.w3, "segundos");
  const fg = C.white;
  return (
    <>
      <Card frame={frame} at={t0 - 4} top={640} height={860} dark={dark}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "30px 40px", borderBottom: "2px solid rgba(255,255,255,0.08)" }}>
          {["#ef4444", "#f59e0b", "#22c55e"].map((c) => <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c, opacity: 0.8 }} />)}
          <div style={{ marginLeft: 20, color: "rgba(255,255,255,0.6)", fontWeight: 700, fontSize: 28 }}>ChatGPT · Nuevo chat</div>
        </div>
        <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 36 }}>
          <div style={{ alignSelf: "flex-end", maxWidth: 640, background: C.blue, color: fg, padding: "26px 32px", borderRadius: "34px 34px 8px 34px", fontSize: 36, fontWeight: 600, lineHeight: 1.3, ...blurIn(frame, t0, 6, 20) }}>
            {typed(ask, frame, t0 + 2, idea + 4)}
            {frame < idea + 6 && <Caret frame={frame} color={fg} />}
          </div>
          {frame >= idea + 6 && (
            <div style={{ display: "flex", gap: 22, ...blurIn(frame, idea + 6, 8, 20) }}>
              <div style={{ width: 70, height: 70, borderRadius: 35, background: "rgba(37,99,235,0.18)", border: `2px solid ${C.blue}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="spark" size={38} color={C.blue} fill={C.blue} sw={1.5} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.92)", fontSize: 38, lineHeight: 1.45, fontWeight: 500, paddingTop: 8 }}>
                {typed(ans, frame, red - 2, seg + 2)}
                {frame < seg + 4 && <Caret frame={frame} color={C.blue} />}
              </div>
            </div>
          )}
        </div>
      </Card>
      <Done frame={frame} at={seg + 2} text="Listo en 3 segundos" top={1580} dark={dark} />
      {void t1}
    </>
  );
};

// ---------- 2. Buscar ----------
export const SearchMock: React.FC<MockProps> = ({ frame, t0, dark }) => {
  const q = "¿Cómo ahorrar en el súper?";
  const qEnd = wordAt("b3", CAP.b3, "pregunta") + 6;
  const resp = wordAt("b3", CAP.b3, "responde");
  const src = wordAt("b3", CAP.b3, "fuentes");
  const lines = ["Haz una lista antes de salir de casa", "Compara el precio por kilo, no por paquete", "Prueba las marcas propias del súper"];
  return (
    <>
      <Card frame={frame} at={t0 - 4} top={620} height={140} dark={dark} width={920}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, height: "100%", padding: "0 40px", fontSize: 42, fontWeight: 700, color: C.ink }}>
          <Icon name="search" size={54} color={C.blue} sw={2.4} />
          {typed(q, frame, t0 + 2, qEnd)}
          {frame < qEnd + 4 && <Caret frame={frame} color={C.blue} />}
        </div>
      </Card>
      {frame >= resp - 4 && (
        <Card frame={frame} at={resp - 4} top={800} height={760} dark={dark} width={920}>
          <div style={{ padding: 44 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: display, fontSize: 52, color: C.ink, marginBottom: 26 }}>
              <Icon name="spark" size={44} color={C.blue} fill={C.blue} sw={1.5} /> RESPUESTA
            </div>
            {lines.map((l, i) => {
              const at = resp + i * 7;
              const lit = frame >= src + i * 4;
              return (
                <div key={i} style={{ display: "flex", gap: 18, alignItems: "baseline", fontSize: 38, lineHeight: 1.35, color: C.ink, fontWeight: 600, marginBottom: 22, ...blurIn(frame, at, 8, 16) }}>
                  <span style={{ color: C.blue, fontWeight: 800 }}>{i + 1}.</span>
                  <span>
                    {l}{" "}
                    <span style={{
                      display: "inline-block", fontSize: 24, fontWeight: 800, padding: "4px 12px", borderRadius: 10,
                      background: lit ? C.blue : C.gray, color: lit ? C.white : C.muted, transform: `scale(${lit ? 0.9 + 0.1 * pop(frame, src + i * 4) : 0.9})`,
                    }}>{i + 1}</span>
                  </span>
                </div>
              );
            })}
            <div style={{ display: "flex", gap: 18, marginTop: 34 }}>
              {["Fuente 1", "Fuente 2", "Fuente 3"].map((s, i) => {
                const sp = pop(frame, src + i * 4, 11);
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 24px", borderRadius: 999, border: `2px solid ${C.blue}`, color: C.blue, fontWeight: 800, fontSize: 28, transform: `scale(${sp})`, opacity: Math.min(1, sp * 1.5), background: "rgba(37,99,235,0.06)" }}>
                    <Icon name="globe" size={30} color={C.blue} sw={2.2} /> {s}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

// ---------- 3. Imágenes ----------
const City: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0B1530" />
        <stop offset="0.55" stopColor="#2563EB" />
        <stop offset="1" stopColor="#BFDBFE" />
      </linearGradient>
      <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.6" stopColor="#E0EAFF" />
        <stop offset="1" stopColor="#93C5FD" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="400" fill="url(#sky)" />
    {Array.from({ length: 28 }).map((_, i) => (
      <circle key={i} cx={(i * 97) % 400} cy={(i * 53) % 150} r={i % 3 === 0 ? 1.6 : 1} fill="#fff" opacity={0.7} />
    ))}
    <circle cx="200" cy="250" r="90" fill="url(#sun)" />
    {[
      [10, 200, 40], [55, 160, 35], [95, 230, 30], [130, 120, 45], [180, 180, 28], [212, 100, 40], [258, 170, 34], [296, 140, 42], [342, 210, 30], [372, 175, 40],
    ].map(([x, h, w], i) => (
      <g key={i}>
        <rect x={x} y={400 - h - 60} width={w} height={h + 60} fill="#111827" />
        {Array.from({ length: Math.floor(h / 22) }).map((_, j) => (
          <rect key={j} x={x + 6 + ((j * 7) % (w - 16))} y={400 - h - 50 + j * 22} width="6" height="8" fill="#93C5FD" opacity={(i + j) % 3 === 0 ? 0.9 : 0.25} />
        ))}
      </g>
    ))}
    <rect y="340" width="400" height="60" fill="#0B1530" opacity="0.85" />
  </svg>
);

export const ImageMock: React.FC<MockProps> = ({ frame, t0, dark }) => {
  const p = "Una ciudad futurista al atardecer, en tonos azules";
  const qEnd = wordAt("i3", CAP.i3, "quieres") + 8;
  const gen = wordAt("i3", CAP.i3, "imagen") - 6;
  const g = lerp(frame, gen, gen + 26, 0, 1);
  const scan = lerp(frame, gen, gen + 24, 0, 1, (x) => x);
  return (
    <>
      <Card frame={frame} at={t0 - 4} top={600} height={150} dark={dark} width={920}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, height: "100%", padding: "0 38px", fontSize: 34, fontWeight: 600, color: C.white, lineHeight: 1.25 }}>
          <Icon name="pen" size={46} color={C.blue} sw={2.2} />
          <div>
            {typed(p, frame, t0 + 2, qEnd)}
            {frame < qEnd + 4 && <Caret frame={frame} color={C.blue} />}
          </div>
        </div>
      </Card>
      {frame >= qEnd - 2 && (
        <Card frame={frame} at={qEnd - 2} top={790} height={820} dark={dark} width={820}>
          <div style={{ position: "absolute", inset: 0, filter: `blur(${(1 - g) * 40}px) saturate(${0.3 + 0.7 * g})`, opacity: 0.25 + 0.75 * g, transform: `scale(${1.15 - 0.15 * g})` }}>
            <City />
          </div>
          {g < 1 && (
            <>
              <div style={{ position: "absolute", left: 0, right: 0, top: `${scan * 100}%`, height: 6, background: C.white, boxShadow: `0 0 40px 10px ${C.blue}` }} />
              <div style={{ position: "absolute", bottom: 30, width: "100%", textAlign: "center", color: C.white, fontWeight: 800, fontSize: 32, letterSpacing: 3 }}>
                {frame < gen ? "PENSANDO..." : `CREANDO ${Math.round(g * 100)}%`}
              </div>
            </>
          )}
        </Card>
      )}
      <Done frame={frame} at={gen + 26} text="Imagen lista" top={1660} dark={dark} />
    </>
  );
};

// ---------- 4. Videos ----------
export const VideoMock: React.FC<MockProps> = ({ frame, t0, t1, dark }) => {
  const cut = wordAt("v3", CAP.v3, "corta");
  const edit = wordAt("v3", CAP.v3, "edita");
  const subs = wordAt("v3", CAP.v3, "subtítulos");
  const clic = wordAt("v3", CAP.v3, "clic");
  const gap = lerp(frame, cut + 6, cut + 14, 0, 26);
  const swap = lerp(frame, edit, edit + 10, 0, 1);
  const head = lerp(frame, t0, t1 + 15, 0, 1, (x) => x);
  const subWords = ["¡Así", "de", "fácil!"];
  const cursorP = lerp(frame, subs + 4, clic - 2, 0, 1);
  const pressed = frame >= clic && frame < clic + 6;
  const exported = frame >= clic + 2;
  return (
    <>
      {/* vista previa vertical */}
      <Card frame={frame} at={t0 - 4} top={590} height={700} dark={dark} width={420}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${C.blue}, #0B1530)` }} />
        <div style={{ position: "absolute", left: "50%", top: 250, width: 150, height: 150, marginLeft: -75, borderRadius: 75, background: "rgba(255,255,255,0.85)" }} />
        <div style={{ position: "absolute", left: "50%", top: 420, width: 280, height: 320, marginLeft: -140, borderRadius: "140px 140px 0 0", background: "rgba(255,255,255,0.85)" }} />
        {frame >= subs && (
          <div style={{ position: "absolute", bottom: 90, width: "100%", textAlign: "center" }}>
            {subWords.map((w, i) => (
              <span key={i} style={{ display: "inline-block", margin: "0 6px", fontFamily: display, fontSize: 64, color: i === 2 ? "#FDE047" : C.white, WebkitTextStroke: `2px ${C.ink}`, ...blurIn(frame, subs + i * 3, 6, 20) }}>{w}</span>
            ))}
          </div>
        )}
      </Card>
      {/* línea de tiempo */}
      <Card frame={frame} at={t0} top={1340} height={330} dark={dark} width={940}>
        <div style={{ padding: "30px 36px", position: "relative", height: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div style={{ fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted }}>CAPCUT · EDICIÓN</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 999, fontWeight: 800, fontSize: 26, background: exported ? C.blue : C.gray, color: exported ? C.white : C.ink, transform: `scale(${pressed ? 0.9 : 1})` }}>
              {exported && <Icon name="check" size={28} color={C.white} sw={3} />} {exported ? "Subtítulos listos" : "Subtítulos auto"}
            </div>
          </div>
          {/* pista de video */}
          <div style={{ position: "relative", height: 70, marginBottom: 14 }}>
            {[[0, 300], [300, 260], [560, 308]].map(([x, w], i) => {
              const dx = i === 0 ? 0 : gap * (i === 1 ? 1 : 1);
              const ox = i === 1 ? swap * 290 : i === 2 ? -swap * 260 : 0;
              return (
                <div key={i} style={{ position: "absolute", left: x + dx + ox, width: w - 8, height: 70, borderRadius: 14, background: i === 1 ? "#1D4ED8" : C.blue, border: `3px solid ${C.ink}`, display: "flex", alignItems: "center", paddingLeft: 16, color: C.white, fontWeight: 800, fontSize: 24 }}>
                  Clip {i + 1}
                </div>
              );
            })}
          </div>
          {/* pista de subtítulos */}
          <div style={{ position: "relative", height: 44, marginBottom: 14 }}>
            {frame >= subs && [0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ position: "absolute", left: i * 176, width: 160, height: 44, borderRadius: 10, background: "#FDE047", border: `2px solid ${C.ink}`, ...blurIn(frame, subs + i * 2, 6, 10) }} />
            ))}
          </div>
          {/* audio */}
          <div style={{ display: "flex", gap: 5, alignItems: "center", height: 40 }}>
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} style={{ width: 8, borderRadius: 4, height: 8 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)) * 32, background: "rgba(17,24,39,0.25)" }} />
            ))}
          </div>
          {/* cabezal */}
          <div style={{ position: "absolute", top: 96, bottom: 24, left: 36 + head * 860, width: 4, background: C.ink }} />
          {/* tijeras */}
          {frame >= cut - 2 && frame < cut + 20 && (
            <div style={{ position: "absolute", top: 70, left: 36 + 290, transform: `scale(${pop(frame, cut - 2)}) rotate(${lerp(frame, cut, cut + 10, -20, 10)}deg)` }}>
              <Icon name="scissors" size={70} color={C.ink} sw={2.4} />
            </div>
          )}
        </div>
      </Card>
      {/* cursor */}
      {frame >= subs + 2 && frame < clic + 18 && (
        <svg width="60" height="60" viewBox="0 0 24 24" style={{ position: "absolute", left: lerp(frame, subs, clic, 560, 890) - 0 * cursorP, top: lerp(frame, subs, clic, 1250, 1400), transform: `scale(${pressed ? 0.85 : 1})` }}>
          <path d="M4 3l15 7-6.5 2L9 19z" fill={C.ink} stroke={C.white} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );
};
