# SYSTEM SPECIFICATION: SKILLNEXUS PLATFORM

**Tên đầy đủ:** SkillNexus — Bản đồ Nhu cầu Tuyển dụng IT & Cố vấn Nghề nghiệp Cá nhân hóa (Hybrid Data Engineering & GraphRAG)
**Phương pháp phát triển:** Spec-Driven Development (SDD)
**Quy mô nhân sự:** 3 Kỹ sư (Core DE, AI Data Engineer, Applied AI Engineer)
**Thời gian hoàn thành (MVP):** 4 Tuần (28 Ngày)
**Phiên bản tài liệu:** `1.0.0`

---

## 0. Đề xuất Đặt tên Hệ thống (System Naming Options)

Nhóm có thể sử dụng tên mặc định trong tài liệu này là **SkillNexus** hoặc chọn một trong các phương án dưới đây tùy theo phong cách muốn hướng tới khi bảo vệ đồ án:

| Tên Hệ thống                          | Slogan Tiếng Anh                                  | Ý nghĩa & Điểm nhấn                                                                                                                                                          |
| :--------------------------------------- | :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SkillNexus** *(Khuyên dùng)* | *Where IT Market Data Meets Career Intelligence* | **Nexus** thể hiện giao điểm của mạng lưới đồ thị (Neo4j) kết nối giữa Kỹ năng - Công việc - Ứng viên. Ngắn gọn, hiện đại, chuẩn sản phẩm SaaS. |
|                                          |                                                    |                                                                                                                                                                                   |

---

## 1. Tổng quan Hệ thống & Phân định Ranh giới (System Boundaries)

### 1.1. Mục tiêu Cốt lõi (Problem Statement)

Thị trường tuyển dụng IT biến động liên tục nhưng dữ liệu nằm rải rác dưới dạng văn bản phi cấu trúc (Job Descriptions - JD). Ứng viên không biết kỹ năng nào đang thực sự được trả lương cao và thường viết CV lệch với từ khóa của nhà tuyển dụng.

**SkillNexus** giải quyết bài toán này qua 2 luồng dữ liệu kết hợp chặt chẽ:

1. **Batch AI-ETL Pipeline (Offline/Near Real-time):** Thu thập JD tự động mỗi ngày, dùng LLM bóc tách thông tin có cấu trúc, chuẩn hóa thực thể và lưu song song vào **PostgreSQL** (phục vụ phân tích thống kê BI) và **Neo4j** (phục vụ truy vấn Đồ thị Tri thức + Vector).
2. **Agentic GraphRAG Pipeline (Online/Real-time):** Phân tích file `CV.pdf` của người dùng, đối chiếu với đồ thị Neo4j để tìm **Skill Gap** (kỹ năng giá trị cao còn thiếu), gợi ý các JD thực tế khớp nhất và tự động viết lại CV (Resume Tailoring) kèm lộ trình học 6 tuần.

### 1.2. Ma trận Trách nhiệm (Team Topology & RACI)

Để 3 thành viên code song song từ Ngày 1 mà không chờ đợi nhau, mọi giao tiếp giữa các tầng phải thông qua **Data Contracts** được quy định tại Mục 4:

* **Member 1 — Core Data Engineer (`DE`):** Phụ trách `Ingestion` $\rightarrow$ `MinIO (Bronze)` $\rightarrow$ `PostgreSQL (Silver/Gold)` $\rightarrow$ `Airflow Orchestration` $\rightarrow$ `Market Dashboard UI`.
* **Member 2 — AI Data & Graph Engineer (`AI-DE`):** Phụ trách `LLM-in-ETL Extraction` $\rightarrow$ `Entity Resolution (Chuẩn hóa kỹ năng)` $\rightarrow$ `Embedding` $\rightarrow$ `Neo4j Knowledge Graph & Vector Index`.
* **Member 3 — Applied AI & Backend Engineer (`AI-APP`):** Phụ trách `CV PDF Parser` $\rightarrow$ `LangGraph Agent (GraphRAG + Hybrid Search)` $\rightarrow$ `FastAPI Backend` $\rightarrow$ `Interactive Graph & Career Coach UI`.

