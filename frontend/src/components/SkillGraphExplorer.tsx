import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Code2, 
  CheckCircle2, 
  AlertCircle, 
  Layers,
  Network
} from 'lucide-react';
import type { SkillNode } from '../types';

interface SkillGraphExplorerProps {
  skills: SkillNode[];
  onConsultAgentOnSkill: (skillName: string) => void;
}

export const SkillGraphExplorer: React.FC<SkillGraphExplorerProps> = ({
  skills,
  onConsultAgentOnSkill,
}) => {
  const [viewMode, setViewMode] = useState<'matrix' | 'canvas'>('matrix');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(
    skills.find((s) => s.status === 'gap') || skills[0]
  );

  const categories = [
    { id: 'backend', label: 'Backend Core & Frameworks' },
    { id: 'database', label: 'Database & Caching Layer' },
    { id: 'devops', label: 'Containers & Cloud DevOps' },
    { id: 'architecture', label: 'Architecture & Scalability' },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [skills, searchQuery]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-125px)] gap-4">
      
      {/* Left/Main Workspace: Cluster Matrix or Clean Graph Canvas */}
      <div className="flex-1 bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl shadow-subtle flex flex-col overflow-hidden">
        
        {/* Controls Toolbar */}
        <div className="px-4 py-2.5 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between flex-wrap gap-2">
          
          {/* Search Input */}
          <div className="relative w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Lọc kỹ năng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-zinc-200/60 dark:bg-zinc-800/60 p-0.5 rounded-md">
            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs transition-colors ${
                viewMode === 'matrix'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Phân tầng (Matrix)</span>
            </button>

            <button
              onClick={() => setViewMode('canvas')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs transition-colors ${
                viewMode === 'canvas'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400'
              }`}
            >
              <Network className="w-3 h-3" />
              <span>Đồ thị mạng (Graph)</span>
            </button>
          </div>

          {/* Simple Clean Legend */}
          <div className="flex items-center space-x-3 text-[11px] font-mono text-zinc-500">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Đã có ({skills.filter((s) => s.status === 'mastered').length})</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                Khoảng cách ({skills.filter((s) => s.status === 'gap').length})
              </span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {viewMode === 'matrix' ? (
            /* Matrix View: Clean Bento Layers */
            <div className="space-y-4">
              {categories.map((cat) => {
                const catSkills = filteredSkills.filter((s) => s.category === cat.id);
                if (catSkills.length === 0) return null;

                return (
                  <div key={cat.id} className="p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/20">
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {cat.label}
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {catSkills.length} kỹ năng
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
                      {catSkills.map((skill) => {
                        const isSelected = selectedNode?.id === skill.id;
                        const isMastered = skill.status === 'mastered';
                        const isGap = skill.status === 'gap';

                        return (
                          <div
                            key={skill.id}
                            onClick={() => setSelectedNode(skill)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-800 shadow-sm'
                                : 'border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-heading font-semibold text-zinc-900 dark:text-zinc-100">
                                {skill.name}
                              </span>
                              {isMastered && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              )}
                              {isGap && (
                                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              )}
                            </div>

                            <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                              <span>Nhu cầu thị trường:</span>
                              <span className="font-semibold text-zinc-700 dark:text-zinc-300 tabular-nums">
                                {skill.marketDemandRate}%
                              </span>
                            </div>

                            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full mt-1.5 overflow-hidden">
                              <div
                                className={`h-1 rounded-full ${
                                  isMastered
                                    ? 'bg-emerald-500'
                                    : isGap
                                    ? 'bg-amber-500'
                                    : 'bg-zinc-400'
                                }`}
                                style={{ width: `${skill.marketDemandRate}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Graph Canvas: Clean Minimalist SVG layout */
            <div className="h-full flex items-center justify-center relative min-h-[420px]">
              <svg className="w-full h-full max-w-[680px] max-h-[420px]" viewBox="0 0 680 400">
                {/* Hairline link connections */}
                {filteredSkills.map((node, i) => {
                  const x1 = 120 + (i % 4) * 140;
                  const y1 = 80 + Math.floor(i / 4) * 85;

                  return node.coOccursWith.map((targetId) => {
                    const targetIndex = filteredSkills.findIndex((s) => s.id === targetId);
                    if (targetIndex === -1 || targetIndex <= i) return null;

                    const x2 = 120 + (targetIndex % 4) * 140;
                    const y2 = 80 + Math.floor(targetIndex / 4) * 85;

                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#71717a"
                        strokeWidth={0.8}
                        strokeDasharray={node.status === 'gap' ? '3 3' : undefined}
                        opacity={0.3}
                      />
                    );
                  });
                })}

                {/* Nodes */}
                {filteredSkills.map((node, i) => {
                  const x = 120 + (i % 4) * 140;
                  const y = 80 + Math.floor(i / 4) * 85;
                  const isSelected = selectedNode?.id === node.id;
                  const isMastered = node.status === 'mastered';
                  const isGap = node.status === 'gap';

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer group"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 16 : 13}
                        className={`transition-all duration-150 ${
                          isMastered
                            ? 'fill-emerald-500/20 stroke-emerald-500'
                            : isGap
                            ? 'fill-amber-500/20 stroke-amber-500'
                            : 'fill-zinc-500/20 stroke-zinc-400'
                        } ${isSelected ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={3}
                        className={isMastered ? 'fill-emerald-500' : isGap ? 'fill-amber-500' : 'fill-zinc-400'}
                      />
                      <text
                        x={x}
                        y={y + 24}
                        textAnchor="middle"
                        className={`text-[10px] font-mono select-none ${
                          isSelected ? 'font-bold fill-zinc-900 dark:fill-zinc-100' : 'fill-zinc-500 dark:fill-zinc-400'
                        }`}
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </div>

      </div>

      {/* Right: Detailed Node Inspector Sheet */}
      <div className="w-full lg:w-80 bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl shadow-subtle p-5 flex flex-col justify-between">
        {selectedNode ? (
          <div>
            {/* Header */}
            <div className="pb-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                {selectedNode.category}
              </span>
              <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-zinc-100 mt-1">
                {selectedNode.name}
              </h3>
            </div>

            {/* Metrics */}
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                  <span>Tần suất trong JD tuyển dụng:</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                    {selectedNode.marketDemandRate}%
                  </span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${selectedNode.marketDemandRate}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-zinc-400 mt-1.5 font-mono">
                  Dữ liệu từ 48.092 tin tuyển dụng VietJobs
                </p>
              </div>

              {/* Status explanation */}
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 text-xs">
                {selectedNode.status === 'gap' ? (
                  <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                    <strong>Khoảng cách trọng yếu:</strong> Vị trí mục tiêu yêu cầu kỹ năng này. Bạn nên bổ sung bài thực hành trong Lộ trình 30 ngày để tăng tỷ lệ qua vòng ATS.
                  </p>
                ) : (
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    <strong>Đã xác nhận trong CV:</strong> Hãy làm nổi bật các chỉ số đo lường hiệu năng và kết quả đạt được tại mục Tối ưu CV.
                  </p>
                )}
              </div>

              {/* Co-occurring skills */}
              <div>
                <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Thường đi kèm trong các JD:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.coOccursWith.map((relId) => {
                    const relNode = skills.find((s) => s.id === relId);
                    return (
                      <span
                        key={relId}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                      >
                        {relNode?.name || relId}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-400 text-xs font-mono">
            Chọn một kỹ năng để kiểm tra
          </div>
        )}

        {/* Action Button */}
        {selectedNode && (
          <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4">
            <button
              onClick={() => onConsultAgentOnSkill(selectedNode.name)}
              className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-medium transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Hỏi Tech Lead về {selectedNode.name}</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
