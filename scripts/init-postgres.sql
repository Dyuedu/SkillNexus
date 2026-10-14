-- SkillNexus Database Initialization Script
-- PostgreSQL 16+

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Skills Taxonomy Table (Standardized reference table)
CREATE TABLE IF NOT EXISTS skills_taxonomy (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    canonical_name VARCHAR(100) UNIQUE NOT NULL,
    esco_code VARCHAR(50),
    category VARCHAR(50) NOT NULL, -- Language, Framework, Database, Cloud, Tool, CoreConcept
    description TEXT,
    aliases JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_skills_canonical_name ON skills_taxonomy(canonical_name);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills_taxonomy(category);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(50),
    current_level VARCHAR(50) DEFAULT 'Fresher',
    target_role VARCHAR(100),
    is_anonymous_mode BOOLEAN DEFAULT FALSE,
    pdpl_consent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Resumes Table
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(512),
    raw_text TEXT,
    parsed_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    years_of_experience NUMERIC(4, 1) DEFAULT 0,
    education_level VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);

-- 4. Resume Skills Table (Skills extracted from user CVs)
CREATE TABLE IF NOT EXISTS resume_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills_taxonomy(id) ON DELETE RESTRICT,
    proficiency VARCHAR(50) DEFAULT 'Intermediate',
    years_experience NUMERIC(4, 1),
    is_verified_in_project BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_resume_skill UNIQUE(resume_id, skill_id)
);

-- 5. Job Postings Table
CREATE TABLE IF NOT EXISTS job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_source VARCHAR(100) NOT NULL,
    source_url VARCHAR(512),
    company_name VARCHAR(255) NOT NULL,
    company_type VARCHAR(50) DEFAULT 'Outsource',
    title VARCHAR(255) NOT NULL,
    standardized_title VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL,
    min_salary_usd NUMERIC(10, 2),
    max_salary_usd NUMERIC(10, 2),
    min_salary_vnd NUMERIC(15, 0),
    max_salary_vnd NUMERIC(15, 0),
    is_salary_negotiable BOOLEAN DEFAULT FALSE,
    location VARCHAR(100),
    published_date DATE NOT NULL,
    extracted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_jobs_published_date ON job_postings(published_date);
CREATE INDEX IF NOT EXISTS idx_jobs_level ON job_postings(level);
CREATE INDEX IF NOT EXISTS idx_jobs_standardized_title ON job_postings(standardized_title);

-- 6. Job Skills Table (Skills extracted from JDs)
CREATE TABLE IF NOT EXISTS job_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills_taxonomy(id) ON DELETE RESTRICT,
    is_mandatory BOOLEAN DEFAULT TRUE,
    min_years_required NUMERIC(4, 1) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_job_skill UNIQUE(job_id, skill_id)
);
CREATE INDEX IF NOT EXISTS idx_job_skills_skill ON job_skills(skill_id);

-- 7. Learning Roadmaps Table
CREATE TABLE IF NOT EXISTS learning_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    target_role VARCHAR(100) NOT NULL,
    current_gap_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    milestones_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    progress_percentage INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Essential Skills Taxonomy for Vietnam IT market
INSERT INTO skills_taxonomy (canonical_name, category, aliases) VALUES
('Java', 'Language', '["Core Java", "Java 8", "Java 17", "Java 21"]'::jsonb),
('Spring Boot', 'Framework', '["Spring", "SpringBoot", "Spring Framework"]'::jsonb),
('Python', 'Language', '["Python 3", "Python3"]'::jsonb),
('JavaScript', 'Language', '["JS", "ES6", "ECMAScript"]'::jsonb),
('TypeScript', 'Language', '["TS"]'::jsonb),
('React', 'Framework', '["ReactJS", "React.js"]'::jsonb),
('Node.js', 'Framework', '["NodeJS", "Node"]'::jsonb),
('Go', 'Language', '["Golang"]'::jsonb),
('Docker', 'Tool', '["Docker Compose", "Container"]'::jsonb),
('Kubernetes', 'Cloud', '["K8s"]'::jsonb),
('AWS', 'Cloud', '["Amazon Web Services", "EC2", "S3"]'::jsonb),
('PostgreSQL', 'Database', '["Postgres", "PostgreSQL 15", "PostgreSQL 16"]'::jsonb),
('MySQL', 'Database', '["MariaDB"]'::jsonb),
('Redis', 'Database', '["Redis Cache"]'::jsonb),
('MongoDB', 'Database', '["Mongo"]'::jsonb),
('Kafka', 'Tool', '["Apache Kafka"]'::jsonb),
('RabbitMQ', 'Tool', '["Rabbit MQ"]'::jsonb),
('Git', 'Tool', '["Git Flow", "GitHub", "GitLab"]'::jsonb),
('CI/CD', 'Methodology', '["Continuous Integration", "GitHub Actions", "Jenkins"]'::jsonb),
('Microservices', 'CoreConcept', '["Microservice Architecture"]'::jsonb),
('REST API', 'CoreConcept', '["RESTful API", "REST"]'::jsonb),
('GraphQL', 'Tool', '["Graph QL"]'::jsonb),
('Next.js', 'Framework', '["NextJS", "Next.js 14"]'::jsonb),
('Vue.js', 'Framework', '["Vue", "VueJS", "Vue 3"]'::jsonb),
('PHP', 'Language', '["PHP 8"]'::jsonb),
('Laravel', 'Framework', '["Laravel Framework"]'::jsonb),
('C#', 'Language', '["CSharp", "C Sharp"]'::jsonb),
('.NET', 'Framework', '["ASP.NET", ".NET Core", ".NET 8"]'::jsonb)
ON CONFLICT (canonical_name) DO NOTHING;
