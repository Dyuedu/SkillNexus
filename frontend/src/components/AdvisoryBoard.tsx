import React, { useState } from 'react';
import { 
  Send, 
  Terminal, 
  Code2, 
  FileText, 
  Compass, 
  Sparkles, 
  TrendingUp,
  Cpu,
  ChevronDown,
  ChevronUp,
  Database
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

  const getAgentInfo = (role?: AgentRole) => {
    switch (role) {
      case 'strategist':
        return { name: 'Career Strategist', icon: Compass };
      case 'interviewer':
        return { name: 'Tech Lead Interviewer', icon: Code2 };
      case 'architect':
        return { name: 'Resume Architect', icon: FileText };
      case 'scout':
        return { name: 'Market Scout', icon: TrendingUp };
      default:
        return { name: 'Supervisor Agent', icon: Sparkles };
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-125px)] bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl shadow-subtle overflow-hidden">
      
      {/* Sleek Top Filter Bar */}
      <div className="px-4 py-2.5 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between">
        <div className="flex items-center space-x-1 overflow-x-auto">
          <span className="text-[11px] font-mono text-zinc-400 mr-2 uppercase tracking-wider hidden sm:inline">
            Agent:
          </span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'interviewer', label: 'Tech Lead' },
            { id: 'strategist', label: 'Chiến lược gia' },
            { id: 'architect', label: 'Kiến trúc sư CV' },
            { id: 'scout', label: 'Thị trường' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedAgentFilter(item.id as 'all' | AgentRole)}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                selectedAgentFilter === item.id
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1.5 text-[11px] font-mono text-zinc-400">
          <Database className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Neo4j GraphRAG</span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {filteredMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          const info = getAgentInfo(msg.agentRole);
          const Icon = info.icon;
          const isTraceOpen = expandedTraceId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-2xl ${isUser ? 'ml-auto' : 'mr-auto'}`}
            >
              {/* Sender Name & Timestamp */}
              <div className="flex items-center space-x-2 mb-1.5 px-0.5">
                {!isUser ? (
                  <div className="flex items-center space-x-1.5 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                    <div className="w-4 h-4 rounded bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                      <Icon className="w-2.5 h-2.5" />
                    </div>
                    <span>{info.name}</span>
                  </div>
                ) : (
                  <span className="text-xs text-zinc-400 font-medium">Bạn</span>
                )}
                <span className="text-[10px] text-zinc-400 font-mono">{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`text-sm leading-relaxed ${
                  isUser
                    ? 'p-3.5 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-tr-sm shadow-subtle'
                    : 'p-4 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/70 text-zinc-900 dark:text-zinc-100 rounded-tl-sm border border-zinc-200/50 dark:border-zinc-800/50 shadow-subtle'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.content}</div>

                {/* Collapsible GraphRAG Grounding Snippet */}
                {!isUser && msg.cypherTrace && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800/60">
                    <button
                      onClick={() => setExpandedTraceId(isTraceOpen ? null : msg.id)}
                      className="flex items-center justify-between w-full text-[11px] font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                    >
                      <div className="flex items-center space-x-1.5">
                        <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Minh chứng GraphRAG ({msg.graphEvidence?.sampleJdCount || 1420} JDs thực tế)</span>
                      </div>
                      {isTraceOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isTraceOpen && (
                      <div className="mt-2 p-3 bg-zinc-950 text-zinc-200 rounded-lg text-xs font-mono overflow-x-auto border border-zinc-800">
                        <div className="text-[10px] text-zinc-500 mb-1">
                          // Cypher query:
                        </div>
                        <code className="text-zinc-300">{msg.cypherTrace}</code>
                        {msg.graphEvidence && (
                          <div className="mt-2 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400 space-y-0.5">
                            <div>• Tần suất: {msg.graphEvidence.coOccurrenceRate}</div>
                            <div>• Node đồ thị: {msg.graphEvidence.nodes.join(' → ')}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Chips */}
              {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {msg.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => onSelectActionChip(action)}
                      className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors text-left"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Live Generation Indicator */}
        {isGenerating && (
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 p-2">
            <Cpu className="w-3.5 h-3.5 animate-spin text-blue-500" />
            <span>Ollama đang lập luận & đối chiếu Đồ thị Tri thức...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isGenerating}
            placeholder={
              selectedAgentFilter === 'interviewer'
                ? 'Trả lời câu hỏi kỹ thuật của Tech Lead...'
                : selectedAgentFilter === 'strategist'
                ? 'Hỏi Chiến lược gia về lộ trình lương hoặc thăng tiến...'
                : 'Nhập câu hỏi hoặc yêu cầu cho hội đồng AI...'
            }
            className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 disabled:opacity-40 transition-colors"
            aria-label="Gửi tin nhắn"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

    </div>
  );
};
