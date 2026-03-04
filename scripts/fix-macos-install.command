#!/bin/bash
# PimSalab — macOS Install Helper
# ดับเบิลคลิกไฟล์นี้เพื่อแก้ปัญหา "is damaged" บน macOS

clear
echo "================================================"
echo "  PimSalab — ตัวช่วยติดตั้ง macOS"
echo "================================================"
echo ""

FIXED=false

# Fix DMG files in Downloads
for dmg in ~/Downloads/PimSalab_*.dmg; do
  if [ -f "$dmg" ]; then
    echo "  Fixing: $(basename "$dmg")"
    xattr -cr "$dmg"
    FIXED=true
  fi
done

# Fix app if already in Applications
if [ -d "/Applications/PimSalab.app" ]; then
  echo "  Fixing: /Applications/PimSalab.app"
  xattr -cr /Applications/PimSalab.app
  FIXED=true
fi

echo ""

if [ "$FIXED" = true ]; then
  echo "  Done! PimSalab is ready to use."
  echo ""
  echo "  - If you have the .dmg: double-click it and drag to Applications"
  echo "  - If already installed: open PimSalab from Applications"
else
  echo "  No PimSalab files found in ~/Downloads or /Applications."
  echo "  Please download PimSalab first, then run this script again."
fi

echo ""
echo "  Press any key to close..."
read -n 1
