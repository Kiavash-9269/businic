# DEPLOYMENT — Businic Production Guide

راهنمای deploy واقعی Frontend + Backend برای محیط Production.

---

## معماری پیشنهادی

```text
User
  ↓ HTTPS
CDN / Nginx / Cloudflare
  ↓
Static Frontend (dist/)
  +
Reverse Proxy → NestJS API (:PORT)
  ↓
SMTP Provider
```

Database استفاده **نمی‌شود**.

---

## ۱. Environment Matrix

### Frontend (build-time)

| Variable | Development | Production |
|----------|-------------|------------|
| `VITE_API_BASE_URL` | خالی (Vite proxy) | خالی اگر same-origin؛ یا `https://api.domain.com` |

فایل نمونه: [`.env.production.example`](.env.production.example)

### Backend (runtime)

| Variable | Required | Notes |
|----------|----------|-------|
| `NODE_ENV` | Yes | `production` |
| `PORT` | Yes | مثلاً `3001` |
| `FRONTEND_ORIGIN` | Yes | HTTPS domain(s)، comma-separated |
| `TRUST_PROXY` | Recommended | `1` پشت Nginx/Cloudflare |
| `MAIL_HOST` | Yes | SMTP واقعی |
| `MAIL_PORT` | Yes | معمولاً `587` یا `465` |
| `MAIL_USER` | Yes (prod) | |
| `MAIL_PASSWORD` | Yes (prod) | |
| `MAIL_FROM` | Yes | sender تأیید‌شده |
| `CONTACT_EMAIL` | Yes | inbox تیم |
| `THROTTLE_TTL_MS` | Optional | default `60000` |
| `THROTTLE_LIMIT` | Optional | default `5` |

فایل نمونه: [`server/.env.production.example`](server/.env.production.example)

### قوانین Production (startup validation)

Backend در `NODE_ENV=production` اجرا نمی‌شود اگر:

- `FRONTEND_ORIGIN` شامل `localhost` باشد
- origin بدون `https://` باشد
- `MAIL_USER` / `MAIL_PASSWORD` خالی باشد
- مقادیر placeholder مثل `example.com` باقی مانده باشد

---

## ۲. Frontend Deploy

### Install & Build

```powershell
npm ci
npm run build
```

خروجی: `dist/`

### API URL

**Same-origin (پیشنهادی):** Nginx هم static و هم `/api` را proxy کند → `VITE_API_BASE_URL` خالی بماند.

**Split hosting:** قبل از build:

```powershell
$env:VITE_API_BASE_URL="https://api.yourdomain.com"
npm run build
```

### Deploy

`dist/` را روی CDN/static host قرار دهید:

- Netlify / Vercel / Cloudflare Pages
- Nginx static root
- S3 + CloudFront

### Cache Policy (CDN/Web Server)

| Asset | Cache |
|-------|-------|
| `index.html` | no-cache یا کوتاه |
| `/assets/*` (hashed) | long-cache (1y) |

Security headers (CSP, HSTS) مسئولیت CDN/Web Server است.

---

## ۳. Backend Deploy

### Install & Build

```powershell
cd server
npm ci
npm run build
cd ..
```

خروجی: `server/dist/`

### Environment

```powershell
Copy-Item server\.env.production.example server\.env
# server/.env را با مقادیر واقعی پر کنید
```

### Run (direct)

```powershell
cd server
npm run start:prod
```

### Run (PM2 — پیشنهادی)

```powershell
npm install -g pm2
mkdir logs
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

PM2 بعد از crash/restart، process را دوباره بالا می‌آورد.

---

## ۴. Nginx Reverse Proxy (نمونه)

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL certificates (Let's Encrypt / Cloudflare)

    root /var/www/businic/dist;
    index index.html;

    # Security headers (نمونه)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /health {
        proxy_pass http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Backend `.env`:

```env
TRUST_PROXY=1
FRONTEND_ORIGIN=https://yourdomain.com
```

---

## ۵. HTTPS

- Frontend و API باید از HTTPS سرو شوند
- Mixed Content مجاز نیست (`http` API از `https` site)
- SSL termination معمولاً در Nginx/Cloudflare انجام می‌شود
- `FRONTEND_ORIGIN` فقط `https://` در production

