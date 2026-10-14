# SkillNexus Product Brief — Addendum
*Tài liệu Bổ sung Kỹ thuật, Pháp lý & Cạnh tranh cho Downstream Skills (PRD, Architecture)*

---

## 1. Dữ liệu Mẫu & Chiến lược Thu thập Dữ liệu (Data Acquisition)

### Nguồn khởi động an toàn (Bootstrap Phase):
- **VietJobs Corpus**: Khai thác 48,092 tin tuyển dụng CNTT đã được gán nhãn của VinUniversity / VinNLP trên Hugging Face (`dinhieufam/VietJobs`). Dùng để:
  - Khởi tạo Graph Ontology ban đầu trên Neo4j.
  - Huấn luyện/Prompting trích xuất thực thể cho Qwen-2.5 / Gemini Flash.
  - Xác lập ngưỡng mức lương tham chiếu ban đầu.
- **Dữ liệu mở cộng đồng**: Nguồn tin từ `awesome-jobs/vietnam` trên GitHub (các tin tuyển dụng cam kết minh bạch mức lương).

### Vận hành hàng ngày (Daily Ingestion):
- Thu thập metadata và tiêu đề, yêu cầu từ các trang công khai.
- **Nguyên tắc pháp lý**: Không lưu trữ nguyên văn (full text verbatim) để tuân thủ bản quyền; chỉ bóc tách thực thể: `[Vị trí]`, `[Kỹ năng bắt buộc]`, `[Mức lương tối thiểu - tối đa]`, `[Công ty]`, `[Địa điểm]`.

---

## 2. Đặc tả Chi tiết Kiến trúc Hệ thống

### Neo4j Knowledge Graph Schema Đề xuất:
- **Node Labels**:
  - `(:Job)`: `job_id`, `title`, `level` (Fresher/Junior/Mid/Senior), `min_salary`, `max_salary`, `currency`, `location`
  - `(:Skill)`: `name`, `normalized_id` (ESCO code), `category` (Language, Framework, Database, Cloud, Tool)
  - `(:Company)`: `company_id`, `name`, `industry`, `type` (Product, Outsource)
  - `(:User)`: `user_id`, `experience_years`, `target_role`
- **Relationship Types**:
  - `(:Job)-[:REQUIRES {importance: "mandatory"|"preferred", min_years: int}]->(:Skill)`
  - `(:Job)-[:POSTED_BY]->(:Company)`
  - `(:Skill)-[:CO_OCCURS_WITH {weight: float}]->(:Skill)`
  - `(:User)-[:POSSESSES {proficiency: string, verified: bool}]->(:Skill)`
  - `(:User)-[:TARGETS]->(:Job)`

### Quy tắc Chống Siêu nút (Super-node Mitigation):
- Các kỹ năng quá phổ biến như "Git", "OOP", "Communication" có bậc liên kết (degree) cực lớn. Giải pháp:
  - Phân tầng kỹ năng theo danh mục: Core Language vs. Tool vs. Soft Skill.
  - Giới hạn độ sâu duyệt đồ thị (Traversal Depth $\le 2$ bước).
  - Lọc ngưỡng tương quan `CO_OCCURS_WITH` có trọng số $\ge 0.3$.

---

## 3. Bản đồ Pháp lý & Quyền riêng tư (PDPL 2026)

- Áp dụng Luật số 91/2025/QH15 (hiệu lực 01/01/2026).
- **Cơ chế lưu trữ CV**:
  - Khi tải CV lên, hệ thống mã hóa và bóc tách thành vector/JSON thực thể.
  - Tùy chọn: Người dùng có thể chọn chế độ *"Phân tích ẩn danh & Tự động xóa file PDF sau 24h"* để bảo vệ thông tin liên hệ.
  - Tuyệt đối không bán dữ liệu danh bạ hoặc thông tin liên hệ của ứng viên cho bên thứ ba (khắc phục triệt để vấn đề spam rác của TopCV).

---

## 4. Bảng So sánh Khác biệt Cạnh tranh Chi tiết (Battlecards)

- **vs. TopCV**: TopCV tối ưu cho việc tạo mẫu CV đẹp và rải hồ sơ. SkillNexus tối ưu cho việc nâng cao thực lực, tìm đúng điểm khuyết kỹ năng và tạo lộ trình cải thiện trước khi nộp đơn.
- **vs. ITviec**: ITviec thiên về đăng tin tuyển dụng cho khối Middle/Senior. SkillNexus giải quyết bài toán của Fresher/Junior với các phân tích chi tiết vì sao bị từ chối và cần học gì cụ thể.
- **vs. LinkedIn**: LinkedIn chi phí quá cao ($39.99/tháng), ngôn ngữ và dữ liệu định giá toàn cầu. SkillNexus bản địa hóa với mức giá 79,000 VNĐ/tháng, thanh toán trực tiếp qua MoMo/ZaloPay.
