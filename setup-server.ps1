# Hetzner Server Setup — Daniel's Portfolio Site
# Installs Node.js, Nginx, PM2, clones the repo, builds and starts the app.
# Run: .\setup-server.ps1

$server = "46.224.62.226"
$user   = "root"
$repo   = "https://github.com/danielkosztolanyi00/Spark.git"
$branch = "claude/portfolio-inquiry-site-3W3xt"
$appDir = "/var/www/spark"

Write-Host "`n=== Hetzner Server Setup ===" -ForegroundColor Cyan
Write-Host "Server : $server"
Write-Host "Repo   : $repo"
Write-Host "Branch : $branch`n"

function Run-Step {
    param([string]$label, [string]$cmd)
    Write-Host ">> $label..." -ForegroundColor Yellow
    ssh "$user@$server" $cmd
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FAILED: $label" -ForegroundColor Red
        exit 1
    }
    Write-Host "   done.`n" -ForegroundColor Green
}

# 1. Update system packages
Run-Step "Update apt" "apt-get update -y"

# 2. Install Node.js 20 LTS via NodeSource
Run-Step "Install Node.js 20" @"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs
"@

# 3. Install Nginx
Run-Step "Install Nginx" "apt-get install -y nginx"

# 4. Install PM2 globally
Run-Step "Install PM2" "npm install -g pm2"

# 5. Clone repo
Run-Step "Clone repo" @"
rm -rf $appDir &&
mkdir -p $appDir &&
git clone $repo $appDir &&
cd $appDir &&
git checkout $branch
"@

# 6. Install dependencies and build
Run-Step "npm install + build" @"
cd $appDir &&
npm install &&
npm run build
"@

# 7. Start app with PM2
Run-Step "Start app with PM2" @"
cd $appDir &&
pm2 delete spark 2>/dev/null || true &&
pm2 start npm --name spark -- start &&
pm2 save &&
pm2 startup systemd -u root --hp /root | tail -1 | bash
"@

# 8. Write Nginx config
Run-Step "Configure Nginx" @"
cat > /etc/nginx/sites-available/spark << 'NGINXEOF'
server {
    listen 80;
    server_name $server _;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINXEOF
"@

# 9. Enable the site and reload Nginx
Run-Step "Enable Nginx site" @"
rm -f /etc/nginx/sites-enabled/default &&
ln -sf /etc/nginx/sites-available/spark /etc/nginx/sites-enabled/spark &&
nginx -t &&
systemctl enable nginx &&
systemctl restart nginx
"@

# 10. Open firewall ports
Run-Step "Open firewall (ports 80 + 443)" @"
ufw allow OpenSSH &&
ufw allow 'Nginx Full' &&
ufw --force enable
"@

Write-Host "=== Setup complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Your site is live at: http://$server" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:"
Write-Host "  - Visit http://$server to confirm it works"
Write-Host "  - Point a domain at $server, then run the SSL script"
Write-Host ""
