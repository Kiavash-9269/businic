import { InternalServerErrorException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { MailService } from '../mail/mail.service';
import { ContactEmailBuilder } from '../mail/contact-email.builder';
import { BuiltContactEmail } from '../mail/contact-email.types';

describe('ContactService', () => {
  const sendBuiltEmail = jest.fn();
  const mailService = {
    sendBuiltEmail,
  } as unknown as MailService;

  const service = new ContactService(mailService, new ContactEmailBuilder());

  const validDto = {
    name: ' Ali Test ',
    email: 'Ali@Example.com',
    phone: ' 09121234567 ',
    message: ' Hello world ',
    language: 'fa' as const,
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls mail service for valid submission', async () => {
    sendBuiltEmail.mockResolvedValue(undefined);

    const result = await service.submit(validDto);

    expect(result.success).toBe(true);
    expect(sendBuiltEmail).toHaveBeenCalledTimes(1);
    const calls = sendBuiltEmail.mock.calls as Array<[BuiltContactEmail]>;
    const sentEmail = calls[0][0];
    expect(sentEmail.subject).toBe('درخواست همکاری جدید - Businic');
    expect(sentEmail.replyTo).toBe('ali@example.com');
    expect(sentEmail.html).toContain('Ali Test');
    expect(sentEmail.text).toContain('Ali Test');
  });

  it('surfaces mail service failures as controlled errors', async () => {
    sendBuiltEmail.mockRejectedValue(new Error('smtp down'));

    await expect(service.submit(validDto)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });
});