---

## 2. Kiến trúc Hạ tầng & Danh mục Dịch vụ (Infrastructure Spec)

Toàn bộ hệ thống được đóng gói trong `docker-compose.yml` và chạy trên mạng nội bộ `skillnexus-net`.

| Dịch vụ (Container) | Image chuẩn             | Cổng (Host:Container)       | Vai trò trong Hệ thống                                                               | Người phụ trách |
| :-------------------- | :----------------------- | :--------------------------- | :-------------------------------------------------------------------------------------- | :------------------ |
| `minio`             | `minio/minio:latest`   | `9000:9000`, `9001:9001` | Data Lake (Bronze Layer) lưu trữ JSON JD thô và file PDF CV tải lên.              | Member 1 (DE)       |
| `postgres`          | `postgres:16-alpine`   | `5432:5432`                | Data Warehouse lưu dữ liệu bảng (Silver/Gold) và metadata của Airflow.            | Member 1 (DE)       |
| `airflow`           | `apache/airflow:2.9.3` | `8080:8080`                | Điều phối luồng thu thập dữ liệu, gọi AI-ETL và chạy mô hình `dbt`.       | Member 1 (DE)       |
| `neo4j`             | `neo4j:5.23-community` | `7474:7474`, `7687:7687` | Lưu trữ Đồ thị Tri thức (`Job` - `Skill` - `Company`) và `Vector Index`. | Member 2 (AI-DE)    |
| `fastapi-core`      | `python:3.11-slim`     | `8000:8000`                | Backend API cung cấp các endpoint phân tích thị trường, quét CV và Agent.      | Member 3 (AI-APP)   |
| `web-ui`            | `python:3.11-slim`     | `8501:8501`                | Giao diện người dùng (Streamlit + `streamlit-agraph` hoặc Next.js).              | Member 3 & Member 1 |
| `langfuse`          | `langfuse/langfuse:2`  | `3000:3000`                | Giám sát LLMOps (Theo dõi truy vấn Cypher, độ trễ, chi phí token).              | Member 3 (AI-APP)   |

---

## 3. Cấu trúc Thư mục Dự án (Monorepo Specification)

Nhóm tuân thủ tuyệt đối cấu trúc thư mục sau để tránh xung đột Git (`merge conflict`):

```text
skillnexus-platform/
├── docker-compose.yml
├── .env.example
├── Makefile
├── SPEC.md                          # File đặc tả kỹ thuật này
├── contracts/                       # Nơi chứa Pydantic Schema dùng chung cho cả 3 người
│   ├── __init__.py
│   ├── raw_job.py                   # Contract giữa Member 1 và Member 2
│   ├── extracted_job.py             # Contract đầu ra của AI-ETL (Member 2)
│   └── candidate_profile.py         # Contract đầu vào/ra của Member 3
├── data_engineering/                # [VÙNG LÀM VIỆC CỦA MEMBER 1]
│   ├── crawlers/
│   │   ├── remoteok_spider.py
│   │   ├── arbeitnow_spider.py
│   │   └── vn_job_sitemap_spider.py
│   ├── dags/
│   │   ├── dag_01_ingest_bronze.py
│   │   └── dag_02_transform_gold.py
│   └── dbt_skillnexus/
│       ├── dbt_project.yml
│       └── models/
│           ├── staging/
│           └── marts/
├── ai_data_pipeline/                # [VÙNG LÀM VIỆC CỦA MEMBER 2]
│   ├── extractor/
│   │   ├── llm_extractor.py         # Instructor + Gemini Flash / Qwen
│   │   └── prompts.py
│   ├── entity_resolution/
│   │   ├── canonical_skills.json    # Từ điển kỹ năng chuẩn
│   │   └── skill_normalizer.py      # RapidFuzz + BGE-M3 Cosine Similarity
│   └── graph_loader/
│       ├── neo4j_client.py
│       └── sync_to_neo4j.py
├── applied_ai/                      # [VÙNG LÀM VIỆC CỦA MEMBER 3]
│   ├── cv_parser/
│   │   └── docling_parser.py        # Chuyển PDF CV sang Markdown & JSON
│   ├── graphrag_agent/
│   │   ├── state.py                 # LangGraph State
│   │   ├── cypher_queries.py        # Truy vấn tìm Skill Gap
│   │   ├── nodes.py                 # Các bước xử lý của Agent
│   │   └── workflow.py              # Đồ thị luồng LangGraph
│   ├── api/
│   │   └── main.py                  # FastAPI Endpoints
│   └── evaluation/
│       └── ragas_eval.py            # Kịch bản chấm điểm Ragas
└── frontend/                        # [GIAO DIỆN CHUNG]
    ├── app.py
    └── pages/
        ├── 1_Market_Pulse.py        # Member 1 phụ trách
        ├── 2_Skill_Gap_Graph.py     # Member 3 phụ trách
        └── 3_Resume_Tailor.py       # Member 3 phụ trách
```

