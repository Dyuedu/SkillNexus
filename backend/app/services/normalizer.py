from typing import Dict, Optional, Tuple

class SkillTaxonomyNormalizer:
    """
    Chuẩn hóa các tên kỹ năng phong phú từ CV và JD về thực thể duy nhất (Canonical Skill).
    Ngăn chặn việc sinh siêu nút hoặc các node rác bị phân mảnh trên đồ thị Neo4j.
    """

    # Bảng ánh xạ bí danh (Aliases) sang Tên chuẩn (Canonical Name) & Danh mục
    ALIAS_MAP: Dict[str, Tuple[str, str]] = {
        # Languages
        "java": ("Java", "Language"),
        "core java": ("Java", "Language"),
        "java 8": ("Java", "Language"),
        "java 11": ("Java", "Language"),
        "java 17": ("Java", "Language"),
        "java 21": ("Java", "Language"),
        "python": ("Python", "Language"),
        "python3": ("Python", "Language"),
        "python 3": ("Python", "Language"),
        "js": ("JavaScript", "Language"),
        "javascript": ("JavaScript", "Language"),
        "es6": ("JavaScript", "Language"),
        "ts": ("TypeScript", "Language"),
        "typescript": ("TypeScript", "Language"),
        "golang": ("Go", "Language"),
        "go": ("Go", "Language"),
        "csharp": ("C#", "Language"),
        "c#": ("C#", "Language"),
        "c sharp": ("C#", "Language"),
        "php": ("PHP", "Language"),
        "php 8": ("PHP", "Language"),

        # Frameworks
        "react": ("React", "Framework"),
        "reactjs": ("React", "Framework"),
        "react.js": ("React", "Framework"),
        "spring": ("Spring Boot", "Framework"),
        "springboot": ("Spring Boot", "Framework"),
        "spring boot": ("Spring Boot", "Framework"),
        "spring boot rest api": ("Spring Boot", "Framework"),
        "spring framework": ("Spring Boot", "Framework"),
        "nodejs": ("Node.js", "Framework"),
        "node.js": ("Node.js", "Framework"),
        "node": ("Node.js", "Framework"),
        "nextjs": ("Next.js", "Framework"),
        "next.js": ("Next.js", "Framework"),
        "vue": ("Vue.js", "Framework"),
        "vuejs": ("Vue.js", "Framework"),
        "vue.js": ("Vue.js", "Framework"),
        "laravel": ("Laravel", "Framework"),
        ".net": (".NET", "Framework"),
        "dotnet": (".NET", "Framework"),
        ".net core": (".NET", "Framework"),

        # Databases
        "postgres": ("PostgreSQL", "Database"),
        "postgresql": ("PostgreSQL", "Database"),
        "mysql": ("MySQL", "Database"),
        "mariadb": ("MySQL", "Database"),
        "redis": ("Redis", "Database"),
        "redis cache": ("Redis", "Database"),
        "mongodb": ("MongoDB", "Database"),
        "mongo": ("MongoDB", "Database"),

        # Tools & Cloud
        "docker": ("Docker", "Tool"),
        "docker compose": ("Docker", "Tool"),
        "k8s": ("Kubernetes", "Cloud"),
        "kubernetes": ("Kubernetes", "Cloud"),
        "aws": ("AWS", "Cloud"),
        "amazon web services": ("AWS", "Cloud"),
        "azure": ("Azure", "Cloud"),
        "gcp": ("GCP", "Cloud"),
        "google cloud": ("GCP", "Cloud"),
        "git": ("Git", "Tool"),
        "github": ("Git", "Tool"),
        "gitlab": ("Git", "Tool"),
        "kafka": ("Kafka", "Tool"),
        "apache kafka": ("Kafka", "Tool"),
        "rabbitmq": ("RabbitMQ", "Tool"),

        # Core Concepts
        "rest": ("REST API", "CoreConcept"),
        "restful": ("REST API", "CoreConcept"),
        "rest api": ("REST API", "CoreConcept"),
        "restful api": ("REST API", "CoreConcept"),
        "microservices": ("Microservices", "CoreConcept"),
        "microservice": ("Microservices", "CoreConcept"),
        "oop": ("OOP", "CoreConcept"),
        "ci/cd": ("CI/CD", "Methodology"),
        "cicd": ("CI/CD", "Methodology"),
    }

    @classmethod
    def normalize(cls, raw_skill_name: str) -> Tuple[str, str]:
        """
        Nhận vào tên kỹ năng thô (ví dụ: 'ReactJS', 'SpringBoot', 'K8s').
        Trả về Tuple (canonical_name, category).
        Nếu không có trong danh sách bí danh, chuẩn hóa dạng title case và gán danh mục mặc định.
        """
        if not raw_skill_name:
            return ("Unknown", "Tool")
        
        cleaned = raw_skill_name.strip().lower()
        if cleaned in cls.ALIAS_MAP:
            return cls.ALIAS_MAP[cleaned]
        
        # Fallback cho kỹ năng mới chưa có trong từ điển
        canonical = raw_skill_name.strip()
        # Giữ nguyên case đặc biệt nếu có
        return (canonical, "Tool")

normalizer = SkillTaxonomyNormalizer()
