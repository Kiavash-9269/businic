import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

import { useLanguage } from "../../context/LanguageContext";
import contact from "../../data/contact";
import contactQuestions from "../../data/contactQuestions";
import submitContact from "../../services/contactService";
import { buildContactPayload } from "../../utils/buildContactPayload";

const ContactForm = ({ answers }) => {
  const { language } = useLanguage();
  const content = contact[language];
  const questions = contactQuestions[language];

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resolveErrorMessage = (result) => {
    if (result.status === 0) return content.errors.network;
    if (result.status === 429) return content.errors.rateLimit;
    if (result.status === 400)
      return result.message || content.errors.generic;
    if (result.status >= 500) return content.errors.generic;
    return result.message || content.errors.generic;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    const finalData = buildContactPayload({
      formData,
      wizardAnswers: answers,
      language,
      questions,
    });

    try {
      const result = await submitContact(finalData);

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(resolveErrorMessage(result));
      }
    } catch {
      setError(content.errors.unexpected);
    } finally {
      setLoading(false);
    }
  };

  const errorId = "contact-form-error";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="ct-success"
        role="status"
        aria-live="polite"
      >
        <div className="ct-success-icon">
          <CheckCircle size={38} />
        </div>
        <h3 className="ct-card-title mt-6">{content.successTitle}</h3>
        <p className="ct-card-text mt-4">{content.successText}</p>
      </motion.div>
    );
  }

  const inputs = [
    {
      name: "name",
      type: "text",
      label: content.form.name,
      placeholder: content.form.name,
      icon: User,
    },
    {
      name: "email",
      type: "email",
      label: content.form.email,
      placeholder: content.form.email,
      icon: Mail,
    },
    {
      name: "phone",
      type: "text",
      label: content.form.phone,
      placeholder: content.form.phone,
      icon: Phone,
    },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="ct-form"
      aria-busy={loading}
      aria-describedby={error ? errorId : undefined}
    >
      <div className="ct-form-head">
        <h3 className="ct-card-title">{content.formTitle}</h3>
        <p className="ct-card-text">{content.formDescription}</p>
      </div>

      {inputs.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.name} className="ct-field">
            <label
              htmlFor={`contact-${item.name}`}
              className="ct-label"
            >
              {item.label}
            </label>

            <div className="ct-input-wrap">
              <Icon
                size={16}
                className="ct-input-icon"
                aria-hidden="true"
              />

              <input
                id={`contact-${item.name}`}
                required
                name={item.name}
                type={item.type}
                value={formData[item.name]}
                onChange={handleChange}
                placeholder={item.placeholder}
                disabled={loading}
                className="ct-input"
              />
            </div>
          </div>
        );
      })}

      <div className="ct-field">
        <label htmlFor="contact-message" className="ct-label">
          {content.form.message}
        </label>

        <div className="ct-input-wrap ct-textarea-wrap">
          <MessageSquare
            size={16}
            className="ct-input-icon ct-textarea-icon"
            aria-hidden="true"
          />

          <textarea
            id="contact-message"
            required
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder={content.form.message}
            disabled={loading}
            className="ct-input ct-textarea"
          />
        </div>
      </div>

      {error && (
        <p
          id={errorId}
          className="ct-form-error"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        aria-disabled={loading}
        className="ct-button ct-submit"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            <span>{content.form.sending}</span>
          </>
        ) : (
          <>
            <span>{content.form.button}</span>
            <Send size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </motion.form>
  );
};

export default ContactForm;