---

## 4. Đặc tả Hợp đồng Dữ liệu (Data Contracts & Schemas)

Đây là phần quan trọng nhất của **Spec-Driven Development**. Mọi thành viên có thể tự tạo dữ liệu giả lập (Mock Data) theo đúng các cấu trúc dưới đây để code phần của mình ngay từ Tuần 1.

### 4.1. Contract 1: Dữ liệu JD Thô tại Tầng Bronze (MinIO JSON)

* **Người tạo:** Member 1 (`crawlers/`)
* **Người tiêu thụ:** Member 2 (`ai_data_pipeline/`)
* **Đường dẫn lưu trữ trên MinIO:** `s3://bronze-jobs/source={source_name}/date={YYYY-MM-DD}/{job_id}.json`

```python
# File: contracts/raw_job.py
from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional

class RawJobRecord(BaseModel):
    job_id: str                  # Mã băm SHA-256 của (source + original_url)
    source: str                  # VD: "remoteok", "itviec", "topdev", "kaggle_seed"
    original_url: HttpUrl
    title: str
    company_name: str
    location_raw: Optional[str] = None
    salary_raw: Optional[str] = None
    description_text: str        # Toàn bộ nội dung JD đã loại bỏ thẻ HTML rác
    posted_at: datetime
    ingested_at: datetime
```

### 4.2. Contract 2: Đầu ra AI-ETL Đã Chuẩn hóa (Structured LLM Extraction)

* **Người tạo:** Member 2 (`ai_data_pipeline/extractor/`)
* **Người tiêu thụ:** Member 1 (nạp vào PostgreSQL) & Member 2 (nạp vào Neo4j)

