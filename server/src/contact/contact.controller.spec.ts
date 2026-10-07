import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('ContactController', () => {
  let controller: ContactController;
  const contactService = {
    submit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [{ provide: ContactService, useValue: contactService }],
    }).compile();

    controller = module.get(ContactController);
    jest.clearAllMocks();
  });

  const payload = {
    name: 'Ali Test',
    email: 'ali@example.com',
    phone: '+989121234567',
    message: 'Need a website',
    language: 'en' as const,
    answers: [
      { question: 'What is your business type?', answer: 'Startup' },
      {
        question: 'What type of project do you need?',
        answer: 'Website Design',
      },
      { question: 'What is your main goal?', answer: 'Increase Sales' },
      { question: 'What features do you need?', answer: 'Online Payment' },
      { question: 'Project timeline?', answer: '1-3 months' },
      { question: 'Estimated budget?', answer: 'Under $1000' },
    ],
  };

  it('returns success for valid submissions', async () => {
    contactService.submit.mockResolvedValue({
      success: true,
      message: 'Request submitted successfully',
    });

    await expect(controller.submit(payload)).resolves.toEqual({
      success: true,
      message: 'Request submitted successfully',
    });
  });

  it('propagates mail failures as controlled errors', async () => {
    contactService.submit.mockRejectedValue(
      new InternalServerErrorException('Unable to send message'),
    );

    await expect(controller.submit(payload)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });
});
