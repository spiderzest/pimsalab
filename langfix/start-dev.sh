#!/bin/bash
export PATH="$HOME/Library/Application Support/fnm/node-versions/v24.14.0/installation/bin:$PATH"
cd "$(dirname "$0")"
exec npm run dev
