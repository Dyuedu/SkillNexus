import React from 'react';
import { Network, Compass, FileCheck2, MessageSquare, UploadCloud, Moon, Sun, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: 'advisory' | 'graph' | 'roadmap' | 'tailor';
  setActiveTab: (tab: 'advisory' | 'graph' | 'roadmap' | 'tailor') => void;
  onOpenIngest: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  selectedJobTitle: string;
  matchScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenIngest,
  isDarkMode,
  setIsDarkMode,
  selectedJobTitle,
  matchScore,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
              <span className="font-heading font-semibold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-zinc-100">
                SkillNexus
              </span>
            </div>
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>
            
            {/* Minimal Target Job indicator */}
            <button
              onClick={onOpenIngest}
              className="hidden md:flex items-center space-x-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors group"
            >
              <span className="truncate max-w-[200px]">{selectedJobTitle}</span>
              <span className="font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400 tabular-nums">
                ({matchScore}%)
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Center Navigation Tabs (Linear-style segmented tabs) */}
          <nav className="hidden md:flex items-center space-x-1 bg-zinc-100/70 dark:bg-zinc-900/70 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
            <button
              onClick={() => setActiveTab('advisory')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'advisory'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Cố vấn Đa Agent</span>
            </button>

            <button
              onClick={() => setActiveTab('graph')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'graph'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Bản đồ Kỹ năng</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Lộ trình 30-60-90</span>
            </button>

            <button
              onClick={() => setActiveTab('tailor')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'tailor'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Tối ưu CV</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2.5">
            {/* Local Ollama Indicator */}
            <div className="hidden lg:flex items-center space-x-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 px-2 py-1 rounded border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-900">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>qwen2.5-coder:7b</span>
            </div>

            {/* Ingestion CTA Button */}
            <button
              onClick={onOpenIngest}
              className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 transition-colors shadow-sm"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nạp CV / Đổi JD</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-md transition-colors"
              aria-label="Chuyển chế độ sáng/tối"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden border-t border-zinc-200 dark:border-zinc-800 py-2 justify-around">
          <button
            onClick={() => setActiveTab('advisory')}
            className={`text-xs px-2 py-1 rounded ${activeTab === 'advisory' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-zinc-400'}`}
          >
            Cố vấn
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`text-xs px-2 py-1 rounded ${activeTab === 'graph' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-zinc-400'}`}
          >
            Bản đồ
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`text-xs px-2 py-1 rounded ${activeTab === 'roadmap' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-zinc-400'}`}
          >
            Lộ trình
          </button>
          <button
            onClick={() => setActiveTab('tailor')}
            className={`text-xs px-2 py-1 rounded ${activeTab === 'tailor' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-zinc-400'}`}
          >
            Tối ưu CV
          </button>
        </div>
      </div>
    </header>
  );
};
