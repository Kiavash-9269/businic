export type NormalizedContactSubmission = {
  name: string;
  email: string;
  phone: string;
  message: string;
  answers: { question: string; answer: string }[];
  language: 'fa' | 'en';
  submittedAt: Date;
};

export type BuiltContactEmail = {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
};
