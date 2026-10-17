import React, { useState } from 'react';
import { Mentor } from '../../types';

interface CoffeeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
}

export const CoffeeChatModal: React.FC<CoffeeChatModalProps> = ({
  isOpen,
  onClose,
  mentor,
}) => {
  const [selectedSlot, setSelectedSlot] = useState('Thu, Sep 28 • 4:00 PM EST');
  const [topic, setTopic] = useState('SQL Screening tips & Stripe interview format');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const availableSlots = [
    'Thu, Sep 28 • 4:00 PM EST',
    'Fri, Sep 29 • 11:30 AM EST',
    'Tue, Oct 02 • 5:15 PM EST',
  ];

  const handleBook = () => {
    setIsBooked(true);
    setTimeout(() => {
      // Auto close after showing confirmation
      setTimeout(() => {
        setIsBooked(false);
        onClose();
      }, 1400);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-[#eff4ff] space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-[#eff4ff]">
              <img
                src={mentor.avatarUrl}
                alt={mentor.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
                  Coffee Chat with {mentor.name}
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#004ac6]">
                  {mentor.alumniYear}
                </span>
              </div>
              <p className="text-[12px] text-[#434655]">
                {mentor.title} @ {mentor.company}
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

        {!isBooked ? (
          <div className="space-y-4">
            <div className="p-3.5 bg-[#eff4ff] rounded-xl text-[12px] text-[#0b1c30] flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#004ac6] text-[18px] shrink-0 mt-0.5">
                verified
              </span>
              <div>
                <strong>Alumni Mentorship:</strong> 15-minute 1-on-1 informal video call via Google Meet to review your career milestones, portfolio, or recruiter screening tips.
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1.5 font-headline">
                Select Available Slot:
              </label>
              <div className="space-y-2">
                {availableSlots.map((slot) => {
                  const isChosen = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full p-3 rounded-xl border text-left text-[12px] flex items-center justify-between transition-all ${
                        isChosen
                          ? 'border-[#004ac6] bg-[#eff4ff] text-[#004ac6] font-semibold shadow-xs'
                          : 'border-[#eff4ff] hover:border-[#d3e4fe] bg-white text-[#0b1c30]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                        <span>{slot}</span>
                      </span>
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isChosen ? 'text-[#004ac6]' : 'text-[#c3c6d7]'
                        }`}
                      >
                        {isChosen ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1.5 font-headline">
                What would you like to discuss?
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Tips on SQL joins, portfolio review, internship prep"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#eff4ff] bg-[#f8f9ff] text-[13px] text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#004ac6]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-[13px] text-[#434655] hover:bg-[#eff4ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBook}
                className="px-5 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] text-white font-headline text-[13px] font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                <span>Send Invitation</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#6cf8bb]/30 text-[#006c49] mx-auto flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
            </div>
            <h4 className="font-headline text-[16px] font-bold text-[#0b1c30]">
              Coffee Chat Requested!
            </h4>
            <p className="text-[12px] text-[#434655]">
              Invitation sent to {mentor.name} for {selectedSlot}. Calendar invite sent to your student email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
