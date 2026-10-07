import { Check } from "lucide-react";

const QuestionCard = ({ question, selected = [], onSelect }) => {
  const safeSelected = Array.isArray(selected) ? selected : [];

  const handleClick = (option) => {
    const exists = safeSelected.includes(option);
    const next = exists
      ? safeSelected.filter((o) => o !== option)
      : [...safeSelected, option];
    onSelect(next);
  };

  const isSelected = (option) => safeSelected.includes(option);

  return (
    <div className="w-full">
      <div className="question-card-head">
        <h3 className="ct-card-title text-start">{question.title}</h3>
      </div>

      {question.description && (
        <p className="ct-card-text mt-3 text-start">
          {question.description}
        </p>
      )}

      <div className="question-options-grid">
        {question.options.map((option, index) => {
          const active = isSelected(option);

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(option)}
              className={`ct-option ${active ? "is-active" : ""}`}
              aria-pressed={active}
            >
              <span className="ct-option-label">{option}</span>

              <span className="ct-option-check" aria-hidden="true">
                {active ? <Check size={13} /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;