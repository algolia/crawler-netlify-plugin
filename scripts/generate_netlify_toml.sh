#! /bin/bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

target="../netlify.toml"

# Common content
common='
# This file is generated by scripts/generate_netlify_toml.sh
# DO NOT MODIFY, MODIFY THE GENERATING SCRIPT
'

# Dev only
dev_only='
[[plugins]]
package = "./plugin/dist/index.js"
'

# Prod only
prod_only='
[[plugins]]
package = "crawler-netlify-plugin"
'

echo "$common" > "$target"
if [ "$NODE_ENV" = "development" ]; then
  echo "$dev_only" >> "$target"
else
  echo "$prod_only" >> "$target"
fi
