---
name: SkillNexus
status: final
sources:
  - ../brief-skillnexus/brief-skillnexus.md
  - ../prd-skillnexus/prd-skillnexus.md
  - ../architecture-skillnexus/architecture-skillnexus.md
  - ./DESIGN.md
updated: 2026-10-15
---

# SkillNexus — Experience Spine (EXPERIENCE.md)

> Built according to the **BMad UX** specification and informed by the **UI/UX Pro Max** framework.
> Governs *how the product works*: information architecture, interaction primitives, behavioral state patterns, voice & tone, accessibility floor, and named-protagonist user journeys.

---

## 1. Foundation

- **Platform & Form Factor:** Single-surface responsive web application optimized for desktop cockpit (1024px–1440px+) with fully functional mobile companion view (375px+).
- **Frontend Architecture:** React 18+ / Next.js / Vite with Tailwind CSS, shadcn/ui primitives, Lucide React icons, and Neo4j NVL / Vis.js Canvas for knowledge graph rendering.
- **AI Runtime Integration:** 100% Local AI execution via Ollama (`qwen2.5-coder:7b` for agent reasoning + `nomic-embed-text` for 768-dim vector embeddings) running on `http://localhost:11434`.
- **Privacy & Compliance Foundation:** Zero CV data egress to third-party cloud APIs. Full compliance with Vietnam Personal Data Protection Law (Law No. 91/2025/QH15) via strict local anonymization and explicit user opt-in before graph aggregation.
- **Design System Link:** Visual specs, color hex codes, and typography tokens are strictly owned by [`DESIGN.md`](./DESIGN.md).

---

## 2. Information Architecture (IA)

### 2.1 Surface Directory
| Surface ID | Surface Name | Reached From | Primary Purpose | Key Controls |
|:---|:---|:---|:---|:---|
| **S1** | **Ingestion & Privacy Gateway** | Landing / Cold Start / `⌘U` | Upload CV (PDF/DOCX) or paste JD text; choose privacy tier (Local-only vs Anonymous Graph Contribution). | Drag-drop zone, Privacy toggle switch, "Analyze Profile" CTA |
| **S2** | **Advisory Cockpit (Multi-Agent Board)** | S1 or Global Nav / `⌘1` | Dynamic multi-agent dialogue stream. Interacts with Career Strategist, Tech Lead Interviewer, Resume Architect, or Market Scout. | Agent lens switcher (`1`-`4`), Prompt input, Collapsible Cypher trace drawer, Quick-action chips |
| **S3** | **Skill Radar & Subgraph Explorer** | Cockpit Tab / Global Nav / `⌘2` | Interactive visual exploration of the user's skill graph vs target market JD requirements (Neo4j nodes). | Node search, Zoom/Pan controls, Filter by category (Backend/Frontend/DevOps/Database), Node Inspector sheet |
| **S4** | **30-60-90 Roadmap & Action Center** | Cockpit Tab / Global Nav / `⌘3` | Step-by-step milestone tracking for closing critical skill gaps, with project suggestions and learning resources. | Milestone checkbox, Resource link drawer, "Re-evaluate Readiness" trigger |
| **S5** | **Split-Screen Resume Tailor** | Action from Advisory / `⌘4` | Side-by-side comparison of original CV bullet points vs JD-optimized STAR bullet points. | "Accept Rewrite" button, Keyword diff highlighter, ATS score counter |
| **S6** | **Command Palette** | Global Shortcut `⌘K` / `Ctrl+K` | Quick search across skills, target roles, JDs, agent prompts, and settings. | Fuzzy search input, Keyboard arrow navigation |

### 2.2 Navigation & Modal Discipline
- **Primary Layout:** Sticky top header (App brand, Model status pill `● Ollama: qwen2.5-coder:7b Ready`, Active Role badge, Search shortcut `⌘K`).
- **Cockpit Panes:**
  - On widescreen (`≥ 1280px`): Split 3-pane workstation — Left (Agent Advisory Chat, 40%), Center (Skill Radar & Subgraph, 35%), Right (Roadmap & Tailor, 25%).
  - On tablet (`768px–1279px`): 2-pane tabs (Advisory + Graph toggle).
  - On mobile (`< 768px`): Tab-bar navigation at bottom (Advisory, Graph, Roadmap, Tailor).
- **Modal Depth Limit:** Exactly 1 modal level deep. A modal never spawns another modal. Secondary interactions use slide-over sheets (`Sheet` from right).

---

## 3. Voice and Tone (Microcopy)

SkillNexus communicates with the engineering rigor of a senior Principal Engineer and the supportive clarity of an empathetic career mentor. It avoids generic cheerleading, robotic corporate jargon, and vague horoscope-style career advice.

