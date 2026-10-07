# Production Email Checklist

Use this checklist before going live with the Businic contact email flow.

## Sender Configuration
- [ ] `MAIL_FROM` uses a verified domain sender address
- [ ] `CONTACT_EMAIL` is the inbox monitored by the team
- [ ] SMTP credentials are stored only in environment variables
- [ ] Production SMTP provider supports reliable transactional delivery

## DNS Authentication
- [ ] SPF record authorizes the SMTP sending host/domain
- [ ] DKIM signing is enabled for the sender domain
- [ ] DMARC policy is configured for the sender domain
- [ ] DNS changes have propagated and been verified by the provider

## Deliverability
- [ ] Test emails arrive in inbox from both FA and EN submissions
- [ ] Reply-To opens a reply to the customer email, not the system sender
- [ ] HTML renders correctly in Gmail, Outlook, and mobile clients
- [ ] No JavaScript, external CSS, or remote images are required

## Application Safety
- [ ] Rate limiting remains enabled for `POST /api/contact`
- [ ] CORS is restricted to production frontend origins
- [ ] Server logs do not print SMTP passwords or credentials
- [ ] API error responses remain generic for 500-level failures

## Operational Verification
- [ ] Valid submission returns 200 and sends email
- [ ] Invalid payload returns 400
- [ ] Rate limit returns 429
- [ ] SMTP failure returns 500 without exposing provider details
