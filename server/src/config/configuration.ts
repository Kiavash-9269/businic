export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3001),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? '',
  trustProxy:
    process.env.TRUST_PROXY === '1' ||
    process.env.TRUST_PROXY?.toLowerCase() === 'true',
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT ?? 587),
    user: process.env.MAIL_USER ?? '',
    password: process.env.MAIL_PASSWORD ?? '',
    from: process.env.MAIL_FROM,
  },
  contactEmail: process.env.CONTACT_EMAIL,
  throttle: {
    ttlMs: Number(process.env.THROTTLE_TTL_MS ?? 60_000),
    limit: Number(process.env.THROTTLE_LIMIT ?? 5),
  },
});
