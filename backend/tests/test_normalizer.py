from app.services.normalizer import normalizer

def test_skill_normalization_aliases():
    """Kiểm tra các biến thể viết khác nhau của cùng 1 kỹ năng ánh xạ về tên chuẩn"""
    cases = [
        ("ReactJS", "React", "Framework"),
        ("react.js", "React", "Framework"),
        ("SpringBoot", "Spring Boot", "Framework"),
        ("spring framework", "Spring Boot", "Framework"),
        ("golang", "Go", "Language"),
        ("postgres", "PostgreSQL", "Database"),
        ("k8s", "Kubernetes", "Cloud"),
        ("docker compose", "Docker", "Tool"),
    ]
    for raw, expected_name, expected_category in cases:
        canonical, category = normalizer.normalize(raw)
        assert canonical == expected_name, f"Failed for {raw}: expected {expected_name}, got {canonical}"
        assert category == expected_category, f"Category mismatch for {raw}: expected {expected_category}, got {category}"

def test_skill_normalization_fallback():
    """Kỹ năng mới lạ chưa có trong từ điển giữ nguyên tên và gán danh mục mặc định Tool"""
    canonical, category = normalizer.normalize("SomeObscureLibrary")
    assert canonical == "SomeObscureLibrary"
    assert category == "Tool"
