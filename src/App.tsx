/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MyPathScreen } from './components/screens/MyPathScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { LearnScreen } from './components/screens/LearnScreen';
import { OpportunitiesScreen } from './components/screens/OpportunitiesScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { AssessmentLabModal } from './components/modals/AssessmentLabModal';
import { ChangePathModal } from './components/modals/ChangePathModal';
import { DiagnosticQuizModal } from './components/modals/DiagnosticQuizModal';
import { CoffeeChatModal } from './components/modals/CoffeeChatModal';
import { DownloadBlueprintModal } from './components/modals/DownloadBlueprintModal';
import { INITIAL_TRACKS } from './data/tracks';
import { CareerTrack } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('my-path');
  const [currentTrack, setCurrentTrack] = useState<CareerTrack>(INITIAL_TRACKS['data-analyst']);
  const [selectedDate, setSelectedDate] = useState<number>(24);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isChangePathOpen, setIsChangePathOpen] = useState(false);
  const [isDiagnosticQuizOpen, setIsDiagnosticQuizOpen] = useState(false);
  const [isCoffeeChatOpen, setIsCoffeeChatOpen] = useState(false);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);

  const [queriesPassed, setQueriesPassed] = useState(3);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleCompleteQuery = () => {
    setQueriesPassed((prev) => Math.min(5, prev + 1));
    setCurrentTrack((prev) => {
      const nextReadiness = Math.min(100, prev.overallReadiness + 3);
      const updatedMilestones = prev.milestones.map((m) =>
        m.id === 'm2'
          ? {
              ...m,
              progressPercent: Math.min(100, (m.progressPercent || 72) + 8),
              modulesPassed: '5/6 modules passed',
            }
          : m
      );

      return {
        ...prev,
        overallReadiness: nextReadiness,
        breakdown: {
          ...prev.breakdown,
          technicalCore: Math.min(100, prev.breakdown.technicalCore + 4),
        },
        currentNextAction: {
          ...prev.currentNextAction,
          labProgress: '4 of 5 queries passed',
        },
        milestones: updatedMilestones,
      };
    });
    showToast('🎉 Query Checkpoint 4 passed! Technical readiness updated.');
  };

  const handleQuizCompleted = (scorePercentage: number) => {
    setCurrentTrack((prev) => ({
      ...prev,
      overallReadiness: Math.min(100, prev.overallReadiness + 4),
      skillsMastery: prev.skillsMastery.map((s) =>
        s.id === 's1'
          ? {
              ...s,
              level: `Intermediate (${Math.min(90, s.percentage + 10)}%)`,
              percentage: Math.min(90, s.percentage + 10),
            }
          : s
      ),
    }));
    showToast(`✓ Diagnostic Quiz complete (${scorePercentage}%). Skills mastery recalibrated!`);
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
    if (day === 24) {
      showToast('Sep 24: Target milestone deadline for SQL Joins & Window Functions lab.');
    } else if (day === 14) {
      showToast('Sep 14: Completed Milestone 01 (Excel & Business Statistics Fundamentals - 98%).');
    } else {
      showToast(`Sep ${day}: Scheduled study sprint session.`);
    }
  };

  const handleSearchSelect = (type: 'skill' | 'milestone' | 'career', value: string) => {
    if (type === 'milestone') {
      setCurrentTab('my-path');
      showToast(`Navigated to ${value}`);
    } else if (type === 'skill') {
      setCurrentTab('learn');
      showToast(`Showing curriculum for ${value}`);
    } else if (type === 'career') {
      setIsChangePathOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c30] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="material-symbols-outlined text-[#6cf8bb] text-[20px]">info</span>
          <span className="text-[13px] font-medium font-headline">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
      />

      {/* Top Bar */}
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectSearchItem={handleSearchSelect}
        onProfileClick={() => setCurrentTab('profile')}
      />

      {/* Main Content Area */}
      <main className="pl-72 pt-16 min-h-screen" data-purpose="main-content">
        <div className="p-8 max-w-[1280px] mx-auto pb-16">
          {currentTab === 'my-path' && (
            <MyPathScreen
              track={currentTrack}
              onChangePath={() => setIsChangePathOpen(true)}
              onDownloadBlueprint={() => setIsBlueprintOpen(true)}
              onOpenLab={() => setIsAssessmentOpen(true)}
              onTakeQuiz={() => setIsDiagnosticQuizOpen(true)}
              onRequestChat={() => setIsCoffeeChatOpen(true)}
              candidateName="Aditi"
            />
          )}

          {currentTab === 'home' && (
            <HomeScreen
              track={currentTrack}
              onNavigateToMyPath={() => setCurrentTab('my-path')}
              onOpenLab={() => setIsAssessmentOpen(true)}
            />
          )}

          {currentTab === 'learn' && (
            <LearnScreen
              track={currentTrack}
              onOpenLab={() => setIsAssessmentOpen(true)}
            />
          )}

          {currentTab === 'opportunities' && <OpportunitiesScreen />}

          {currentTab === 'community' && (
            <CommunityScreen onRequestChat={() => setIsCoffeeChatOpen(true)} />
          )}

          {currentTab === 'profile' && (
            <ProfileScreen
              track={currentTrack}
              onNavigateToMyPath={() => setCurrentTab('my-path')}
              onDownloadBlueprint={() => setIsBlueprintOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <AssessmentLabModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onCompleteQuery={handleCompleteQuery}
        queriesPassed={queriesPassed}
      />

      <ChangePathModal
        isOpen={isChangePathOpen}
        onClose={() => setIsChangePathOpen(false)}
        currentTrackId={currentTrack.id}
        onSelectTrack={(newTrack) => {
          setCurrentTrack(newTrack);
          showToast(`Switched active track to ${newTrack.trackTitle}`);
        }}
      />

      <DiagnosticQuizModal
        isOpen={isDiagnosticQuizOpen}
        onClose={() => setIsDiagnosticQuizOpen(false)}
        onQuizCompleted={handleQuizCompleted}
      />

      <CoffeeChatModal
        isOpen={isCoffeeChatOpen}
        onClose={() => setIsCoffeeChatOpen(false)}
        mentor={currentTrack.mentor}
      />

      <DownloadBlueprintModal
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
        track={currentTrack}
      />
    </div>
  );
}
