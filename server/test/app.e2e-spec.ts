import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { MailService } from './../src/mail/mail.service';
import { SafeExceptionFilter } from './../src/common/safe-exception.filter';
import { BuiltContactEmail } from './../src/mail/contact-email.types';

const validBody = {
  name: 'Ali Test',
  email: 'ali@example.com',
  phone: '+989121234567',
  message: 'Need a website',
  language: 'fa',
  answers: [
    {
      question: 'نوع کسب‌وکار شما چیست؟',
      answer: 'استارتاپ',
    },
    {
      question: 'چه نوع پروژه‌ای مدنظر دارید؟',
      answer: 'طراحی وب‌سایت',
    },
    {
      question: 'هدف اصلی شما از این پروژه چیست؟',
      answer: 'افزایش فروش',
    },
    {
      question: 'چه امکاناتی نیاز دارید؟',
      answer: 'پرداخت آنلاین',
    },
    {
      question: 'زمان موردنظر برای اجرای پروژه؟',
      answer: '۱ تا ۳ ماه',
    },
    {
      question: 'بودجه تقریبی پروژه چقدر است؟',
      answer: '۱۰ تا ۳۰ میلیون',
    },
  ],
};

function applyEnv(overrides: Record<string, string> = {}) {
  process.env.NODE_ENV = 'test';
  process.env.PORT = '3001';
  process.env.FRONTEND_ORIGIN = 'http://localhost:5173';
  process.env.MAIL_HOST = 'smtp.example.com';
  process.env.MAIL_PORT = '587';
  process.env.MAIL_FROM = 'noreply@example.com';
  process.env.CONTACT_EMAIL = 'team@example.com';
  process.env.THROTTLE_TTL_MS = '60000';
  process.env.THROTTLE_LIMIT = '100';
  Object.assign(process.env, overrides);
}

async function createApp(mailService: {
  sendBuiltEmail: jest.Mock;
}): Promise<INestApplication<App>> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(MailService)
    .useValue(mailService)
    .compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalFilters(new SafeExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.init();
  return app;
}

describe('Contact API (e2e)', () => {
  let app: INestApplication<App>;
  const mailService = {
    sendBuiltEmail: jest.fn(),
  };

  beforeAll(async () => {
    applyEnv();
    app = await createApp(mailService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mailService.sendBuiltEmail.mockResolvedValue(undefined);
  });

  it('POST /api/contact accepts valid payload', async () => {
    await request(app.getHttpServer())
      .post('/api/contact')
      .send(validBody)
      .expect(200)
      .expect({
        success: true,
        message: 'Request submitted successfully',
      });

    expect(mailService.sendBuiltEmail).toHaveBeenCalledTimes(1);
    const calls = mailService.sendBuiltEmail.mock.calls as Array<
      [BuiltContactEmail]
    >;
    const sentEmail = calls[0][0];
    expect(sentEmail.subject).toBe('درخواست همکاری جدید - Businic');
    expect(sentEmail.html).toContain('Ali Test');
  });

  it('POST /api/contact rejects invalid email', async () => {
    await request(app.getHttpServer())
      .post('/api/contact')
      .send({
        ...validBody,
        email: 'bad',
      })
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({ success: false }));
      });
  });

  it('POST /api/contact rejects missing required data', async () => {
    const body = structuredClone(validBody);
    // @ts-expect-error intentional
    delete body.name;

    await request(app.getHttpServer())
      .post('/api/contact')
      .send(body)
      .expect(400)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining({ success: false }));
      });
  });

  it('POST /api/contact returns safe 500 when mail fails', async () => {
    mailService.sendBuiltEmail.mockRejectedValue(
      new InternalServerErrorException('Unable to send message'),
    );

    const res = await request(app.getHttpServer())
      .post('/api/contact')
      .send(validBody)
      .expect(500);

    expect(res.body).toEqual({
      success: false,
      message: 'Unable to send message',
    });
    expect(JSON.stringify(res.body)).not.toMatch(/smtp/i);
  });

  it('GET /health returns ok', async () => {
    await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        const body = res.body as { status: string; uptime: number };
        expect(body.status).toBe('ok');
        expect(typeof body.uptime).toBe('number');
      });
  });
});

describe('Contact API rate limit (e2e)', () => {
  let app: INestApplication<App>;
  const mailService = {
    sendBuiltEmail: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    applyEnv({ THROTTLE_LIMIT: '2', THROTTLE_TTL_MS: '60000' });
    app = await createApp(mailService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 429 after too many contact requests', async () => {
    await request(app.getHttpServer()).post('/api/contact').send(validBody);
    await request(app.getHttpServer()).post('/api/contact').send(validBody);

    const res = await request(app.getHttpServer())
      .post('/api/contact')
      .send(validBody)
      .expect(429);

    expect(res.body).toEqual({
      success: false,
      message: 'Too many requests',
    });
  });
});