```python
# File: contracts/extracted_job.py
from pydantic import BaseModel, Field
from typing import List, Literal, Optional

class ExtractedSkillItem(BaseModel):
    raw_name: str = Field(..., description="Tên kỹ năng nguyên bản trong JD")
    canonical_name: str = Field(..., description="Tên chuẩn hóa, VD: 'K8s' -> 'Kubernetes'")
    category: Literal["LANGUAGE", "FRAMEWORK", "DATABASE", "CLOUD_DEVOPS", "AI_DATA", "TOOL", "CONCEPT"]
    is_mandatory: bool = Field(..., description="True nếu là kỹ năng bắt buộc, False nếu là điểm cộng")

class StructuredJobPosting(BaseModel):
    job_id: str
    standardized_role: Literal[
        "DATA_ENGINEER", "AI_ENGINEER", "DATA_SCIENTIST", 
        "BACKEND_ENGINEER", "FRONTEND_ENGINEER", "FULLSTACK_ENGINEER", 
        "DEVOPS_SRE", "MOBILE_ENGINEER", "QA_ENGINEER", "OTHER"
    ]
    seniority: Literal["INTERN_FRESHER", "JUNIOR", "MID_LEVEL", "SENIOR", "LEAD_PRINCIPAL"]
    min_years_experience: float = Field(default=0.0, ge=0.0, le=20.0)
    salary_min_usd: Optional[float] = Field(None, description="Quy đổi về USD/tháng")
    salary_max_usd: Optional[float] = Field(None, description="Quy đổi về USD/tháng")
    work_mode: Literal["REMOTE", "HYBRID", "ONSITE", "UNKNOWN"]
    city: Optional[str] = Field(None, description="Ha Noi, Ho Chi Minh, Da Nang, Global...")
    skills: List[ExtractedSkillItem]
    summary_bullet_points: List[str] = Field(..., description="3 gạch đầu dòng tóm tắt trách nhiệm cốt lõi")
```

### 4.3. Contract 3: Thiết kế Bảng PostgreSQL (Silver & Gold Layers)

* **Người phụ trách:** Member 1 (`data_engineering/dbt_skillnexus/`)

```sql
-- Bảng Silver: Lưu thông tin JD đã làm sạch
CREATE TABLE IF NOT EXISTS silver_jobs (
    job_id VARCHAR(64) PRIMARY KEY,
    source VARCHAR(32) NOT NULL,
    original_url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    standardized_role VARCHAR(50) NOT NULL,
    seniority VARCHAR(32) NOT NULL,
    min_years_experience NUMERIC(4,1) DEFAULT 0,
    salary_min_usd NUMERIC(10,2),
    salary_max_usd NUMERIC(10,2),
    salary_midpoint_usd NUMERIC(10,2) GENERATED ALWAYS AS (( COALESCE(salary_min_usd, salary_max_usd) + COALESCE(salary_max_usd, salary_min_usd) ) / 2.0) STORED,
    work_mode VARCHAR(20),
    city VARCHAR(100),
    posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bảng cầu nối (Bridge Table): Quan hệ N-N giữa Job và Kỹ năng chuẩn hóa
CREATE TABLE IF NOT EXISTS silver_job_skills (
    job_id VARCHAR(64) REFERENCES silver_jobs(job_id) ON DELETE CASCADE,
    canonical_skill VARCHAR(100) NOT NULL,
    skill_category VARCHAR(50) NOT NULL,
    is_mandatory BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (job_id, canonical_skill)
);

-- Bảng Gold (dbt Mart): Thống kê xu hướng kỹ năng & mức lương theo vị trí
-- Được dbt tự động rebuild mỗi ngày
CREATE TABLE IF NOT EXISTS gold_skill_market_demand (
    standardized_role VARCHAR(50),
    canonical_skill VARCHAR(100),
    skill_category VARCHAR(50),
    job_count INT,
    demand_percentage NUMERIC(5,2),
    median_salary_usd NUMERIC(10,2),
    p75_salary_usd NUMERIC(10,2),
    updated_at TIMESTAMP WITH TIME ZONE
);
```

### 4.4. Contract 4: Thiết kế Đồ thị Tri thức Neo4j (Graph & Vector Schema)

* **Người phụ trách:** Member 2 (`ai_data_pipeline/graph_loader/`)

#### Các loại Đỉnh (Node Labels & Properties):

1. `(:Job {job_id, title, standardized_role, seniority, salary_midpoint_usd, original_url, summary_text, embedding})`
2. `(:Skill {name, category, demand_score})` — trong đó `name` là `canonical_name` duy nhất.
3. `(:Company {name})`
4. `(:Role {name})` — tương ứng với `standardized_role`.

#### Các loại Cạnh (Relationships):

