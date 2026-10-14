import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen 
} from 'lucide-react';
import type { RoadmapMilestone, ResumeBulletDiff } from '../types';

interface RoadmapAndTailorProps {
  mode: 'roadmap' | 'tailor';
  roadmap: RoadmapMilestone[];
  resumeDiffs: ResumeBulletDiff[];
}

export const RoadmapAndTailor: React.FC<RoadmapAndTailorProps> = ({
  mode,
  roadmap,
  resumeDiffs,
}) => {
  // Roadmap state
  const [activePeriod, setActivePeriod] = useState<'30-days' | '60-days' | '90-days'>('30-days');
  const [localRoadmap, setLocalRoadmap] = useState<RoadmapMilestone[]>(roadmap);

  // Resume Tailor state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleTask = (period: string, taskId: string) => {
    setLocalRoadmap((prev) =>
      prev.map((m) => {
        if (m.period === period) {
          return {
            ...m,
            tasks: m.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: !t.completed } : t
            ),
          };
        }
        return m;
      })
    );
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentMilestone = localRoadmap.find((m) => m.period === activePeriod) || localRoadmap[0];

  if (mode === 'roadmap') {
    return (
      <div className="flex flex-col h-[calc(100vh-125px)] bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl shadow-subtle p-5 sm:p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div>
            <h2 className="font-heading font-semibold text-base text-zinc-900 dark:text-zinc-100">
              Lộ Trình Thích Ứng (30 - 60 - 90 Ngày)
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Tập trung giải quyết các khoảng cách kỹ năng có trọng số tuyển dụng cao nhất
            </p>
          </div>

          {/* Period Switcher */}
          <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
            {(['30-days', '60-days', '90-days'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  activePeriod === period
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
                }`}
              >
                {period === '30-days' ? '30 Ngày' : period === '60-days' ? '60 Ngày' : '90 Ngày'}
              </button>
            ))}
          </div>
        </div>

        {/* Milestone Goal Summary */}
        <div className="mt-5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
                Mục tiêu giai đoạn:
              </span>
              <h3 className="font-heading font-semibold text-sm text-zinc-900 dark:text-zinc-100 mt-1">
                {currentMilestone.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                {currentMilestone.goal}
              </p>
            </div>
            
            <div className="flex items-center space-x-1">
              {currentMilestone.skillsToClose.map((skill, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium"
                >
                  +{skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Task Checklist */}
        <div className="mt-6 space-y-2.5">
          <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
            Hành động cụ thể:
          </h4>
          <div className="space-y-2">
            {currentMilestone.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(currentMilestone.period, task.id)}
                className={`p-3.5 rounded-lg border flex items-start space-x-3 cursor-pointer transition-colors ${
                  task.completed
                    ? 'bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/40 dark:border-zinc-800/40 opacity-60'
                    : 'bg-white dark:bg-zinc-900/80 border-zinc-200/70 dark:border-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="mt-0.5">
                  {task.completed ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-zinc-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through text-zinc-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                    {task.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1.5 text-[10px] text-zinc-400 font-mono">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-zinc-400" />
                      <span>{task.resourceName}</span>
                    </span>
                    <span>•</span>
                    <span className="uppercase">[{task.resourceType}]</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // Resume Tailor View
  return (
    <div className="flex flex-col h-[calc(100vh-125px)] bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl shadow-subtle p-5 sm:p-6 overflow-y-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div>
          <h2 className="font-heading font-semibold text-base text-zinc-900 dark:text-zinc-100">
            Tối Ưu Hóa CV Theo Chuẩn STAR
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Chuyển đổi mô tả trách nhiệm chung chung thành câu định lượng có số liệu và từ khóa ATS
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+28% tỷ lệ qua lọc ATS</span>
        </div>
      </div>

      {/* Side-by-Side Diffs */}
      <div className="mt-5 space-y-4">
        {resumeDiffs.map((diff) => (
          <div key={diff.id} className="border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl overflow-hidden">
            
            {/* Section Tag */}
            <div className="bg-zinc-50 dark:bg-zinc-900/60 px-4 py-2 border-b border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
              <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">
                {diff.section}
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {diff.atsScoreImpact}
              </span>
            </div>

            {/* Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200/60 dark:divide-zinc-800/60">
              
              {/* Original Left Pane */}
              <div className="p-4 bg-zinc-50/20 dark:bg-zinc-950/20">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  CV Gốc:
                </span>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  "{diff.original}"
                </p>
              </div>

              {/* Optimized Right Pane */}
              <div className="p-4 bg-white dark:bg-zinc-900">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    Đã chuẩn hóa STAR:
                  </span>
                  <button
                    onClick={() => handleCopy(diff.id, diff.optimized)}
                    className="flex items-center space-x-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors normal-case"
                  >
                    {copiedId === diff.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === diff.id ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 font-medium leading-relaxed">
                  "{diff.optimized}"
                </p>

                {/* Added Keywords */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {diff.addedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    >
                      +{kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
