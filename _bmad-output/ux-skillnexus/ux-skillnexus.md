---
name: SkillNexus UX
status: final
version: "1.0.0"
date: 2026-10-15
initiative: skillnexus
spines:
  design: ./DESIGN.md
  experience: ./EXPERIENCE.md
framework: "BMad UX + UI/UX Pro Max"
---

# SkillNexus — UX Specification Package

> **Tài liệu đặc tả Thiết kế Giao diện (UI) và Trải nghiệm Người dùng (UX)**
> Tác giả: **Sally — UX Designer (BMad Agent)** phối hợp cùng bộ quy chuẩn **UI/UX Pro Max**.

---

## 1. Tổng quan Bộ tài liệu UX (The Two Spines)

Theo chuẩn phương pháp BMad UX, thiết kế của hệ thống SkillNexus được phân rã thành hai trụ cột độc lập nhưng đồng bộ chặt chẽ:

1. **[`DESIGN.md`](./DESIGN.md) (The Visual Spine — Giao diện hiển thị như thế nào):**
   - **Định hình phong cách:** *Data-Dense Technical Dashboard* kết hợp *Enterprise Gateway* (Density 8/10, Variance 7/10, Motion 4/10).
   - **Bảng màu:** Navy Blue (`#1E40AF`), Electric Blue (`#3B82F6`), Amber Accent (`#D97706`), Dark Slate Canvas (`#F8FAFC` / `#0F172A`).
   - **Màu đại diện 4 AI Agent:** Career Strategist (`#2563EB`), Tech Lead Interviewer (`#D97706`), Resume Architect (`#059669`), Market Scout (`#7C3AED`).
   - **Typography kỹ thuật:** `Fira Code` (Monospace cho tiêu đề, thông số, code, metric) + `Fira Sans` (Sans-serif sạch cho body & microcopy).
   - **Quy chuẩn Icon:** 100% Vector SVG qua Lucide React (nghiêm cấm emoji làm icon giao diện).
   - **Quy chuẩn Tiếp cận (A11y):** Tỷ lệ tương phản tối thiểu 4.5:1 (đạt WCAG 2.2 AA / AAA).

2. **[`EXPERIENCE.md`](./EXPERIENCE.md) (The Behavioral Spine — Hệ thống hoạt động ra sao):**
   - **Kiến trúc Thông tin (IA):** 6 phân vùng tương tác cốt lõi:
     - `S1`: Cổng tải nộp CV & Cam kết Quyền riêng tư (Tuân thủ Luật Dữ liệu Cá nhân số 91/2025/QH15).
     - `S2`: Buồng lái Cố vấn Đa Agent (Multi-Agent Advisory Board với 4 góc nhìn chuyên gia).
     - `S3`: Radar Kỹ năng & Khám phá Đồ thị Tri thức Neo4j tương tác (Skill Radar & Subgraph Explorer).
     - `S4`: Trung tâm Hành động & Lộ trình 30-60-90 ngày thích ứng (Adaptive Roadmap).
     - `S5`: Bộ tinh chỉnh CV song song (Split-Screen Resume Tailor theo chuẩn STAR).
     - `S6`: Bảng lệnh nhanh toàn cục (`⌘K` / `Ctrl+K` Command Palette).
   - **Giọng điệu (Voice & Tone):** Trực diện, khoa học, dựa trên số liệu thị trường thực tế (VietJobs 48k JDs), không nói chung chung hay tâng bốc sáo rỗng.
   - **Trạng thái & Tương tác:** Hỗ trợ stream token từ local Ollama (`qwen2.5-coder:7b`), giải trình truy vấn Cypher minh bạch, phím tắt nhanh (`1-4`, `⌘K`, `⌘U`, `Esc`), kích thước touch target ≥ 44×44px.
   - **Hành trình người dùng mẫu:**
     - **Huy (22 tuổi):** Fresher Backend nộp 20 CV trượt, tìm ra lỗ hổng Docker/Redis và nhận bài test phản xạ từ Tech Lead Agent.
     - **Linh (24 tuổi):** Junior Frontend tìm kiếm lộ trình chuyển hướng sang Fullstack/AI Engineering.

---

## 2. Đường dẫn Tài liệu Liên kết
- Đặc tả Thiết kế Trực quan: [`DESIGN.md`](./DESIGN.md)
- Đặc tả Trải nghiệm & Hành vi: [`EXPERIENCE.md`](./EXPERIENCE.md)
- Kiến trúc Hệ thống (Đã chuyển đổi Multi-Agent): [`../architecture-skillnexus/architecture-skillnexus.md`](../architecture-skillnexus/architecture-skillnexus.md)
- Báo cáo Nghiên cứu Thị trường & Tiếng nói Lập trình viên VN: [`../research-it-dev-uservoice-vn/research-it-dev-uservoice-vn.md`](../research-it-dev-uservoice-vn/research-it-dev-uservoice-vn.md)