1. `(:Job)-[:REQUIRES {is_mandatory: boolean}]->(:Skill)`
2. `(:Job)-[:BELONGS_TO_ROLE]->(:Role)`
3. `(:Job)-[:POSTED_BY]->(:Company)`
4. `(:Skill)-[:CO_OCCURS_WITH {weight: int, pmi_score: float}]->(:Skill)` — Cạnh tổng hợp thể hiện hai kỹ năng thường xuyên xuất hiện chung trong cùng một JD.

#### Khởi tạo Ràng buộc & Vector Index trên Neo4j (Chạy tự động khi khởi động):

```cypher
// 1. Ràng buộc duy nhất (Uniqueness Constraints)
CREATE CONSTRAINT job_id_unique IF NOT EXISTS FOR (j:Job) REQUIRE j.job_id IS UNIQUE;
CREATE CONSTRAINT skill_name_unique IF NOT EXISTS FOR (s:Skill) REQUIRE s.name IS UNIQUE;
CREATE CONSTRAINT role_name_unique IF NOT EXISTS FOR (r:Role) REQUIRE r.name IS UNIQUE;

// 2. Khởi tạo Vector Index cho mô hình BAAI/bge-m3 (1024 chiều) hoặc text-embedding-3-small (1536 chiều)
CREATE VECTOR INDEX job_summary_vector_idx IF NOT EXISTS
FOR (j:Job) ON (j.embedding)
OPTIONS {indexConfig: {
  `vector.dimensions`: 1024,
  `vector.similarity_function`: 'cosine'
}};
```

---

## 5. Đặc tả Thuật toán & Công thức Toán học (Core Algorithms)

### 5.1. Thuật toán Chuẩn hóa Tên Kỹ năng (Entity Resolution — Member 2)

Để gộp các biến thể như `"React.js"`, `"ReactJS"`, `"React 18"` về một đỉnh chuẩn `"React"`, pipeline áp dụng bộ lọc 2 tầng đối với mỗi kỹ năng thô $s_{\text{raw}}$ so với tập từ điển chuẩn $C = \{c_1, c_2, \dots, c_m\}$:

1. **Tầng 1 (Lexical Matching):** Chuẩn hóa chữ thường, bỏ ký tự đặc biệt và tính khoảng cách Jaro-Winkler / Token Ratio qua `RapidFuzz`. Nếu tồn tại $c_i \in C$ sao cho:
   $$
   \text{Score}_{\text{lexical}}(s_{\text{raw}}, c_i) \ge 92.0
   $$

   thì gán trực tiếp $s_{\text{canonical}} = c_i$.
2. **Tầng 2 (Semantic Vector Matching):** Nếu Tầng 1 không khớp, tính độ tương đồng Cosine giữa vector nhúng $\mathbf{v}(s_{\text{raw}})$ và $\mathbf{v}(c_i)$ bằng mô hình `BAAI/bge-m3`:
   $$
   \text{Sim}_{\text{cosine}}\left(\mathbf{v}(s_{\text{raw}}), \mathbf{v}(c_i)\right) = \frac{\mathbf{v}(s_{\text{raw}}) \cdot \mathbf{v}(c_i)}{\|\mathbf{v}(s_{\text{raw}})\|_2 \|\mathbf{v}(c_i)\|_2}
   $$

   Nếu giá trị cực đại đạt ngưỡng $\ge 0.86$, gán về $c_i$ tương ứng; ngược lại, tạo thực thể mới vào danh sách chờ duyệt.

### 5.2. Công thức Tính Điểm Ưu tiên Kỹ năng Còn thiếu (Skill Gap Priority Score — Member 3)

Khi ứng viên có tập kỹ năng hiện tại $S_{\text{user}}$ và nhắm tới vị trí mục tiêu $R_{\text{target}}$, điểm ưu tiên học tập của một kỹ năng còn thiếu $s_k \notin S_{\text{user}}$ được tính trên đồ thị Neo4j như sau:

