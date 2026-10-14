# Technical Research Digest: GraphRAG + Knowledge Graph Architecture

## 1. Landscape & Maturity
- GraphRAG won 72–83% of head-to-head comparisons vs vector RAG on multi-hop/comprehensiveness tasks (86% vs 32% accuracy on complex multi-hop).
- Microsoft GraphRAG (v1.0 released Dec 2024, v2.x in 2025) has entered maintenance mode.
- Recommendation: Do not depend directly on Microsoft GraphRAG CLI. Build on official `langchain-neo4j` or `llama-index-graph-stores-neo4j` (PropertyGraphIndex).
- Neo4j 5.x has built-in native vector indexing, eliminating the need for a separate external vector DB at 10K–100K JD scale.

## 2. Integration & Interoperability
- Dual-storage pattern: PostgreSQL for ACID OLTP & analytical queries (dashboard) + Neo4j for relationship context & GraphRAG reasoning.
- Synchronization: CDC via Debezium/Kafka WAL streaming into idempotent Cypher `MERGE` consumers with UUIDs.
- Hybrid Query Routing: 70% of straightforward queries (exact skill match, keyword filter) routed to Cypher traversal (1–45ms latency). 30% analytical/career-pathing queries routed to GraphRAG community summaries (2–8s latency).

## 3. Architecture Patterns in Practice
- Medallion Architecture:
  - Bronze: Raw scraped JDs & CVs stored in object storage / Postgres raw JSON.
  - Silver: LLM extraction & entity normalization (mapping skills strictly to ESCO / O*NET taxonomies to prevent graph noise).
  - Gold: Graph construction (Nodes: `User`, `Job`, `Skill`, `Company`, `Role`; Edges: `POSSESSES`, `REQUIRES`, `RELATED_TO`) + vector embeddings on nodes.
- Super-node mitigation: High-degree skills ("Python", "Communication") degrade traversal. Must apply degree-based filtering or sub-domain hierarchy (`Language:Python`, `Framework:Django`).

## 4. Implementation Reality & Cost
- LLM Batch Extraction:
  - Gemini 1.5 Flash Batch API: ~50% cost discount. Estimated cost for 100,000 JDs/month: ~$5/month with native JSON schema enforcement.
  - Qwen-2.5-7B locally (vLLM + Outlines): VMLU Vietnamese score ~57.51% zero-shot. Acceptable for structured extraction with few-shot prompting, but Qwen-2.5-14B/72B recommended if hosted.
- Orchestrator:
  - Apache Airflow: Standard for large teams with 1,700+ providers. For startup/small team, Prefect or Dagster offers significantly lighter ops footprint. If Airflow is used, isolate scrapers using `KubernetesPodOperator` (Trigger-Poll pattern).
- Graph update latency: Near-real-time CDC sync allows eventual consistency within seconds.
