---
name: SkillNexus
description: "AI-Powered IT Job Intelligence & Multi-Agent Career Advisory Platform. Data-dense technical dashboard combining local graph intelligence, agent orchestration, and actionable career roadmap."
status: final
version: "1.0.0"
colors:
  primary: '#1E40AF'
  primary-foreground: '#FFFFFF'
  primary-dark: '#3B82F6'
  primary-foreground-dark: '#FFFFFF'
  secondary: '#3B82F6'
  secondary-foreground: '#FFFFFF'
  accent: '#D97706'
  accent-foreground: '#FFFFFF'
  accent-dark: '#F59E0B'
  accent-foreground-dark: '#000000'
  background: '#F8FAFC'
  background-dark: '#0F172A'
  foreground: '#0F172A'
  foreground-dark: '#F8FAFC'
  card: '#FFFFFF'
  card-dark: '#1E293B'
  card-foreground: '#0F172A'
  card-foreground-dark: '#F8FAFC'
  muted: '#F1F5F9'
  muted-dark: '#334155'
  muted-foreground: '#475569'
  muted-foreground-dark: '#94A3B8'
  border: '#E2E8F0'
  border-dark: '#334155'
  ring: '#1E40AF'
  ring-dark: '#3B82F6'
  destructive: '#DC2626'
  destructive-foreground: '#FFFFFF'
  # Specialized Agent Identity Colors
  agent-strategist: '#2563EB'
  agent-interviewer: '#D97706'
  agent-architect: '#059669'
  agent-scout: '#7C3AED'
typography:
  display:
    fontFamily: 'Fira Code'
    fontSize: '32px'
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: '-0.02em'
  h1:
    fontFamily: 'Fira Code'
    fontSize: '24px'
    fontWeight: '600'
    lineHeight: '1.25'
  h2:
    fontFamily: 'Fira Code'
    fontSize: '20px'
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: 'Fira Code'
    fontSize: '16px'
    fontWeight: '600'
    lineHeight: '1.4'
  body:
    fontFamily: 'Fira Sans'
    fontSize: '15px'
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: 'Fira Sans'
    fontSize: '13px'
    fontWeight: '400'
    lineHeight: '1.4'
  mono:
    fontFamily: 'Fira Code'
    fontSize: '13px'
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: '4px'
  md: '6px'
  lg: '8px'
  full: '9999px'
spacing:
  base: '4px'
  tight: '8px'
  card: '12px'
  section: '20px'
  container: '32px'
components:
  stat-card:
    background: '{colors.card}'
    border: '1px solid {colors.border}'
    radius: '{rounded.md}'
    padding: '{spacing.card}'
  agent-bubble:
    radius: '{rounded.md}'
    border: '1px solid {colors.border}'
    padding: '{spacing.card}'
  skill-pill-mastered:
    background: '#ECFDF5'
    foreground: '#065F46'
    border: '1px solid #A7F3D0'
    radius: '{rounded.full}'
  skill-pill-gap:
    background: '#FEF3C7'
    foreground: '#92400E'
    border: '1px solid #FCD34D'
    radius: '{rounded.full}'
  button-primary:
    background: '{colors.primary}'
    foreground: '{colors.primary-foreground}'
    radius: '{rounded.md}'
    height: '40px'
    padding: '0 16px'
---

# SkillNexus — Visual Design System (DESIGN.md)

> Built according to the **UI/UX Pro Max** Design Intelligence guidelines (Design Dials: Density: 8/10, Variance: 7/10, Motion: 4/10) and Google Labs design specification.

---

## 1. Brand & Style

### 1.1 Aesthetic Posture: Data-Dense Technical Dashboard
SkillNexus is an engineer's cockpit for career intelligence. It bridges the gap between raw recruitment market signals and personalized career strategy.
- **Tone:** Authoritative, high-density, precise, developer-first, transparent.
- **Style Archetype:** *Data-Dense Dashboard* + *Enterprise Gateway*.
- **Visual Personality:** It does not feel like a standard gamified consumer app or an generic job listing portal. It feels like an IDE or Bloomberg Terminal built specifically for Vietnamese software engineers, tech leads, and aspiring freshers.