$$
\text{Priority}(s_k \mid S_{\text{user}}, R_{\text{target}}) = \alpha \cdot \frac{N(s_k, R_{\text{target}})}{N(R_{\text{target}})} + \beta \cdot \frac{\sum_{u \in S_{\text{user}}} w_{\text{co}}(u, s_k)}{|S_{\text{user}}| \cdot W_{\max}} + \gamma \cdot \frac{\text{MedSalary}(s_k, R_{\text{target}})}{\text{MaxSalary}(R_{\text{target}})}
$$

Trong đó:

* $N(s_k, R_{\text{target}}) / N(R_{\text{target}})$: Tần suất xuất hiện của kỹ năng $s_k$ trong các JD thuộc vị trí $R_{\text{target}}$.
* $w_{\text{co}}(u, s_k)$: Trọng số cạnh đồng xuất hiện (`CO_OCCURS_WITH`) giữa kỹ năng ứng viên đã biết $u \in S_{\text{user}}$ và kỹ năng còn thiếu $s_k$.
* $\text{MedSalary}(s_k, R_{\text{target}})$: Mức lương trung vị của các JD yêu cầu $s_k$.
* Trọng số mặc định: $\alpha = 0.45$, $\beta = 0.35$, $\gamma = 0.20$ (với $\alpha + \beta + \gamma = 1$).

### 5.3. Điểm Tương thích Ứng viên - Công việc (Hybrid Matching Score)

Đối với mỗi JD mục tiêu $J_i$ có tập kỹ năng bắt buộc $M_i$ và kỹ năng cộng thêm $O_i$:

$$
\text{MatchScore}(S_{\text{user}}, J_i) = 100 \times \left( 0.60 \cdot \frac{|S_{\text{user}} \cap M_i|}{\max(|M_i|, 1)} + 0.15 \cdot \frac{|S_{\text{user}} \cap O_i|}{\max(|O_i|, 1)} + 0.25 \cdot \text{Sim}_{\text{cosine}}(\mathbf{v}_{\text{CV}}, \mathbf{v}_{J_i}) \right)
$$

---

## 6. Đặc tả Luồng LangGraph & Truy vấn Cypher (Applied AI Spec)

### 6.1. Truy vấn Cypher Tìm Skill Gap & JD Phù hợp (Chạy trong Node 2 của LangGraph)

* **Tham số đầu vào:** `$user_skills` (Danh sách kỹ năng từ CV), `$target_role` (Vị trí ứng tuyển), `$min_salary` (Lương kỳ vọng tối thiểu).

```cypher
// Tìm Top 10 kỹ năng còn thiếu (Skill Gap) có giá trị cao nhất cho vị trí mục tiêu
MATCH (r:Role {name: $target_role})<-[:BELONGS_TO_ROLE]-(j:Job)-[req:REQUIRES]->(missing:Skill)
WHERE NOT missing.name IN $user_skills
  AND ($min_salary IS NULL OR j.salary_midpoint_usd >= $min_salary)
OPTIONAL MATCH (known:Skill)-[co:CO_OCCURS_WITH]-(missing)
WHERE known.name IN $user_skills
WITH missing,
      count(DISTINCT j) AS job_demand,
     avg(j.salary_midpoint_usd) AS avg_salary,
     sum(coalesce(co.weight, 0)) AS synergy_score,
     collect(DISTINCT j.title)[0..3] AS sample_job_titles
RETURN missing.name AS skill_name,
       missing.category AS category,
       job_demand,
       round(avg_salary, 0) AS expected_salary_usd,
       synergy_score,
       sample_job_titles
ORDER BY (job_demand * 0.6 + synergy_score * 0.4) DESC
LIMIT 10;
```

### 6.2. Đồ thị Trạng thái LangGraph (`applied_ai/graphrag_agent/`)

