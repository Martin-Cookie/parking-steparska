#!/bin/bash
# ============================================================================
#  Nahraje změny na GitHub. Vercel z něj web nasadí sám, do půl minuty.
#
#  Použití:
#     ./nahraj.sh "popis toho, co jste změnil"
#     ./nahraj.sh                     ← bez popisu, doplní se datum
# ============================================================================
set -e
cd "$(dirname "$0")"

POPIS="${1:-Úprava webu $(date '+%-d. %-m. %Y')}"

if [ -z "$(git status --porcelain)" ]; then
  echo "Není co nahrávat — ve složce nejsou žádné změny."
  exit 0
fi

echo "Měním se tyto soubory:"
git status --short
echo

git add -A
git commit -m "$POPIS"
git push

echo
echo "Nahráno. Vercel nasadí novou verzi do půl minuty."
echo "Zkontrolujte na https://www.parking-steparska.cz — nejlépe v anonymním okně."
