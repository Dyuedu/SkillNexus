import React, { useState } from 'react';
import { 
  Compass, 
  FileCheck2, 
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
      <div className="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-card p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Lộ Trình Nâng Cấp Kỹ Năng Thích Ứng (30 - 60 - 90 Ngày)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Được thiết kế dựa trên đồ thị tri thức để lấp đầy chính xác các khoảng cách cốt lõi cho vị trí mục tiêu
            </p>
          </div>

          {/* Period Switcher Tabs */}
          <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {(['30-days', '60-days', '90-days'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-colors ${
                  activePeriod === period
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {period === '30-days' ? '30 Ngày Đầu' : period === '60-days' ? '60 Ngày' : '90 Ngày Về Đích'}
              </button>
            ))}
          </div>
        </div>

        {/* Milestone Detail Banner */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-bold">
                Mục tiêu trọng tâm: {activePeriod}
              </span>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mt-1.5">
                {currentMilestone.title}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                {currentMilestone.goal}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 max-w-[200px] justify-end">
              {currentMilestone.skillsToClose.map((skill, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 font-bold"
                >
                  +{skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Task Checklist */}
        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-heading font-bold uppercase text-slate-500 tracking-wider">
            Danh sách việc cần làm (Action Items):
          </h4>
          <div className="space-y-2.5">
            {currentMilestone.tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(currentMilestone.period, task.id)}
                className={`p-3.5 rounded-xl border flex items-start space-x-3 cursor-pointer transition-all ${
                  task.completed
                    ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-70'
                    : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                <div className="mt-0.5">
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 hover:text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-slate-100'}`}>
                    {task.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-blue-600" />
                      <span>{task.resourceName}</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono text-slate-400">
                      [{task.resourceType}]
                    </span>
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
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-card p-6 overflow-y-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <FileCheck2 className="w-5 h-5 text-emerald-600" />
            <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Bộ Tinh Chỉnh CV Song Song (Split-Screen Resume Tailor)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Chuyển hóa mô tả trách nhiệm chung chung thành các gạch đầu dòng chuẩn STAR có định lượng & từ khóa ATS
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-800 dark:text-emerald-300">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Tăng trung bình +28% điểm khớp ATS</span>
        </div>
      </div>

      {/* Side-by-Side Diffs */}
      <div className="mt-6 space-y-6">
        {resumeDiffs.map((diff) => (
          <div key={diff.id} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-subtle">
            
            {/* Section Tag */}
            <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {diff.section}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {diff.atsScoreImpact}
              </span>
            </div>

            {/* Split Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
              
              {/* Original Left Pane */}
              <div className="p-4 bg-slate-50/50 dark:bg-slate-950/40">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase font-semibold mb-2">
                  <span>CV Gốc (Chưa tối ưu):</span>
                  <span className="text-amber-600">Ít số liệu định lượng</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  "{diff.original}"
                </p>
              </div>

              {/* Optimized Right Pane */}
              <div className="p-4 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between text-[11px] font-mono text-emerald-600 uppercase font-semibold mb-2">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Đã viết lại theo chuẩn STAR:</span>
                  </span>
                  <button
                    onClick={() => handleCopy(diff.id, diff.optimized)}
                    className="flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {copiedId === diff.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="normal-case">{copiedId === diff.id ? 'Đã sao chép' : 'Sao chép'}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold leading-relaxed font-sans">
                  "{diff.optimized}"
                </p>

                {/* Added keywords badges */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 mb-1.5">
                    Từ khóa kỹ thuật then chốt bổ sung:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {diff.addedKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium"
                      >
                        +{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* STAR Breakdown Drawer */}
                <div className="mt-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-[11px] font-mono text-slate-600 dark:text-slate-300 space-y-1">
                  <div><strong>S (Tình huống):</strong> {diff.starFormula.situation}</div>
                  <div><strong>A (Hành động):</strong> {diff.starFormula.action}</div>
                  <div><strong>R (Kết quả):</strong> {diff.starFormula.result}</div>
                </div>

              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
