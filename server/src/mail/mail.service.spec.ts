import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import { MailService } from './mail.service';

const sendMail = jest.fn();

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: jest.fn(() => ({ sendMail })),
  },
}));

describe('MailService', () => {
  const configService = {
    getOrThrow: jest.fn((key: string) => {
      const map: Record<string, string | number> = {
        'mail.host': 'smtp.example.com',
        'mail.port': 587,
        'mail.from': 'noreply@example.com',
        contactEmail: 'team@example.com',
      };
      return map[key];
    }),
    get: jest.fn((key: string) => {
      const map: Record<string, string> = {
        'mail.user': 'user',
        'mail.password': 'secret',
      };
      return map[key];
    }),
  } as unknown as ConfigService;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends built email with html and reply-to', async () => {
    sendMail.mockResolvedValue({ messageId: '1' });
    const service = new MailService(configService);

    await service.sendBuiltEmail({
      subject: 'New Contact Request - Businic',
      html: '<p>Hello</p>',
      text: 'Hello',
      replyTo: 'ali@example.com',
    });

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'team@example.com',
        from: 'noreply@example.com',
        replyTo: 'ali@example.com',
        subject: 'New Contact Request - Businic',
        html: '<p>Hello</p>',
        text: 'Hello',
      }),
    );
  });

  it('throws a safe error when SMTP fails', async () => {
    sendMail.mockRejectedValue(new Error('SMTP boom'));
    const service = new MailService(configService);

    await expect(
      service.sendBuiltEmail({
        subject: 'Contact',
        html: '<p>Hello</p>',
        text: 'Hello',
        replyTo: 'ali@example.com',
      }),
    ).rejects.toBeInstanceOf(InternalServerErrorException);
  });
});
