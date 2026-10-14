import pytest
from pydantic import ValidationError
from app.schemas.jd_schema import ExtractedJobDescription, ExtractedSkill
from app.schemas.cv_schema import CVUploadResponse, ExtractedCVSkill
from uuid import uuid4

def test_extracted_jd_validation_success():
    """Kiểm tra Pydantic model bóc tách JD hợp lệ"""
    jd_data = {
        "standardized_title": "Backend Engineer",
        "seniority_level": "Junior",
        "company_name": "VNG Corporation",
        "company_type": "Product",
        "min_salary_vnd": 15000000,
        "max_salary_vnd": 25000000,
        "is_salary_negotiable": False,
        "work_location": "HCMC",
        "required_skills": [
            {"name": "Go", "category": "Language", "is_mandatory": True, "min_years_experience": 1.0},
            {"name": "Docker", "category": "Tool", "is_mandatory": True, "min_years_experience": 0.5}
        ]
    }
    jd = ExtractedJobDescription(**jd_data)
    assert jd.standardized_title == "Backend Engineer"
    assert len(jd.required_skills) == 2
    assert jd.required_skills[0].name == "Go"

def test_extracted_jd_validation_missing_title():
    """Bắt buộc phải có standardized_title"""
    with pytest.raises(ValidationError):
        ExtractedJobDescription(
            company_name="Tech Corp",
            work_location="Hanoi"
        )

def test_cv_upload_response_model():
    """Kiểm tra cấu trúc response trả về khi upload CV"""
    res_id = uuid4()
    response = CVUploadResponse(
        resume_id=res_id,
        is_anonymous_mode=True,
        total_skills_detected=2,
        extracted_skills=[
            ExtractedCVSkill(name="Java", category="Language", proficiency="Advanced", years_experience=2.0)
        ],
        years_of_experience=2.0,
        message="Upload thành công"
    )
    assert response.resume_id == res_id
    assert response.is_anonymous_mode is True
