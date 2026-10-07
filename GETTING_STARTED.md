# راهنمای شروع کار — Businic

این سند مراحل لازم برای راه‌اندازی و شروع توسعه پروژه **Businic** را توضیح می‌دهد.

---

## پیش‌نیازها


| ابزار   | نسخه پیشنهادی |
| ------- | ------------- |
| Node.js | 20 یا بالاتر  |
| npm     | 10 یا بالاتر  |


بررسی نسخه‌ها:

```powershell
node -v
npm -v
```

---

## 1. دریافت پروژه

اگر پروژه را clone کرده‌اید، وارد پوشه آن شوید:

```powershell
cd "C:\Users\Pardis\Desktop\GitHub Projects\businic"
```

---

## 2. نصب وابستگی‌ها

### Frontend

```powershell
npm install
```

### Backend (NestJS)

```powershell
cd server
npm install
cd ..
```

---

## 3. تنظیم Environment



### Backend — `server/.env`

فایل نمونه را کپی کنید:

```powershell
Copy-Item server\.env.example server\.env
```

سپس `server/.env` را ویرایش کنید:

```env
NODE_ENV=development
PORT=3001
FRONTEND_ORIGIN=http://localhost:5173

MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your-smtp-user
MAIL_PASSWORD=your-smtp-password
MAIL_FROM=noreply@yourdomain.com

CONTACT_EMAIL=team@yourdomain.com

THROTTLE_TTL_MS=60000
THROTTLE_LIMIT=5
```

> **مهم:** مقادیر واقعی SMTP را فقط در `.env` قرار دهید. این فایل commit نشود.



### Frontend — `.env` (اختیاری)

برای development معمولاً نیازی نیست. Vite به‌صورت خودکار `/api` را به backend پروکسی می‌کند.

اگر frontend و backend روی host/port جدا هستند:

```powershell
Copy-Item .env.example .env
```

```env
VITE_API_BASE_URL=http://localhost:3001
```

---



## 4. اجرای Development

دو ترمینال جدا باز کنید:

### ترمینال ۱ — Backend

```powershell
npm run dev:server
```

Backend روی `http://localhost:3001` اجرا می‌شود.

Health check:

```text
GET http://localhost:3001/health
```



### ترمینال ۲ — Frontend

```powershell
npm run dev
```

Frontend روی `http://localhost:5173` اجرا می‌شود.

در حالت dev، درخواست‌های `/api/*` از Vite به backend پروکسی می‌شوند.

---

## 5. اسکریپت‌های مفید



### Frontend (ریشه پروژه)


| دستور                  | کاربرد                 |
| ---------------------- | ---------------------- |
| `npm run dev`          | اجرای frontend         |
| `npm run dev:server`   | اجرای backend          |
| `npm run build`        | build frontend         |
| `npm run build:server` | build backend          |
| `npm run lint`         | lint frontend          |
| `npm run lint:server`  | lint backend           |
| `npm run test:server`  | تست backend            |
| `npm run preview`      | preview build frontend |




### Backend (`server/`)


| دستور                | کاربرد             |
| -------------------- | ------------------ |
| `npm run start:dev`  | dev با hot reload  |
| `npm run build`      | compile TypeScript |
| `npm run start:prod` | اجرای build شده    |
| `npm test`           | unit tests         |
| `npm run test:e2e`   | e2e tests          |


---



## 6. تست فرم تماس

1. Frontend و Backend را اجرا کنید.
2. به بخش **Contact** بروید.
3. Wizard را کامل کنید و فرم را ارسال کنید.
4. در صورت تنظیم صحیح SMTP، ایمیل به `CONTACT_EMAIL` ارسال می‌شود.

API endpoint:

```http
POST /api/contact
Content-Type: application/json
```

جزئیات payload و response در `[server/API.md](server/API.md)`.

---



## 7. Build برای Production

```powershell
npm run build
npm run build:server
```



### Frontend

خروجی در `dist/` — روی CDN یا static host deploy کنید.

### Backend

```powershell
cd server
npm run start:prod
```



### Environment در Production

- `NODE_ENV=production`
- `FRONTEND_ORIGIN` = دامنه واقعی frontend (مثلاً `https://businic.com`)
- `VITE_API_BASE_URL` = URL عمومی backend (هنگام build frontend)
- SMTP credentials واقعی
- CORS فقط originهای مجاز

چک‌لیست ایمیل: [`server/PRODUCTION_EMAIL.md`](server/PRODUCTION_EMAIL.md)

راهنمای کامل deploy: [`DEPLOYMENT.md`](DEPLOYMENT.md)

---

## شروع سریع (خلاصه)

```powershell
# 1. نصب
npm install
cd server; npm install; cd ..

# 2. env
Copy-Item server\.env.example server\.env
# server/.env را با SMTP واقعی ویرایش کنید

# 3. اجرا (دو ترمینال)
npm run dev:server
npm run dev

# 4. باز کردن
# http://localhost:5173
```

