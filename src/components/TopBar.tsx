import React, { useState, useRef, useEffect } from 'react';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectSearchItem: (type: 'skill' | 'milestone' | 'career', value: string) => void;
  onProfileClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  onSearchChange,
  onSelectSearchItem,
  onProfileClick,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 'n1',
      title: 'Mentor Note from Priya Nair',
      desc: 'Priya reviewed your SQL join practice queries: "Great progress on self-joins!"',
      time: '10m ago',
      unread: true,
    },
    {
      id: 'n2',
      title: 'Practice Lab Checkpoint Passed',
      desc: 'You completed Query 3: Multi-table aggregations with CTE.',
      time: '2h ago',
      unread: true,
    },
    {
      id: 'n3',
      title: 'New Recruiter Role Match',
      desc: 'Stripe posted a Junior Data Analyst role with an 88% skill match.',
      time: '1d ago',
      unread: false,
    },
  ];

  const searchableItems = [
    { type: 'skill' as const, name: 'SQL Joins & CTEs', category: 'Database Querying' },
    { type: 'skill' as const, name: 'Pandas & NumPy', category: 'Python Data Stack' },
    { type: 'skill' as const, name: 'Tableau & PowerBI', category: 'Data Visualization' },
    { type: 'milestone' as const, name: 'Milestone 02: SQL Basics & Querying', category: 'Active Now' },
    { type: 'milestone' as const, name: 'Milestone 01: Excel & Business Statistics', category: 'Verified' },
    { type: 'career' as const, name: 'Junior Data Analyst', category: 'Target Role' },
    { type: 'career' as const, name: 'Product Analytics Associate', category: 'Alternative Track' },
  ];

  const filteredItems = searchQuery.trim()
    ? searchableItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-72 z-20 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#eff4ff] shadow-xs">
      <div className="h-16 px-8 flex items-center justify-between gap-6 max-w-[1280px] mx-auto">
        {/* Top Search Bar for Careers & Skills */}
        <div ref={searchRef} className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#434655]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Search careers, skills, milestones..."
            className="w-full h-10 pl-10 pr-4 bg-[#f8f9ff] hover:bg-[#eff4ff] rounded-xl text-[13px] text-[#0b1c30] placeholder:text-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004ac6] focus:bg-white transition-all border border-transparent focus:border-[#004ac6]/30"
          />

          {/* Quick Search Autocomplete Dropdown */}
          {showSearchResults && filteredItems.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-xl border border-[#eff4ff] p-2 z-50">
              <div className="text-[10px] font-bold text-[#737686] uppercase tracking-wider px-3 py-1.5">
                Matching Results ({filteredItems.length})
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {filteredItems.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onSelectSearchItem(item.type, item.name);
                      setShowSearchResults(false);
                      onSearchChange('');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-xl hover:bg-[#f8f9ff] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#004ac6]">
                        {item.type === 'skill'
                          ? 'psychology'
                          : item.type === 'milestone'
                          ? 'flag'
                          : 'work'}
                      </span>
                      <span className="text-[13px] text-[#0b1c30] font-medium group-hover:text-[#004ac6]">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#737686]">{item.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notification Bell & User Avatar */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Notification Menu */}
          <div ref={notificationRef} className="relative">
            <button
              aria-label="Notifications"
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-xl bg-[#eff4ff] text-[#434655] hover:text-[#0b1c30] hover:bg-[#dce9ff] transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-[#eff4ff] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
                  <span className="font-headline text-[13px] font-bold text-[#0b1c30]">
                    Notifications
                  </span>
                  <span className="text-[11px] font-semibold text-[#004ac6] bg-[#dbe1ff] px-2 py-0.5 rounded-full">
                    2 New
                  </span>
                </div>
                <div className="divide-y divide-[#eff4ff] max-h-72 overflow-y-auto">
                  {notifications.map((item) => (
                    <div key={item.id} className="py-2.5 hover:bg-[#f8f9ff] px-1 rounded-lg">
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[12px] font-semibold text-[#0b1c30]">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#737686] whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#434655] mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <button
            type="button"
            onClick={onProfileClick}
            className="flex items-center gap-2.5 pl-1 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white font-headline flex items-center justify-center ring-2 ring-[#dbe1ff] shadow-xs group-hover:ring-[#004ac6] transition-all">
              <span className="font-bold text-xs tracking-wider">AM</span>
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="font-headline text-[13px] font-semibold text-[#0b1c30] group-hover:text-[#004ac6] transition-colors leading-none">
                Alex Morgan
              </span>
              <span className="text-[11px] text-[#434655] leading-none mt-1">
                Computer Science '26
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
