from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from uuid import UUID

class ExtractedSkill(BaseModel):
    name: str = Field(..., description="Tên kỹ năng chuẩn tiếng Anh (ví dụ: Spring Boot, Docker, Redis)")
    category: str = Field(default="Tool", description="Language | Framework | Database | Cloud | Tool | Methodology | CoreConcept")
    is_mandatory: bool = Field(default=True, description="True nếu là yêu cầu bắt buộc, False nếu là điểm cộng")
    min_years_experience: float = Field(default=0.0, description="Số năm kinh nghiệm tối thiểu yêu cầu cho kỹ năng này")

class ExtractedJobDescription(BaseModel):
    standardized_title: str = Field(..., description="Chức danh chuẩn: Frontend Engineer, Backend Engineer, DevOps, etc.")
    seniority_level: str = Field(default="Junior", description="Intern | Fresher | Junior | Middle | Senior | Lead")
    company_name: str
    company_type: str = Field(default="Outsource", description="Product | Outsource | Agency | Unknown")
    min_salary_vnd: Optional[int] = Field(None, description="Lương tối thiểu theo tháng bằng VND")
    max_salary_vnd: Optional[int] = Field(None, description="Lương tối đa theo tháng bằng VND")
    is_salary_negotiable: bool = Field(default=False, description="True nếu JD để lương thỏa thuận")
    work_location: str = Field(default="Hanoi", description="Hanoi | HCMC | Da Nang | Remote | Hybrid")
    required_skills: List[ExtractedSkill] = Field(default_factory=list, description="Danh sách các kỹ năng được bóc tách từ JD")

class JobPostingResponse(BaseModel):
    id: UUID
    title: str
    standardized_title: str
    level: str
    company_name: str
    min_salary_vnd: Optional[int]
    max_salary_vnd: Optional[int]
    location: Optional[str]
    skills: List[ExtractedSkill] = []

    model_config = ConfigDict(from_attributes=True)
