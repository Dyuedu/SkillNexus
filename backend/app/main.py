from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
import logging

from app.core.config import settings
from app.schemas.cv_schema import CVUploadResponse, ExtractedCVSkill
from app.schemas.jd_schema import ExtractedJobDescription
from app.services.normalizer import normalizer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("skillnexus")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="SkillNexus API: Vietnam IT Job Intelligence & Career Advisory Platform"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["Health"])
async def health_check():
    """Healthcheck endpoint for Kubernetes/Docker container status"""
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }

@app.post(
    f"{settings.API_V1_STR}/cv/upload",
    response_model=CVUploadResponse,
    status_code=status.HTTP_200_OK,
    tags=["CV Ingestion"]
)
async def upload_cv(
    file: UploadFile = File(..., description="File CV định dạng PDF hoặc DOCX"),
    is_anonymous: bool = Form(default=False, description="Tùy chọn ẩn danh hóa thông tin PII"),
    pdpl_consent: bool = Form(..., description="Bắt buộc: Người dùng chấp thuận xử lý dữ liệu theo PDPL 2026")
):
    """
    Endpoint tiếp nhận CV người dùng.
    Tuân thủ PDPL 2026: Từ chối ngay lập tức nếu pdpl_consent = False.
    """
    if not pdpl_consent:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Theo Luật Bảo vệ Dữ liệu Cá nhân (PDPL 2026), bạn cần chủ động đồng ý cho phép xử lý dữ liệu CV trước khi phân tích."
        )

    if not file.filename.lower().endswith((".pdf", ".docx")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Hệ thống chỉ chấp nhận file định dạng .pdf hoặc .docx"
        )

    resume_id = uuid4()
    logger.info(f"Đã nhận file CV: {file.filename}, resume_id: {resume_id}, anonymous: {is_anonymous}")

    # Giả lập kết quả trích xuất ban đầu (sẽ được thay bằng service LLM parsing đầy đủ)
    sample_skills = ["Java 17", "Spring Boot", "Docker Compose", "MySQL", "Git"]
    extracted = []
    for raw in sample_skills:
        canonical_name, category = normalizer.normalize(raw)
        extracted.append(
            ExtractedCVSkill(
                name=canonical_name,
                category=category,
                proficiency="Intermediate",
                years_experience=1.5,
                is_verified_in_project=True
            )
        )

    return CVUploadResponse(
        resume_id=resume_id,
        is_anonymous_mode=is_anonymous,
        total_skills_detected=len(extracted),
        extracted_skills=extracted,
        years_of_experience=1.5,
        message="Bóc tách CV thành công. Sẵn sàng đối chiếu Đồ thị Kỹ năng Neo4j."
    )
