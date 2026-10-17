import React from 'react';
import { INITIAL_TRACKS } from '../../data/tracks';
import { CareerTrack } from '../../types';

interface ChangePathModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrackId: string;
  onSelectTrack: (track: CareerTrack) => void;
}

export const ChangePathModal: React.FC<ChangePathModalProps> = ({
  isOpen,
  onClose,
  currentTrackId,
  onSelectTrack,
}) => {
  if (!isOpen) return null;

  const tracksList = Object.values(INITIAL_TRACKS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 border border-[#eff4ff] space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#e5eeff] text-[#004ac6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
            </div>
            <div>
              <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
                Change Target Career Path
              </h3>
              <p className="text-[12px] text-[#434655]">
                Switch your curriculum and recruiter demand calibrations.
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

        <div className="space-y-3">
          {tracksList.map((track) => {
            const isSelected = track.id === currentTrackId;
            return (
              <div
                key={track.id}
                onClick={() => {
                  onSelectTrack(track);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${
                  isSelected
                    ? 'border-[#004ac6] bg-[#eff4ff]'
                    : 'border-[#eff4ff] hover:border-[#d3e4fe] bg-white hover:bg-[#f8f9ff]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline text-[14px] font-bold text-[#0b1c30]">
                      {track.trackTitle}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#004ac6] text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#434655]">{track.openingsContext}</p>
                  <div className="flex items-center gap-4 pt-1 text-[11px] text-[#737686]">
                    <span>Readiness: <strong className="text-[#0b1c30]">{track.overallReadiness}%</strong></span>
                    <span>•</span>
                    <span>Est: <strong className="text-[#0b1c30]">{track.estCompletion}</strong></span>
                  </div>
                </div>
                <div className="pt-1">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isSelected ? 'text-[#004ac6]' : 'text-[#c3c6d7]'
                    }`}
                  >
                    {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-[13px] font-medium text-[#434655] hover:bg-[#eff4ff] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
