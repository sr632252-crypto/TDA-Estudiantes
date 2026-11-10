# Voz en off natural con Chatterbox Multilingual (licencia MIT), en español.
# Uso: python gen_voice_cb.py <ref_es.wav>
# Genera public/voz.wav y src/timing.json (las animaciones se sincronizan solas).
import json, sys, numpy as np, torch, soundfile as sf
torch.set_num_threads(4)
torch.manual_seed(7)
from chatterbox.mtl_tts import ChatterboxMultilingualTTS

REF = sys.argv[1]
m = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
sr = m.sr
phrases = json.load(open("scripts/phrases.json"))

def trim(x):
    idx = np.where(np.abs(x) > 0.012)[0]
    return x[max(idx[0] - int(0.01 * sr), 0): idx[-1] + int(0.04 * sr)] if len(idx) else x

out = [np.zeros(int(0.25 * sr), dtype=np.float32)]
t = 0.25; timing = []
for p in phrases:
    w = m.generate(p["say"], language_id="es", audio_prompt_path=REF,
                   exaggeration=0.6, cfg_weight=0.45, temperature=0.7)
    s = trim(w.squeeze(0).cpu().numpy().astype(np.float32))
    d = len(s) / sr
    timing.append({"id": p["id"], "start": round(t, 3), "end": round(t + d, 3)})
    out.append(s); t += d
    gap = p.get("gap", 0.18)
    out.append(np.zeros(int(gap * sr), dtype=np.float32)); t += gap
    print(p["id"], round(d, 2), flush=True)
audio = np.concatenate(out)
audio = audio / max(1e-6, np.max(np.abs(audio))) * 0.89
sf.write("public/voz.wav", audio, sr)
json.dump({"total": round(t + 0.6, 3), "phrases": timing}, open("src/timing.json", "w"), indent=1)
print("TOTAL", round(t, 2))
