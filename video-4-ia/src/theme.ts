import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const load = (family: string, file: string, weight = "400") =>
  loadFont({ family, url: staticFile(`fonts/${file}`), weight, format: "woff2" });
load("Anton", "anton.woff2");
load("Instrument Serif", "instrument-serif.woff2");
["500", "600", "700", "800"].forEach((w) => load("Manrope", `manrope-${w}.woff2`, w));

export const display = "Anton, sans-serif";
export const body = "Manrope, sans-serif";
export const serif = "'Instrument Serif', serif";

// Paleta de marca
export const C = {
  blue: "#2563EB",
  ink: "#111827",
  white: "#FFFFFF",
  gray: "#E5E7EB",
  ink2: "#1C2638",
  muted: "#6B7280",
};

export const FPS = 30;
export const W = 1080;
export const H = 1920;
