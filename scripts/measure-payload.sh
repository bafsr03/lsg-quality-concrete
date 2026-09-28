#!/usr/bin/env bash
# Measure real first-load payload against a running production server.
#   pnpm build && pnpm start -p 4311 &
#   ./scripts/measure-payload.sh http://localhost:4311 /
set -euo pipefail
BASE="${1:-http://localhost:4311}"; PAGE="${2:-/}"
html=$(curl -s "$BASE$PAGE")
sum() { local t=0 s; for s in $(echo "$html" | grep -oE "/_next/static/[^\"]+\.$1" | sort -u); do
    t=$((t + $(curl -s -H 'Accept-Encoding: gzip' -o /dev/null -w '%{size_download}' "$BASE$s"))); done; echo "$t"; }
js=$(sum js); css=$(sum css); doc=$(echo "$html" | gzip -9 | wc -c | tr -d ' ')
printf "%s\n  HTML %6s B\n  CSS  %6s B\n  JS   %6s B\n  ---- %6s B total (%.1f KB)\n" \
  "$PAGE" "$doc" "$css" "$js" "$((doc+css+js))" "$(echo "scale=2; ($doc+$css+$js)/1024" | bc)"