```python
# File: applied_ai/graphrag_agent/state.py
from typing import TypedDict, List, Dict, Any

class CareerCopilotState(TypedDict):
    cv_markdown: str                       # Văn bản CV sau khi qua Docling
    target_role: str                       # VD: "DATA_ENGINEER"
    target_salary_usd: float               # VD: 2000.0
    extracted_user_skills: List[str]       # Kỹ năng hiện có của ứng viên
    skill_gaps: List[Dict[str, Any]]       # Kết quả trả về từ Cypher Neo4j
    matched_jobs: List[Dict[str, Any]]     # Top 5 JD lấy từ Hybrid Search (Graph + Vector)
    learning_roadmap_md: str               # Lộ trình học 6 tuần
    tailored_cv_bullets: List[Dict[str, str]] # Cặp {original_bullet, improved_bullet, reason}
```

Luồng thực thi gồm **4 Nodes tuần tự có kiểm tra điều kiện**:

1. `node_parse_cv`: Nhận file PDF $\rightarrow$ gọi `Docling` chuyển thành Markdown $\rightarrow$ trích xuất `extracted_user_skills` chuẩn hóa theo từ điển của Member 2.
2. `node_graph_skill_gap`: Thực thi câu lệnh Cypher trên Neo4j để lấy danh sách `skill_gaps` và dữ liệu cấu trúc đồ thị con (Subgraph) để vẽ lên giao diện.
3. `node_hybrid_job_retriever`: Kết hợp Vector Search trên `job_summary_vector_idx` và lọc theo số lượng kỹ năng trùng khớp để lấy ra Top 5 JD thực tế đang mở.
4. `node_career_coach_synthesizer`: Sinh lộ trình học tập 6 tuần lấp đầy `skill_gaps` và viết lại các gạch đầu dòng kinh nghiệm trong CV theo phương pháp **STAR (Situation - Task - Action - Result)**.
   * **Guardrail bắt buộc:** Prompt tuyệt đối cấm LLM thêm công nghệ ứng viên chưa từng làm vào phần kinh nghiệm quá khứ; các kỹ năng thuộc nhóm `skill_gaps` chỉ được đưa vào mục *"Lộ trình Dự án Đề xuất"* hoặc tối ưu lại cách diễn đạt cho các kỹ năng tương đương đã có.

---

## 7. Đặc tả REST API (FastAPI Endpoints Contract)

Base URL: `http://localhost:8000/api/v1`

### 7.1. `GET /market/overview` (Phục vụ Tab 1 — Market Pulse)

* **Tham số Query:** `role` (tùy chọn, mặc định `"ALL"`), `days` (mặc định `30`).
* **Response `200 OK`:**

```json
{
  "total_jobs_analyzed": 12450,
  "last_pipeline_run": "2026-10-14T06:00:00Z",
  "top_skills": [
    {"skill": "Python", "category": "LANGUAGE", "demand_pct": 68.4, "median_salary_usd": 2100},
    {"skill": "Apache Spark", "category": "AI_DATA", "demand_pct": 42.1, "median_salary_usd": 2450}
  ],
  "salary_by_seniority": [
    {"seniority": "JUNIOR", "p25": 700, "median": 950, "p75": 1200},
    {"seniority": "SENIOR", "p25": 2200, "median": 2800, "p75": 3500}
  ]
}
```

### 7.2. `POST /copilot/analyze-cv` (Phục vụ Tab 2 & Tab 3 — GraphRAG Analyzer)

* **Request (`multipart/form-data`):**
  * `cv_file`: File `.pdf` (tối đa 5MB)
  * `target_role`: `"DATA_ENGINEER"`
  * `target_salary_usd`: `2000`
* **Response `200 OK`:**

