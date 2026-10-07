import { Injectable } from '@nestjs/common';
import {
  BuiltContactEmail,
  NormalizedContactSubmission,
} from './contact-email.types';

const COPY = {
  fa: {
    subject: 'درخواست همکاری جدید - Businic',
    headerTitle: 'BUSINIC',
    headerSubtitle: 'درخواست همکاری جدید',
    customerSection: 'اطلاعات تماس',
    projectSection: 'اطلاعات پروژه',
    messageSection: 'پیام تکمیلی',
    metadataSection: 'اطلاعات تکمیلی',
    name: 'نام',
    email: 'ایمیل',
    phone: 'تلفن',
    language: 'زبان',
    submittedAt: 'زمان ارسال',
    question: 'سوال',
    answer: 'پاسخ',
    languageValue: 'فارسی',
  },
  en: {
    subject: 'New Contact Request - Businic',
    headerTitle: 'BUSINIC',
    headerSubtitle: 'New Contact Request',
    customerSection: 'Customer Information',
    projectSection: 'Project Information',
    messageSection: 'Additional Message',
    metadataSection: 'Metadata',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    language: 'Language',
    submittedAt: 'Submitted At',
    question: 'Question',
    answer: 'Answer',
    languageValue: 'English',
  },
} as const;

@Injectable()
export class ContactEmailBuilder {
  build(submission: NormalizedContactSubmission): BuiltContactEmail {
    const copy = COPY[submission.language];
    const isRtl = submission.language === 'fa';
    const dir = isRtl ? 'rtl' : 'ltr';
    const align = isRtl ? 'right' : 'left';
    const submittedAt = this.formatDate(
      submission.submittedAt,
      submission.language,
    );

    const html = `<!DOCTYPE html>
<html lang="${submission.language}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.escapeHtml(copy.subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background-color:#0284c7;color:#ffffff;padding:28px 24px;text-align:${align};">
              <p style="margin:0 0 8px;font-size:13px;letter-spacing:2px;text-transform:uppercase;opacity:0.9;">${this.escapeHtml(copy.headerTitle)}</p>
              <h1 style="margin:0;font-size:24px;line-height:1.3;font-weight:700;">${this.escapeHtml(copy.headerSubtitle)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <h2 style="margin:0 0 16px;font-size:18px;line-height:1.4;color:#0f172a;text-align:${align};">${this.escapeHtml(copy.customerSection)}</h2>
              ${this.renderField(copy.name, submission.name, align)}
              ${this.renderField(copy.email, submission.email, align, true)}
              ${this.renderField(copy.phone, submission.phone, align, true)}
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;">
              <h2 style="margin:0 0 16px;font-size:18px;line-height:1.4;color:#0f172a;text-align:${align};">${this.escapeHtml(copy.projectSection)}</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                ${submission.answers
                  .map(
                    (item, index) => `
                <tr>
                  <td style="padding:14px 16px;background-color:${index % 2 === 0 ? '#f8fafc' : '#ffffff'};border-bottom:1px solid #e2e8f0;text-align:${align};">
                    <p style="margin:0 0 6px;font-size:12px;line-height:1.4;color:#64748b;font-weight:700;text-transform:uppercase;">${this.escapeHtml(copy.question)}</p>
                    <p style="margin:0 0 10px;font-size:15px;line-height:1.5;color:#0f172a;">${this.escapeHtml(item.question)}</p>
                    <p style="margin:0 0 6px;font-size:12px;line-height:1.4;color:#64748b;font-weight:700;text-transform:uppercase;">${this.escapeHtml(copy.answer)}</p>
                    <p style="margin:0;font-size:15px;line-height:1.5;color:#0f172a;">${this.escapeHtml(item.answer)}</p>
                  </td>
                </tr>`,
                  )
                  .join('')}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;">
              <h2 style="margin:0 0 12px;font-size:18px;line-height:1.4;color:#0f172a;text-align:${align};">${this.escapeHtml(copy.messageSection)}</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:8px;">
                <tr>
                  <td style="padding:16px;font-size:15px;line-height:1.7;color:#0f172a;white-space:pre-wrap;text-align:${align};">${this.escapeHtml(submission.message)}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 28px;">
              <h2 style="margin:0 0 12px;font-size:18px;line-height:1.4;color:#0f172a;text-align:${align};">${this.escapeHtml(copy.metadataSection)}</h2>
              ${this.renderField(copy.language, copy.languageValue, align)}
              ${this.renderField(copy.submittedAt, submittedAt, align, true)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = [
      copy.headerSubtitle,
      '',
      copy.customerSection,
      `${copy.name}: ${submission.name}`,
      `${copy.email}: ${submission.email}`,
      `${copy.phone}: ${submission.phone}`,
      '',
      copy.projectSection,
      ...submission.answers.flatMap((item) => [
        `${copy.question}: ${item.question}`,
        `${copy.answer}: ${item.answer}`,
        '',
      ]),
      copy.messageSection,
      submission.message,
      '',
      copy.metadataSection,
      `${copy.language}: ${copy.languageValue}`,
      `${copy.submittedAt}: ${submittedAt}`,
    ].join('\n');

    return {
      subject: copy.subject,
      html,
      text,
      replyTo: submission.email,
    };
  }

  private renderField(
    label: string,
    value: string,
    align: 'left' | 'right',
    forceLtr = false,
  ) {
    const valueDir = forceLtr ? 'ltr' : undefined;
    const valueAlign = forceLtr ? 'left' : align;

    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
      <tr>
        <td style="padding:12px 14px;background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:${align};">
          <p style="margin:0 0 6px;font-size:12px;line-height:1.4;color:#64748b;font-weight:700;text-transform:uppercase;">${this.escapeHtml(label)}</p>
          <p style="margin:0;font-size:15px;line-height:1.5;color:#0f172a;text-align:${valueAlign};${valueDir ? `direction:${valueDir};` : ''}">${this.escapeHtml(value)}</p>
        </td>
      </tr>
    </table>`;
  }

  private formatDate(date: Date, language: 'fa' | 'en') {
    return new Intl.DateTimeFormat(language === 'fa' ? 'fa-IR' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Tehran',
    }).format(date);
  }

  private escapeHtml(value: string) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
