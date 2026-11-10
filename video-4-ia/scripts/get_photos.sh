#!/bin/bash
# Descarga las fotos (Wikimedia Commons, licencias libres) y las reduce a 1600 px.
set -u
OUT=public/img; TMP=${TMPDIR:-/tmp}/fotos; mkdir -p "$OUT" "$TMP"
while IFS='|' read key name; do
  [ -s "$OUT/$key.jpg" ] && { echo "$key ya existe"; continue; }
  f=$(echo "$name" | tr ' ' '_'); h=$(printf '%s' "$f" | md5sum | cut -c1-2)
  enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$f")
  url="https://upload.wikimedia.org/wikipedia/commons/${h:0:1}/$h/$enc"
  code=$(curl -sS -m 180 -o "$TMP/$key" -w '%{http_code}' "$url")
  echo "$key $code"
  [ "$code" = 200 ] && ffmpeg -v error -y -i "$TMP/$key" -vf "scale='min(1600,iw)':-2" -q:v 3 "$OUT/$key.jpg"
  sleep 15
done < scripts/photos.txt
