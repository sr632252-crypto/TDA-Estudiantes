#!/bin/bash
# Descarga las fotos de Unsplash (Licencia Unsplash: uso gratuito, comercial incluido).
set -eu
cd "$(dirname "$0")/../public/img"
P="w=1080&h=1920&fit=crop&crop=entropy"
dl(){ curl -sS -m 60 -o "$1.jpg" "https://images.unsplash.com/photo-$2?$3&q=82&fm=jpg"; echo "$1 ok"; }
dl hook     1563986768609-322da13575f3 "$P"
dl escribir 1515378791036-0648a3ef77b2 "$P"
dl buscar   1516321318423-f06f85e504b3 "$P"
dl imagenes 1593642632559-0c6d3fc62b89 "$P"
dl videos   1526498460520-4c246339dccb "$P"
dl marca    1522202176988-66273c2fd55f "$P"
dl ciudad   1477959858617-67f85cf4f1df "w=1200&h=1200&fit=crop"
dl vlog     1494790108377-be9c29b29330 "w=800&h=1300&fit=crop&crop=faces"
dl cta      1573496359142-b8d87734a5a2 "w=900&h=1000&fit=crop&crop=faces"
dl avatar   1544717305-2782549b5136   "w=200&h=200&fit=crop&crop=faces"
