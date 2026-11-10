# Video: 4 IA que te pueden ayudar todos los días

Reel vertical (1080×1920, 30 fps, ~44 s) para James Larrea, hecho con Remotion.

- Paleta: Azul eléctrico `#2563EB`, Negro carbón `#111827`, Blanco `#FFFFFF`, Gris claro `#E5E7EB`.
- Video final: `out/4-IA-James-Larrea.mp4`

## Editar y volver a renderizar

```bash
npm i
npx remotion studio            # vista previa
npx remotion render CuatroIA out/4-IA-James-Larrea.mp4
```

- Textos en pantalla: `src/scenes/copy.ts` y cada escena en `src/scenes/`.
- Voz en off: `scripts/phrases.json` → `python3 scripts/gen_voice.py <carpeta-modelo-kokoro>`
  (regenera `public/voz.wav` y `src/timing.json`; las animaciones se sincronizan solas).
- Música y efectos: `python3 scripts/gen_music.py`.
