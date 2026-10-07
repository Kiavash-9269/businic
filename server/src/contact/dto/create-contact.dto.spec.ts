import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateContactDto } from './create-contact.dto';

const validAnswers = [
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
];

const validPayload = {
  name: 'Ali Test',
  email: 'ali@example.com',
  phone: '+989121234567',
  message: 'Need a website for my business',
  answers: validAnswers,
  language: 'fa',
};

describe('CreateContactDto', () => {
  const run = async (payload: unknown) => {
    const dto = plainToInstance(CreateContactDto, payload);
    return validate(dto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  };

  it('accepts a valid payload', async () => {
    const errors = await run(validPayload);
    expect(errors).toHaveLength(0);
  });

  it('rejects missing name', async () => {
    const payload = structuredClone(validPayload);
    // @ts-expect-error intentional
    delete payload.name;
    const errors = await run(payload);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('rejects invalid email', async () => {
    const payload = structuredClone(validPayload);
    payload.email = 'not-an-email';
    const errors = await run(payload);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('rejects oversized message', async () => {
    const payload = structuredClone(validPayload);
    payload.message = 'x'.repeat(2001);
    const errors = await run(payload);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('rejects empty whitespace name', async () => {
    const payload = structuredClone(validPayload);
    payload.name = '   ';
    const errors = await run(payload);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('rejects invalid language', async () => {
    const payload = structuredClone(validPayload);
    // @ts-expect-error intentional
    payload.language = 'de';
    const errors = await run(payload);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('rejects unexpected payload fields', async () => {
    const payload = {
      ...validPayload,
      company: 'Businic',
    };
    const errors = await run(payload);
    expect(errors.length).toBeGreaterThan(0);
  });
});
