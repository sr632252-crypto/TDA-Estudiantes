import data from "./timing.json";
import { FPS } from "./theme";

export type Phrase = { id: string; start: number; end: number };
export const TOTAL = data.total;
export const ph = (id: string): Phrase => {
  const p = data.phrases.find((x) => x.id === id);
  if (!p) throw new Error("frase no encontrada: " + id);
  return p;
};
export const f = (s: number) => Math.round(s * FPS);
export const startF = (id: string) => f(ph(id).start);
export const endF = (id: string) => f(ph(id).end);

export type Word = { text: string; hi: boolean; chunk: number; at: number };

// "que te pueden | ayudar *días*" -> palabras con tiempo estimado (en frames)
export const parseWords = (id: string, text: string): Word[] => {
  const p = ph(id);
  const raw: { text: string; hi: boolean; chunk: number }[] = [];
  text.split("|").forEach((chunk, ci) => {
    // agrupa *frases resaltadas con espacios*
    const re = /\*([^*]+)\*|(\S+)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(chunk))) {
      if (m[1]) m[1].split(" ").forEach((w) => raw.push({ text: w, hi: true, chunk: ci }));
      else raw.push({ text: m[2], hi: false, chunk: ci });
    }
  });
  const weights = raw.map((w) => w.text.length + 2.5);
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  return raw.map((w, i) => {
    const at = p.start + ((acc) / total) * (p.end - p.start) - 0.06;
    acc += weights[i];
    return { ...w, at: f(at) };
  });
};
