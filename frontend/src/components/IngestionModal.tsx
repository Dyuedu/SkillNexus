import React, { useState } from 'react';
import { X, UploadCloud, FileText, ShieldCheck, CheckCircle2, ChevronRight, Briefcase } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-950/80 rounded-lg text-blue-700 dark:text-blue-300">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-base text-slate-900 dark:text-white">
                Nạp Hồ Sơ CV & Thiết Lập Mục Tiêu Tuyển Dụng
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Chuẩn hóa kỹ năng ESCO/O*NET và đối sánh trên 48.000 việc làm VietJobs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          
          {/* Quick Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Chọn nhanh hồ sơ mẫu thực chiến:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSelectPreset('huy')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedPreset === 'huy'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold">Huy (22t) — Fresher Backend</span>
                  {selectedPreset === 'huy' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Java, Spring Boot, MySQL → Mục tiêu FinTech Backend
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('linh')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedPreset === 'linh'
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs font-bold">Linh (24t) — Frontend chuyển AI</span>
                  {selectedPreset === 'linh' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  React, TypeScript → Mục tiêu Fullstack & AI Agent
                </p>
              </button>
            </div>
          </div>

          {/* CV Text Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Nội dung CV tóm lược / Văn bản trích xuất:</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">PDF / DOCX tự động trích xuất</span>
            </div>
            <textarea
              rows={4}
              value={cvText}
              onChange={(e) => {
                setCvText(e.target.value);
                setSelectedPreset('custom');
              }}
              className="w-full text-xs font-mono p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-200"
              placeholder="Dán nội dung kỹ năng, kinh nghiệm từ CV của bạn..."
            />
          </div>

          {/* Target Job Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1 mb-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Chọn vị trí việc làm mục tiêu (Mẫu từ VietJobs):</span>
            </label>
            <div className="space-y-2">
              {SAMPLE_JOBS.map((job) => (
                <div
                  key={job.id}
                  onClick={() => {
                    setTargetJob(job);
                    onSelectJob(job);
                  }}
                  className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
                    targetJob.id === job.id
                      ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-heading text-xs font-semibold">{job.title}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                        {job.company}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {job.location} • Lương: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{job.salaryRange}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300">
                      {job.matchScore}% khớp
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PDPL Privacy Shield Notice (Law No. 91/2025/QH15) */}
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-start space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    Bảo vệ Dữ liệu Cá nhân (Luật 91/2025/QH15 & Local-First)
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase font-bold">
                    100% On-Device
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 text-[11px]">
                  CV của bạn được phân tích bởi mô hình cục bộ (Ollama: <code className="font-mono">qwen2.5-coder:7b</code>) ngay trên máy bạn. Tên, số điện thoại, email được tự động che giấu (masking) trước khi đối sánh với đồ thị kỹ năng.
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacy-opt"
                    checked={isAnonymousOptIn}
                    onChange={(e) => setIsAnonymousOptIn(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                  />
                  <label htmlFor="privacy-opt" className="text-[11px] text-slate-700 dark:text-slate-300 cursor-pointer">
                    Cho phép đóng góp ẩn danh cụm kỹ năng vào Đồ thị Tri thức IT Việt Nam
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-5 py-2 rounded-lg text-xs font-semibold bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <span>Bắt đầu Phân tích Đa Agent</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