### 1.2 Core Design Principles
1. **Zero Fluff, Maximum Signal:** Compact information architecture where metrics, skill co-occurrences, and roadmap timelines are legible at a glance.
2. **Deterministic Transparency:** When AI speaks, it exposes its grounding (exact Neo4j graph nodes, matching JD co-occurrence count, confidence score).
3. **Local-First Privacy Cue:** Visual reassurance of local processing (zero cloud CV leakage, compliant with Vietnam PDPL Law No. 91/2025/QH15).
4. **SVG Precision:** Strictly no emoji icons as UI affordances; 100% vector iconography via Lucide React.

---

## 2. Color System & Accessibility

### 2.1 Palette Specifications
| Token Name | Light Hex | Dark Hex | Contrast (WCAG) | Intent & Usage |
|:---|:---|:---|:---|:---|
| `primary` | `#1E40AF` | `#3B82F6` | **8.2:1 (AAA)** | Primary branding, active tabs, main action buttons |
| `secondary` | `#3B82F6` | `#60A5FA` | **4.6:1 (AA)** | Sub-actions, interactive graph link states |
| `accent` | `#D97706` | `#F59E0B` | **4.8:1 (AA)** | High-priority CTAs, skill gap warnings, tech lead highlights |
| `background` | `#F8FAFC` | `#0F172A` | Background floor | App canvas (Slate-50 in light, Slate-900 in dark) |
| `card` | `#FFFFFF` | `#1E293B` | Surface floor | Component cards, agent interaction panels |
| `border` | `#E2E8F0` | `#334155` | 3.1:1 non-text | Crisp structural dividing lines (1px) |
| `muted-text` | `#475569` | `#94A3B8` | **5.3:1 (AA)** | Metadata, timestamps, Cypher query labels |
| `destructive` | `#DC2626` | `#EF4444` | **5.1:1 (AA)** | Hard blockers, missing critical prerequisite skills |

### 2.2 Multi-Agent Role Accents
Each agent has a dedicated semantic accent token to facilitate instant cognitive recognition in multi-agent chat threads:
- **Career Strategist (`#2563EB` - Royal Blue):** Long-term salary trajectory, senior/fresher transition paths.
- **Tech Lead Interviewer (`#D97706` - Amber 600):** Deep technical probes, system design challenges, skill verification.
- **Resume Architect (`#059669` - Emerald 600):** JD alignment, ATS bullet-point rewrites, STAR impact scores.
- **Market Scout (`#7C3AED` - Purple 600):** Real-time VietJobs market trends, hiring velocity, demand spikes.

---

## 3. Typography Hierarchy

### 3.1 Font Families
- **Display, Headings & Code:** `Fira Code` (Monospace, OpenType ligatures, tabular numbers).
- **Body & Microcopy:** `Fira Sans` (Clean, highly legible geometric sans-serif optimized for screens).

### 3.2 Type Scale
```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Fira+Sans:wght@300;400;500;600;700&display=swap');
```

| Role | Font Family | Size | Weight | Line Height | Usage |
|:---|:---|:---|:---|:---|:---|
| **Display** | Fira Code | 32px | 700 (Bold) | 1.2 | Main Dashboard Hero / Market Readiness Index |
| **Heading 1** | Fira Code | 24px | 600 (SemiBold) | 1.25 | View headers, Modal titles |
| **Heading 2** | Fira Code | 20px | 600 (SemiBold) | 1.3 | Panel titles (Agent Board, Skill Radar) |
| **Heading 3** | Fira Code | 16px | 600 (SemiBold) | 1.4 | Section group headers, Card titles |
| **Body (Default)** | Fira Sans | 15px | 400 (Regular) | 1.5 | Agent advisory responses, explanations |
| **Body Medium** | Fira Sans | 15px | 500 (Medium) | 1.5 | Emphasized text, question prompts |
| **Body Small** | Fira Sans | 13px | 400 (Regular) | 1.4 | Subtitles, helper text, table cells |
| **Monospace / Metric** | Fira Code | 13px | 500 (Medium) | 1.4 | Skill nodes, percentage tags, Cypher snippets |

---

## 4. Layout, Spacing & Density

