#!/usr/bin/env bash
set -euo pipefail

if [ -f package-lock.json ]; then
  echo "package-lock.json found. Use pnpm only."
  exit 1
fi
