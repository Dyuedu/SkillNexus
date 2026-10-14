# SkillNexus PRD — Addendum & Implementation Notes

---

## 1. Persona Deep Dive & Bối cảnh Việt Nam

### Persona 1: Tuấn — The Bottlenecked Fresher
- **Độ tuổi**: 21–23 (Sinh viên năm cuối ĐH / Học viện công nghệ, người mới tốt nghiệp).
- **Trở ngại tâm lý**: Mất tự tin sau hàng chục lần nộp đơn không ai phản hồi ("bị ghost"); hoang mang vì JD Fresher đòi hỏi quá nhiều công nghệ.
- **Thói quen tìm kiếm**: Lướt Facebook group "IT For Beginners", đọc chia sẻ trên Dạy Nhau Học / Viblo; nộp đơn chủ yếu qua TopCV và ITviec.
- **Giá trị cốt lõi từ SkillNexus**: Chỉ ra đúng 2-3 điểm yếu cốt tử cần khắc phục ngay; gợi ý đề bài làm project thực tế để thay thế bài tập console ở trường.

### Persona 2: Lan — The Leveling-up Junior/Mid Dev
- **Độ tuổi**: 24–27 (1–3 năm kinh nghiệm lập trình).
- **Trở ngại**: Làm outsource bị cuốn vào task bảo trì bug, không có cơ hội tiếp xúc với kiến trúc phân tán hoặc công nghệ mới; muốn chuyển sang làm Product / Fintech / Global Remote để nâng lương.
- **Giá trị cốt lõi từ SkillNexus**: Phân tích chênh lệch lương trên thị trường giữa các tech stack; gợi ý cách viết lại CV theo chuẩn quốc tế để tự tin deal lương tăng 20–30%.

---

## 2. Quyết định Loại trừ & Phương án Đã Bác bỏ (Rejected Alternatives)

1. **Bác bỏ tính năng Job Application Board trực tiếp**:
   - *Lý do*: Việc trực tiếp làm cầu nối nhận đơn ứng tuyển và giới thiệu cho doanh nghiệp để thu phí môi giới sẽ kích hoạt yêu cầu cấp giấy phép Sàn dịch vụ việc làm của Sở LĐTB&XH (DoLISA) và khoản ký quỹ 300 triệu VNĐ (Nghị định 23/2021/NĐ-CP). SkillNexus chọn định vị là **Nền tảng Cố vấn & Phân tích Dữ liệu Cá nhân (Analytics SaaS)** để tinh gọn pháp lý.
2. **Bác bỏ việc lưu trữ nguyên văn (Full-text) các bài đăng tuyển dụng**:
   - *Lý do*: Tránh rủi ro vi phạm bản quyền nội dung văn bản JD hoặc vi phạm điều khoản chống cào dữ liệu của bên thứ ba. Hệ thống chỉ bóc tách thực thể trừu tượng (Entity & Knowledge Graph triples: Job -> Requires -> Skill) rồi discard văn bản thô.
3. **Bác bỏ việc dùng Microsoft GraphRAG nguyên bản (CLI framework)**:
   - *Lý do*: Dự án của Microsoft đã chuyển sang trạng thái bảo trì (maintenance mode) vào năm 2025, chi phí indexing toàn bộ đồ thị bằng LLM quá đắt đỏ và không hỗ trợ tốt việc cập nhật gia tăng (incremental updates). Đội ngũ quyết định xây dựng luồng GraphRAG tùy biến trực tiếp trên **Neo4j 5.x + LangChain / LlamaIndex**.

---

## 3. Bản đồ Chuyển giao Tiếp theo (Downstream Hand-offs)

- **UX Design (Sally - `/bmad-agent-ux-designer`)**: Thiết kế User Journey cho 4 màn hình: (1) Upload & Extraction review, (2) Skill Radar & Gap Explorer, (3) 30-60-90 Roadmap Interactive Checklist, (4) Split-screen Resume Tailoring.
- **System Architect (Winston - `/bmad-agent-architect`)**: Thiết kế chi tiết Data Pipeline DAG, cấu trúc bảng PostgreSQL, đồ thị Neo4j Cypher Schema, và API Gateway FastAPI.
- **Tickets / Epics (John - `bmad-ticket`)**: Cắt lát 5 cluster tính năng (FR-1xx đến FR-5xx) thành các Epics và User Stories với Acceptance Criteria (Gherkin format).