### 4.1 Visual Density Scale: 8/10 (Dashboard Dense)
- Minimal wasteful white space; maximum data density without visual clutter.
- Standard spacing grid: 4px base (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`).
- Card padding: `12px` (dense) to `16px` (spacious).
- Table row height: `36px` to `40px` with clear horizontal borders.

### 4.2 Breakpoints & Layout Grid
- `sm` (375px–767px): Single-column stack, collapsible agent drawer, mobile bottom sheet for graph details.
- `md` (768px–1023px): 2-column layout (Split: Left 60% Advisory/Roadmap, Right 40% Graph/Metrics).
- `lg` (1024px–1439px): 3-column workstation (Left 280px Nav & Market Filters, Center 50% Agent Board/Roadmap, Right 35% Interactive Graph).
- `xl` (1440px+): Full widescreen cockpit (Container max-width: `1440px` or fluid 100% with padding `24px`).

---

## 5. Elevation, Depth & Shapes

### 5.1 Shapes & Radii
- `rounded-sm` (`4px`): Skill pills, filter badges, tooltip containers, metric micro-tags.
- `rounded-md` (`6px`): Primary action buttons, form inputs, agent message bubbles, stat cards.
- `rounded-lg` (`8px`): Main panels, modal overlays, graph explorer container.
- `rounded-full` (`9999px`): Status pips, user/agent avatar circles.

### 5.2 Elevation Scale
- SkillNexus strictly avoids excessive floating 3D shadows. Depth is created via **1px structural borders** (`#E2E8F0` / `#334155`) and flat elevation tints:
  - **Flat Surface:** `card` background with 1px border.
  - **Hover Elevation:** `box-shadow: 0 2px 4px rgba(0,0,0,0.04); border-color: #CBD5E1;`
  - **Modal / Floating Panel:** `box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);`

---

## 6. Core Component Specifications

### 6.1 Agent Advisory Thread (`<AgentChatContainer />`)
- **Container:** Fixed or flexible vertical stream with auto-scroll lock.
- **Message Bubble:**
  - Distinct avatar with Agent Role Tag (e.g. `[TECH LEAD]`, `[CAREER STRATEGIST]`).
  - Streaming token animation: Typing indicator cursor in `{colors.primary}` with 150ms blink.
  - Grounding Accordion: Collapsible "Graph Evidence" drawer showing exact Neo4j Cypher query & retrieved market co-occurrences.
  - Quick action chips below each message (e.g. `[Explain in depth]`, `[Add to 30-day Roadmap]`, `[Generate Interview Answer]`).

### 6.2 Skill Radar & Subgraph Explorer (`<GraphVisualizer />`)
- Canvas engine: Neo4j NVL / Vis.js Canvas with force-directed physics.
- **Node Semantics:**
  - `Mastered Node`: Solid `#059669` (Emerald), white text, radius 18px.
  - `Gap Node (Target)`: Solid `#D97706` (Amber), white text, pulsing dashed outer ring.
  - `Market Adjacent Node`: Slate border `#94A3B8`, semi-transparent fill, radius 12px.
- **Link Semantics:**
  - Weight indicates co-occurrence frequency in VietJobs 48k dataset (thickness 1px to 4px).
  - Hover on link highlights both skills and displays: `Co-occurs in 1,420 Backend JDs (78%)`.

### 6.3 Split-Screen Resume Tailor (`<ResumeTailor />`)
- **Left Pane (50%):** Original candidate CV text with annotated highlighted phrases.
- **Right Pane (50%):** Agent-rewritten STAR bullet points with side-by-side diff markers:
  - Green underline: Added high-impact keywords (e.g., *Redis Pub/Sub*, *Idempotency*).
  - Amber badge: Target JD match increase (e.g. `+18% Match`).
- **One-click Action:** "Accept rewrite" copies or updates the live draft.

---

## 7. Do's and Don'ts

### DO
- ✅ **DO** use Lucide React SVG icons with explicit sizing (`w-4 h-4` or `w-5 h-5`) and `aria-hidden="true"` or descriptive `aria-label`.
- ✅ **DO** maintain strict 4.5:1 text contrast across all color modes.
- ✅ **DO** ensure all buttons and interactive controls satisfy min `44px` touch targets on mobile viewports.
- ✅ **DO** format metrics with tabular figures (`font-variant-numeric: tabular-nums`) so numbers don't jump during real-time updates.
- ✅ **DO** offer explicit keyboard shortcuts (`⌘K` Command Palette, `Esc` dismiss, `1-4` switch views).

### DON'T
- ❌ **DON'T** use emoji characters (e.g. 🚀, 💡, 🤖) as UI icons or action triggers.
- ❌ **DON'T** hide critical information behind hover-only states; touch users must have a tap alternative.
- ❌ **DON'T** use raw uncalibrated hex colors outside of the design token variables.
- ❌ **DON'T** block the user with opaque full-screen spinners during local LLM generation; use inline progressive shimmer skeletons.
- ❌ **DON'T** send un-anonymized CV data to any cloud endpoint; always uphold local-first integrity.
