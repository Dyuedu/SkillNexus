---
title: "Initiative: SkillNexus (Agentic Multi-Agent Edition)"
status: "in-progress"
created: "2026-10-15"
updated: "2026-10-15"
author: "Winston (System Architect) & John (Product Manager)"
---

# Initiative: SkillNexus MVP (Agentic Edition)
*Hệ thống Đa Tác tử Cố vấn Nghề nghiệp IT & Bản đồ Tri thức Kỹ năng (Autonomous Multi-Agent System + Neo4j Graph)*

## 1. Outcome & Intent
Xây dựng nền tảng SkillNexus phiên bản MVP hoạt động hoàn chỉnh theo mô hình **Hệ thống Đa Tác tử (Multi-Agent System)**:
1. Duy trì Đồ thị Tri thức Kỹ năng IT trên Neo4j kết hợp PostgreSQL.
2. Xây dựng bộ khung **LangGraph StateGraph** điều phối 4 Tác tử AI chuyên biệt (Career Strategist, Tech Lead Interviewer, Resume Architect, Market Scout).
3. Vận hành 100% bằng mô hình cục bộ **Qwen-2.5-Coder:7B + Nomic-Embed-Text qua Ollama** (0 VNĐ chi phí API, 100% bảo mật theo PDPL 2026).
4. Mang lại trải nghiệm đàm thoại phản biện 2 chiều: Ứng viên được Tech Lead Agent thử thách kỹ năng thật, Market Scout Agent tra cứu số liệu thực chứng trên Neo4j, Career Strategist Agent vạch lộ trình thích ứng và Resume Architect Agent tối ưu từng gạch đầu dòng CV.

## 2. Done When
- [ ] Khung điều phối LangGraph chạy mượt mà trên máy cục bộ kết nối với Ollama `qwen2.5-coder:7b`.
- [ ] Market Scout Agent gọi đúng Tool truy vấn Cypher trên Neo4j để lấy dải lương và khoảng trống kỹ năng.
- [ ] Tech Lead Agent thực hiện được vòng lặp phỏng vấn mini (2-3 câu hỏi) và chấm điểm năng lực ứng viên.
- [ ] Career Strategist & Resume Architect Agents sinh lộ trình 30-60-90 ngày và gợi ý viết lại CV chuẩn ATS.
- [ ] Giao diện Web Client hỗ trợ tương tác đàm thoại thời gian thực với các Agent.

## 3. Epics Breakdown

| Epic ID | Tên Epic | Trọng tâm |
| :--- | :--- | :--- |
| **EPIC-1** | Core Data Pipeline & Relational Store | PostgreSQL DDL, MinIO, Redis, VietJobs Data Loader |
| **EPIC-2** | Knowledge Graph & Ontology Engine | Neo4j Setup, Cypher Constraints, Vector Index, Normalizer |
| **EPIC-3** | CV Ingestion & Profile Service | Upload API, PDF Parser, PDPL 2026 Anonymous Mode |
| **EPIC-4** | Market Scout Agent & Neo4j Tools | Cypher Tool Calling, Salary Benchmark Tool, Co-occurrence Tool |
| **EPIC-5** | Multi-Agent Advisory Core (LangGraph) | StateGraph, Supervisor Router, Tech Lead, Career Strategist, Resume Architect |
| **EPIC-6** | Agentic Web Client Experience | Next.js 14 Interactive Advisory Chat Board, Skill Radar, Split-Screen Resume Review |
