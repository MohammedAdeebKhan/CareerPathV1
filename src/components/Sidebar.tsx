import React, { useState } from 'react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  selectedDate: number;
  onSelectDate: (day: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  selectedDate,
  onSelectDate,
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = Sep 2026

  const months = ['Sep 2026', 'Oct 2026', 'Nov 2026'];

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'my-path', label: 'My Path', icon: 'alt_route' },
    { id: 'learn', label: 'Learn', icon: 'menu_book' },
    { id: 'opportunities', label: 'Opportunities', icon: 'work' },
    { id: 'community', label: 'Community', icon: 'groups' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  // Calendar dates for Sep 2026: Starts on Tuesday (2 blank days: Sun, Mon)
  // Total 30 days
  const sepDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <aside
      className="fixed inset-y-0 left-0 w-72 bg-[#ffffff] z-30 flex flex-col justify-between overflow-y-auto border-r border-[#eff4ff] shadow-sm select-none"
      data-purpose="sidebar"
    >
      <div className="p-6">
        {/* Brand Header */}
        <div
          onClick={() => onTabChange('my-path')}
          className="flex items-center gap-3 mb-8 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#6ffbbe] flex items-center justify-center text-[#006c49] shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">explore</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-[17px] font-bold text-[#0b1c30] tracking-tight leading-none">
              CareerPath
            </span>
            <span className="text-[11px] font-medium text-[#434655] leading-none mt-1">
              Student Portal
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 mb-8" data-purpose="main-navigation">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-2.5 rounded-xl transition-all text-left text-[14px] ${
                  isActive
                    ? 'bg-[#e5eeff] text-[#004ac6] font-semibold shadow-xs'
                    : 'text-[#434655] hover:text-[#0b1c30] hover:bg-[#eff4ff] font-normal'
                }`}
              >
                <span className="material-symbols-outlined text-[19px] mr-2.5 opacity-80">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.id === 'opportunities' && (
                  <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#00714d]">
                    4 New
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Roadmap Calendar Widget */}
        <section
          className="bg-[#eff4ff] rounded-2xl p-4 shadow-xs"
          data-purpose="roadmap-calendar"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#0b1c30] uppercase tracking-wider font-headline">
              Roadmap Calendar
            </span>
            <button
              aria-label="Calendar options"
              onClick={() => onTabChange('my-path')}
              className="text-[#434655] hover:text-[#0b1c30] flex items-center transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-3 text-[12px] text-[#0b1c30]">
            <button
              aria-label="Previous month"
              onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentMonthIndex === 0}
              className="text-[#434655] hover:text-[#0b1c30] disabled:opacity-30 p-1 flex items-center transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">navigate_before</span>
            </button>
            <span className="text-[12px] font-semibold text-[#0b1c30] font-headline">
              {months[currentMonthIndex]}
            </span>
            <button
              aria-label="Next month"
              onClick={() => setCurrentMonthIndex((prev) => Math.min(months.length - 1, prev + 1))}
              disabled={currentMonthIndex === months.length - 1}
              className="text-[#434655] hover:text-[#0b1c30] disabled:opacity-30 p-1 flex items-center transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">navigate_next</span>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-1.5 text-center text-[11px] text-[#434655]">
            <span className="font-semibold text-[#434655]">S</span>
            <span className="font-semibold text-[#434655]">M</span>
            <span className="font-semibold text-[#434655]">T</span>
            <span className="font-semibold text-[#434655]">W</span>
            <span className="font-semibold text-[#434655]">T</span>
            <span className="font-semibold text-[#434655]">F</span>
            <span className="font-semibold text-[#434655]">S</span>

            {/* Blank padding days for Tuesday start (Sep 2026 starts on Tue) */}
            <span className="invisible">0</span>
            <span className="invisible">0</span>

            {sepDays.map((day) => {
              const isSelected = selectedDate === day;
              const isSep24 = day === 24;
              const hasActivity = day === 14 || day === 24;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onSelectDate(day)}
                  className={`relative w-6 h-6 mx-auto rounded-full text-[11px] flex items-center justify-center transition-all ${
                    isSelected || isSep24
                      ? 'bg-[#004ac6] text-white font-semibold shadow-xs'
                      : 'hover:bg-[#dce9ff] text-[#0b1c30]'
                  }`}
                  title={
                    day === 14
                      ? 'Sep 14: Milestone 01 Verified Proficient'
                      : day === 24
                      ? 'Sep 24: Active Milestone Target - Window Functions'
                      : `Sep ${day}`
                  }
                >
                  {day}
                  {hasActivity && !isSelected && !isSep24 && (
                    <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#006c49]"></span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Bottom Milestone Mini-Card */}
      <div className="p-6 pt-0">
        <div
          className="p-4 rounded-2xl bg-[#dce9ff]/60 border border-[#eff4ff] flex items-start gap-3 shadow-xs"
          data-purpose="milestone-status"
        >
          <div className="w-8 h-8 rounded-xl bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div>
            <h4 className="font-headline text-[13px] font-semibold text-[#0b1c30] leading-tight">
              You're on track
            </h4>
            <p className="text-[11px] text-[#434655] mt-1 leading-normal">
              Keep going to reach your next milestone.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
