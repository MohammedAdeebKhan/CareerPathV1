import React, { useState } from 'react';
import { CareerTrack } from '../../types';

interface ProfileScreenProps {
  track: CareerTrack;
  onNavigateToMyPath: () => void;
  onDownloadBlueprint: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  track,
  onNavigateToMyPath,
  onDownloadBlueprint,
}) => {
  const [studentName, setStudentName] = useState('Aditi Morgan');
  const [degree, setDegree] = useState('B.S. Computer Science & Statistics, Class of 2026');
  const [university, setUniversity] = useState('University of California');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-[1000px]">
      <div>
        <span className="text-[12px] font-bold text-[#004ac6] uppercase tracking-wider font-headline">
          Student Profile
        </span>
        <h1 className="font-headline text-[28px] font-bold text-[#0b1c30]">
          Profile &amp; Career Trajectory
        </h1>
        <p className="text-[14px] text-[#434655]">
          Manage your student credentials, verified skills, and resume ATS calibration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Summary */}
        <div className="bg-white rounded-3xl p-6 border border-[#eff4ff] shadow-xs flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-3xl bg-[#2563eb] text-white font-headline text-3xl font-bold flex items-center justify-center ring-4 ring-[#dbe1ff]">
            AM
          </div>
          <div>
            <h3 className="font-headline text-[18px] font-bold text-[#0b1c30]">
              {studentName}
            </h3>
            <p className="text-[12px] text-[#434655]">{university}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-[#eff4ff] text-[#004ac6] text-xs font-semibold rounded-full font-headline">
              {track.roleName} Candidate
            </span>
          </div>

          <div className="w-full pt-4 border-t border-[#eff4ff] text-left space-y-2 text-[12px]">
            <div className="flex justify-between">
              <span className="text-[#737686]">Market Readiness</span>
              <strong className="text-[#006c49] font-headline">{track.overallReadiness}%</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#737686]">Milestones Completed</span>
              <strong className="text-[#0b1c30] font-headline">1 of 5</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#737686]">Target Graduation</span>
              <strong className="text-[#0b1c30] font-headline">Nov 2026</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={onDownloadBlueprint}
            className="w-full py-2.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#004ac6] font-headline text-[13px] font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download PDF Blueprint</span>
          </button>
        </div>

        {/* Right 2 Columns: Credentials & Settings */}
        <div className="md:col-span-2 space-y-6">
          {/* Resume & ATS Score Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#eff4ff] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006c49] text-[22px]">verified_user</span>
                <h4 className="font-headline text-[16px] font-bold text-[#0b1c30]">
                  Resume ATS Readiness: 87 / 100
                </h4>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#00714d]">
                Tier 1 Candidate
              </span>
            </div>
            <p className="text-[13px] text-[#434655]">
              Your resume automatically links your verified CareerPath milestone credentials and GitHub repository code for recruiters.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-lg bg-[#eff4ff] text-[#004ac6] text-xs font-semibold">
                ✓ PostgreSQL Validated
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#eff4ff] text-[#004ac6] text-xs font-semibold">
                ✓ Excel Modeling 98%
              </span>
              <span className="px-3 py-1 rounded-lg bg-[#eff4ff] text-[#004ac6] text-xs font-semibold">
                ✓ Statistical Variance
              </span>
            </div>
          </div>

          {/* Edit Profile Form */}
          <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-[#eff4ff] shadow-xs space-y-4">
            <h4 className="font-headline text-[16px] font-bold text-[#0b1c30]">
              Candidate Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div>
                <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#eff4ff] bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#004ac6]"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
                  University / College
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#eff4ff] bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#004ac6]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[12px] font-semibold text-[#0b1c30] mb-1">
                  Degree &amp; Class
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#eff4ff] bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#004ac6]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {isSaved ? (
                <span className="text-[12px] text-[#006c49] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Changes saved successfully!
                </span>
              ) : (
                <span></span>
              )}
              <button
                type="submit"
                className="px-5 py-2 bg-[#004ac6] hover:bg-[#2563eb] text-white font-headline text-[13px] font-semibold rounded-xl shadow-xs transition-colors"
              >
                Save Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