| Context | DO (SkillNexus Voice) | DON'T (Generic / Fluffy Voice) | Rationale |
|:---|:---|:---|:---|
| **CV Parsed** | "Đã chuẩn hóa 14 kỹ năng kỹ thuật từ CV của bạn. Phát hiện 3 khoảng cách trọng yếu so với vị trí Senior Backend." | "Tuyệt vời ông mặt trời! Hồ sơ của bạn đã sẵn sàng để tỏa sáng! 🚀🎉" | Engineers value precision, data, and directness over emojis and false hype. |
| **Skill Gap** | "Kỹ năng thiếu: `Redis Cluster` và `Message Queue (Kafka)`. 76% JD Backend từ 3 năm kinh nghiệm tại TP.HCM yêu cầu hai kỹ năng này cùng nhau." | "Bạn nên học thêm Redis và Kafka để trở thành developer giỏi hơn." | Always ground advice in market data and co-occurrence statistics. |
| **Tech Lead Challenge** | "Thử thách nhanh: Nếu hệ thống ghi 10.000 order/giây, làm sao bạn ngăn chặn double-spending khi Redis cache bị invalidation?" | "Bạn hãy kể về một lần bạn giải quyết vấn đề khó khăn trong dự án." | Realistic technical depth tests actual readiness rather than generic interview buzzwords. |
| **Privacy Assurance** | "CV của bạn được xử lý 100% trên máy cục bộ qua Ollama. Không có dữ liệu định danh cá nhân nào gửi ra ngoài." | "Chúng tôi rất coi trọng bảo mật của bạn." | Concrete architecture statement builds real technical trust. |
| **Ollama Offline** | "Không thể kết nối với Ollama tại `localhost:11434`. Vui lòng chạy `ollama serve` trong terminal để tiếp tục." | "Đã xảy ra lỗi hệ thống không xác định. Vui lòng thử lại sau." | Actionable remediation command for technical users. |

---

## 4. Component Patterns (Behavioral Specs)

### 4.1 Ingestion & Anonymization Opt-In (`<PrivacyConsentZone />`)
- **Behavior:**
  - Dragging a PDF/DOCX file over the drop zone reveals a 2px primary border with a smooth `#EFF6FF` background glow.
  - Upon drop, a client-side pre-scan runs immediately.
  - A prominent PDPL compliance card appears:
    - Default: *Local-Only Mode* (CV parsed in local memory, no data stored in shared database).
    - Toggle: *Anonymous Graph Contribution* (Removes Name, Phone, Email, Address; merges extracted skills & role seniority into the aggregate skill graph).
  - If the user toggles on, a micro-preview shows the scrubbed JSON (`{ anonymized: true, skills: [...] }`) for 100% transparency.

### 4.2 Multi-Agent Dialogue Stream (`<AgentAdvisoryBoard />`)
- **Agent Lens Switching:**
  - User can click agent tabs or press `1`, `2`, `3`, `4` to filter messages or directly invoke a specific agent.
  - Agent switcher chips display the agent's semantic color pip (Blue, Amber, Green, Purple).
- **Streaming Response Behavior:**
  - Local LLM output streams token-by-token. A subtle monospace cursor blinks at the end of the current sentence.
  - Stop button (`Esc` or `Square` icon) appears during generation. Clicking it cancels the streaming request immediately without losing prior tokens.
- **Grounding Drawer (Explainability):**
  - Every recommendation includes an inline link: `"Dựa trên 1,420 việc làm VietJobs & 2 liên kết đồ thị"`.
  - Clicking this expands a drawer displaying:
    1. The exact Cypher query executed on Neo4j.
    2. Co-occurring skills graph snippet.
    3. Excerpt from matching real-world JDs.

### 4.3 Skill Radar & Subgraph Canvas (`<InteractiveGraphCanvas />`)
- **Physics & Layout:**
  - Force-directed graph with dampening: nodes settle within 800ms of initial render.
  - Clicking on a node pins it to center, highlights its direct neighbors, and dims unrelated nodes to 20% opacity.
  - Hovering on a link highlights the co-occurrence weight tooltip: `"PostgreSQL & Redis: cùng xuất hiện trong 68% JD Backend"`.
- **Node Inspector (Slide-over Sheet):**
  - Clicking a node opens a slide-over panel on the right with:
    - ESCO/O*NET Skill URI and standard definition.
    - Market demand trend (High / Moderate / Growing).
    - Typical salary delta associated with this skill in Vietnam IT market.
    - Direct button: `"Hỏi Tech Lead Agent về kỹ năng này"`.

### 4.4 Split-Screen Resume Tailor (`<ResumeTailorView />`)
- **Synchronization:**
  - Scrolling either pane synchronizes the opposing pane smoothly so aligned bullet points stay horizontally leveled.
