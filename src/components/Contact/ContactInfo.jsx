import { Mail, Phone, MapPin, Copy, Check, Inbox } from "lucide-react";
import { useState } from "react";

import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

import contact from "../../data/contact";

const ContactInfo = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const content = contact[language];
  const isLight = theme === "light";
  const isFa = language === "fa";

  const [copied, setCopied] = useState("");

  const emails = [
    "kiavash@businic.com",
    "info@businic.com",
    "bahadori@businic.com",
    "moradi@businic.com",
  ];

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className={`ct-card ${isLight ? "" : "ct-card-dark"}`}>
      {/* Head */}
      <div className="ct-card-head">
        <div className="ct-icon-lg">
          <Inbox size={22} />
        </div>
        <div>
          <h3 className="ct-card-title">{content.info.email}</h3>
          <p className="ct-card-text">
            {isFa
              ? "برای دریافت مشاوره، شروع همکاری یا پیگیری پروژه می‌توانید از راه‌های ارتباطی زیر با ما در تماس باشید."
              : "For consultation, collaboration or project follow-up, you can contact us through the following ways."}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="ct-items">
        {/* Emails */}
        <div className="ct-item ct-item-column">
          <div className="ct-icon">
            <Mail size={18} />
          </div>

          <div className="ct-item-body">
            <p className="ct-label">{content.info.email}</p>

            <div className="ct-emails">
              {emails.map((email) => (
                <div key={email} className="ct-email-row">
                  <a
                    href={`mailto:${email}`}
                    className="ct-value ct-email-link"
                  >
                    {email}
                  </a>

                  <button
                    type="button"
                    onClick={() => copyEmail(email)}
                    className="ct-copy"
                    aria-label={`Copy ${email}`}
                  >
                    {copied === email ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phone */}
        <a href="tel:+989000000000" className="ct-item">
          <div className="ct-icon">
            <Phone size={18} />
          </div>

          <div className="ct-item-body">
            <p className="ct-label">{content.info.phone}</p>
            <p className="ct-value">+98 900 000 0000</p>
          </div>
        </a>

        {/* Location */}
        <div className="ct-item">
          <div className="ct-icon">
            <MapPin size={18} />
          </div>

          <div className="ct-item-body">
            <p className="ct-label">{content.info.location}</p>
            <p className="ct-value">{content.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;