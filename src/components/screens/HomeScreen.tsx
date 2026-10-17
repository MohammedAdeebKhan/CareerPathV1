import React from 'react';
import { CareerTrack } from '../../types';

interface HomeScreenProps {
  track: CareerTrack;
  onNavigateToMyPath: () => void;
  onOpenLab: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  track,
  onNavigateToMyPath,
  onOpenLab,
}) => {
  return (
    <div className="space-y-8 max-w-[1280px]">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[12px] font-bold text-[#004ac6] uppercase tracking-wider font-headline">
            Student Overview
          </span>
          <h1 className="font-headline text-[28px] font-bold text-[#0b1c30]">
            Good morning, Aditi
          </h1>
          <p className="text-[14px] text-[#434655] mt-0.5">
            You're currently in Stage 2 of the <strong className="text-[#0b1c30]">{track.trackTitle}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#6cf8bb]/30 text-[#00714d] rounded-2xl flex items-center gap-2 font-headline font-semibold text-[13px]">
            <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
            <span>5-Day Streak</span>
          </div>
          <button
            type="button"
            onClick={onNavigateToMyPath}
            className="px-4 py-2 bg-[#004ac6] text-white rounded-xl font-headline text-[13px] font-semibold hover:bg-[#2563eb] transition-colors"
          >
            View Full Roadmap
          </button>
        </div>
      </div>

      {/* 3-Column Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#eff4ff] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#004ac6]">
            <span className="font-headline text-[12px] font-bold uppercase tracking-wider">
              Today's Primary Task
            </span>
            <span className="material-symbols-outlined text-[20px]">assignment</span>
          </div>
          <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
            SQL Window Functions Practice Lab
          </h3>
          <p className="text-[12px] text-[#434655]">
            Complete queries 4 &amp; 5 to advance your active milestone to 80% completion.
          </p>
          <button
            type="button"
            onClick={onOpenLab}
            className="w-full py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#004ac6] rounded-xl font-headline text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            <span>Resume Lab</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#eff4ff] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#006c49]">
            <span className="font-headline text-[12px] font-bold uppercase tracking-wider">
              Market Readiness
            </span>
            <span className="material-symbols-outlined text-[20px]">insights</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-[32px] font-bold text-[#006c49] tabular-nums">
              {track.overallReadiness}%
            </span>
            <span className="text-[12px] text-[#434655]">Candidate Fit</span>
          </div>
          <div className="w-full h-2 bg-[#d3e4fe] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#006c49]"
              style={{ width: `${track.overallReadiness}%` }}
            ></div>
          </div>
          <p className="text-[12px] text-[#434655]">
            8 of 12 required skills currently verified by platform benchmarks.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#eff4ff] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#784b00]">
            <span className="font-headline text-[12px] font-bold uppercase tracking-wider">
              Upcoming Checkpoint
            </span>
            <span className="material-symbols-outlined text-[20px]">event</span>
          </div>
          <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
            Milestone 2 Assessment Due
          </h3>
          <p className="text-[12px] text-[#434655]">
            Target date: <strong className="text-[#0b1c30]">Sep 24, 2026</strong>. Unlocks Python (Pandas &amp; NumPy) module.
          </p>
          <div className="text-[12px] text-[#004ac6] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>4 of 6 sub-modules completed</span>
          </div>
        </div>
      </div>

      {/* Recruiter Activity Feed */}
      <div className="bg-white p-6 rounded-3xl border border-[#eff4ff] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
            Recruiter &amp; Market Calibration
          </h3>
          <span className="text-[12px] text-[#004ac6] font-semibold">Live Signals</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#eff4ff] space-y-1">
            <span className="text-[11px] font-bold text-[#004ac6] uppercase font-headline">
              Stripe Talent Network
            </span>
            <div className="font-headline font-semibold text-[13px] text-[#0b1c30]">
              Junior Data Analyst
            </div>
            <p className="text-[11px] text-[#434655]">
              Looking for candidates proficient in PostgreSQL and hypothesis testing.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#eff4ff] space-y-1">
            <span className="text-[11px] font-bold text-[#006c49] uppercase font-headline">
              Spotify Analytics
            </span>
            <div className="font-headline font-semibold text-[13px] text-[#0b1c30]">
              Product Analytics Intern '26
            </div>
            <p className="text-[11px] text-[#434655]">
              Prioritizes students with verified SQL CTE and A/B testing track records.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#eff4ff] space-y-1">
            <span className="text-[11px] font-bold text-[#784b00] uppercase font-headline">
              Robinhood Risk Team
            </span>
            <div className="font-headline font-semibold text-[13px] text-[#0b1c30]">
              Financial Modeling Associate
            </div>
            <p className="text-[11px] text-[#434655]">
              Requires Excel variance calculation &amp; database querying foundation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
