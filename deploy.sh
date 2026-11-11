#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/home/truncgil/web/filemangl.truncgil.com/repo"
PUBLIC_DIR="/home/truncgil/web/filemangl.truncgil.com/public_html"

echo "=== Pulling latest changes from GitHub ==="
git -C "$REPO_DIR" fetch origin main
git -C "$REPO_DIR" reset --hard origin/main

echo "=== Installing dependencies ==="
npm --prefix "$REPO_DIR" install

echo "=== Building project ==="
npm --prefix "$REPO_DIR" run build

echo "=== Deploying to public_html ==="
cp -r "$REPO_DIR"/dist/* "$PUBLIC_DIR"/

cat << 'HTACCESS' > "$PUBLIC_DIR"/.htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^api/ - [L]
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
HTACCESS

chown -R truncgil:www-data "$PUBLIC_DIR"
chown -R truncgil:truncgil "$REPO_DIR"

echo "=== Deployment finished successfully ==="
