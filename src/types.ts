export interface Milestone {
  id: string;
  number: string;
  title: string;
  status: 'completed' | 'active' | 'upcoming';
  statusLabel: string;
  completedDate?: string;
  score?: string;
  description: string;
  currentTopic?: string;
  modulesPassed?: string;
  tags: string[];
  progressPercent?: number;
  unlockCondition?: string;
  estStart?: string;
  isGraduation?: boolean;
}

export interface SkillMasteryItem {
  id: string;
  name: string;
  level: string;
  percentage: number;
  colorType: 'primary' | 'secondary' | 'neutral';
}

export interface RecruiterSkillItem {
  id: string;
  name: string;
  matched: boolean;
}

export interface Mentor {
  name: string;
  title: string;
  company: string;
  alumniYear: string;
  avatarUrl: string;
  note: string;
}

export interface CareerTrack {
  id: string;
  roleName: string;
  trackTitle: string;
  estCompletion: string;
  openingsContext: string;
  overallReadiness: number;
  breakdown: {
    foundational: number;
    technicalCore: number;
    portfolioProjects: number;
  };
  currentNextAction: {
    title: string;
    meta: string;
    labName: string;
    labProgress: string;
    moduleIndex: number;
  };
  milestones: Milestone[];
  skillsMastery: SkillMasteryItem[];
  recruiterDemand: {
    matchedCount: number;
    totalCount: number;
    potentialHighlight: string;
    skills: RecruiterSkillItem[];
  };
  mentor: Mentor;
}

export interface OpportunityJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  deadline: string;
  applied?: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  focus: string;
  membersCount: number;
  nextMeeting: string;
  activeTopic: string;
  joined?: boolean;
}
