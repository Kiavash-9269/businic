# API Contract — Contact Email

## Endpoint
POST /api/contact
Content-Type: application/json

## Request
```json
{
  "name": "string (required, max 100)",
  "email": "email (required, max 254)",
  "phone": "string (required, max 40)",
  "message": "string (required, max 2000)",
  "language": "fa | en",
  "answers": [
    {
      "question": "string (required, max 300)",
      "answer": "string (required, max 200)"
    }
  ]
}
```

Notes:
- `answers` must contain exactly 6 items, matching the Contact Wizard questions.
- `question` is the localized wizard question label from the frontend.
- `answer` is the selected wizard option text from the frontend.
- No `company` field is accepted because the UI does not collect it.

## Example Payload (FA)
```json
{
  "name": "علی رضایی",
  "email": "ali@example.com",
  "phone": "09121234567",
  "message": "توضیحات پروژه...",
  "language": "fa",
  "answers": [
    { "question": "نوع کسب‌وکار شما چیست؟", "answer": "استارتاپ" },
    { "question": "چه نوع پروژه‌ای مدنظر دارید؟", "answer": "طراحی وب‌سایت" },
    { "question": "هدف اصلی شما از این پروژه چیست؟", "answer": "افزایش فروش" },
    { "question": "چه امکاناتی نیاز دارید؟", "answer": "پرداخت آنلاین" },
    { "question": "زمان موردنظر برای اجرای پروژه؟", "answer": "۱ تا ۳ ماه" },
    { "question": "بودجه تقریبی پروژه چقدر است؟", "answer": "۵۰ تا ۱۵۰ میلیون" }
  ]
}
```

## Responses
200
```json
{ "success": true, "message": "Request submitted successfully" }
```

400
```json
{ "success": false, "message": "Invalid request | field-specific message" }
```

429
```json
{ "success": false, "message": "Too many requests" }
```

500
```json
{ "success": false, "message": "Unable to send message" }
```

## Email Output
- HTML email with table layout and inline CSS
- Plain-text fallback included
- Subject:
  - `fa`: `درخواست همکاری جدید - Businic`
  - `en`: `New Contact Request - Businic`
- `From`: configured `MAIL_FROM`
- `Reply-To`: customer email
- `To`: configured `CONTACT_EMAIL`

## Health
GET /health
```json
{ "status": "ok" }
```
