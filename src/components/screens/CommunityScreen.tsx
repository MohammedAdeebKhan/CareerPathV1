import React, { useState } from 'react';
import { SAMPLE_STUDY_GROUPS } from '../../data/tracks';
import { StudyGroup } from '../../types';

interface CommunityScreenProps {
  onRequestChat: () => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ onRequestChat }) => {
  const [groups, setGroups] = useState<StudyGroup[]>(SAMPLE_STUDY_GROUPS);

  const toggleJoin = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, joined: !g.joined } : g))
    );
  };

  return (
    <div className="space-y-6 max-w-[1280px]">
      <div>
        <span className="text-[12px] font-bold text-[#004ac6] uppercase tracking-wider font-headline">
          Student Network
        </span>
        <h1 className="font-headline text-[28px] font-bold text-[#0b1c30]">
          Study Pods &amp; Alumni Community
        </h1>
        <p className="text-[14px] text-[#434655]">
          Collaborate with students in your cohort and connect with working alumni mentors.
        </p>
      </div>

      {/* Mentor Highlight Banner */}
      <div className="bg-[#eff4ff] rounded-3xl p-6 border border-[#d3e4fe] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC85Dz08sTUq1ohBNhp8LKYD1yhV5DgU7teVCiRn3znEdc2xbZTd5HVF0ZFomxJ3CACy6JF3rMXdmDEgkH_u7dq8kcjLCWIqHfaGuMwWLKL0y5PUNcNxDwhzVFn9sgazjKBu3jXg6TR5pOejDJHMQxBxTcJzvj9dVEeqjXIf-OrrfnrWbIUi71I8bEt952k0Lv8l6GlGDQbmxe-9GFN-vX3YEq0kADBYr2U9WjtXLJ9IZG8OZ_z1ylQvg"
              alt="Priya Nair"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline text-[16px] font-bold text-[#0b1c30]">
                Priya Nair
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white text-[#004ac6]">
                Alumni '23
              </span>
            </div>
            <p className="text-[13px] text-[#434655]">Data Analyst @ Stripe • Alumni Mentor</p>
            <p className="text-[12px] text-[#006c49] mt-0.5 font-medium">
              Available for 15-minute 1-on-1 career &amp; SQL screening coffee chats
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRequestChat}
          className="px-5 py-2.5 bg-[#004ac6] hover:bg-[#2563eb] text-white font-headline text-[13px] font-semibold rounded-xl transition-all shadow-xs shrink-0"
        >
          Book 15-min Session
        </button>
      </div>

      {/* Study Pods Section */}
      <div className="space-y-4">
        <h3 className="font-headline text-[18px] font-bold text-[#0b1c30]">
          Active Study Pods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((pod) => (
            <div
              key={pod.id}
              className="bg-white rounded-3xl p-6 border border-[#eff4ff] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-headline text-[#434655]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">groups</span>
                    {pod.membersCount} students
                  </span>
                  <span className="text-[#004ac6] font-semibold">Active</span>
                </div>
                <h4 className="font-headline text-[15px] font-bold text-[#0b1c30]">
                  {pod.name}
                </h4>
                <p className="text-[12px] text-[#434655]">{pod.focus}</p>
                <div className="p-2.5 rounded-xl bg-[#f8f9ff] text-[11px] text-[#0b1c30]">
                  <span className="text-[#737686] block">Next Pod Meeting:</span>
                  <strong className="text-[#004ac6]">{pod.nextMeeting}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleJoin(pod.id)}
                className={`w-full py-2 rounded-xl text-[12px] font-headline font-semibold transition-colors ${
                  pod.joined
                    ? 'bg-[#6cf8bb]/30 text-[#00714d]'
                    : 'bg-[#eff4ff] hover:bg-[#dce9ff] text-[#004ac6]'
                }`}
              >
                {pod.joined ? '✓ Joined Pod' : 'Join Study Pod'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