- **Diff Affordance:**
  - Added technical terms are underlined with a soft emerald pill.
  - Clicking an added term shows why it was added: `"Thêm từ khóa 'Idempotency' vì JD yêu cầu xử lý giao dịch thanh toán an toàn"`.
- **One-Click Accept:**
  - User clicks `"Chấp nhận đoạn sửa này"` (`Accept Section`) → updates the exportable markdown/PDF draft in real time.

---

## 5. State Patterns

| State | Surface | Visual & Behavioral Treatment |
|:---|:---|:---|
| **Cold App Load** | Global | Skeleton placeholders with shimmering gradient (`#E2E8F0` to `#F1F5F9`). Load time < 400ms for static shell. |
| **CV Ingestion in Progress** | S1 | Multi-step progress tracker: `1. Trích xuất văn bản (PDF) → 2. Chuẩn hóa thực thể ESCO/O*NET → 3. Khớp đồ thị Neo4j`. Duration: ~1.2s. |
| **Agent Thinking / Tool Calling** | S2 | Monospace badge: `[Supervisor] Định tuyến đến TechLeadInterviewer...` followed by `[Neo4j] Đang truy vấn kỹ năng liên quan...` (100ms pulse). |
| **Ollama Disconnected** | Global | Non-blocking persistent amber banner at top: `"Không thể kết nối tới Ollama (localhost:11434). Vui lòng khởi động Ollama để kích hoạt AI cố vấn."` with a `"Thử lại"` button. |
| **Zero Skill Gap (100% Match)** | S3 / S4 | Success state: `"Bạn đã thỏa mãn 100% kỹ năng cốt lõi cho vị trí này! Sẵn sàng phỏng vấn thử với Tech Lead."` |
| **Target JD Empty** | S1 / S5 | Empty state: `"Chưa chọn JD mục tiêu. Dán mô tả công việc từ ITviec/TopCV hoặc chọn từ 48.000 việc làm mẫu để bắt đầu đối sánh."` |

---

## 6. Interaction Primitives

### 6.1 Keyboard Navigation (First-Class Citizen)
- `⌘K` / `Ctrl+K`: Global Command Palette (search skills, switch views, trigger actions).
- `1`, `2`, `3`, `4`: Quick-switch between the 4 Specialized Agents in the Advisory Board.
- `⌘U` / `Ctrl+U`: Open CV Ingestion modal.
- `⌘J` / `Ctrl+J`: Focus Target JD selection / input.
- `Esc`: Close any open drawer, modal, or cancel active LLM streaming.
- `Tab` / `Shift+Tab`: Logical, predictable visual focus order across all interactive elements.

### 6.2 Mouse & Touch Interactions
- **Desktop:** Hover reveals contextual tooltips and quick actions (150ms delay to prevent flashing).
- **Mobile / Touch:** Minimum touch target size of **44×44px** for all buttons and tap areas. Minimum 8px spacing between targets.
- **No Hover-Only Dependence:** Any information visible on hover is also accessible via a single tap.

---

## 7. Accessibility Floor (WCAG 2.2 AA / AAA Compliance)

- **Color Contrast:** All text content achieves at least **4.5:1** contrast ratio against its background. Display headers and primary buttons achieve **> 7:1** (AAA standard).
- **Focus Rings:** Distinct 2px solid ring (`--color-ring: #1E40AF`) with 2px offset visible on all keyboard-focused elements.
- **Screen Reader Support:**
  - Agent message streams employ `aria-live="polite"` so newly generated advice is announced without interrupting current audio focus.
  - Graph canvas includes an accessible data-table fallback view for blind/visually-impaired engineers (`<GraphTableView />`).
- **Reduced Motion:** Fully honors `prefers-reduced-motion: reduce`. When active, graph physics run headless and render static positions; streaming text appears without cursor blinking; page transitions are instantaneous (0ms).

---

## 8. Key User Journeys (Named Protagonists)

### Journey 1: Huy (22 tuổi) — Fresher Backend Developer tại TP.HCM
*Bối cảnh:* Huy vừa tốt nghiệp ngành CNTT. Em đã nộp CV cho hơn 20 công ty qua TopCV và ITviec nhưng phần lớn bị từ chối tự động hoặc không có phản hồi. Huy cảm thấy hoang mang không biết thị trường đang cần gì và CV của mình yếu ở đâu.

1. **Chạm (Arrival & Ingestion):**
   - Huy truy cập SkillNexus. Em kéo thả file `CV_NguyenVanHuy_Backend.pdf` vào Ingestion Zone (`S1`).
   - Màn hình hiển thị thẻ bảo mật PDPL: Huy thấy rõ cam kết dữ liệu được phân tích cục bộ trên máy mình, không rò rỉ thông tin cá nhân. Huy bấm *"Phân tích hồ sơ"*.
