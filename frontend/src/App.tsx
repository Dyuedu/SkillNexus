import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MetricsOverview } from './components/MetricsOverview';
import { AdvisoryBoard } from './components/AdvisoryBoard';
import { SkillGraphExplorer } from './components/SkillGraphExplorer';
import { RoadmapAndTailor } from './components/RoadmapAndTailor';
import { IngestionModal } from './components/IngestionModal';
import { 
  INITIAL_SKILLS, 
  SAMPLE_JOBS, 
  INITIAL_MESSAGES, 
  SAMPLE_ROADMAP, 
  SAMPLE_RESUME_DIFFS 
} from './data/sampleData';
import type { JobTarget, SkillNode, AgentMessage, AgentRole } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<'advisory' | 'graph' | 'roadmap' | 'tailor'>('advisory');
  const [isIngestionOpen, setIsIngestionOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Core domain states
  const [selectedJob, setSelectedJob] = useState<JobTarget>(SAMPLE_JOBS[0]);
  const [skills, setSkills] = useState<SkillNode[]>(INITIAL_SKILLS);
  const [messages, setMessages] = useState<AgentMessage[]>(INITIAL_MESSAGES);
  const [roadmap] = useState(SAMPLE_ROADMAP);
  const [resumeDiffs] = useState(SAMPLE_RESUME_DIFFS);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Sync dark mode class with HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle User Message in Multi-Agent Advisory Board
  const handleSendMessage = (text: string, targetAgent?: AgentRole) => {
    const userMsg: AgentMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    // Dynamic response from specialized agents grounded in GraphRAG & VietJobs
    setTimeout(() => {
      let agentRole: AgentRole = targetAgent || 'interviewer';
      let agentName = 'Tech Lead Interviewer';
      let content = '';
      let cypher = '';
      let evidence = undefined;
      let actions: string[] = [];

      const lower = text.toLowerCase();

      if (lower.includes('cache-aside') || lower.includes('invalidation') || lower.includes('redis') || lower.includes('race condition')) {
        agentRole = 'interviewer';
        agentName = 'Tech Lead Interviewer';
        content = `Nhận xét chính xác! Với mô hình **Cache-Aside**, em đọc từ Redis trước, nếu Cache Miss thì truy vấn MySQL và set lại Redis có kèm TTL.\n\nTuy nhiên, để đạt điểm tuyệt đối với nhà tuyển dụng FinTech, em nên nhắc thêm về:\n1. **Cache Stampede (Hiệu ứng sụp đổ đồng loạt):** Khi cache hết hạn cùng lúc, hàng ngàn request ập vào MySQL. Giải pháp: Dùng Mutex Lock (Distributed Lock với Redisson) hoặc Soft Expiry.\n2. **Double Invalidation:** Xóa cache trước khi commit DB và dùng Message Queue gửi event xóa lần 2 sau 500ms để tránh đọc phải dữ liệu cũ (Dirty Read).`;
        cypher = `MATCH (s:Skill {name: "Redis"})-[:REQUIRES_CONCEPT]->(c:Concept) WHERE c.name IN ["Cache-Aside", "Distributed Lock"] RETURN c;`;
        evidence = {
          nodes: ['Redis', 'Distributed Lock', 'Cache Stampede'],
          coOccurrenceRate: 'xuất hiện trong 82% bài test FinTech',
          sampleJdCount: 420
        };
        actions = [
          'Thêm giải pháp Distributed Lock vào CV',
          'Xem bài thực hành Redis trong Lộ trình 30 ngày',
          'Hỏi tiếp về kịch bản Deadlock MySQL'
        ];
      } else if (lower.includes('lương') || lower.includes('career') || lower.includes('lộ trình') || targetAgent === 'strategist') {
        agentRole = 'strategist';
        agentName = 'Career Strategist';
        content = `Theo phân tích 48.000 JD từ VietJobs:\n\n• Mức lương cho Fresher Backend thuần Java/MySQL hiện dao động từ **10 - 14 triệu VNĐ**.\n• Nhưng nếu em có thêm **Docker + Redis + CI/CD** (có đồ án đo lường TPS thực chiến), em sẽ vượt sang nhóm **Junior High-Potential** với dải lương **18 - 25 triệu VNĐ** (tăng ~45%).\n\nEm nên tập trung 100% sức lực trong 30 ngày tới hoàn thiện đồ án E-Commerce có caching thay vì nộp dàn trải 50 công ty.`;
        cypher = `MATCH (j:JobPosting)-[:REQUIRES_SKILL]->(s:Skill) WHERE s.name IN ["Docker", "Redis"] RETURN avg(j.salary_max_usd), count(j);`;
        evidence = {
          nodes: ['Docker', 'Redis', 'Salary Delta'],
          coOccurrenceRate: 'Lương trung bình cao hơn 38%',
          sampleJdCount: 1420
        };
        actions = [
          'Chuyển sang tab Lộ trình 30 ngày',
          'Mở bộ Tinh chỉnh CV để sửa bullet point'
        ];
      } else if (targetAgent === 'architect' || lower.includes('cv') || lower.includes('ats')) {
        agentRole = 'architect';
        agentName = 'Resume Architect';
        content = `Tôi đã soi chiếu CV của bạn với bộ lọc ATS tiêu chuẩn của các công ty TopDev/ITviec:\n\nCác gạch đầu dòng của bạn đang mắc lỗi kinh điển: **Liệt kê trách nhiệm thay vì định lượng thành tựu** (Responsible for... thay vì Achieved X by doing Y measured by Z).\n\nTôi đã soạn sẵn bản viết lại theo công thức **STAR (Tình huống - Nhiệm vụ - Hành động - Kết quả)** tại tab "Tối ưu hóa CV", giúp bạn tăng ngay **+18% điểm khớp từ khóa**.`;
        cypher = `MATCH (cv:ResumeSection)-[:OPTIMIZED_BY_STAR]->(s:StarPattern) RETURN s.impactScore;`;
        actions = [
          'Xem các câu viết lại theo chuẩn STAR',
          'Sao chép đoạn tối ưu vào CV'
        ];
      } else {
        agentRole = 'scout';
        agentName = 'Market Scout';
        content = `Tín hiệu thị trường mới nhất từ hệ sinh thái tuyển dụng công nghệ Việt Nam:\n\nNhu cầu tuyển dụng Backend sử dụng Spring Boot + Cloud native đang tăng 22% trong quý này tại TP.HCM. Các công ty sẵn sàng phỏng vấn Fresher nếu ứng viên tự tin trả lời được về Containerization (Docker) và tối ưu hóa câu truy vấn Index MySQL.`;
        cypher = `MATCH (t:Trend {region: "VN-HCM"}) RETURN t.topSkills, t.growthQuarter;`;
        actions = [
          'Thử thách câu hỏi System Design với Tech Lead',
          'Xem biểu đồ kỹ năng tương tác'
        ];
      }

      const agentReply: AgentMessage = {
        id: `agt-${Date.now()}`,
        sender: 'agent',
        agentRole,
        agentName,
        content,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        cypherTrace: cypher,
        graphEvidence: evidence,
        suggestedActions: actions,
      };

      setMessages((prev) => [...prev, agentReply]);
      setIsGenerating(false);
    }, 700);
  };

  // Action chip click handler
  const handleSelectActionChip = (chipText: string) => {
    if (chipText.includes('Lộ trình')) {
      setActiveTab('roadmap');
    } else if (chipText.includes('CV') || chipText.includes('STAR')) {
      setActiveTab('tailor');
    } else if (chipText.includes('biểu đồ') || chipText.includes('đồ thị')) {
      setActiveTab('graph');
    } else {
      handleSendMessage(chipText);
    }
  };

  // Node Click -> Consult Tech Lead
  const handleConsultAgentOnSkill = (skillName: string) => {
    setActiveTab('advisory');
    handleSendMessage(`Anh Tech Lead ơi, hãy đặt một câu hỏi phỏng vấn kỹ thuật hóc búa về ${skillName} để kiểm tra trình độ của em nhé!`, 'interviewer');
  };

  // Profile Analysis from Ingestion Modal
  const handleAnalyzeProfile = (_cvText: string, jobTarget: JobTarget) => {
    setSelectedJob(jobTarget);
    
    // Switch active skills based on preset
    if (jobTarget.id === 'jd-3') {
      // AI target
      setSkills([
        { id: 'react', name: 'React', category: 'frontend', status: 'mastered', marketDemandRate: 92, coOccursWith: ['typescript', 'nextjs'] },
        { id: 'typescript', name: 'TypeScript', category: 'frontend', status: 'mastered', marketDemandRate: 88, coOccursWith: ['react', 'nextjs'] },
        { id: 'nextjs', name: 'Next.js', category: 'frontend', status: 'mastered', marketDemandRate: 81, coOccursWith: ['react', 'tailwind'] },
        { id: 'langchain', name: 'LangChain / LlamaIndex', category: 'ai', status: 'gap', marketDemandRate: 74, coOccursWith: ['fastapi', 'vector-db'] },
        { id: 'vector-db', name: 'Vector DB (Milvus/Neo4j)', category: 'ai', status: 'gap', marketDemandRate: 68, coOccursWith: ['fastapi', 'langchain'] },
        { id: 'fastapi', name: 'FastAPI Python', category: 'backend', status: 'gap', marketDemandRate: 78, coOccursWith: ['langchain', 'docker'] },
      ]);
    } else {
      setSkills(INITIAL_SKILLS);
    }

    const notifyMsg: AgentMessage = {
      id: `sys-${Date.now()}`,
      sender: 'agent',
      agentRole: 'strategist',
      agentName: 'Career Strategist',
      content: `Đã nạp và đối sánh hồ sơ thành công với vị trí mục tiêu: **${jobTarget.title}** tại **${jobTarget.company}**.\n\n• Độ khớp hiện tại: **${jobTarget.matchScore}%**\n• Mức lương kỳ vọng: **${jobTarget.salaryRange}**\n\nHãy xem các tab Đồ thị Kỹ năng và Lộ trình để bắt đầu chiến lược bứt phá!`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      cypherTrace: `MATCH (u:UserCV)-[:MATCHES_TARGET_JD]->(j:JobPosting {id: "${jobTarget.id}"}) RETURN j.match_percentage;`,
    };

    setMessages((prev) => [...prev, notifyMsg]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200">
      
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenIngest={() => setIsIngestionOpen(true)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        selectedJobTitle={selectedJob.title}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col">
        
        {/* Top KPI Metrics Bar */}
        <MetricsOverview
          currentJob={selectedJob}
          skills={skills}
          onOpenIngest={() => setIsIngestionOpen(true)}
        />

        {/* Dynamic View Panels */}
        <div className="flex-1">
          {activeTab === 'advisory' && (
            <AdvisoryBoard
              messages={messages}
              onSendMessage={handleSendMessage}
              isGenerating={isGenerating}
              onSelectActionChip={handleSelectActionChip}
            />
          )}

          {activeTab === 'graph' && (
            <SkillGraphExplorer
              skills={skills}
              onConsultAgentOnSkill={handleConsultAgentOnSkill}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapAndTailor
              mode="roadmap"
              roadmap={roadmap}
              resumeDiffs={resumeDiffs}
            />
          )}

          {activeTab === 'tailor' && (
            <RoadmapAndTailor
              mode="tailor"
              roadmap={roadmap}
              resumeDiffs={resumeDiffs}
            />
          )}
        </div>

      </main>

      {/* CV & JD Ingestion Modal */}
      <IngestionModal
        isOpen={isIngestionOpen}
        onClose={() => setIsIngestionOpen(false)}
        onSelectJob={setSelectedJob}
        selectedJobId={selectedJob.id}
        onAnalyzeProfile={handleAnalyzeProfile}
      />

    </div>
  );
}

export default App;
