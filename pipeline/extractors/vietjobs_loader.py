"""
VietJobs Open Dataset Loader & Transformer for SkillNexus
Bootstrap asset: 48,092 Vietnamese JDs from VinUniversity / VinNLP (HuggingFace: dinhieufam/VietJobs)
"""
import json
import logging
from typing import List, Dict, Any
from app.schemas.jd_schema import ExtractedJobDescription, ExtractedSkill
from app.services.normalizer import normalizer

logger = logging.getLogger("skillnexus.pipeline")

class VietJobsTransformer:
    @staticmethod
    def transform_record(raw_record: Dict[str, Any]) -> ExtractedJobDescription:
        """
        Biến đổi một bản ghi thô từ VietJobs corpus sang ExtractedJobDescription chuẩn.
        """
        title = raw_record.get("job_title", "Software Engineer")
        company = raw_record.get("company_name", "Undisclosed Tech Company")
        
        # Parse salary (VietJobs stores in million VND)
        min_sal = raw_record.get("min_salary")
        max_sal = raw_record.get("max_salary")
        
        min_salary_vnd = int(min_sal * 1_000_000) if min_sal else None
        max_salary_vnd = int(max_sal * 1_000_000) if max_sal else None

        # Trích xuất và chuẩn hóa kỹ năng
        raw_skills = raw_record.get("skills", [])
        normalized_skills: List[ExtractedSkill] = []
        
        for s in raw_skills:
            canonical_name, category = normalizer.normalize(s)
            normalized_skills.append(
                ExtractedSkill(
                    name=canonical_name,
                    category=category,
                    is_mandatory=True,
                    min_years_experience=0.0
                )
            )

        return ExtractedJobDescription(
            standardized_title=title,
            seniority_level=raw_record.get("level", "Fresher"),
            company_name=company,
            company_type="Outsource",
            min_salary_vnd=min_salary_vnd,
            max_salary_vnd=max_salary_vnd,
            is_salary_negotiable=min_salary_vnd is None,
            work_location=raw_record.get("location", "Hanoi"),
            required_skills=normalized_skills
        )
