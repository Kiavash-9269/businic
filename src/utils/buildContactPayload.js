export function buildContactPayload({ formData, wizardAnswers, language, questions }) {
  return {
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    message: formData.message.trim(),
    language,
    answers: questions.map((question) => ({
      question: question.title,
      answer: wizardAnswers[question.id],
    })),
  };
}
