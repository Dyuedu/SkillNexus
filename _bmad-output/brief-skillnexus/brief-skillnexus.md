---
title: "Product Brief: SkillNexus (Agentic Edition)"
status: "draft"
created: "2026-10-15"
updated: "2026-10-15"
author: "Mary (BA) & Winston (System Architect)"
---

# Product Brief: SkillNexus
*Hệ thống Đa Tác tử Cố vấn Nghề nghiệp IT & Bản đồ Tri thức Kỹ năng (Autonomous Multi-Agent System + Neo4j Graph)*

---

## 1. Executive Summary

**SkillNexus** là nền tảng cố vấn nghề nghiệp AI tương tác đa chiều (Autonomous Career Multi-Agent System) xây dựng chuyên biệt cho cộng đồng lập trình viên và sinh viên ngành công nghệ tại Việt Nam. Khác biệt hoàn toàn với các sàn giao dịch việc làm truyền thống (Job Board) hoặc các công cụ phân tích thụ động một chiều, SkillNexus cung cấp một **"Hội đồng Cố vấn Kỹ thuật Cá nhân hóa"** bao gồm 4 Tác tử AI chuyên biệt:

1. **The Career Strategist Agent**: Đóng vai Giám đốc Kỹ thuật (VP of Engineering) tư vấn chiến lược nhảy việc, tối đa hóa mức lương và xây dựng lộ trình học tập thích ứng (Adaptive Roadmap).
2. **The Tech Lead Interviewer Agent**: Đóng vai Tech Lead phỏng vấn phản biện, chủ động đặt câu hỏi tình huống chuyên sâu để xác thực năng lực thực tế, ngăn chặn "chém gió" trên CV.
3. **The Resume Architect Agent**: Đóng vai Chuyên gia tuyển dụng kỹ thuật khó tính (Senior Technical Recruiter), soi và tinh chỉnh từng dòng thành tích (Bullet points) bám sát các JD mục tiêu.
4. **The Market Scout Agent**: Trinh sát dữ liệu, trực tiếp sử dụng công cụ (Tool Calling) để truy vấn mạng lưới tri thức thị trường lao động thời gian thực trên **Neo4j** (hơn 48,000+ tin tuyển dụng IT Việt Nam).

Hệ thống vận hành 100% bằng **Mô hình AI Nội bộ (Local LLM: Qwen-2.5-Coder:7B + Nomic-Embed-Text qua Ollama)**, đảm bảo: **Chi phí vận hành bằng 0**, **Độ trễ thấp**, và **Bảo mật tuyệt đối** theo quy định của Luật Bảo vệ Dữ liệu Cá nhân (PDPL 2026).

---

## 2. The Problem (Nỗi đau thị trường)

1. **Bế tắc một chiều của công cụ truyền thống**: Các nền tảng hiện tại (TopCV, ITviec) chỉ cho phép nộp hồ sơ hoặc chấm điểm từ khóa thụ động. Ứng viên không biết *vì sao* mình trượt và không có ai phản biện xem kỹ năng ghi trong CV đã đủ vững để phỏng vấn thực tế hay chưa.
2. **Khủng hoảng năng lực ảo & Thất nghiệp của Fresher**: 70% sinh viên ra trường không đạt chuẩn tuyển dụng vì CV chỉ có bài tập sao chép (Tutorial projects). Thiếu một người đóng vai Tech Lead vặn vẹo, chỉ ra lỗ hổng kiến trúc trước khi ra hội đồng phỏng vấn thật.
3. **Mập mờ lương bổng & Nỗi sợ chuyển dịch**: Lập trình viên outsource muốn chuyển sang Product Company hoặc kỹ sư AI nhưng không có cố vấn chiến lược chỉ ra: *"Con đường ngắn nhất để tăng 40% thu nhập trong 6 tháng tới là gì?"*

---

## 3. The Solution: Hội đồng Cố vấn Đa Tác tử (Multi-Agent Advisory)

```
                        [Ứng viên / Lập trình viên]
                                     │
                                     ▼
                     ┌───────────────────────────────┐
                     │   Orchestrator Supervisor     │
                     └───────┬───────────────┬───────┘
                             │               │
        ┌────────────────────┴───┐       ┌───┴───────────────────┐
        ▼                        ▼       ▼                       ▼
  [Market Scout]         [Tech Lead]  [Career Strategist]   [Resume Architect]
   (Tool: Neo4j)        (Skill Quiz)     (30-60-90 Plan)       (ATS Re-write)
        │
        ▼
[Neo4j Knowledge Graph: 48k+ JDs, Công việc ↔ Kỹ năng ↔ Mức lương]
```

- **Tương tác Đàm thoại Chủ động (Agentic Dialogue)**: Ứng viên không chỉ nhận một bản báo cáo PDF tĩnh, mà được trò chuyện, tranh luận và nhận thử thách trực tiếp với từng Agent chuyên biệt.
- **Xác thực Năng lực trước khi Khuyên (Skill Verification)**: Agent không tin ngay vào những gì viết trên CV; Agent kiểm tra nhanh kiến thức để vẽ bản đồ Skill Gap chuẩn xác 100%.
- **Bảo chứng bằng Dữ liệu Thực (Grounded in Knowledge Graph)**: Mọi lời khuyên của Agent đều bắt buộc phải trích dẫn số liệu thực tế từ Đồ thị Neo4j thông qua Market Scout Tool.

---

## 4. What Makes This Different (Lợi thế Độc quyền)

| Tiêu chí | Công cụ AI Resume thông thường (ChatGPT/TopCV) | SkillNexus (Agentic Edition) |
| :--- | :--- | :--- |
| **Kiến trúc** | Single-prompt, sinh text 1 lần | **Multi-Agent StateGraph (LangGraph) có phản xạ & phản biện** |
| **Cơ sở dữ liệu** | Kiến thức đóng băng trong LLM (Dễ hallucinate) | **Đồ thị Tri thức Neo4j thời gian thực về thị trường IT Việt Nam** |
| **Độ tin cậy** | Tin tưởng tuyệt đối CV người dùng (Khen vuốt đuôi) | **Tech Lead Agent đặt câu hỏi vặn vẹo để kiểm tra kiến thức thật** |
| **Quyền riêng tư** | Gửi CV lên cloud nước ngoài (Rủi ro vi phạm PDPL) | **100% Local AI trên máy người dùng (Qwen-2.5-Coder:7B qua Ollama)** |
| **Chi phí API** | Phải trả phí OpenAI/Anthropic đắt đỏ | **0 VNĐ chi phí gọi LLM** |

---

## 5. Scope MVP (Agentic Scope)

### In Scope:
- **Khung điều phối LangGraph (Agentic State Machine)** kết nối trực tiếp với Ollama `qwen2.5-coder:7b`.
- **4 Agent Chuyên biệt**: Career Strategist, Tech Lead Interviewer, Resume Architect, Market Scout.
- **Tool Calling Module**: Market Scout Agent tự động gọi Cypher Query truy vấn Neo4j và tính toán khoảng cách kỹ năng / dải lương.
- **Interactive Chat Interface**: Giao diện chat đa tác tử, cho phép người dùng chuyển đổi hoặc chứng kiến các Agent phối hợp tư vấn cho mình.
- **Bảo mật PDPL 2026**: Cơ chế Anonymous Mode và 1-click xóa sạch hội thoại & CV.

### Out of Scope:
- Phỏng vấn giả lập bằng Video/Voice call thời gian thực (Dành cho Phase 2).
- Tự động nộp hồ sơ đến nhà tuyển dụng (Tránh rủi ro pháp lý sàn việc làm DoLISA).
