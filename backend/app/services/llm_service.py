import json
import logging
import httpx
from typing import List, Dict, Any, Optional

from app.core.config import settings
from app.schemas.jd_schema import ExtractedJobDescription, ExtractedSkill
from app.schemas.cv_schema import ExtractedCV, ExtractedCVSkill
from app.services.normalizer import normalizer

logger = logging.getLogger("skillnexus.llm")

class OllamaService:
    """
    Service giao tiếp trực tiếp với cụm Ollama nội bộ trên máy:
    - Model LLM: qwen2.5-coder:7b
    - Model Embedding: nomic-embed-text (768 dimensions)
    """

    def __init__(self, base_url: Optional[str] = None):
        self.base_url = base_url or settings.OLLAMA_BASE_URL
        self.llm_model = settings.OLLAMA_MODEL
        self.embedding_model = settings.OLLAMA_EMBEDDING_MODEL

    async def get_embedding(self, text: str) -> List[float]:
        """
        Tạo vector nhúng 768 chiều cho văn bản bằng nomic-embed-text
        """
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                f"{self.base_url}/api/embeddings",
                json={"model": self.embedding_model, "prompt": text}
            )
            resp.raise_for_status()
            data = resp.json()
            return data.get("embedding", [])

    async def extract_jd_entities(self, jd_text: str) -> ExtractedJobDescription:
        """
        Bóc tách thực thể tin tuyển dụng (JD) có cấu trúc bằng qwen2.5-coder:7b với JSON Mode.
        """
        system_prompt = (
            "You are an expert IT recruiter and parser in Vietnam. "
            "Extract structured data from the job description into strict JSON with keys: "
            "standardized_title (string), seniority_level (Intern|Fresher|Junior|Middle|Senior|Lead), "
            "company_name (string), company_type (Product|Outsource|Agency|Unknown), "
            "min_salary_vnd (integer or null), max_salary_vnd (integer or null), "
            "is_salary_negotiable (boolean), work_location (Hanoi|HCMC|Da Nang|Remote|Hybrid), "
            "required_skills (list of objects with: name, category, is_mandatory, min_years_experience). "
            "Only return valid JSON, no conversational markdown."
        )

        user_prompt = f"Job Description Text:\n{jd_text}"

        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(
                f"{self.base_url}/api/chat",
                json={
                    "model": self.llm_model,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "format": "json",
                    "stream": False,
                    "options": {"temperature": 0.1}
                }
            )
            resp.raise_for_status()
            raw_content = resp.json()["message"]["content"]
            parsed_dict = json.loads(raw_content)

            # Chuẩn hóa tên kỹ năng qua từ điển ESCO / O*NET
            normalized_skills: List[ExtractedSkill] = []
            for s in parsed_dict.get("required_skills", []):
                s_name = s.get("name", "")
                canonical_name, category = normalizer.normalize(s_name)
                min_exp_raw = s.get("min_years_experience")
                min_exp = float(min_exp_raw) if min_exp_raw is not None else 0.0
                normalized_skills.append(
                    ExtractedSkill(
                        name=canonical_name,
                        category=category,
                        is_mandatory=bool(s.get("is_mandatory", True)),
                        min_years_experience=min_exp
                    )
                )

            parsed_dict["required_skills"] = normalized_skills
            return ExtractedJobDescription(**parsed_dict)

    async def extract_cv_entities(self, cv_text: str, is_anonymous: bool = False) -> ExtractedCV:
        """
        Bóc tách thực thể từ CV ứng viên bằng qwen2.5-coder:7b.
        Tuân thủ PDPL 2026: Nếu is_anonymous=True, loại bỏ hoàn toàn PII.
        """
        system_prompt = (
            "You are an expert technical resume parser for software engineers. "
            "Extract structured candidate information into strict JSON with keys: "
            "full_name (string or null), email (string or null), phone (string or null), "
            "education_level (string or null), total_years_experience (float), "
            "skills (list of objects with: name, category, proficiency, years_experience, is_verified_in_project), "
            "project_highlights (list of strings summarizing key projects). "
            "Only return valid JSON."
        )

        user_prompt = f"Candidate CV Text:\n{cv_text}"

        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(
                f"{self.base_url}/api/chat",
                json={
                    "model": self.llm_model,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "format": "json",
                    "stream": False,
                    "options": {"temperature": 0.1}
                }
            )
            resp.raise_for_status()
            raw_content = resp.json()["message"]["content"]
            parsed_dict = json.loads(raw_content)

            # Áp dụng cơ chế Anonymization nếu người dùng yêu cầu
            if is_anonymous:
                parsed_dict["full_name"] = None
                parsed_dict["email"] = None
                parsed_dict["phone"] = None

            # Chuẩn hóa kỹ năng
            normalized_skills: List[ExtractedCVSkill] = []
            for s in parsed_dict.get("skills", []):
                s_name = s.get("name", "")
                canonical_name, category = normalizer.normalize(s_name)
                normalized_skills.append(
                    ExtractedCVSkill(
                        name=canonical_name,
                        category=category,
                        proficiency=s.get("proficiency", "Intermediate"),
                        years_experience=float(s.get("years_experience", 1.0)) if s.get("years_experience") else None,
                        is_verified_in_project=s.get("is_verified_in_project", True)
                    )
                )

            parsed_dict["skills"] = normalized_skills
            return ExtractedCV(**parsed_dict)

llm_service = OllamaService()
