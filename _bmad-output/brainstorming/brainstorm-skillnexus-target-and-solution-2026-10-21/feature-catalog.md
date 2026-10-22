---
title: "SkillNexus — Feature Idea Catalog"
source: "Brainstorming session 2026-10-21/22 (Creative Partner mode)"
status: "divergent — not yet prioritized"
companion: "feature-analysis-coach-pick.md"
---

# SkillNexus — Feature Idea Catalog

Every output feature raised in the brainstorming session, grouped by the pain point it addresses. This list is meant to be **wide, not decided**. Prioritization and feasibility are in [feature-analysis-coach-pick.md](feature-analysis-coach-pick.md).

**Legend**
- 🧑 = idea from the project owner · 💡 = idea from the brainstorming coach · ➕ = added while analyzing feasibility
- Learning tags (what building it teaches): `DE` data engineering · `DS` data science / analytics / ML · `AI` applied AI (LLM, RAG, agents)
- **How real** = strength of evidence that the pain exists (●○○○○ weak → ●●●●● strong)
- Evidence comes from the repo's research digests in `_bmad-output/research-*` and from web checks on 2026-10-22. The digests' percentages were AI-generated and have **not been independently verified**, so re-check them before the defense.

**Stable IDs** (A1, B5, …) are for cross-referencing. Use them when picking your own list.

---

## Questions that started the session (project owner)

1. How does the project get its data, and from where?
2. Does the data update frequently? How frequently?
3. How do we actually process the data?
4. Why still use Postgres (alongside Neo4j)?
5. What results come out: which skills to learn, future job trends, by time window (past 6 months / next year), wages?
6. Do we create a roadmap for the user? How, and what should it look like?
7. Do we fix the user's CV? What do we focus on, and how?

---

## A · Market Pulse — "What does the market want right now?"

| | |
|---|---|
| **Pain** | JDs are vague and inflated; candidates can't tell which skills matter for their role, level and city |
| **How real** | ●●●●○ — "Senior-ized Fresher" JDs (Docker + K8s + AWS + 2 yrs for fresher roles); "negotiable" salaries |
| **Existing** | ITviec & TopDev annual PDF reports; VietnamWorks salary checker; academic prototype *AI Job Market Consultant* (arXiv 2511.14767) |
| **Gap** | Nothing interactive that you can slice by role/level/city, updated more than yearly, from the developer's side |

| ID | Feature | Tags |
|---|---|---|
| A1 | 🧑 Current IT job-market statistics (umbrella) | `DE` `DS` |
| A2 | 💡 Skill demand leaderboard by role × level × city | `DE` `DS` |
| A3 | 💡 Skill bundle explorer — which skills travel together (co-occurrence / association rules) | `DS` graph |
| A4 | 💡 **JD inflation index** — % of Fresher/Junior posts demanding senior stacks or 2+ yrs | `DS` |
| A5 | 💡 Salary transparency index — % of posts hiding salary ("Thoả thuận") by role / company type | `DS` |
| A6 | 💡 Outsource vs product company stack comparison | `DS` |
| A7 | 💡 JD language share (EN / VN / JP) as a signal for MNC & BrSE paths | `DS` |
| A8 | 💡 **Ask-the-market chat** — natural language → SQL/Cypher agent, answers with cited numbers | `AI` |

## B · Trends & Forecast — "Should I learn X? Is Y dying?"

| | |
|---|---|
| **Pain** | Pivot anxiety (web → AI? Java → Go?), fear of learning something already fading |
| **How real** | ●●●○○ — pain is real, but **honest forecasting needs a long dated history**, which we don't have yet |
| **Existing** | Indeed Hiring Lab, Stack Overflow survey, Google Trends (global); ITviec / TopDev yearly (VN) |
| **Gap** | Nothing VN-specific at skill level with monthly granularity |

