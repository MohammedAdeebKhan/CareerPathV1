import React, { useState } from 'react';
import { SAMPLE_OPPORTUNITIES } from '../../data/tracks';
import { OpportunityJob } from '../../types';

export const OpportunitiesScreen: React.FC = () => {
  const [opportunities, setOpportunities] = useState<OpportunityJob[]>(SAMPLE_OPPORTUNITIES);
  const [filterType, setFilterType] = useState<string>('all');
  const [appliedJobTitle, setAppliedJobTitle] = useState<string | null>(null);

  const handleApply = (id: string, title: string) => {
    setOpportunities((prev) =>
      prev.map((job) => (job.id === id ? { ...job, applied: true } : job))
    );
    setAppliedJobTitle(title);
    setTimeout(() => {
      setAppliedJobTitle(null);
    }, 3000);
  };

  const filtered = opportunities.filter((job) => {
    if (filterType === 'all') return true;
    if (filterType === 'internship') return job.type.toLowerCase().includes('internship');
    if (filterType === 'fulltime') return job.type.toLowerCase().includes('full-time');
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1280px]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[12px] font-bold text-[#004ac6] uppercase tracking-wider font-headline">
            Recruiter Match Engine
          </span>
          <h1 className="font-headline text-[28px] font-bold text-[#0b1c30]">
            Matched Entry-Level Opportunities
          </h1>
          <p className="text-[14px] text-[#434655]">
            Openings calibrated against your verified milestones and skills mastery scores.
          </p>
        </div>

        {appliedJobTitle && (
          <div className="px-4 py-2 bg-[#6cf8bb]/30 text-[#00714d] rounded-2xl flex items-center gap-2 font-headline font-semibold text-[13px] animate-in fade-in">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Applied to {appliedJobTitle} with Verified Blueprint!</span>
          </div>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 border-b border-[#eff4ff] pb-3">
        {[
          { id: 'all', label: 'All Openings' },
          { id: 'fulltime', label: 'Full-time Roles' },
          { id: 'internship', label: 'Internships' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl font-headline text-[12px] font-semibold transition-all ${
              filterType === tab.id
                ? 'bg-[#004ac6] text-white shadow-xs'
                : 'text-[#434655] hover:bg-[#eff4ff]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-3xl p-6 border border-[#eff4ff] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-headline text-[17px] font-bold text-[#0b1c30]">
                  {job.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c3c6d7]"></span>
                <span className="font-semibold text-[14px] text-[#004ac6]">
                  {job.company}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#434655]">
                  {job.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#737686]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">payments</span>
                  {job.salary}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  {job.deadline}
                </span>
              </div>

              {/* Skills match tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-[11px] text-[#006c49] font-semibold">Matched:</span>
                {job.matchingSkills.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-[#6cf8bb]/30 text-[#00714d] text-xs font-medium"
                  >
                    ✓ {s}
                  </span>
                ))}
                {job.missingSkills.length > 0 && (
                  <>
                    <span className="text-[11px] text-[#737686] font-semibold ml-2">Needs:</span>
                    {job.missingSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#737686] text-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Match score & CTA */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 shrink-0">
              <div className="text-right">
                <span className="text-[11px] text-[#434655] block font-headline">Readiness Match</span>
                <div className="font-headline text-[22px] font-bold text-[#006c49]">
                  {job.matchScore}%
                </div>
              </div>

              {job.applied ? (
                <button
                  disabled
                  className="px-5 py-2.5 bg-[#eff4ff] text-[#006c49] font-headline text-[13px] font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>Applied</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApply(job.id, job.title)}
                  className="px-5 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] text-white font-headline text-[13px] font-semibold rounded-xl shadow-xs transition-colors"
                >
                  Apply with Blueprint
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
