import { Module } from '@nestjs/common';
import { ContactEmailBuilder } from './contact-email.builder';
import { MailService } from './mail.service';

@Module({
  providers: [MailService, ContactEmailBuilder],
  exports: [MailService, ContactEmailBuilder],
})
export class MailModule {}