---

## ۶. Health Check

```http
GET /health
```

Response:

```json
{ "status": "ok", "uptime": 1234 }
```

- secret یا infrastructure داخلی expose نمی‌شود
- rate limit اعمال نمی‌شود
- برای uptime monitoring مناسب است

---

## ۷. Security Checklist

### Backend

- [x] Helmet
- [x] CORS محدود به `FRONTEND_ORIGIN`
- [x] Rate limiting
- [x] Validation + safe errors
- [x] Secrets فقط در `.env`
- [x] Trust proxy (با `TRUST_PROXY=1`)
- [x] Production env validation

### Frontend

- [x] بدون API secret
- [x] بدون token
- [x] env فقط `VITE_*` (build-time public)

### Git

- [x] `.env` در `.gitignore`
- [ ] قبل از deploy: `git status` — هیچ secret commit نشده باشد

---

## ۸. Email Production

SMTP variables در `server/.env`. چک‌لیست DNS:

- SPF
- DKIM
- DMARC
- Sender verification

جزئیات: [`server/PRODUCTION_EMAIL.md`](server/PRODUCTION_EMAIL.md)

---

## ⑨. Logging

### Server logs (مجاز)

- Application started
- Contact email requested
- Email send success / failed
- HTTP access log (production)
- Stack trace فقط در server log (نه client)

### ممنوع در log

- SMTP password
- credentials
- secrets

---

## ۱۰. Smoke Test (Post-Deploy)

### Frontend

- [ ] Site loads over HTTPS
- [ ] Assets load (`/logo.png`, CSS, JS)
- [ ] Navigation works
- [ ] FA/EN toggle works
- [ ] Contact wizard submits

### Backend

```powershell
curl https://yourdomain.com/health
curl -X POST https://yourdomain.com/api/contact -H "Content-Type: application/json" -d "{...}"
```

### Email

- [ ] Email received at `CONTACT_EMAIL`
- [ ] Reply-To = customer email
- [ ] HTML renders in Gmail/Outlook

---

## ۱۱. Backup & Recovery

| Item | Action |
|------|--------|
| Database | Not needed (no DB) |
| Secrets | Store in password manager / host env |
| Frontend | Keep previous `dist/` backup |
| Backend | Keep previous `server/dist/` + `.env` backup |
| PM2 | `pm2 save` after config changes |

### Rollback

1. Restore previous `dist/` (frontend)
2. Restore previous `server/dist/` (backend)
3. Restore previous `server/.env` if env changed
4. `pm2 restart businic-api`

---

## ۱۲. Scripts Reference

| Command | Purpose |
|---------|---------|
| `npm run build` | Frontend production build |
| `npm run build:server` | Backend compile |
| `npm run build:all` | Both builds |
| `npm run start:prod` | Run backend from `server/dist` |
| `npm run test:server` | Backend tests |
| `pm2 start ecosystem.config.cjs` | PM2 process manager |

---

## ۱۳. Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error | `FRONTEND_ORIGIN` must match exact site URL (https) |
| Rate limit hits all users | Set `TRUST_PROXY=1` behind reverse proxy |
| Contact 500 | Check SMTP credentials and sender verification |
| API 404 from frontend | Set `VITE_API_BASE_URL` at build OR configure `/api` proxy |
| Startup fails | Read validation error — missing/invalid env |

---

## ۱۴. Related Docs

- [GETTING_STARTED.md](GETTING_STARTED.md) — local development
- [server/API.md](server/API.md) — Contact API contract
- [server/PRODUCTION_EMAIL.md](server/PRODUCTION_EMAIL.md) — email DNS checklist
