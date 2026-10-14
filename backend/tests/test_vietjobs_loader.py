import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from pipeline.extractors.vietjobs_loader import VietJobsTransformer

def test_vietjobs_transformer_success():
    """Kiểm tra biến đổi bản ghi VietJobs thành schema chuẩn của SkillNexus"""
    raw_sample = {
        "job_title": "Java Spring Boot Developer",
        "company_name": "FPT Software",
        "level": "Fresher",
        "min_salary": 10.0,
        "max_salary": 15.0,
        "location": "Hanoi",
        "skills": ["Java 17", "Spring", "Docker Compose", "Postgres"]
    }
    
    transformed = VietJobsTransformer.transform_record(raw_sample)
    assert transformed.standardized_title == "Java Spring Boot Developer"
    assert transformed.min_salary_vnd == 10_000_000
    assert transformed.max_salary_vnd == 15_000_000
    assert len(transformed.required_skills) == 4
    
    # Check normalized canonical names
    skill_names = [s.name for s in transformed.required_skills]
    assert "Java" in skill_names
    assert "Spring Boot" in skill_names
    assert "Docker" in skill_names
    assert "PostgreSQL" in skill_names
