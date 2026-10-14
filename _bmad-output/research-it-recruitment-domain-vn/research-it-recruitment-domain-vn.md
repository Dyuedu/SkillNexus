# Domain Research Digest: Vietnam IT Recruitment Domain

## 1. Industry Structure & Value Chain
- 4 tiers: Global executive search (Adecco, Robert Walters) -> Local specialized IT headhunters (Navigos, Talentnet) -> Tech job boards (ITviec, TopDev, TopCV) -> In-house TA (VNG, FPT, MoMo).
- Margin is highest in senior specialist search and platform employer branding packages.

## 2. Data Access & Legal Posture
- JD Crawling Feasibility: Public JDs are viewable on web, but major platforms prohibit automated harvesting in Terms of Service.
- Open Datasets: **VietJobs corpus** (VinUniversity / VinNLP) — 48,092 Vietnamese JDs, 15M words across 16 categories with salary data on HuggingFace (`dinhieufam/VietJobs`). Essential bootstrap/training asset!
- Commercial Feeds: Techmap (~39k new VN postings/month via API), Techsalerator.
- Official API Partnerships: VietnamWorks has documented OAuth2 APIs used by ATS like Base.vn.

## 3. Regulatory & Compliance: Vietnam PDPL (Law 91/2025/QH15)
- Effective date: January 1, 2026 (replacing Decree 13/2023).
- Enforcement: A05 (Department of Cybersecurity and High-Tech Crime Prevention, Ministry of Public Security).
- Core rules:
  - Explicit opt-in consent for every CV upload / profile processing.
  - Data minimization and deletion mandate for unhired candidates.
  - Cross-border data transfer filing within 60 days if user data leaves VN. Fines up to 5% of annual revenue.
  - DoLISA Employment Service License (VND 300M escrow deposit) is required only if directly placing/matching candidates for placement fees. Pure career intelligence/analytics SaaS does not require this license.

## 4. Language & Skill Taxonomies
- JDs: English for MNCs/outsourcing; bilingual for domestic tech; Vietnamese for IT support/SMEs.
- Taxonomies: Mix of ITSS (Japanese IPA framework popular via HUST/FPT), SFIA, and platform tags (ITviec/TopDev).
