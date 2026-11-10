import { Easing, interpolate, spring } from "remotion";
import { FPS } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const lerp = (frame: number, a: number, b: number, from: number, to: number, e = ease) =>
  interpolate(frame, [a, b], [from, to], { ...clamp, easing: e });

// entrada con desenfoque (motion blur) estilo del video de referencia
export const blurIn = (frame: number, at: number, dur = 8, dy = 26) => {
  const p = lerp(frame, at, at + dur, 0, 1);
  return {
    opacity: p,
    filter: `blur(${(1 - p) * 14}px)`,
    transform: `translateY(${(1 - p) * dy}px)`,
  };
};
export const blurOut = (frame: number, at: number, dur = 6) => {
  const p = lerp(frame, at, at + dur, 0, 1, Easing.in(Easing.cubic));
  return { opacity: 1 - p, filter: `blur(${p * 14}px)`, transform: `scale(${1 - p * 0.06})` };
};
export const pop = (frame: number, at: number, damping = 12) =>
  spring({ frame: frame - at, fps: FPS, config: { damping, stiffness: 180, mass: 0.7 } });
