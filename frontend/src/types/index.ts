export type AgentRole = 'strategist' | 'interviewer' | 'architect' | 'scout';

export interface AgentMessage {
  id: string;
  sender: 'user' | 'agent';
  agentRole?: AgentRole;
  agentName?: string;
  content: string;
  timestamp: string;
  cypherTrace?: string;
  graphEvidence?: {
    nodes: string[];
    coOccurrenceRate?: string;
    sampleJdCount?: number;
  };
  suggestedActions?: string[];
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'backend' | 'frontend' | 'database' | 'devops' | 'architecture' | 'ai';
  status: 'mastered' | 'gap' | 'adjacent';
  escoUri?: string;
  marketDemandRate: number; // e.g. 84 for 84%
  coOccursWith: string[];
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface JobTarget {
  id: string;
  title: string;
  company: string;
  location: string;
  experienceLevel: string;
  salaryRange: string;
  requiredSkills: string[];
  matchScore: number;
}

export interface RoadmapMilestone {
  period: '30-days' | '60-days' | '90-days';
  title: string;
  goal: string;
  skillsToClose: string[];
  tasks: {
    id: string;
    description: string;
    completed: boolean;
    resourceName: string;
    resourceType: 'article' | 'project' | 'course';
  }[];
}

export interface ResumeBulletDiff {
  id: string;
  section: string;
  original: string;
  optimized: string;
  addedKeywords: string[];
  starFormula: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  atsScoreImpact: string; // e.g. "+18%"
}
