import { validateEnv } from './env.validation';

const baseEnv = {
  NODE_ENV: 'development',
  PORT: '3001',
  FRONTEND_ORIGIN: 'http://localhost:5173',
  MAIL_HOST: 'smtp.example.com',
  MAIL_PORT: '587',
  MAIL_FROM: 'noreply@example.com',
  CONTACT_EMAIL: 'team@example.com',
};

describe('validateEnv', () => {
  it('accepts a valid development configuration', () => {
    expect(() => validateEnv(baseEnv)).not.toThrow();
  });

  it('rejects missing MAIL_HOST', () => {
    const env = { ...baseEnv, MAIL_HOST: '' };
    expect(() => validateEnv(env)).toThrow(/MAIL_HOST/);
  });

  it('rejects production localhost origins', () => {
    const env = {
      ...baseEnv,
      NODE_ENV: 'production',
      FRONTEND_ORIGIN: 'http://localhost:5173',
      MAIL_USER: 'smtp-user',
      MAIL_PASSWORD: 'smtp-pass',
      MAIL_HOST: 'smtp.mailprovider.com',
      MAIL_FROM: 'noreply@businic.com',
      CONTACT_EMAIL: 'team@businic.com',
    };

    expect(() => validateEnv(env)).toThrow(/localhost/);
  });

  it('rejects production http origins', () => {
    const env = {
      ...baseEnv,
      NODE_ENV: 'production',
      FRONTEND_ORIGIN: 'http://businic.com',
      MAIL_USER: 'smtp-user',
      MAIL_PASSWORD: 'smtp-pass',
      MAIL_HOST: 'smtp.mailprovider.com',
      MAIL_FROM: 'noreply@businic.com',
      CONTACT_EMAIL: 'team@businic.com',
    };

    expect(() => validateEnv(env)).toThrow(/HTTPS/);
  });

  it('requires SMTP credentials in production', () => {
    const env = {
      ...baseEnv,
      NODE_ENV: 'production',
      FRONTEND_ORIGIN: 'https://businic.com',
      MAIL_HOST: 'smtp.mailprovider.com',
      MAIL_FROM: 'noreply@businic.com',
      CONTACT_EMAIL: 'team@businic.com',
    };

    expect(() => validateEnv(env)).toThrow(/MAIL_USER/);
  });

  it('accepts a valid production configuration', () => {
    const env = {
      ...baseEnv,
      NODE_ENV: 'production',
      FRONTEND_ORIGIN: 'https://businic.com',
      MAIL_USER: 'smtp-user',
      MAIL_PASSWORD: 'smtp-pass',
      MAIL_HOST: 'smtp.mailprovider.com',
      MAIL_FROM: 'noreply@businic.com',
      CONTACT_EMAIL: 'team@businic.com',
      TRUST_PROXY: '1',
    };

    expect(() => validateEnv(env)).not.toThrow();
  });
});
