import React from 'react';
import { Target, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
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
  const gapCount = skills.filter((s) => s.status === 'gap').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      
      {/* KPI 1: Target Match Score */}
      <div 
        onClick={onOpenIngest}
        className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-subtle hover:border-blue-500 cursor-pointer transition-colors"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">Độ khớp Mục tiêu</span>
          <Target className="w-4 h-4 text-blue-600" />
        </div>
        <div className="mt-1 flex items-baseline space-x-2">
          <span className="font-heading font-bold text-2xl text-slate-900 dark:text-white tabular-numbers">
            {currentJob.matchScore}%
          </span>
          <span className="text-[11px] font-mono text-emerald-600 font-semibold">
            +17% sau tối ưu
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-blue-600 h-1.5 rounded-full"
            style={{ width: `${currentJob.matchScore}%` }}
          ></div>
        </div>
      </div>

      {/* KPI 2: Mastered Skills */}
      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-subtle">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">Kỹ năng Đã có</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="mt-1 flex items-baseline space-x-2">
          <span className="font-heading font-bold text-2xl text-emerald-600 dark:text-emerald-400 tabular-numbers">
            {masteredCount}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">/ {skills.length} chuẩn hóa</span>
        </div>
        <p className="text-[11px] text-slate-500 truncate mt-1">
          Java, Spring Boot, MySQL...
        </p>
      </div>

      {/* KPI 3: Critical Gaps */}
      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-subtle">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">Khoảng cách Trọng yếu</span>
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div className="mt-1 flex items-baseline space-x-2">
          <span className="font-heading font-bold text-2xl text-amber-600 dark:text-amber-400 tabular-numbers">
            {gapCount}
          </span>
          <span className="text-[11px] text-amber-700 dark:text-amber-300 font-mono font-semibold">
            Cần giải quyết gấp
          </span>
        </div>
        <p className="text-[11px] text-amber-600 truncate mt-1 font-mono font-medium">
          Docker, Redis, Kafka
        </p>
      </div>

      {/* KPI 4: Salary Delta */}
      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-subtle">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">Tiềm năng Mức lương</span>
          <TrendingUp className="w-4 h-4 text-purple-600" />
        </div>
        <div className="mt-1 flex items-baseline space-x-1">
          <span className="font-heading font-bold text-xl text-slate-900 dark:text-white tabular-numbers">
            18 - 28M
          </span>
          <span className="text-[11px] text-slate-500 font-mono">VNĐ/tháng</span>
        </div>
        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 truncate mt-1 font-medium">
          Tăng ~35% khi có Redis & CI/CD
        </p>
      </div>

    </div>
  );
};
