import React, { useState, useMemo } from 'react';
import { Search, Code2 } from 'lucide-react';
import type { SkillNode } from '../types';

interface SkillGraphExplorerProps {
  skills: SkillNode[];
  onConsultAgentOnSkill: (skillName: string) => void;
}

export const SkillGraphExplorer: React.FC<SkillGraphExplorerProps> = ({
  skills,
  onConsultAgentOnSkill,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(skills.find(s => s.status === 'gap') || skills[0]);

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      const matchCategory = selectedCategory === 'all' || s.category === selectedCategory;
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [skills, selectedCategory, searchQuery]);

  // Dynamic layout coordinates for visual graph
  const nodePositions = useMemo(() => {
    const total = filteredSkills.length;
    const centerX = 360;
    const centerY = 240;
    const radius = 170;

    return filteredSkills.map((node, i) => {
      const angle = (i / total) * 2 * Math.PI;
      // Slight jitter based on category
      const r = node.status === 'mastered' ? radius * 0.75 : node.status === 'gap' ? radius : radius * 1.15;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      return { ...node, x, y };
    });
  }, [filteredSkills]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-4">
      
      {/* Main Graph Canvas Area */}
      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-card flex flex-col overflow-hidden">
        
        {/* Controls Bar */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 flex items-center justify-between flex-wrap gap-2">
          
          {/* Search */}
          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm kỹ năng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 font-mono"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'backend', 'database', 'devops', 'architecture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>

          {/* Graph Legend */}
          <div className="hidden xl:flex items-center space-x-3 text-[11px] font-mono">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 dark:text-slate-400">Đã có ({skills.filter(s => s.status === 'mastered').length})</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-slate-600 dark:text-slate-400 font-bold">Cần bổ sung ({skills.filter(s => s.status === 'gap').length})</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span className="text-slate-600 dark:text-slate-400">Mở rộng ({skills.filter(s => s.status === 'adjacent').length})</span>
            </span>
          </div>
        </div>

        {/* SVG Interactive Graph Canvas */}
        <div className="flex-1 relative bg-slate-50/50 dark:bg-slate-950/70 p-4 overflow-hidden flex items-center justify-center">
          
          <svg className="w-full h-full max-w-[720px] max-h-[500px]" viewBox="0 0 720 480">
            {/* Draw Links between related nodes */}
            {nodePositions.map((node) =>
              node.coOccursWith.map((targetId) => {
                const targetNode = nodePositions.find((n) => n.id === targetId);
                if (!targetNode) return null;
                const isGapLink = node.status === 'gap' || targetNode.status === 'gap';

                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isGapLink ? '#D97706' : '#94A3B8'}
                    strokeWidth={isGapLink ? 2 : 1}
                    strokeDasharray={isGapLink ? '4 3' : undefined}
                    strokeOpacity={isGapLink ? 0.7 : 0.35}
                  />
                );
              })
            )}

            {/* Draw Nodes */}
            {nodePositions.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isGap = node.status === 'gap';
              const isMastered = node.status === 'mastered';

              let fillColor = '#64748B'; // adjacent
              if (isMastered) fillColor = '#059669';
              if (isGap) fillColor = '#D97706';

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer transition-transform duration-150 hover:scale-110"
                >
                  {/* Pulsing ring for gap nodes */}
                  {isGap && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 30 : 25}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      className="animate-ping opacity-30"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 24 : isGap ? 20 : 18}
                    fill={fillColor}
                    stroke={isSelected ? '#1E40AF' : '#FFFFFF'}
                    strokeWidth={isSelected ? 3 : 2}
                    className="shadow-md"
                  />

                  {/* Node Label */}
                  <text
                    x={node.x}
                    y={node.y ? node.y + (isSelected ? 38 : 34) : 0}
                    textAnchor="middle"
                    className={`text-[11px] font-heading font-semibold fill-slate-800 dark:fill-slate-200 ${
                      isSelected ? 'font-bold underline' : ''
                    }`}
                  >
                    {node.name}
                  </text>

                  {/* Demand Rate Pill inside node */}
                  <text
                    x={node.x}
                    y={node.y ? node.y + 4 : 0}
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-white font-bold"
                  >
                    {node.marketDemandRate}%
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Bottom Overlay Hint */}
          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-500 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
            💡 Nhấp vào từng Node để xem phân tích nhu cầu tuyển dụng & hỏi Tech Lead
          </div>
        </div>

      </div>

      {/* Node Inspector Sheet (Right Side) */}
      <div className="w-full lg:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-card p-4 flex flex-col justify-between">
        {selectedNode ? (
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                  {selectedNode.category}
                </span>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mt-1">
                  {selectedNode.name}
                </h3>
              </div>
              <div className="text-right">
                <span className={`text-xs font-mono font-bold px-2 py-1 rounded-full ${
                  selectedNode.status === 'mastered'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : selectedNode.status === 'gap'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {selectedNode.status === 'mastered' ? 'Đã có trong CV' : selectedNode.status === 'gap' ? 'Khoảng cách cốt lõi' : 'Kỹ năng nâng cao'}
                </span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Tần suất xuất hiện trong JD:</span>
                  <span className="font-mono font-bold text-blue-700 dark:text-blue-300">{selectedNode.marketDemandRate}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${selectedNode.marketDemandRate}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">
                  Dữ liệu chuẩn hóa từ 48.092 tin tuyển dụng công nghệ tại TP.HCM và Hà Nội.
                </p>
              </div>

              {/* Related Co-occurrences */}
              <div>
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Thường đi kèm với kỹ năng:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.coOccursWith.map((relId) => {
                    const relNode = skills.find((s) => s.id === relId);
                    return (
                      <span
                        key={relId}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono border border-slate-200 dark:border-slate-700"
                      >
                        {relNode?.name || relId}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Status Specific Advice */}
              <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs">
                {selectedNode.status === 'gap' ? (
                  <p className="text-amber-800 dark:text-amber-200">
                    ⚠️ <strong>Khoảng cách trọng yếu:</strong> Thiếu kỹ năng này sẽ khiến tỷ lệ lọc qua vòng ATS giảm ~28%. Bạn nên ưu tiên hoàn thành đồ án mẫu trong Lộ trình 30 ngày.
                  </p>
                ) : (
                  <p className="text-emerald-800 dark:text-emerald-200">
                    ✅ <strong>Điểm mạnh:</strong> Kỹ năng này đã được ghi nhận trong CV. Hãy làm nổi bật các chỉ số định lượng (RPS, Throughput, Giảm độ trễ) trong mục Tối ưu CV.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs">
            Chọn một Node trên đồ thị để xem chi tiết
          </div>
        )}

        {/* Action Button */}
        {selectedNode && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
            <button
              onClick={() => onConsultAgentOnSkill(selectedNode.name)}
              className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
            >
              <Code2 className="w-4 h-4" />
              <span>Hỏi Tech Lead thử thách về {selectedNode.name}</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
