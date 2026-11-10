import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { Audio } from "@remotion/media";
import { Hook } from "./scenes/Hook";
import { Intro } from "./scenes/Intro";
import { ToolSection } from "./scenes/ToolSection";
import { ChatMock, SearchMock, ImageMock, VideoMock } from "./scenes/Mocks";
import { Brand } from "./scenes/Brand";
import { Cta } from "./scenes/Cta";
import { CAP } from "./scenes/copy";
import { startF, endF, f, TOTAL } from "./timing";

const LEAD = 4; // frames antes de la frase en que cambia la escena
export const OUTRO_F = endF("cta2") + 10;
export const DURATION = Math.max(f(TOTAL), OUTRO_F) + 60;

const TOOLS = [
  { pre: "w", n: 1, label: "para *escribir*", name: "ChatGPT", size: 250, pill: "01 · CHATGPT · ESCRIBIR", dark: true, Mock: ChatMock, cap: CAP.w3, photo: "escribir" },
  { pre: "b", n: 2, label: "para *buscar*", name: "Perplexity", size: 200, pill: "02 · PERPLEXITY · BUSCAR", dark: false, Mock: SearchMock, cap: CAP.b3, photo: "buscar" },
  { pre: "i", n: 3, label: "para *imágenes*", name: "Canva IA", size: 240, pill: "03 · CANVA IA · IMÁGENES", dark: true, Mock: ImageMock, cap: CAP.i3, photo: "imagenes" },
  { pre: "v", n: 4, label: "para *videos*", name: "CapCut", size: 260, pill: "04 · CAPCUT · VIDEOS", dark: false, Mock: VideoMock, cap: CAP.v3, photo: "videos" },
];

export const CUTS = [
  0,
  startF("intro") - LEAD,
  ...TOOLS.map((t) => startF(t.pre + "1") - LEAD),
  startF("brand1") - LEAD,
  startF("cta1") - LEAD,
  OUTRO_F,
];

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  let s = 0;
  CUTS.forEach((c, i) => {
    if (frame >= c && i < CUTS.length - 1) s = i;
  });
  const from = CUTS[s];
  let scene: React.ReactNode = null;
  if (s === 0) scene = <Hook from={from} />;
  else if (s === 1) scene = <Intro from={from} />;
  else if (s >= 2 && s <= 5) {
    const t = TOOLS[s - 2];
    scene = (
      <ToolSection from={from} n={t.n} pre={t.pre} label={t.label} name={t.name} nameSize={t.size} caption3={t.cap} pill={t.pill} dark={t.dark} photo={t.photo} Mock={t.Mock} />
    );
  } else if (s === 6) scene = <Brand from={from} />;
  else scene = <Cta from={from} outro={OUTRO_F} />;
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      {scene}
      <Audio src={staticFile("voz.wav")} />
      <Audio
        src={staticFile("musica.wav")}
        volume={(fr) => interpolate(fr, [0, 10, DURATION - 40, DURATION], [0, 0.11, 0.11, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      {CUTS.slice(1).map((c) => (
        <Sequence key={c} from={c - 3} durationInFrames={20} layout="none">
          <Audio src={staticFile("whoosh.wav")} volume={0.32} />
        </Sequence>
      ))}
      {TOOLS.map((t) => (
        <Sequence key={t.pre} from={startF(t.pre + "2") - 2} durationInFrames={10} layout="none">
          <Audio src={staticFile("pop.wav")} volume={0.35} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
