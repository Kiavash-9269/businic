import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactEmailBuilder } from '../mail/contact-email.builder';
import { MailService } from '../mail/mail.service';
import { NormalizedContactSubmission } from '../mail/contact-email.types';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly mailService: MailService,
    private readonly contactEmailBuilder: ContactEmailBuilder,
  ) {}

  async submit(dto: CreateContactDto) {
    this.logger.log('Contact email requested');

    const submission = this.normalizeSubmission(dto);
    const email = this.contactEmailBuilder.build(submission);

    try {
      await this.mailService.sendBuiltEmail(email);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error('Email send failed');
      throw new InternalServerErrorException('Unable to send message');
    }

    return {
      success: true,
      message: 'Request submitted successfully',
    };
  }

  private normalizeSubmission(
    dto: CreateContactDto,
  ): NormalizedContactSubmission {
    return {
      name: dto.name.trim(),
      email: dto.email.trim().toLowerCase(),
      phone: dto.phone.trim(),
      message: dto.message.trim(),
      language: dto.language,
      submittedAt: new Date(),
      answers: dto.answers.map((item) => ({
        question: item.question.trim(),
        answer: item.answer.trim(),
      })),
    };
  }
}
