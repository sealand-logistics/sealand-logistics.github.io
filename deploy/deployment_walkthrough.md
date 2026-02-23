# Hostinger VPS Deployment Walkthrough

To deploy your MERN stack application (Website, Admin Panel, and Backend) to a Hostinger VPS, follow these steps.

## Phase 1: VPS Initialization

Connect to your VPS via SSH (using Terminal or PuTTY):
```bash
ssh root@YOUR_VPS_IP
```

### 1. Update and Install Dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl
```

### 2. Install Node.js & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

---

## Phase 2: Deploy Code

### 1. Get the Project
Move to your web directory and clone the repo:
```bash
mkdir -p /var/www/sealand
cd /var/www/sealand
git clone https://github.com/sealand-logistics/sealand-logistics.github.io.git .
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Configure Environment Variables
Create the server's `.env` file:
```bash
nano server/.env
```
Paste your production variables (copy from your local `server/.env`). Ensure `NODE_ENV=production` and `MONGODB_URI` is correct.

---

## Phase 3: Build & Start Services

### 1. Build Frontends
Run the specialized build script I created for Hostinger:
```bash
npm run build:hostinger
```
*This generates a single `client/dist` folder containing both the Website and the Admin panel.*

### 2. Start Backend with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Phase 4: Nginx Configuration

### 1. Create Config File
```bash
sudo nano /etc/nginx/sites-available/sealand
```
Paste the contents of the `deploy/nginx.conf` file I created in your project. **Note:** Update the `server_name` to your actual domain.

### 2. Enable Site and Restart
```bash
sudo ln -s /etc/nginx/sites-available/sealand /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Phase 5: SSL (HTTPS) - Optional but Recommended
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Maintenance Commands
- **Check Server Logs**: `pm2 logs`
- **Restart Server**: `pm2 restart sealand-server`
- **Rebuild Frontend**: `npm run build:hostinger` then `sudo systemctl restart nginx`
