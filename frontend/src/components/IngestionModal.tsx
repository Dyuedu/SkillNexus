import React, { useState } from 'react';
import { X, FileText, ShieldCheck, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
import { SAMPLE_JOBS } from '../data/sampleData';
import type { JobTarget } from '../types';

interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectJob: (job: JobTarget) => void;
  selectedJobId: string;
  onAnalyzeProfile: (cvText: string, jobTarget: JobTarget) => void;
}

export const IngestionModal: React.FC<IngestionModalProps> = ({
  isOpen,
  onClose,
  onSelectJob,
  selectedJobId,
  onAnalyzeProfile,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<'huy' | 'linh' | 'custom'>('huy');
  const [cvText, setCvText] = useState<string>(
    'Nguyễn Văn Huy - Fresher Backend Developer\nKỹ năng: Java, Spring Boot, MySQL, REST API, Git, OOP, Data Structures & Algorithms\nDự án: Website thương mại điện tử Spring Boot + MySQL\nMục tiêu: Trở thành Backend Engineer chuyên sâu về FinTech tại TP.HCM'
  );
  const [isAnonymousOptIn, setIsAnonymousOptIn] = useState<boolean>(true);
  const [targetJob, setTargetJob] = useState<JobTarget>(
    SAMPLE_JOBS.find((j) => j.id === selectedJobId) || SAMPLE_JOBS[0]
  );

  if (!isOpen) return null;

  const handleSelectPreset = (preset: 'huy' | 'linh') => {
    setSelectedPreset(preset);
    if (preset === 'huy') {
      setCvText(
        'Nguyễn Văn Huy - Fresher Backend Developer\nKỹ năng: Java, Spring Boot, MySQL, REST API, Git, OOP, Data Structures & Algorithms\nDự án: Website thương mại điện tử Spring Boot + MySQL\nMục tiêu: Trở thành Backend Engineer chuyên sâu về FinTech tại TP.HCM'
      );
      const finTechJob = SAMPLE_JOBS[0];
      setTargetJob(finTechJob);
      onSelectJob(finTechJob);
    } else {
      setCvText(
        'Trần Mỹ Linh - Junior Frontend Developer (2 năm kinh nghiệm)\nKỹ năng: React, TypeScript, Next.js, Tailwind CSS, Redux Toolkit, REST API\nDự án: Dashboard Analytics B2B SaaS cho doanh nghiệp\nMục tiêu: Chuyển dịch sang AI Fullstack & Agentic AI Application Developer tại Hà Nội'
      );
      const aiJob = SAMPLE_JOBS[2];
      setTargetJob(aiJob);
      onSelectJob(aiJob);
    }
  };

  const handleSubmit = () => {
    onAnalyzeProfile(cvText, targetJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl max-w-xl w-full p-5 sm:p-6 text-zinc-900 dark:text-zinc-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div>
            <h2 className="font-heading font-semibold text-base text-zinc-900 dark:text-zinc-100">
              Nạp Hồ Sơ CV & Thiết Lập Mục Tiêu
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Chuẩn hóa taxonomy ESCO/O*NET và đối sánh trên 48.000 việc làm VietJobs
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          
          {/* Presets */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-2">
              Hồ sơ mẫu thực chiến (1-click test):
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSelectPreset('huy')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedPreset === 'huy'
                    ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/80 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-semibold">Huy (22t) — Backend</span>
                  {selectedPreset === 'huy' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Java, Spring Boot, MySQL → FinTech
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('linh')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedPreset === 'linh'
                    ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/80 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-semibold">Linh (24t) — Chuyển AI</span>
                  {selectedPreset === 'linh' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                </div>
                <p className="text-[11px] text-zinc-500 mt-1">
                  React, TypeScript → AI Fullstack
                </p>
              </button>
            </div>
          </div>

          {/* CV Text Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs text-zinc-500">
              <span className="flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Nội dung CV tóm lược:</span>
              </span>
              <span className="font-mono text-[10px]">Trích xuất tự động</span>
            </div>
            <textarea
              rows={3}
              value={cvText}
              onChange={(e) => {
                setCvText(e.target.value);
                setSelectedPreset('custom');
              }}
              className="w-full text-xs font-mono p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 text-zinc-800 dark:text-zinc-200"
              placeholder="Dán nội dung kỹ năng từ CV..."
            />
          </div>

          {/* Target Job Selector */}
          <div>
            <label className="text-xs text-zinc-500 flex items-center space-x-1 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Vị trí tuyển dụng mục tiêu (VietJobs):</span>
            </label>
            <div className="space-y-1.5">
              {SAMPLE_JOBS.map((job) => (
                <div
                  key={job.id}
                  onClick={() => {
                    setTargetJob(job);
                    onSelectJob(job);
                  }}
                  className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                    targetJob.id === job.id
                      ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/60 shadow-sm'
                      : 'border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-heading text-xs font-semibold">{job.title}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">({job.company})</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 font-mono">
                      {job.location} • {job.salaryRange}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100">
                    {job.matchScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 text-xs">
            <div className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Bảo vệ Dữ liệu Cá nhân (Luật 91/2025/QH15):
                </span>{' '}
                CV được xử lý 100% trên máy cục bộ qua mô hình Ollama. Tên, số điện thoại, email được ẩn danh hóa.
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacy-opt"
                    checked={isAnonymousOptIn}
                    onChange={(e) => setIsAnonymousOptIn(e.target.checked)}
                    className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400 h-3.5 w-3.5"
                  />
                  <label htmlFor="privacy-opt" className="text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    Đóng góp ẩn danh cụm kỹ năng vào Đồ thị Tri thức IT Việt Nam
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-end space-x-2.5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 transition-colors shadow-sm"
          >
            <span>Phân tích hồ sơ</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
