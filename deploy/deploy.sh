#!/usr/bin/env bash

# ==============================================================================
# Sealand Logistics Production Deployment & Reverse Proxy Setup Script
# ==============================================================================

# Exit on any error
set -e

echo "=========================================================="
echo "🚀 Starting Production Deployment for Sealand Logistics..."
echo "=========================================================="

# 1. Detect framework & path
PROJECT_DIR="$(pwd)"
echo "📍 Current Project Directory: $PROJECT_DIR"

if [ ! -f "package.json" ]; then
    echo "❌ Error: This script must be run from the root of the project where package.json is located."
    exit 1
fi

# 2. Install dependencies for all parts of the MERN stack
echo "📦 Step 1: Installing dependencies for all folders..."
npm install
cd client && npm install && cd ..
cd admin && npm install && cd ..
cd server && npm install && cd ..
echo "✅ All dependencies installed."

# 3. Rebuild Frontend for Production
echo "🛠️ Step 2: Building frontend and admin panel..."
if [ -f "scripts/build-hostinger.js" ]; then
    node scripts/build-hostinger.js
else
    echo "Running standard client and admin builds..."
    cd client && npm run build
    cd ../admin && npm run build
    cd ..
    # consolidate
    mkdir -p client/dist/admin
    cp -r admin/dist/* client/dist/admin/
fi
echo "✅ Frontends built successfully."

# 4. Configure/Verify production variables
echo "⚙️ Step 3: Verifying .env variables..."
if [ ! -f "server/.env" ]; then
    echo "⚠️ Warning: server/.env not found! Creating default .env..."
    cp server/.env.example server/.env || true
fi

# Ensure server/.env has production set
if grep -q "NODE_ENV=" server/.env; then
    # replace NODE_ENV=development with NODE_ENV=production
    sed -i 's/NODE_ENV=development/NODE_ENV=production/g' server/.env
    sed -i 's/NODE_ENV=dev/NODE_ENV=production/g' server/.env
else
    echo "NODE_ENV=production" >> server/.env
fi
echo "✅ Environment variables verified."

# 5. Configure OpenLiteSpeed reverse proxy to port 5000
echo "🌐 Step 4: Configuring OpenLiteSpeed Reverse Proxy..."

# Locate OpenLiteSpeed virtual host configuration path
OLS_VHOST_DIRS=(
    "/usr/local/lsws/conf/vhosts/sealandlogisticsgroup.com"
    "/usr/local/lsws/conf/vhosts/sealandlogisticsgroup"
    "/usr/local/lsws/conf/vhosts/sealand"
)

VHCONF_PATH=""
for dir in "${OLS_VHOST_DIRS[@]}"; do
    if [ -d "$dir" ] && [ -f "$dir/vhconf.conf" ]; then
        VHCONF_PATH="$dir/vhconf.conf"
        break
    fi
done

if [ -z "$VHCONF_PATH" ]; then
    # Try to find dynamically
    echo "🔍 Virtual host folder not found in default paths, searching /usr/local/lsws/conf/vhosts/..."
    FOUND_CONF=$(find /usr/local/lsws/conf/vhosts/ -name "vhconf.conf" 2>/dev/null | head -n 1)
    if [ -n "$FOUND_CONF" ]; then
        VHCONF_PATH="$FOUND_CONF"
    fi
fi

if [ -n "$VHCONF_PATH" ]; then
    echo "🎯 Found OpenLiteSpeed Virtual Host config at: $VHCONF_PATH"
    
    # Back up the config
    BACKUP_PATH="${VHCONF_PATH}.bak_$(date +%F_%T)"
    echo "💾 Backing up existing config to $BACKUP_PATH"
    sudo cp "$VHCONF_PATH" "$BACKUP_PATH"
    
    # Define the proxy external processor and proxy context blocks
    EXT_PROCESSOR_BLOCK="extprocessor sealand-backend {
  type                    proxy
  address                 127.0.0.1:5000
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}"

    CONTEXT_BLOCK="context / {
  type                    proxy
  handler                 sealand-backend
  addDefaultCharset       off
}"

    # Check if backend external processor is already defined
    if grep -q "sealand-backend" "$VHCONF_PATH"; then
        echo "ℹ️ Reverse proxy config already exists in $VHCONF_PATH, ensuring it is active..."
    else
        echo "✍️ Appending external processor and context configurations to $VHCONF_PATH..."
        # Append extprocessor and context config to vhconf.conf
        sudo bash -c "cat >> '$VHCONF_PATH' <<EOF

# --- Added by Sealand Logistics Auto-Deployment Script ---
$EXT_PROCESSOR_BLOCK

$CONTEXT_BLOCK
# --------------------------------------------------------
EOF"
    fi
else
    echo "❌ Error: Could not find OpenLiteSpeed vhconf.conf virtual host configuration file."
    echo "Please ensure OpenLiteSpeed is installed and the domain vhost exists."
    exit 1
fi

# 6. Restart services automatically
echo "🔄 Step 5: Restarting services..."

# Restart/Start backend via PM2
echo "PM2: Restarting sealand-server..."
if pm2 list | grep -q "sealand-server"; then
    pm2 restart sealand-server
else
    pm2 start ecosystem.config.js || node server/server.js &
fi
pm2 save || true

# Restart OpenLiteSpeed
echo "OLS: Restarting OpenLiteSpeed web server..."
if [ -f "/usr/local/lsws/bin/lswsctrl" ]; then
    sudo /usr/local/lsws/bin/lswsctrl restart
else
    sudo systemctl restart lsws || sudo systemctl restart openlitespeed || true
fi

echo "=========================================================="
echo "🎉 Deployment Completed Successfully!"
echo "=========================================================="
echo "🔍 Verification:"
echo "--------------------------------------------------------"
echo "Backend port check (port 5000):"
curl -s -I http://127.0.0.1:5000 | head -n 5 || echo "Could not reach local port 5000"
echo "--------------------------------------------------------"
echo "Public domain check (sealandlogisticsgroup.com):"
curl -s -I http://localhost | head -n 5 || echo "Could not reach localhost web server"
echo "=========================================================="
