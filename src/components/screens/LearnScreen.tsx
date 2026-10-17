import React, { useState } from 'react';
import { CareerTrack } from '../../types';

interface LearnScreenProps {
  track: CareerTrack;
  onOpenLab: () => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({ track, onOpenLab }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sql' | 'excel' | 'python'>('all');

  const modules = [
    {
      id: 'mod-1',
      category: 'sql',
      title: 'Window Functions & Advanced Partitioning',
      level: 'Module 4 • SQL Track',
      duration: '45 mins',
      status: 'In Progress (72%)',
      desc: 'Master SUM() OVER, ROW_NUMBER(), DENSE_RANK(), and lead/lag functions for time-series reporting.',
      interactive: true,
    },
    {
      id: 'mod-2',
      category: 'sql',
      title: 'Common Table Expressions (CTEs) & Subqueries',
      level: 'Module 3 • SQL Track',
      duration: '35 mins',
      status: 'Completed',
      desc: 'Deconstruct complex multi-table joins into clear, readable, high-performance CTE pipelines.',
      interactive: false,
    },
    {
      id: 'mod-3',
      category: 'excel',
      title: 'Advanced Lookup Formulas & Array Functions',
      level: 'Module 2 • Excel Track',
      duration: '60 mins',
      status: 'Completed (98% Score)',
      desc: 'Master XLOOKUP, INDEX/MATCH, dynamic arrays, and conditional nested aggregations.',
      interactive: false,
    },
    {
      id: 'mod-4',
      category: 'python',
      title: 'Pandas DataFrames & Vectorized Cleaning',
      level: 'Module 1 • Python Track',
      duration: '90 mins',
      status: 'Locked (Requires SQL Completion)',
      desc: 'Handle missing values, grouped aggregations, and tabular transformations without Python for-loops.',
      interactive: false,
    },
  ];

  const filteredModules =
    activeCategory === 'all'
      ? modules
      : modules.filter((m) => m.category === activeCategory);

  return (
    <div className="space-y-6 max-w-[1280px]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[12px] font-bold text-[#004ac6] uppercase tracking-wider font-headline">
            Curriculum Modules
          </span>
          <h1 className="font-headline text-[28px] font-bold text-[#0b1c30]">
            Interactive Learning Labs
          </h1>
          <p className="text-[14px] text-[#434655]">
            Hands-on technical sandboxes calibrated to real recruiter screening rubrics.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenLab}
          className="px-5 py-2.5 bg-[#004ac6] text-white font-headline text-[13px] font-semibold rounded-xl hover:bg-[#2563eb] transition-all flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">terminal</span>
          <span>Open SQL Assessment Lab</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#eff4ff] pb-3">
        {(['all', 'sql', 'excel', 'python'] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-headline text-[12px] font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-[#004ac6] text-white shadow-xs'
                : 'text-[#434655] hover:bg-[#eff4ff]'
            }`}
          >
            {cat === 'all'
              ? 'All Modules'
              : cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-[#eff4ff] shadow-xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2 font-headline font-semibold">
                <span className="text-[#004ac6] bg-[#eff4ff] px-2.5 py-0.5 rounded-full">
                  {item.level}
                </span>
                <span className="text-[#737686] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {item.duration}
                </span>
              </div>
              <h3 className="font-headline text-[16px] font-bold text-[#0b1c30]">
                {item.title}
              </h3>
              <p className="text-[13px] text-[#434655] mt-1">{item.desc}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff]">
              <span
                className={`text-[12px] font-semibold font-headline ${
                  item.status.includes('Completed')
                    ? 'text-[#006c49]'
                    : item.status.includes('Progress')
                    ? 'text-[#004ac6]'
                    : 'text-[#737686]'
                }`}
              >
                {item.status}
              </span>
              {item.interactive ? (
                <button
                  type="button"
                  onClick={onOpenLab}
                  className="px-4 py-2 bg-[#004ac6] hover:bg-[#2563eb] text-white text-[12px] font-headline font-semibold rounded-xl transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Launch Lab</span>
                </button>
              ) : (
                <span className="text-[12px] text-[#737686]">
                  {item.status.includes('Completed') ? 'Reviewed' : 'Locked'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
