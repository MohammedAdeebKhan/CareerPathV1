import React from 'react';
import { CareerTrack } from '../../types';

interface MyPathScreenProps {
  track: CareerTrack;
  onChangePath: () => void;
  onDownloadBlueprint: () => void;
  onOpenLab: () => void;
  onTakeQuiz: () => void;
  onRequestChat: () => void;
  candidateName?: string;
}

export const MyPathScreen: React.FC<MyPathScreenProps> = ({
  track,
  onChangePath,
  onDownloadBlueprint,
  onOpenLab,
  onTakeQuiz,
  onRequestChat,
  candidateName = 'Aditi',
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Top Welcome & Sub-Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-[#004ac6] font-headline text-[12px] font-bold mb-1">
            <span className="material-symbols-outlined text-[16px]">route</span>
            <span>PERSONALIZED ROADMAP</span>
          </div>
          <h1 className="font-headline text-[28px] sm:text-[32px] font-bold text-[#0b1c30] tracking-tight">
            Welcome back, {candidateName}
          </h1>
          <p className="text-[15px] text-[#434655] mt-1">
            Here is your tailored blueprint toward landing your first{' '}
            <span className="font-semibold text-[#0b1c30]">{track.roleName}</span> position.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onChangePath}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] font-headline text-[13px] font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
            <span>Change Path</span>
          </button>
          <button
            type="button"
            onClick={onDownloadBlueprint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#004ac6] text-white hover:bg-[#2563eb] font-headline text-[13px] font-semibold transition-all shadow-md cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download Blueprint PDF</span>
          </button>
        </div>
      </div>

      {/* Bento Top Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs mb-8 relative overflow-hidden border border-[#eff4ff]">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d3e4fe]/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-center">
          {/* Role and Readiness Score */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb]/40 text-[#00714d] font-headline text-[12px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                Active Target Role
              </span>
              <span className="text-[12px] text-[#434655] flex items-center gap-1 font-headline">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                Est. Completion: <strong className="text-[#0b1c30] font-semibold">{track.estCompletion}</strong>
              </span>
            </div>

            <h2 className="font-headline text-[24px] sm:text-[26px] font-bold text-[#0b1c30] mb-1">
              {track.trackTitle}
            </h2>
            <p className="text-[14px] text-[#434655] mb-6">
              {track.openingsContext}
            </p>

            {/* Progress Metrics */}
            <div className="bg-[#eff4ff] rounded-2xl p-4 sm:p-5">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-headline text-[14px] font-semibold text-[#0b1c30]">
                  Overall Market Readiness
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline text-[24px] font-bold text-[#004ac6] tabular-nums">
                    {track.overallReadiness}%
                  </span>
                  <span className="text-[12px] text-[#434655]">/ 100%</span>
                </div>
              </div>

              {/* Main emerald progress bar */}
              <div className="w-full h-3 bg-[#d3e4fe] rounded-full overflow-hidden mb-4 flex">
                <div
                  className="h-full bg-[#006c49] transition-all duration-700 ease-out"
                  style={{ width: `${track.overallReadiness}%` }}
                ></div>
              </div>

              {/* Readiness Breakdown Sub-bars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#434655]">Foundational</span>
                    <span className="font-semibold text-[#0b1c30] tabular-nums">
                      {track.breakdown.foundational}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#d3e4fe] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#006c49]"
                      style={{ width: `${track.breakdown.foundational}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#434655]">Technical Core</span>
                    <span className="font-semibold text-[#0b1c30] tabular-nums">
                      {track.breakdown.technicalCore}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#d3e4fe] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#004ac6]"
                      style={{ width: `${track.breakdown.technicalCore}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-[#434655]">Portfolio Projects</span>
                    <span className="font-semibold text-[#0b1c30] tabular-nums">
                      {track.breakdown.portfolioProjects}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#d3e4fe] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#ffb95f]"
                      style={{ width: `${track.breakdown.portfolioProjects}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action / Next Action Widget */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#dce9ff]/40 rounded-2xl p-6 border border-[#eff4ff]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="font-headline text-[11px] uppercase tracking-wider text-[#434655] font-bold">
                  Current Next Action
                </span>
                <h3 className="font-headline text-[16px] font-bold text-[#0b1c30] mt-1">
                  {track.currentNextAction.title}
                </h3>
                <p className="text-[11px] text-[#434655] mt-0.5">
                  {track.currentNextAction.meta}
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenLab}
                className="w-10 h-10 rounded-xl bg-[#004ac6] text-white flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-xl border border-[#eff4ff]">
              <div className="w-8 h-8 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#004ac6] shrink-0">
                <span className="material-symbols-outlined text-[18px]">terminal</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-headline text-[13px] font-semibold text-[#0b1c30] block truncate">
                  {track.currentNextAction.labName}
                </span>
                <span className="text-[11px] text-[#434655] block">
                  {track.currentNextAction.labProgress}
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenLab}
                className="text-[12px] text-[#004ac6] font-semibold hover:underline cursor-pointer font-headline"
              >
                Resume
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenLab}
              className="w-full py-2.5 rounded-xl bg-[#004ac6] text-white font-headline text-[13px] font-semibold text-center hover:bg-[#2563eb] transition-colors shadow-sm cursor-pointer active:scale-98"
            >
              Continue Learning Session
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Roadmap Timeline (8 cols) & Competencies/Skills Rail (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Step-by-Step Milestone Timeline (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004ac6] text-[22px]">alt_route</span>
              <h2 className="font-headline text-[22px] font-bold text-[#0b1c30]">
                Curated Path Milestones
              </h2>
            </div>
            <span className="text-[11px] text-[#434655] uppercase tracking-wider font-semibold font-headline">
              5 Stages • Stage 2 In Progress
            </span>
          </div>

          {/* Roadmap Timeline Container */}
          <div className="relative pl-7 sm:pl-9 space-y-6">
            {/* Persistent Vertical Connector Line */}
            <div className="absolute left-3 sm:left-4 top-3 bottom-6 w-0.5 bg-[#dce9ff]"></div>

            {/* MILESTONE CARDS */}
            {track.milestones.map((m, index) => {
              if (m.status === 'completed') {
                return (
                  <div key={m.id} className="relative flex items-start gap-4 group">
                    {/* Completed Node Badge */}
                    <div className="absolute -left-7 sm:-left-9 top-1 w-6 h-6 rounded-full bg-[#006c49] text-white flex items-center justify-center shadow-xs ring-4 ring-[#f8f9ff]">
                      <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                    </div>

                    {/* Card Content */}
                    <div className="w-full bg-white rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow border border-[#eff4ff]">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-headline text-[12px] font-bold text-[#006c49] uppercase tracking-wider">
                            {m.number}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[#c3c6d7]"></span>
                          <span className="text-[12px] text-[#434655]">Completed {m.completedDate}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#00714d] font-headline text-[12px] font-semibold">
                          <span className="material-symbols-outlined text-[14px]">verified</span>
                          {m.statusLabel}
                        </span>
                      </div>

                      <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
                        {m.title}
                      </h3>
                      <p className="text-[13px] text-[#434655] mt-1 mb-4">
                        {m.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {m.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md bg-[#e5eeff] text-[#0b1c30] font-headline text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {m.score && (
                          <span className="ml-auto font-headline text-[13px] text-[#006c49] font-bold flex items-center gap-1">
                            {m.score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              if (m.status === 'active') {
                return (
                  <div key={m.id} className="relative flex items-start gap-4 group">
                    {/* Active Pulsing Node Badge */}
                    <div className="absolute -left-7 sm:-left-9 top-1 w-6 h-6 rounded-full bg-[#004ac6] text-white flex items-center justify-center shadow-md ring-4 ring-[#f8f9ff]">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    </div>

                    {/* Card Content */}
                    <div className="w-full bg-white rounded-2xl p-6 shadow-xs border-2 border-[#004ac6]/25">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-headline text-[12px] font-bold text-[#004ac6] uppercase tracking-wider">
                            {m.number}
                          </span>
                        </div>
                        <span className="font-headline text-[12px] font-bold text-[#004ac6]">
                          {m.statusLabel}
                        </span>
                      </div>

                      <h3 className="font-headline text-[19px] font-bold text-[#0b1c30]">
                        {m.title}
                      </h3>
                      <p className="text-[13px] text-[#434655] mt-1 mb-4">
                        {m.description}
                      </p>

                      {/* Embedded Next Step Progress Indicator */}
                      <div className="bg-[#eff4ff] rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-headline text-[12px] text-[#0b1c30] font-bold flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">
                              radio_button_checked
                            </span>
                            {m.currentTopic}
                          </span>
                          <span className="text-[11px] text-[#434655] font-medium">
                            {m.modulesPassed}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#d3e4fe] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#004ac6] transition-all duration-500"
                            style={{ width: `${m.progressPercent || 72}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {m.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-md bg-[#dce9ff] text-[#004ac6] font-headline text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={onOpenLab}
                          className="px-4 py-2 rounded-xl bg-[#004ac6] text-white font-headline text-[12px] font-semibold hover:bg-[#2563eb] transition-colors shadow-xs cursor-pointer active:scale-95"
                        >
                          Open Assessment Lab
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              // Upcoming Milestones
              return (
                <div key={m.id} className="relative flex items-start gap-4 group">
                  <div className="absolute -left-7 sm:-left-9 top-1 w-6 h-6 rounded-full bg-[#dce9ff] text-[#434655] flex items-center justify-center ring-4 ring-[#f8f9ff]">
                    <span className="text-[11px] font-bold font-headline">{index + 1}</span>
                  </div>

                  <div className="w-full bg-white/90 rounded-2xl p-6 shadow-xs border border-[#eff4ff]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="font-headline text-[12px] font-bold text-[#737686] uppercase tracking-wider">
                        {m.number}
                      </span>
                      {m.unlockCondition && (
                        <span className="text-[11px] text-[#434655] flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[14px]">lock_clock</span>
                          {m.unlockCondition}
                        </span>
                      )}
                      {m.estStart && (
                        <span className="text-[11px] text-[#434655] flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                          {m.estStart}
                        </span>
                      )}
                      {m.isGraduation && (
                        <span className="text-[11px] text-[#004ac6] flex items-center gap-1 font-semibold font-headline">
                          <span className="material-symbols-outlined text-[14px]">flag</span>
                          {m.statusLabel}
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
                      {m.title}
                    </h3>
                    <p className="text-[13px] text-[#434655] mt-1 mb-4">
                      {m.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {m.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-[#e5eeff] text-[#434655] font-headline text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Skill Mastery & Recruiter Matching (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Interactive Skills Mastery Breakdown */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-headline text-[18px] font-bold text-[#0b1c30]">
                  Skills Mastery
                </h3>
                <p className="text-[11px] text-[#434655]">Validated via platform assessments</p>
              </div>
              <button
                aria-label="Skill info"
                type="button"
                onClick={onTakeQuiz}
                className="text-[#434655] hover:text-[#0b1c30] p-1 rounded-lg hover:bg-[#eff4ff] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">info</span>
              </button>
            </div>

            {/* Skill Items */}
            <div className="space-y-4 mb-5">
              {track.skillsMastery.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between text-[12px] mb-1 font-headline">
                    <span className="font-semibold text-[#0b1c30]">{item.name}</span>
                    <span
                      className={`font-semibold tabular-nums ${
                        item.colorType === 'secondary'
                          ? 'text-[#006c49]'
                          : item.colorType === 'primary'
                          ? 'text-[#004ac6]'
                          : 'text-[#737686]'
                      }`}
                    >
                      {item.level}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#d3e4fe] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        item.colorType === 'secondary'
                          ? 'bg-[#006c49]'
                          : item.colorType === 'primary'
                          ? 'bg-[#004ac6]'
                          : 'bg-[#c3c6d7]'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onTakeQuiz}
              className="w-full py-2.5 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] font-headline text-[13px] font-semibold transition-colors text-center cursor-pointer active:scale-98"
            >
              Take Diagnostic Skill Quiz
            </button>
          </div>

          {/* Recruiter Skill Demand Matching */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006c49] text-[20px]">
                  troubleshoot
                </span>
                <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
                  Recruiter Demand Match
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#00714d] font-headline text-[12px] font-bold">
                {track.recruiterDemand.matchedCount} / {track.recruiterDemand.totalCount} Matched
              </span>
            </div>
            <p className="text-[11px] text-[#434655] mb-4">
              Top demanded skills for {track.roleName}s right now.
            </p>

            {/* Matched Skills Pills Grid */}
            <div className="flex flex-wrap gap-2 mb-6">
              {track.recruiterDemand.skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-headline text-xs font-medium transition-all ${
                    skill.matched
                      ? 'bg-[#6cf8bb]/30 text-[#00714d]'
                      : 'bg-[#eff4ff] text-[#434655] opacity-75'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[14px] ${
                      skill.matched ? 'text-[#006c49]' : 'text-[#737686]'
                    }`}
                  >
                    {skill.matched ? 'check_circle' : 'pending'}
                  </span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#eff4ff] flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#006c49] text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-headline text-[13px] font-bold text-[#0b1c30] block">
                  Top 15% Candidate Potential
                </span>
                <span className="text-[11px] text-[#434655] block">
                  {track.recruiterDemand.potentialHighlight}
                </span>
              </div>
            </div>
          </div>

          {/* Matched Mentor Connection Widget */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-headline text-[11px] uppercase tracking-wider text-[#434655] font-bold">
                Matched Mentor
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#004ac6] font-headline text-[11px] font-bold">
                {track.mentor.alumniYear}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 bg-[#eff4ff] border border-[#eff4ff]">
                <img
                  src={track.mentor.avatarUrl}
                  alt={track.mentor.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-headline text-[15px] font-bold text-[#0b1c30] truncate">
                  {track.mentor.name}
                </h4>
                <p className="text-[11px] text-[#434655] truncate">
                  {track.mentor.title} @ {track.mentor.company}
                </p>
              </div>
            </div>

            <p className="text-[12px] text-[#434655] mb-4 leading-relaxed">
              {track.mentor.note}
            </p>

            <button
              type="button"
              onClick={onRequestChat}
              className="w-full py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#004ac6] font-headline text-[13px] font-semibold transition-colors text-center cursor-pointer active:scale-98"
            >
              Request 15-min Coffee Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
