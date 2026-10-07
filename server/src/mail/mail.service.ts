import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';
import { BuiltContactEmail } from './contact-email.types';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.getOrThrow<string>('mail.host');
    const port = this.configService.getOrThrow<number>('mail.port');
    const user = this.configService.get<string>('mail.user') ?? '';
    const pass = this.configService.get<string>('mail.password') ?? '';

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: user ? { user, pass } : undefined,
    });
  }

  async sendBuiltEmail(email: BuiltContactEmail): Promise<void> {
    const to = this.configService.getOrThrow<string>('contactEmail');
    const from = this.configService.getOrThrow<string>('mail.from');

    try {
      await this.transporter.sendMail({
        from,
        to,
        replyTo: email.replyTo,
        subject: email.subject,
        text: email.text,
        html: email.html,
      });
      this.logger.log('Email send success');
    } catch {
      this.logger.error('Email send failed');
      throw new InternalServerErrorException('Unable to send message');
    }
  }
}
