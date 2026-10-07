import { ContactEmailBuilder } from './contact-email.builder';
import { NormalizedContactSubmission } from './contact-email.types';

describe('ContactEmailBuilder', () => {
  const builder = new ContactEmailBuilder();

  const baseSubmission: NormalizedContactSubmission = {
    name: 'Ali Test',
    email: 'ali@example.com',
    phone: '+989121234567',
    message: 'Need a website for my business',
    language: 'fa',
    submittedAt: new Date('2026-09-01T10:30:00.000Z'),
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

  it('builds RTL html for Persian submissions', () => {
    const email = builder.build(baseSubmission);

    expect(email.subject).toBe('درخواست همکاری جدید - Businic');
    expect(email.html).toContain('dir="rtl"');
    expect(email.html).toContain('Ali Test');
    expect(email.html).toContain('ali@example.com');
    expect(email.html).toContain('نوع کسب‌وکار شما چیست؟');
    expect(email.text).toContain('Ali Test');
    expect(email.replyTo).toBe('ali@example.com');
  });

  it('builds LTR html for English submissions', () => {
    const email = builder.build({
      ...baseSubmission,
      language: 'en',
      answers: [
        {
          question: 'What is your business type?',
          answer: 'Startup',
        },
        {
          question: 'What type of project do you need?',
          answer: 'Website Design',
        },
        {
          question: 'What is your main goal?',
          answer: 'Increase Sales',
        },
        {
          question: 'What features do you need?',
          answer: 'Online Payment',
        },
        {
          question: 'Project timeline?',
          answer: '1-3 months',
        },
        {
          question: 'Estimated budget?',
          answer: 'Under $1000',
        },
      ],
    });

    expect(email.subject).toBe('New Contact Request - Businic');
    expect(email.html).toContain('dir="ltr"');
    expect(email.html).toContain('Customer Information');
    expect(email.html).toContain('What is your business type?');
  });

  it('escapes html in user-provided content', () => {
    const email = builder.build({
      ...baseSubmission,
      name: '<script>alert(1)</script>',
      message: 'Hello & welcome',
    });

    expect(email.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(email.html).toContain('Hello &amp; welcome');
  });
});