2. **Đối chiếu (Skill Radar & Gap Discovery):**
   - Trong 1.5 giây, hệ thống chuẩn hóa CV của Huy thành 12 kỹ năng chuẩn (Java, Spring Boot, MySQL, REST API, Git...).
   - Huy dán link/nội dung JD một vị trí *"Fresher Backend Engineer - FinTech"* tại Quận 1.
   - Graph Visualizer (`S3`) sáng đèn: Kỹ năng Java, MySQL hiện màu xanh ngọc (Đã có). Nhưng 2 node to màu hổ phách hiện rõ: **`Docker`** và **`Redis`** (chưa có trong CV).
   - Hệ thống thông báo: *"84% JD Backend Fresher tại TP.HCM năm 2026 yêu cầu Docker cơ bản và Redis cache."*
3. **Cố vấn & Thử thách (Multi-Agent Advisory Climax):**
   - Huy chuyển sang tab Cố vấn (`S2`). **Tech Lead Interviewer Agent** xuất hiện:
     > *"Chào Huy, mình thấy bạn làm đồ án Spring Boot rất tốt với MySQL. Tuy nhiên, nếu một bảng đơn hàng lên 2 triệu dòng, bạn sẽ dùng Redis để cache những dữ liệu gì và invalidate cache khi nào?"*
   - Huy gõ câu trả lời theo hiểu biết của mình.
   - Agent phân tích câu trả lời, khen điểm tốt về Cache-Aside pattern, đồng thời chỉ ra lỗ hổng về Race Condition khi cache hết hạn.
4. **Hành động (Roadmap & Tailor):**
   - **Career Strategist Agent** tự động bổ sung vào Lộ trình 30 ngày (`S4`):
     - *Tuần 1:* Thực hành Dockerize ứng dụng Spring Boot + MySQL.
     - *Tuần 2:* Tích hợp Redis Cache và đo lường throughput (TPS).
   - **Resume Architect Agent** mở Split-Screen Tailor (`S5`): Tối ưu lại 2 gạch đầu dòng trong CV của Huy, chuyển từ mô tả chung chung sang cấu trúc STAR có số liệu định lượng.
5. **Kết quả:** Huy tự tin xuất file CV mới đã được đo lường tăng độ khớp từ 52% lên 81%, kèm kế hoạch ôn luyện 30 ngày rõ ràng.

---

### Journey 2: Linh (24 tuổi) — Junior Frontend Developer tại Hà Nội muốn chuyển sang AI Engineering
*Bối cảnh:* Linh có 2 năm kinh nghiệm React/TypeScript, nhận thấy làn sóng AI phát triển mạnh và muốn chuyển hướng sang xây dựng ứng dụng AI Fullstack / Agentic AI.

1. **Khám phá lộ trình chuyển đổi (Pivoting Subgraph):**
   - Linh mở SkillNexus và chọn mục tiêu: *"Chuyển đổi từ Frontend sang AI Fullstack Developer"*.
   - Graph Explorer (`S3`) hiển thị cụm kỹ năng hiện tại của Linh (React, Next.js, Tailwind, REST API).
   - Hệ thống vẽ ra các "cầu nối" (Bridge Nodes) từ hệ sinh thái JS/TS sang AI: **`LangChain.js`**, **`Vercel AI SDK`**, **`Vector DB (Pinecone/Milvus)`**, và **`FastAPI`**.
2. **Cố vấn chiến lược:**
   - **Market Scout Agent** trích xuất dữ liệu: *"Nhu cầu tuyển dụng Fullstack AI Engineer tại Hà Nội tăng 65% trong 6 tháng qua với mức lương trung bình cao hơn 35% so với Frontend thuần túy."*
   - **Career Strategist Agent** tư vấn: Linh không cần học lại từ đầu toán cao cấp hay huấn luyện model lớn (LLM training), mà nên tập trung vào *Agentic AI Development* (sử dụng API/Local LLM, Function Calling, GraphRAG).
3. **Thực thi:**
   - Linh nhận lộ trình 60 ngày với các project mẫu có thể đẩy lên GitHub làm portfolio thực chiến.

---

## 9. Reviewer Gate & UX Quality Criteria

- [x] **Zero Emoji in UI Components:** All controls, navigation, and badges use vector SVG via Lucide React.
- [x] **Strict 4.5:1 Text Contrast:** Measured across both Light and Dark themes.
- [x] **Touch Target Compliance:** All interactive buttons ≥ 44×44px on mobile breakpoints.
- [x] **Keyboard-Only Operability:** The entire application can be driven via `Tab`, `Enter`, `Esc`, `⌘K`, and numeric shortcuts.
- [x] **Local Privacy Enforcement:** Clear visual feedback that data never leaves the client/local Ollama instance.
- [x] **Deterministic Explainability:** Every AI advisory claim can be traced back to a specific Neo4j graph node or VietJobs JD market datum.
