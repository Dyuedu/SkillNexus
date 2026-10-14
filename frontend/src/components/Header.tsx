import React from 'react';
import { Cpu, Network, Compass, FileCheck2, UploadCloud, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: 'advisory' | 'graph' | 'roadmap' | 'tailor';
  setActiveTab: (tab: 'advisory' | 'graph' | 'roadmap' | 'tailor') => void;
  onOpenIngest: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  selectedJobTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenIngest,
  isDarkMode,
  setIsDarkMode,
  selectedJobTitle,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
              <Network className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                  SkillNexus
                </span>
                <span className="text-[10px] font-mono uppercase bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-semibold px-2 py-0.5 rounded">
                  Agentic AI
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                IT Job Intelligence & Cố vấn Nghề nghiệp Đa Agent
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex space-x-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('advisory')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'advisory'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Cố vấn Đa Agent</span>
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'graph'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Đồ thị Kỹ năng</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Lộ trình 30-60-90</span>
            </button>

            <button
              onClick={() => setActiveTab('tailor')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'tailor'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Tối ưu hóa CV</span>
            </button>
          </nav>

          {/* Right Controls: AI Local Badge, Ingest CTA, Dark mode */}
          <div className="flex items-center space-x-3">
            {/* Ollama Local Status Pill */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Ollama: qwen2.5-coder:7b</span>
            </div>

            {/* Target Job Indicator Button */}
            <button
              onClick={onOpenIngest}
              className="hidden sm:flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-md bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              title="Nhấn để đổi mục tiêu JD hoặc tải lại CV"
            >
              <span className="truncate max-w-[150px] font-mono">{selectedJobTitle}</span>
            </button>

            {/* Upload CV / Ingestion CTA */}
            <button
              onClick={onOpenIngest}
              className="flex items-center space-x-2 text-xs font-medium px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all active:scale-[0.98]"
            >
              <UploadCloud className="w-4 h-4" />
              <span className="hidden sm:inline">Phân tích CV / JD</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-md text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Chuyển chế độ sáng/tối"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden border-t border-slate-200 dark:border-slate-800 py-2 justify-around">
          <button
            onClick={() => setActiveTab('advisory')}
            className={`text-xs px-2 py-1 rounded ${activeTab === 'advisory' ? 'text-blue-700 dark:text-blue-400 font-semibold' : 'text-slate-500'}`}
          >
            Cố vấn
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`text-xs px-2 py-1 rounded ${activeTab === 'graph' ? 'text-blue-700 dark:text-blue-400 font-semibold' : 'text-slate-500'}`}
          >
            Đồ thị
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`text-xs px-2 py-1 rounded ${activeTab === 'roadmap' ? 'text-blue-700 dark:text-blue-400 font-semibold' : 'text-slate-500'}`}
          >
            Lộ trình
          </button>
          <button
            onClick={() => setActiveTab('tailor')}
            className={`text-xs px-2 py-1 rounded ${activeTab === 'tailor' ? 'text-blue-700 dark:text-blue-400 font-semibold' : 'text-slate-500'}`}
          >
            Tối ưu CV
          </button>
        </div>
      </div>
    </header>
  );
};
