#!/bin/sh

echo "Detectando entorno gráfico..."

if [ -n "$DISPLAY" ]; then
  echo "X11 detectado: $DISPLAY"
  npm run electron:prod
elif [ -n "$WAYLAND_DISPLAY" ]; then
  echo "Wayland detectado: $WAYLAND_DISPLAY"
  npm run electron:prodWayland

else
  echo "No se detectó entorno gráfico compatible."
  exit 1
fi