```json
{
  "candidate_skills": ["Python", "SQL", "PostgreSQL", "Docker", "Airflow"],
  "overall_match_score": 64.5,
  "skill_gaps": [
    {
      "skill_name": "dbt",
      "category": "AI_DATA",
      "job_demand": 142,
      "expected_salary_usd": 2300,
      "synergy_with_existing": ["PostgreSQL", "Airflow", "SQL"]
    }
  ],
  "subgraph_visualization": {
    "nodes": [
      {"id": "Python", "group": "OWNED_SKILL"},
      {"id": "dbt", "group": "MISSING_SKILL"},
      {"id": "DATA_ENGINEER", "group": "TARGET_ROLE"}
    ],
    "edges": [
      {"source": "DATA_ENGINEER", "target": "Python", "label": "REQUIRES"},
      {"source": "DATA_ENGINEER", "target": "dbt", "label": "HIGH_VALUE_GAP"}
    ]
  },
  "recommended_jobs": [
    {
      "job_id": "9f86d081884c7d65",
      "title": "Senior Data Engineer (Lakehouse)",
      "company_name": "TechCorp VN",
      "match_score": 78.2,
      "original_url": "https://..."
    }
  ],
  "learning_roadmap_md": "### Tuần 1-2: Làm chủ Data Transformation với dbt...",
  "tailored_cv_bullets": [
    {
      "original": "Viết script Python lấy dữ liệu lưu vào Postgres hàng ngày.",
      "tailored": "Thiết kế và vận hành các luồng ETL tự động bằng Apache Airflow và Python, chuẩn hóa dữ liệu trên PostgreSQL phục vụ báo cáo phân tích với độ trễ giảm 40%.",
      "matched_keywords": ["Apache Airflow", "ETL", "PostgreSQL"]
    }
  ]
}
```

---

## 8. Tiêu chí Nghiệm thu & Kiểm thử Chất lượng (Definition of Done - 4 Tuần)

Dự án được coi là hoàn thành xuất sắc sau 4 tuần khi vượt qua toàn bộ các chỉ số kiểm thử (Acceptance Criteria) sau:

| Hạng mục Kiểm thử                               | Chỉ số Mục tiêu (KPI / SLA)                                                                                                 | Công cụ Đo lường                   | Người chịu trách nhiệm |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------- | :-------------------------- |
| **1. Quy mô Dữ liệu (Data Volume)**        | Tối thiểu $\ge 10.000$ bản ghi JD trong PostgreSQL và Neo4j; nạp mới tự động $\ge 100$ JD/ngày.                   | PostgreSQL & Neo4j Count Query          | Member 1 (DE)               |
| **2. Độ chính xác AI-ETL**                | $F_1\text{-score} \ge 0.85$ khi trích xuất danh sách kỹ năng trên tập kiểm thử 50 JD gán nhãn tay.                 | Script đánh giá Python (`pytest`)  | Member 2 (AI-DE)            |
| **3. Tỷ lệ Gộp Trùng Kỹ năng**          | Giảm ít nhất $\ge 35\%$ số lượng đỉnh kỹ năng bị trùng lặp tên nhờ tầng Entity Resolution.                    | Thống kê số lượng Node trước/sau | Member 2 (AI-DE)            |
| **4. Độ trễ Hệ thống (Latency)**         | Truy vấn Cypher tìm Skill Gap $\le 800\text{ ms}$; tổng thời gian phân tích CV và sinh lộ trình $\le 15\text{ s}$. | Langfuse Tracing & FastAPI Middleware   | Member 3 (AI-APP)           |
| **5. Chất lượng GraphRAG**                 | Điểm **Faithfulness** $\ge 0.85$ và **Answer Relevancy** $\ge 0.80$ trên bộ 30 câu hỏi kiểm thử.       | Bộ khung đánh giá `Ragas`         | Member 3 (AI-APP)           |
| **6. Khả năng Tái lập (Reproducibility)** | Chạy lệnh `docker compose up -d` trên máy mới khởi tạo thành công toàn bộ 7 dịch vụ không lỗi.                 | Docker Compose Healthcheck              | Cả nhóm                   |