| ID | Feature | Tags |
|---|---|---|
| B1 | 🧑 Research old data + predict future trends (umbrella) | `DS` |
| B2 | 💡 **Skill momentum score** — growth rate over 3/6/12-month (or yearly) windows instead of raw counts | `DS` |
| B3 | 💡 **Emerging skill detector** — never-seen skill tokens in new JDs → "new in market" alerts | `AI` `DS` |
| B4 | 💡 Hype vs hiring gap — Google Trends / GitHub interest vs actual JD demand | `DS` |
| B5 | 💡 **Digitize annual reports** (ITviec, TopDev, Navigos) with LLM table extraction → long yearly series | `DE` `AI` |
| B6 | 💡 Global leading indicator — HN "Who is Hiring" monthly threads + Stack Overflow survey | `DE` `DS` |
| B7 | 💡 Forecast with uncertainty bands + "low confidence: only N periods of data" label | `DS` |
| B8 | 💡 Job-ready-date scenario — projected demand at the date the user finishes the roadmap | `DS` |

## C · Salary — "What am I worth? Why is it always 'negotiable'?"

| | |
|---|---|
| **Pain** | Salary opacity; no idea what a skill is worth |
| **How real** | ●●●●● — compensation transparency is the #1 switching driver (34%+); community job repos grew purely by requiring salary ranges |
| **Existing** | ITviec salary report, VietnamWorks salary, Glassdoor / levels.fyi (thin VN data) |
| **Gap** | Skill-level salary premium, personalized to a CV |

| ID | Feature | Tags |
|---|---|---|
| C1 | 💡 "What am I worth" estimator from CV (regression with range) | `DS` |
| C2 | 💡 **Skill salary premium** — +VND for adding a skill to a given role/level | `DS` |
| C3 | 💡 **Hidden-salary imputation** for "negotiable" posts from similar posts | `DS` ML |
| C4 | 💡 Salary ladder by company type (outsource / product / MNC / startup) | `DS` |
| C5 | 💡 Negotiation brief — ask range + cited market evidence | `AI` |
| C6 | 💡 VN Gross ↔ Net calculator (PIT + social insurance) | — |
| C7 | ➕ Real vs nominal wage trend — deflate historical salaries with CPI + FX | `DS` |

## D · CV — "Why does nobody reply?"

| | |
|---|---|
| **Pain** | Ghosting with zero feedback; CV full of tutorial projects; keyword mismatch |
| **How real** | ●●●●● — 70–80% report sending dozens of CVs with no reply; workaround today is ChatGPT keyword-stuffing |
| **Existing** | **Crowded.** TopCV CV Builder + Toppy AI, Jobscan, Teal, Rezi, Kickresume, plain ChatGPT |
| **Gap** | Scoring against the *real VN market* (not generic standards), honesty guardrails, VN↔MNC norms |

| ID | Feature | Tags |
|---|---|---|
| D1 | 🧑 CV upload → evaluate the candidate's chance on the market | `DS` `AI` |
| D2 | 🧑 CV changes to mass-send to wanted jobs / tailor CV for a specific JD | `AI` |
| D3 | 🧑 Create a CV for the user targeted at a specific JD | `AI` |
| D4 | 💡 **Market-readiness score** — % of target-role JDs the CV would pass keyword screening for | `DS` `AI` |
| D5 | 💡 Batch tailoring for N saved JDs — user sends them themselves ("mass-send" done safely) | `AI` |
| D6 | 💡 CV red-flag linter — tutorial-only projects, no metrics, buzzword stuffing, photo/DOB (VN vs MNC norms) | `AI` |
| D7 | 💡 Bullet strength scorer — action + context + metric completeness (XYZ / STAR) | `AI` |
| D8 | 💡 Claim-vs-evidence check — skills listed but never shown in a project | `AI` |
| D9 | 💡 VN ↔ EN IT CV translation for MNC applications | `AI` |
| D10 | 💡 ATS parse simulator — what an ATS actually extracts from the PDF | `AI` |
| D11 | 💡 GitHub / portfolio analyzer as skill evidence | `DE` `AI` |
| D12 | 💡 CV versioning + which version got callbacks | `DS` |

## E · Matching & Application Strategy — "Where do I actually have a chance?"

| | |
|---|---|
| **Pain** | Spray-and-pray applying ("rải CV"); ghost jobs kept open for PR |
| **How real** | ●●●●○ |
| **Existing** | TopCV / ITviec / VietnamWorks matching (recruiter-side), LinkedIn Job Match, auto-apply bots |
| **Gap** | Matching built for the candidate; filtering out ghost jobs |

