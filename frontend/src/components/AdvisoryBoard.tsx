import React, { useState } from 'react';
import { 
  Send, 
  Terminal, 
  Code2, 
  FileText, 
  Compass, 
  Sparkles, 
  Database, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import type { AgentMessage, AgentRole } from '../types';

interface AdvisoryBoardProps {
  messages: AgentMessage[];
  onSendMessage: (text: string, targetAgent?: AgentRole) => void;
  isGenerating: boolean;
  onSelectActionChip: (chipText: string) => void;
}

export const AdvisoryBoard: React.FC<AdvisoryBoardProps> = ({
  messages,
  onSendMessage,
  isGenerating,
  onSelectActionChip,
}) => {
  const [selectedAgentFilter, setSelectedAgentFilter] = useState<'all' | AgentRole>('all');
  const [inputText, setInputText] = useState('');
  const [expandedTraceId, setExpandedTraceId] = useState<string | null>(null);

  const filteredMessages = selectedAgentFilter === 'all'
    ? messages
    : messages.filter((m) => m.agentRole === selectedAgentFilter || m.sender === 'user');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating) return;
    const agentTarget = selectedAgentFilter !== 'all' ? selectedAgentFilter : undefined;
    onSendMessage(inputText.trim(), agentTarget);
    setInputText('');
  };

  const getAgentBadge = (role?: AgentRole) => {
    switch (role) {
      case 'strategist':
        return {
          name: 'Career Strategist',
          icon: Compass,
          bgColor: 'bg-blue-100 dark:bg-blue-950/80',
          textColor: 'text-blue-800 dark:text-blue-300',
          borderColor: 'border-blue-300 dark:border-blue-800',
        };
      case 'interviewer':
        return {
          name: 'Tech Lead Interviewer',
          icon: Code2,
          bgColor: 'bg-amber-100 dark:bg-amber-950/80',
          textColor: 'text-amber-800 dark:text-amber-300',
          borderColor: 'border-amber-300 dark:border-amber-800',
        };
      case 'architect':
        return {
          name: 'Resume Architect',
          icon: FileText,
          bgColor: 'bg-emerald-100 dark:bg-emerald-950/80',
          textColor: 'text-emerald-800 dark:text-emerald-300',
          borderColor: 'border-emerald-300 dark:border-emerald-800',
        };
      case 'scout':
        return {
          name: 'Market Scout',
          icon: TrendingUp,
          bgColor: 'bg-purple-100 dark:bg-purple-950/80',
          textColor: 'text-purple-800 dark:text-purple-300',
          borderColor: 'border-purple-300 dark:border-purple-800',
        };
      default:
        return {
          name: 'Supervisor Agent',
          icon: Sparkles,
          bgColor: 'bg-slate-100 dark:bg-slate-800',
          textColor: 'text-slate-800 dark:text-slate-200',
          borderColor: 'border-slate-300 dark:border-slate-700',
        };
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-card overflow-hidden">
      
      {/* Top Bar: 4 Specialized Agent Lenses */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-mono font-medium text-slate-400 mr-1 hidden sm:inline">
            GÓC NHÌN:
          </span>
          <button
            onClick={() => setSelectedAgentFilter('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedAgentFilter === 'all'
                ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Hội đồng Đa Agent
          </button>
          
          <button
            onClick={() => setSelectedAgentFilter('interviewer')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedAgentFilter === 'interviewer'
                ? 'bg-amber-600 text-white font-semibold'
                : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Tech Lead</span>
          </button>

          <button
            onClick={() => setSelectedAgentFilter('strategist')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedAgentFilter === 'strategist'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Chiến lược gia</span>
          </button>

          <button
            onClick={() => setSelectedAgentFilter('architect')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedAgentFilter === 'architect'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Kiến trúc sư CV</span>
          </button>

          <button
            onClick={() => setSelectedAgentFilter('scout')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedAgentFilter === 'scout'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Thám tử Thị trường</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500">
          <Database className="w-3.5 h-3.5 text-blue-600" />
          <span>Neo4j GraphRAG Connected</span>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((msg) => {
          const badge = getAgentBadge(msg.agentRole);
          const IconComponent = badge.icon;
          const isUser = msg.sender === 'user';
          const isTraceOpen = expandedTraceId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-3xl ${isUser ? 'ml-auto' : 'mr-auto'}`}
            >
              {/* Sender Badge */}
              <div className="flex items-center space-x-2 mb-1 px-1">
                {!isUser ? (
                  <div className={`flex items-center space-x-1 text-xs px-2 py-0.5 rounded-full font-mono font-medium ${badge.bgColor} ${badge.textColor} border ${badge.borderColor}`}>
                    <IconComponent className="w-3 h-3" />
                    <span>{badge.name}</span>
                  </div>
                ) : (
                  <span className="text-xs font-mono text-slate-500">Bạn</span>
                )}
                <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-xl text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-700 text-white rounded-tr-none shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-tl-none shadow-card'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.content}</div>

                {/* Grounding / Cypher Trace Accordion */}
                {!isUser && msg.cypherTrace && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/60">
                    <button
                      onClick={() => setExpandedTraceId(isTraceOpen ? null : msg.id)}
                      className="flex items-center justify-between w-full text-[11px] font-mono text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    >
                      <div className="flex items-center space-x-1.5">
                        <Terminal className="w-3.5 h-3.5 text-blue-600" />
                        <span>Minh chứng GraphRAG ({msg.graphEvidence?.sampleJdCount || 1420} JDs thực tế)</span>
                      </div>
                      {isTraceOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isTraceOpen && (
                      <div className="mt-2 p-2.5 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono overflow-x-auto">
                        <div className="text-[10px] text-slate-400 mb-1">
                          // Neo4j Cypher Execution:
                        </div>
                        <code>{msg.cypherTrace}</code>
                        {msg.graphEvidence && (
                          <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-amber-300">
                            • Tỷ lệ đồng xuất hiện: {msg.graphEvidence.coOccurrenceRate}
                            <br />
                            • Các node đồ thị liên quan: {msg.graphEvidence.nodes.join(' ↔ ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Suggested Action Chips */}
              {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {msg.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => onSelectActionChip(action)}
                      className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors shadow-subtle text-left"
                    >
                      → {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Live Generation Indicator */}
        {isGenerating && (
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-700 dark:text-blue-400 p-2">
            <Cpu className="w-4 h-4 animate-spin" />
            <span>Ollama qwen2.5-coder:7b đang lập luận & đối chiếu Đồ thị Tri thức...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isGenerating}
            placeholder={
              selectedAgentFilter === 'interviewer'
                ? 'Trả lời câu hỏi tình huống của Tech Lead...'
                : selectedAgentFilter === 'strategist'
                ? 'Hỏi Chiến lược gia về lộ trình lương hoặc chuyển đổi vị trí...'
                : 'Nhập câu hỏi hoặc yêu cầu cho hội đồng AI cố vấn...'
            }
            className="flex-1 text-xs sm:text-sm p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-slate-100 shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className="p-3 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white shadow-md shadow-blue-500/20 transition-all active:scale-95"
            aria-label="Gửi tin nhắn"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

    </div>
  );
};
