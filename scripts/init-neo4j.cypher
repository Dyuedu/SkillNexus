// SkillNexus Neo4j 5.x Initialization Script
// Cypher Constraints & Vector Indexes

// 1. Unique Constraints
CREATE CONSTRAINT uq_skill_id IF NOT EXISTS FOR (s:Skill) REQUIRE s.id IS UNIQUE;
CREATE CONSTRAINT uq_skill_name IF NOT EXISTS FOR (s:Skill) REQUIRE s.name IS UNIQUE;
CREATE CONSTRAINT uq_job_id IF NOT EXISTS FOR (j:Job) REQUIRE j.id IS UNIQUE;
CREATE CONSTRAINT uq_company_name IF NOT EXISTS FOR (c:Company) REQUIRE c.name IS UNIQUE;
CREATE CONSTRAINT uq_user_id IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE;

// 2. Lookup Indexes
CREATE INDEX idx_job_level IF NOT EXISTS FOR (j:Job) ON (j.level);
CREATE INDEX idx_job_location IF NOT EXISTS FOR (j:Job) ON (j.location);
CREATE INDEX idx_skill_category IF NOT EXISTS FOR (s:Skill) ON (s.category);

// 3. Native Vector Index for Skill semantic search
CREATE VECTOR INDEX skill_embeddings IF NOT EXISTS
FOR (s:Skill) ON (s.embedding)
OPTIONS {indexConfig: {
  `vector.dimensions`: 768,
  `vector.similarity_function`: 'cosine'
}};

// 4. Native Vector Index for Job requirements semantic search
CREATE VECTOR INDEX job_embeddings IF NOT EXISTS
FOR (j:Job) ON (j.embedding)
OPTIONS {indexConfig: {
  `vector.dimensions`: 768,
  `vector.similarity_function`: 'cosine'
}};

// Seed Essential Skills into Neo4j
MERGE (s1:Skill {name: 'Java'}) ON CREATE SET s1.category = 'Language', s1.esco_code = 'esco-java'
MERGE (s2:Skill {name: 'Spring Boot'}) ON CREATE SET s2.category = 'Framework'
MERGE (s3:Skill {name: 'Docker'}) ON CREATE SET s3.category = 'Tool'
MERGE (s4:Skill {name: 'PostgreSQL'}) ON CREATE SET s4.category = 'Database'
MERGE (s5:Skill {name: 'Python'}) ON CREATE SET s5.category = 'Language'
MERGE (s6:Skill {name: 'React'}) ON CREATE SET s6.category = 'Framework'
MERGE (s7:Skill {name: 'TypeScript'}) ON CREATE SET s7.category = 'Language'
MERGE (s8:Skill {name: 'Go'}) ON CREATE SET s8.category = 'Language'
MERGE (s9:Skill {name: 'Redis'}) ON CREATE SET s9.category = 'Database'
MERGE (s10:Skill {name: 'Kafka'}) ON CREATE SET s10.category = 'Tool';

// Seed Initial Co-occurrence relationships
MERGE (s1)-[r1:CO_OCCURS_WITH]-(s2) ON CREATE SET r1.weight = 10
MERGE (s2)-[r2:CO_OCCURS_WITH]-(s3) ON CREATE SET r2.weight = 8
MERGE (s2)-[r3:CO_OCCURS_WITH]-(s4) ON CREATE SET r3.weight = 9
MERGE (s6)-[r4:CO_OCCURS_WITH]-(s7) ON CREATE SET r4.weight = 10
MERGE (s8)-[r5:CO_OCCURS_WITH]-(s9) ON CREATE SET r5.weight = 7
MERGE (s8)-[r6:CO_OCCURS_WITH]-(s10) ON CREATE SET r6.weight = 8;
