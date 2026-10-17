import React from 'react';
import { CareerTrack } from '../../types';

interface DownloadBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: CareerTrack;
}

export const DownloadBlueprintModal: React.FC<DownloadBlueprintModalProps> = ({
  isOpen,
  onClose,
  track,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#eff4ff]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-b border-[#eff4ff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#004ac6] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
            <div>
              <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
                Career Blueprint Document
              </h3>
              <p className="text-[12px] text-[#434655]">
                Exportable personalized roadmap &amp; verified competency report
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

        {/* Blueprint Document Preview */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-white text-[#0b1c30]">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-4">
            <div>
              <span className="text-[10px] font-bold text-[#004ac6] tracking-wider uppercase">
                Official CareerPath Roadmap
              </span>
              <h2 className="font-headline text-[22px] font-bold text-[#0b1c30] mt-0.5">
                {track.trackTitle}
              </h2>
              <p className="text-[12px] text-[#434655]">Candidate: Aditi (Computer Science '26)</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-[#737686]">Market Readiness</span>
              <div className="text-[24px] font-bold font-headline text-[#004ac6]">
                {track.overallReadiness}%
              </div>
            </div>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#eff4ff] text-[12px]">
            <div>
              <span className="text-[#434655]">Foundational</span>
              <div className="font-bold text-[#0b1c30] text-[15px]">{track.breakdown.foundational}%</div>
            </div>
            <div>
              <span className="text-[#434655]">Technical Core</span>
              <div className="font-bold text-[#0b1c30] text-[15px]">{track.breakdown.technicalCore}%</div>
            </div>
            <div>
              <span className="text-[#434655]">Portfolio Projects</span>
              <div className="font-bold text-[#0b1c30] text-[15px]">{track.breakdown.portfolioProjects}%</div>
            </div>
          </div>

          {/* Curriculum Stages */}
          <div className="space-y-4">
            <h4 className="font-headline text-[14px] font-bold text-[#0b1c30] uppercase tracking-wider">
              Path Milestones &amp; Validations
            </h4>
            <div className="space-y-3">
              {track.milestones.map((m, i) => (
                <div key={m.id} className="p-3.5 rounded-xl border border-[#eff4ff] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[13px] text-[#0b1c30]">
                      {i + 1}. {m.title}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        m.status === 'completed'
                          ? 'bg-[#6cf8bb]/30 text-[#00714d]'
                          : m.status === 'active'
                          ? 'bg-[#e5eeff] text-[#004ac6]'
                          : 'bg-[#eff4ff] text-[#737686]'
                      }`}
                    >
                      {m.statusLabel}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#434655]">{m.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#737686] border-t border-[#eff4ff] flex items-center justify-between">
            <span>Verified by CareerPath Accreditation Network</span>
            <span>Generated Oct 2026</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#f8f9ff] border-t border-[#eff4ff] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-[13px] font-medium text-[#434655] hover:bg-[#eff4ff]"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] text-white font-headline text-[13px] font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
