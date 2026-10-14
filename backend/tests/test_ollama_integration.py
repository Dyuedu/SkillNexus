import pytest
import asyncio
from app.services.llm_service import llm_service

@pytest.mark.asyncio
async def test_ollama_embedding_generation():
    """Kiểm tra gọi model nomic-embed-text tạo vector 768 chiều"""
    embedding = await llm_service.get_embedding("Java Spring Boot Developer")
    assert isinstance(embedding, list)
    assert len(embedding) == 768, f"Expected 768 dimensions, got {len(embedding)}"

@pytest.mark.asyncio
async def test_ollama_jd_entity_extraction():
    """Kiểm tra gọi model qwen2.5-coder:7b bóc tách tin tuyển dụng thành JSON Pydantic"""
    sample_jd = """
    Công ty VNG tuyển dụng Fresher Java Backend Developer tại TP. Hồ Chí Minh.
    Mức lương: 12,000,000 - 18,000,000 VND / tháng.
    Yêu cầu:
    - Nắm vững kiến thức Core Java và Spring Boot REST API
    - Biết sử dụng Git và Docker cơ bản
    - Có hiểu biết về cơ sở dữ liệu quan hệ PostgreSQL hoặc MySQL
    """
    extracted = await llm_service.extract_jd_entities(sample_jd)
    
    assert extracted.seniority_level in ["Fresher", "Junior"]
    assert "VNG" in extracted.company_name
    assert extracted.min_salary_vnd == 12_000_000
    assert extracted.max_salary_vnd == 18_000_000
    
    # Kiểm tra kỹ năng bóc tách được chuẩn hóa
    skill_names = [s.name for s in extracted.required_skills]
    assert "Java" in skill_names
    assert "Spring Boot" in skill_names
    assert "Docker" in skill_names
