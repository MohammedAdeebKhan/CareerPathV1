import React, { useState } from 'react';

interface DiagnosticQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizCompleted: (scorePercentage: number) => void;
}

export const DiagnosticQuizModal: React.FC<DiagnosticQuizModalProps> = ({
  isOpen,
  onClose,
  onQuizCompleted,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const questions = [
    {
      domain: 'SQL Querying',
      question: 'Which clause is used to filter aggregated results (e.g. groups having SUM(revenue) > 10,000)?',
      options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
      correctIndex: 1,
      explanation: 'HAVING filters grouped rows after aggregation, whereas WHERE filters individual rows before aggregation occurs.',
    },
    {
      domain: 'Excel & Data Modeling',
      question: 'Which modern Excel function can look up values to the left of the lookup column without requiring INDEX/MATCH?',
      options: ['VLOOKUP', 'XLOOKUP', 'HLOOKUP', 'OFFSET'],
      correctIndex: 1,
      explanation: 'XLOOKUP supports bidirectional lookups and does not require the return column to be to the right.',
    },
    {
      domain: 'Business Statistics',
      question: 'In an A/B test conversion experiment, a p-value < 0.05 generally indicates:',
      options: [
        'The test group has a 5% error rate',
        'Statistically significant difference rejecting the null hypothesis',
        'The null hypothesis is strictly verified',
        'The experiment must be terminated immediately',
      ],
      correctIndex: 1,
      explanation: 'A p-value < 0.05 indicates there is less than a 5% chance the observed difference occurred by random noise alone.',
    },
  ];

  const handleSelect = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentStep]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate score
      let correct = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correct++;
        }
      });
      setIsSubmitted(true);
      const score = Math.round((correct / questions.length) * 100);
      onQuizCompleted(score);
    }
  };

  const currentQ = questions[currentStep];
  const isSelected = selectedAnswers[currentStep] !== undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 border border-[#eff4ff] space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">quiz</span>
            </div>
            <div>
              <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
                Diagnostic Skill Quiz
              </h3>
              <p className="text-[12px] text-[#434655]">
                Calibrate your mastery levels against entry-level benchmark questions.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#eff4ff] flex items-center justify-center text-[#434655]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {!isSubmitted ? (
          <div className="space-y-4">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-[11px] text-[#737686]">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span className="font-semibold text-[#004ac6]">{currentQ.domain}</span>
            </div>

            <div className="w-full h-1.5 bg-[#eff4ff] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#004ac6] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Text */}
            <div className="pt-2">
              <h4 className="font-headline text-[15px] font-semibold text-[#0b1c30] leading-snug">
                {currentQ.question}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-2 pt-1">
              {currentQ.options.map((option, idx) => {
                const checked = selectedAnswers[currentStep] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-[13px] flex items-center justify-between transition-all ${
                      checked
                        ? 'border-[#004ac6] bg-[#eff4ff] text-[#004ac6] font-semibold shadow-xs'
                        : 'border-[#eff4ff] hover:border-[#d3e4fe] bg-white text-[#0b1c30]'
                    }`}
                  >
                    <span>{option}</span>
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        checked ? 'text-[#004ac6]' : 'text-[#c3c6d7]'
                      }`}
                    >
                      {checked ? 'radio_button_checked' : 'radio_button_unchecked'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl text-[13px] text-[#434655] disabled:opacity-40 hover:bg-[#eff4ff]"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={!isSelected}
                onClick={handleNext}
                className="px-5 py-2.5 bg-[#004ac6] disabled:opacity-50 hover:bg-[#2563eb] text-white font-headline text-[13px] font-semibold rounded-xl shadow-xs transition-colors"
              >
                {currentStep === questions.length - 1 ? 'Finish & Grade' : 'Next Question'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#6cf8bb]/30 text-[#006c49] mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <div>
              <h4 className="font-headline text-[18px] font-bold text-[#0b1c30]">
                Diagnostic Quiz Completed!
              </h4>
              <p className="text-[13px] text-[#434655] mt-1">
                Your skills mastery score has been calibrated and updated on your roadmap rail.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-[#004ac6] text-white font-headline font-semibold text-[13px] rounded-xl hover:bg-[#2563eb] transition-colors"
            >
              Back to Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
