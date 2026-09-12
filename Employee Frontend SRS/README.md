# SkillSaarthi AI — Unified Competency & Workforce Intelligence Platform

SkillSaarthi AI is an AI-powered competency assessment, skill gap analysis, and workforce intelligence ecosystem designed for modern public administration (Ministry of Statistics and Programme Implementation — MoSPI / Karmayogi Bharat).

---

## 🏛️ Ecosystem Architecture

SkillSaarthi AI unifies two interconnected portals under a single, coherent frontend system:

```
                          SkillSaarthi AI Entry
                                   │
                                   ▼
                             Common Login
                               (/login)
                                   │
                 ┌─────────────────┴─────────────────┐
                 │                                   │
          Role: EMPLOYEE                        Role: ADMIN
                 │                                   │
                 ▼                                   ▼
          Employee Portal                  Admin Verification
          • Dashboard                         (/admin-verify)
          • Competency Profile                       │
          • Skill Gap Analysis                       │ Secret Verified
          • Learning Roadmap                         ▼
          • Assessments Runner                  Admin Portal
          • Document-to-Quiz Engine             • Workforce KPIs
          • Conversational AI Coach             • Employee Directory
                                                • Competency Analytics
                                                • Skill Gap Distribution
                                                • Training Demand
                                                • Course Utilization
                                                • Executive Reports
```

---

## 🔑 Demo Access Credentials

The platform includes one-click quick-fill buttons on the login screens for effortless evaluation:

| Portal Role | Demo Email | Password | Admin Secret Code | Destination |
|:---|:---|:---|:---:|:---|
| **Employee** | `arjun.sharma@mospi.gov.in` | `demo1234` | — | `/dashboard` |
| **Administrator** | `admin@mospi.gov.in` | `admin2024` | *Any non-empty string* | `/admin-verify` → `/admin` |

> 🔒 **Security Notice**: In accordance with enterprise security principles, the real administrator secret is **never validated or stored in client-side code**. The two-stage verification flow calls `authApi.verifyAdmin()`, which simulates server-side validation and is ready for drop-in replacement with `POST /auth/admin/verify`.

---

## 🚀 Key Modules & Capabilities

### 1. Employee Portal
- **Competency Profile (`/competencies`)**: Comprehensive tracking across 4 domains (`Technical`, `Statistical`, `Digital Governance`, `Behavioural`) on a standard 5-level scale (Awareness to Expert) with interactive Radar and Bar visualizers.
- **Skill Gap Diagnostics (`/skill-gaps`)**: Automatic gap scoring against target roles (e.g. Statistical Officer targeting Senior Data Analyst), with priority ranking (`Critical`, `High`, `Medium`).
- **Personalized Roadmap (`/learning-path`)**: Multi-step learning journey with prerequisite checks and direct match percentages.
- **Assessment Engine (`/assessments`, `/assessments/:id`)**: Timed quizzes with question flagging, instant scoring, question-by-question explanations, and competency movement tracking (+1 Level upon passing).
- **Document-to-Assessment Pipeline (`/documents`)**: Upload official government manuals or circulars; AI processes through a 5-stage stepper (`Uploading` → `Extracting` → `Understanding` → `Generating` → `Ready`) to create customized competency assessments.
- **AI Learning Coach (`/assistant`)**: Context-aware conversational assistant providing structured 7-day learning sprints and skill gap remediation advice.

### 2. Administrator Portal
- **Workforce Capability Cockpit (`/admin`)**: Real-time KPI monitors, capability distribution, and direct action triggers for training dispatch and gap flagging.
- **Employee Directory (`/admin/employees`)**: Searchable, filterable directory with direct analytical drill-downs (`Gaps`, `Demand`, `Courses`, `Assessments`) for every employee.
- **Competency Analytics (`/admin/competency-analytics`)**: Cross-departmental competency radars and skill baseline comparisons.
- **Skill Gap Distribution (`/admin/skill-gap-distribution`)**: Matrix mapping departmental skill deficits and priority remediation.
- **Training Demand Forecasting (`/admin/training-demand`)**: Predictive training needs analysis across iGOT Karmayogi and NSSTA modules.
- **Governance & Settings (`/admin/settings`)**: Configurable competency evaluation thresholds and role mapping baselines.

### 3. Shared Design System & Command Palette
- **Role-Aware Command Palette (`⌘K` / `Ctrl+K`)**: Instant keyboard navigation tailored dynamically to the authenticated role (Employee vs Admin commands).
- **Theme Engine**: Seamless **Light**, **Dark**, and **System** (`prefers-color-scheme`) mode support powered by CSS custom properties with persistent user preferences.
- **Admin Preview Mode Banner**: When an administrator explores employee views, a persistent top banner indicates preview mode and offers a single-click return to the admin cockpit.

---

## 🛠️ Development & Toolchain

### Prerequisites
- Node.js 20+
- pnpm or npm

### Running the Unified Application
```bash
# Navigate to the Unified Frontend directory
cd "Employee Frontend SRS"

# Install dependencies
npm install

# Start Vite Development Server (Port 8443)
npm run dev

# Run Production Build Check (TypeScript + Vite)
npm run build
```

### Preserved Original Application
The original admin application is preserved untouched as a reference benchmark at:
```bash
cd "admin"
npm run dev # Runs independently on Port 5173
```

---

## 🔌 Future Backend Integration Specification

The frontend encapsulates all data interactions inside typed service modules under `src/services/`. When backend APIs are deployed, replace the simulated timeouts with HTTP clients matching these contracts:

1. **Authentication**:
   - `POST /auth/login` → `{ user, role, requiresAdminVerification }`
   - `POST /auth/admin/verify` → `{ authenticated: true, user, role: "admin", token }`
2. **Competency Intelligence**:
   - `GET /api/v1/competencies` → `Competency[]`
   - `GET /api/v1/skill-gaps` → `SkillGap[]`
3. **Assessments & Documents**:
   - `POST /api/v1/assessments/:id/submit` → `AssessmentResult`
   - `POST /api/v1/documents/upload` → `Document`
   - `GET /api/v1/documents/:id/status` → `DocumentStatus`
4. **Workforce Analytics**:
   - `GET /api/v1/admin/kpis` → `AdminWorkforceKPIs`
   - `GET /api/v1/admin/employees` → `AdminEmployee[]`
   - `POST /api/v1/admin/training/assign` → `{ success: boolean, message: string }`
