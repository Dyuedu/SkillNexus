from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID

class ExtractedCVSkill(BaseModel):
    name: str = Field(..., description="Tên kỹ năng (ví dụ: React, Java, Docker)")
    category: str = Field(default="Tool")
    proficiency: str = Field(default="Intermediate", description="Beginner | Intermediate | Advanced")
    years_experience: Optional[float] = Field(None, description="Số năm kinh nghiệm suy luận từ CV")
    is_verified_in_project: bool = Field(default=False, description="True nếu kỹ năng có xuất hiện trong mô tả dự án thực tế")

class ExtractedCV(BaseModel):
    full_name: Optional[str] = Field(None, description="Họ tên ứng viên (sẽ rỗng nếu ở chế độ anonymous)")
    email: Optional[str] = None
    phone: Optional[str] = None
    education_level: Optional[str] = None
    total_years_experience: float = Field(default=0.0)
    skills: List[ExtractedCVSkill] = Field(default_factory=list)
    project_highlights: List[str] = Field(default_factory=list)

class CVUploadResponse(BaseModel):
    resume_id: UUID
    is_anonymous_mode: bool
    total_skills_detected: int
    extracted_skills: List[ExtractedCVSkill]
    years_of_experience: float
    message: str

class SkillGapReport(BaseModel):
    target_role: str
    target_level: str
    match_percentage: int
    matched_skills: List[str]
    missing_core_skills: List[dict]
    high_pay_bonus_skills: List[dict]
    current_estimated_salary: dict
    potential_estimated_salary: dict
