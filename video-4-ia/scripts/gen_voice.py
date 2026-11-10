# Genera la voz en off (Kokoro TTS, español) y los tiempos de cada frase.
import json, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
MODEL_DIR = sys.argv[1]
k = Kokoro(f"{MODEL_DIR}/kokoro-v1.0.onnx", f"{MODEL_DIR}/voices-v1.0.bin")
# (texto en pantalla, texto pronunciado, pausa después en s)
phrases = json.load(open("scripts/phrases.json"))
sr = 24000
out = [np.zeros(int(0.25*sr), dtype=np.float32)]
t = 0.25; timing = []
for p in phrases:
    s, sr = k.create(p["say"], voice="em_alex", speed=1.12, lang="es")
    # recorta silencios de los bordes
    idx = np.where(np.abs(s) > 0.01)[0]
    s = s[max(idx[0]-240,0): idx[-1]+480]
    d = len(s)/sr
    timing.append({"id": p["id"], "start": round(t,3), "end": round(t+d,3)})
    out.append(s.astype(np.float32)); t += d
    gap = p.get("gap", 0.18)
    out.append(np.zeros(int(gap*sr), dtype=np.float32)); t += gap
audio = np.concatenate(out)
sf.write("public/voz.wav", audio, sr)
json.dump({"total": round(t+0.6,3), "phrases": timing}, open("src/timing.json","w"), indent=1)
print(round(t,2), "s")