| ID | Feature | Tags |
|---|---|---|
| E1 | 💡 Chance map — jobs ranked by match probability, not keyword overlap | `DS` |
| E2 | 💡 Reach / match / safety job lists (college-application style) | `DS` |
| E3 | 💡 **Ghost-job detector** — reposted / long-open / never-changing JDs | `DE` `DS` |
| E4 | 💡 Application tracker → personal funnel analytics | `DE` `DS` |
| E5 | 💡 Cover letter / recruiter message generator per JD | `AI` |

## F · Roadmap — "What do I learn, in what order, for how long?"

| | |
|---|---|
| **Pain** | Freshers overwhelmed by inflated JDs; no idea of order or effort |
| **How real** | ●●●●○ |
| **Existing** | roadmap.sh (static, generic), F8, Coursera/Udemy, CareerViet CareerMap (static decision tree) |
| **Gap** | Personalized + market-weighted + time-budgeted + adapts to progress |

| ID | Feature | Tags |
|---|---|---|
| F1 | 🧑 Roadmap for a desired job | `AI` |
| F2 | 🧑 Roadmap toward high-employment-chance / high-salary jobs (best ROI) | `DS` `AI` |
| F3 | 💡 Shortest path on the skill graph from current stack to target role, weighted by learning effort | `DS` graph |
| F4 | 💡 Time-budget-aware plan ("1h per night" → realistic weeks) | `AI` |
| F5 | 💡 Capstone project generator tied to missing skills + JD evidence | `AI` |
| F6 | 💡 Resource curator — free VN/EN resources per skill, RAG over a curated list | `AI` RAG |
| F7 | 💡 Adaptive re-plan on progress check-ins or market shifts | `AI` agent |
| F8 | 💡 Career pivot paths — Web→AI, Dev→BrSE, Manual QA→Automation, outsource→product | `DS` graph |
| F9 | 💡 Level-up diff — skills separating Junior from Mid in the same role | `DS` |

## G · Skill Verification & Interview — "My CV says X; can I defend it?"

| | |
|---|---|
| **Pain** | Keyword CVs that collapse at the first technical question |
| **How real** | ●●●○○ — only ~30% of graduates are job-ready by employer standards |
| **Existing** | LeetCode, Pramp, Google Interview Warmup, Final Round AI |
| **Gap** | Tied to VN market data and to the user's roadmap |

| ID | Feature | Tags |
|---|---|---|
| G1 | 💡 Tech-lead mock interview on CV claims (already in PRD) | `AI` agent |
| G2 | 💡 Adaptive quiz → verified proficiency scores | `DS` `AI` |
| G3 | 💡 Interview prep by company type (outsource vs product styles) | `AI` |

## H · Company & JD Intelligence — "What is this company / post really like?"

| | |
|---|---|
| **Pain** | Hidden OT culture, real tech stack unknown, recruiter ghosting |
| **How real** | ●●●●○ — people ask in private Facebook/Telegram groups. **Data is scarce, and review-type data is legally risky** |
| **Existing** | ITviec company reviews, Glassdoor, jobspipe.dev (company ↔ technology from postings) |

| ID | Feature | Tags |
|---|---|---|
| H1 | 💡 Company tech-stack profile derived from its JDs | `DS` |
| H2 | 💡 **JD decoder** — must-have vs nice-to-have, hidden seniority, red flags ("chịu được áp lực") | `AI` |
| H3 | 💡 JD quality score (salary shown, clear stack, realistic requirements) | `AI` `DS` |

## I · Business / B2B — "Who pays?"

B2C willingness to pay is low (79k–199k VND ≈ $3–8 per month), so B2B and growth features carry the business case.

| ID | Feature | Tags |
|---|---|---|
| I1 | 💡 **Curriculum-vs-market gap report** for universities / training centers | `DS` |
| I2 | 💡 "Which course to open next quarter" recommender for training centers | `DS` |
| I3 | 💡 Recruiter-side "your JD is inflated vs market" checker | `AI` |
| I4 | 💡 **Auto-generated weekly market newsletter** from gold tables (growth channel + LLM summarization) | `DE` `AI` |

---

## Count

| Source | Features |
|---|---|
| 🧑 Project owner | 7 (A1, B1, D1, D2, D3, F1, F2) |
| 💡 Coach | 51 |
| ➕ Added during analysis | 1 (C7) |
| **Total** | **59** |

Data and process ideas from the session (backfill sources, "math computes, LLM narrates", freshness labels, the Postgres/Neo4j split) aren't output features. They're in the analysis document.
