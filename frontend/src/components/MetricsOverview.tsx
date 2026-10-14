import React from 'react';
import { Target, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import type { JobTarget, SkillNode } from '../types';

interface MetricsOverviewProps {
  currentJob: JobTarget;
  skills: SkillNode[];
  onOpenIngest: () => void;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  currentJob,
  skills,
  onOpenIngest,
}) => {
  const masteredCount = skills.filter((s) => s.status === 'mastered').length;
  const gapSkills = skills.filter((s) => s.status === 'gap');

  return (
    <div className="w-full mb-3 flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-zinc-100/60 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-400">
      
      {/* Left: Summary Metrics */}
      <div className="flex items-center space-x-4 flex-wrap gap-y-1">
        
        {/* Match Score */}
        <div className="flex items-center space-x-1.5">
          <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Độ khớp:</span>
          <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {currentJob.matchScore}%
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
            (+17% sau tối ưu)
          </span>
        </div>

        <div className="h-3 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

        {/* Mastered Skills Count */}
        <div className="hidden sm:flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Đã có:</span>
          <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
            {masteredCount}/{skills.length} kỹ năng
          </span>
        </div>

        <div className="h-3 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>

        {/* Core Gaps */}
        <div className="flex items-center space-x-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Thiếu trọng yếu:</span>
          <div className="flex items-center space-x-1">
            {gapSkills.slice(0, 3).map((s) => (
              <span
                key={s.id}
                className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-medium"
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Right: Quick Ingestion Trigger */}
      <button
        onClick={onOpenIngest}
        className="hidden md:flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        <span>Chi tiết đối sánh</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
