# ================================================================
# SKILLSAARTHI AI — EMPLOYEE FRONTEND
# FINAL MASTER UI/UX EVOLUTION LOOP — VERSION 2
# ================================================================

ROLE
====

You are the Senior Product Designer, UI/UX Engineer, Frontend
Architect, Design-System Engineer, Interaction Designer and QA
Engineer responsible ONLY for the SkillSaarthi AI Employee
Frontend.

The Employee Frontend VERSION 1 IS ALREADY COMPLETE AND WORKING.

Your job is NOT to rebuild Version 1.

Your job is to evolve the existing Employee Frontend into an
exceptionally beautiful, attractive, polished, modern, intelligent,
premium and memorable product while preserving all existing
functionality.

The final result should feel like a product that could realistically
be presented to:

- Government stakeholders
- Senior officials
- Enterprise organizations
- Professional users
- Hackathon judges

The interface should create an immediate impression of:

"THIS IS A SERIOUS, INTELLIGENT, PREMIUM AI WORKFORCE PLATFORM."

===============================================================
1. ABSOLUTE RULE — PRESERVE VERSION 1
===============================================================

VERSION 1 IS THE BASELINE.

Before changing anything:

1. Inspect the existing repository.
2. Understand the existing architecture.
3. Run the current application.
4. Verify that Version 1 is working.
5. Inspect existing routes.
6. Inspect existing components.
7. Inspect existing styling.
8. Inspect existing mock/API abstraction.
9. Inspect the existing Figma/design assets if available.

DO NOT:

- Delete working functionality.
- Rewrite the entire application unnecessarily.
- Replace the architecture without reason.
- Break existing routes.
- Remove existing features.
- Replace working components just for the sake of rewriting.
- Introduce unnecessary dependencies.
- Create a completely different product.

Improve what already exists.

If a component is already good, refine it.

If a component is weak, improve it.

If a component is duplicated, consolidate it.

===============================================================
2. SCOPE
===============================================================

THIS WORKSPACE IS ONLY:

EMPLOYEE / USER FRONTEND.

Do NOT implement:

- Admin frontend
- Admin dashboard
- Admin analytics
- Trainer role
- Manager role
- HR role
- Backend
- Database
- LLM backend
- RAG backend
- Production iGOT API
- Production NSSTA API
- Production TPAC API

There are only two application roles in the overall platform:

1. Employee
2. Administrator

This workspace is ONLY the Employee experience.

===============================================================
3. PRIMARY OBJECTIVE
===============================================================

Transform the existing Version 1 interface into:

PREMIUM
+
BEAUTIFUL
+
ADORABLE
+
ATTRACTIVE
+
INTELLIGENT
+
MODERN
+
PROFESSIONAL
+
TRUSTWORTHY
+
ACCESSIBLE
+
RESPONSIVE

Do not confuse "beautiful" with "decorated".

Beauty must come from:

- Excellent hierarchy
- Excellent typography
- Excellent spacing
- Excellent composition
- Strong visual rhythm
- Meaningful color
- Elegant data visualization
- Clear interaction
- Subtle motion
- Consistency
- Thoughtful details

The product should feel expensive and carefully designed.

===============================================================
4. DESIGN DIRECTION
===============================================================

Core design philosophy:

"GOVERNMENT INTELLIGENCE × MODERN AI"

Secondary qualities:

- Human
- Calm
- Intelligent
- Sophisticated
- Trustworthy
- Future-ready

Avoid the appearance of:

- Generic SaaS template
- Generic LMS
- Generic dashboard
- Generic ChatGPT clone
- Crypto dashboard
- Gaming UI
- Overly futuristic sci-fi interface
- Excessive glassmorphism
- Excessive gradients
- Excessive rounded cards
- Excessive shadows
- Excessive animation

The design should be modern WITHOUT becoming childish.

===============================================================
5. VISUAL PERSONALITY
===============================================================

Create a recognizable SkillSaarthi visual identity.

Use a strong but restrained design language.

The UI should have:

- Beautiful surfaces
- Elegant cards
- Refined borders
- Subtle elevation
- Strong typography
- Clear section hierarchy
- Intelligent color accents
- High-quality icons
- Sophisticated charts
- Beautiful empty states
- Beautiful loading states
- Beautiful success states
- Beautiful error states

Every page should feel like it belongs to the same product.

===============================================================
6. THEME SYSTEM — REQUIRED
===============================================================

IMPLEMENT A COMPLETE THREE-MODE THEME SYSTEM:

1. LIGHT
2. DARK
3. SYSTEM

The user must be able to choose:

Light
Dark
System

===============================================================
7. THEME SWITCHER
===============================================================

Add a polished theme selector in the Employee UI.

Possible UI:

Appearance

○ Light
○ Dark
○ System

or a beautiful dropdown/popover.

The selector should clearly indicate the active theme.

Use appropriate icons:

Sun
Moon
Monitor/System

Use Lucide icons or the existing icon system.

===============================================================
8. SYSTEM THEME BEHAVIOR
===============================================================

SYSTEM mode MUST follow the user's operating-system preference.

Use:

prefers-color-scheme

When:

System + OS Light
→ application becomes Light

System + OS Dark
→ application becomes Dark

Listen for system theme changes where appropriate.

If the OS changes while the application is open,
the UI should update appropriately.

===============================================================
9. THEME PERSISTENCE
===============================================================

Persist the user's selected theme.

Example:

localStorage

Possible values:

"light"
"dark"
"system"

On application startup:

1. Read saved preference.
2. If none exists → System.
3. Resolve the effective theme.
4. Apply it before visual content becomes fully visible.

Avoid theme flashing where possible.

===============================================================
10. THEME ARCHITECTURE
===============================================================

DO NOT implement dark mode by manually changing colors
inside every component.

Create semantic design tokens.

Example conceptual tokens:

--background
--foreground

--surface
--surface-elevated
--surface-muted

--border
--border-subtle

--text-primary
--text-secondary
--text-muted

--primary
--primary-hover
--primary-soft

--success
--warning
--danger
--info

--ai-accent

--chart-1
--chart-2
--chart-3
--chart-4

--focus-ring

Both Light and Dark themes must define these tokens.

Components should use semantic tokens rather than hardcoded colors.

===============================================================
11. LIGHT THEME
===============================================================

Light mode should feel:

- Clean
- Premium
- Bright
- Professional
- Calm

Avoid pure white everywhere.

Use subtle surface differences.

Example hierarchy:

Page Background
↓
Surface
↓
Elevated Surface
↓
Interactive Surface

Use restrained borders and shadows.

Do not make the interface look washed out.

===============================================================
12. DARK THEME
===============================================================

Dark mode should feel:

- Elegant
- Premium
- Comfortable
- Sophisticated
- Modern

Do NOT simply invert colors.

Do NOT use pure black everywhere.

Use carefully layered dark surfaces.

Example:

Deep background
↓
Surface
↓
Elevated surface
↓
Interactive surface

Maintain excellent contrast.

Charts, badges, progress indicators and AI elements must be
specifically tuned for dark mode.

===============================================================
13. THEME CONSISTENCY
===============================================================

EVERY UI ELEMENT MUST WORK IN:

Light
Dark
System

Check:

- Sidebar
- Topbar
- Cards
- Buttons
- Forms
- Inputs
- Dropdowns
- Modals
- Drawers
- Charts
- Tables
- Progress bars
- Skill graphs
- Roadmaps
- AI Coach
- Quiz
- Upload UI
- Toasts
- Alerts
- Empty states
- Error states
- Skeletons

Nothing should look broken in dark mode.

===============================================================
14. DESIGN SYSTEM REFINEMENT
===============================================================

Before polishing individual pages:

Audit the existing design system.

Create/refine:

Typography
Colors
Spacing
Radius
Borders
Shadows
Motion
Icons
Component states

Establish consistency.

Use a small controlled spacing scale.

Use a controlled radius scale.

Use a controlled shadow system.

Do not randomly assign values.

===============================================================
15. TYPOGRAPHY
===============================================================

Typography must be one of the strongest aspects of the interface.

Create clear hierarchy:

Display
H1
H2
H3
H4
Body Large
Body
Body Small
Caption
Label
Button

Ensure:

- Excellent readability
- Proper line-height
- Proper letter spacing
- Clear hierarchy
- Responsive scaling

Do not use tiny text simply to fit more information.

===============================================================
16. ICONOGRAPHY
===============================================================

Use one consistent icon family.

Prefer Lucide or the existing project icon system.

Icons must:

- Have consistent size
- Have consistent stroke weight
- Communicate meaning
- Align correctly with text

Do not add decorative icons everywhere.

===============================================================
17. CARDS
===============================================================

Cards should NOT all look identical.

Create different card personalities:

Metric Card
Insight Card
Skill Card
Gap Card
Course Card
Recommendation Card
AI Card
Achievement Card
Activity Card

Use visual hierarchy rather than putting everything inside a card.

Some content should live directly on the page.

Avoid "card soup".

===============================================================
18. DASHBOARD — HERO EXPERIENCE
===============================================================

The Employee Dashboard is the primary showcase screen.

Make it exceptional.

It should immediately communicate:

WHO AM I?
WHERE AM I?
WHAT AM I GOOD AT?
WHERE AM I WEAK?
WHAT SHOULD I DO NEXT?

Structure conceptually:

Personalized Hero
↓
KPI Overview
↓
Competency Intelligence
↓
AI Insight
↓
Critical Skill Gaps
↓
Next Best Action
↓
Learning Path
↓
Recent Activity
↓
AI Coach

===============================================================
19. DASHBOARD HERO
===============================================================

Create a premium personalized greeting.

Example:

Good morning, Faizul

Your competency journey is progressing.

Target role:
Senior Data Analyst

Then provide a concise AI insight.

Example:

"Your strongest area is statistical analysis.
Your highest-priority development area is Machine Learning."

Do not make the hero excessively large.

Use intelligent whitespace.

===============================================================
20. KPI CARDS
===============================================================

Refine:

Overall Competency
Critical Gaps
Learning Hours
Completed Courses

Each KPI should have:

- Clear number
- Label
- Context
- Small trend where meaningful
- Appropriate icon

Use subtle count-up animation when appropriate.

Do not animate endlessly.

===============================================================
21. COMPETENCY VISUALIZATION
===============================================================

Make competency visualization beautiful and understandable.

Possible visualizations:

- Radar
- Horizontal skill bars
- Current vs target bars
- Domain score cards
- Skill graph

Do not use a chart simply because it looks impressive.

The user should understand it within seconds.

===============================================================
22. CURRENT VS TARGET
===============================================================

This is one of the most important visual concepts.

Make:

CURRENT
versus
TARGET

very easy to understand.

Example:

Python

Current 2/5
Target 4/5

Gap 2

Use a beautiful comparison visualization.

===============================================================
23. AI INSIGHT
===============================================================

Create a recognizable SkillSaarthi AI visual language.

AI insight cards should feel special but professional.

Use:

- AI icon
- Subtle accent
- Clear heading
- Concise explanation
- Action

Example:

AI Insight

"Improving Python and Machine Learning will have
the greatest impact on your target role readiness."

[View Recommended Path]

===============================================================
24. NEXT BEST ACTION
===============================================================

This should be one of the strongest components.

The user should always understand:

"What should I do next?"

Example:

NEXT BEST ACTION

Complete:
Machine Learning Fundamentals

Why:
Highest-priority competency gap

Impact:
+18% target-role readiness

[Start Learning]

Make this visually prominent.

===============================================================
25. SKILL GAP EXPERIENCE
===============================================================

The Skill Gap page must feel like intelligence,
not a warning dashboard.

Use priority carefully:

Critical
High
Medium
Low

Avoid aggressive red everywhere.

Explain:

Current
Target
Gap
Priority
Why it matters
Recommended learning

Use beautiful visual comparison.

===============================================================
26. LEARNING PATH
===============================================================

Make the learning path one of the most memorable screens.

It should feel like a personalized journey.

Example:

YOU ARE HERE
   ↓
Python
   ↓
Machine Learning
   ↓
Applied ML
   ↓
Cloud
   ↓
Advanced Analytics
   ↓
TARGET ROLE

Use elegant progress and roadmap visuals.

Completed:
beautiful confirmation state

Current:
strong visual focus

Locked:
subtle and understandable

===============================================================
27. COURSE EXPERIENCE
===============================================================

Course cards should communicate:

- What is it?
- Why should I care?
- How relevant is it?
- How long will it take?
- Which skills will improve?

Show:

AI Match
Duration
Level
Provider
Skills

Course details should prominently explain:

"Why SkillSaarthi recommended this."

===============================================================
28. ASSESSMENT EXPERIENCE
===============================================================

The quiz experience must feel focused and premium.

Minimize distractions.

Show:

Question progress
Question
Options
Skill
Difficulty
Navigation

Use smooth transitions between questions.

Selected option must be visually obvious.

Flagging should be easy.

Submission should have confirmation.

===============================================================
29. RESULTS EXPERIENCE
===============================================================

Results should not simply say:

"Score: 80%"

Instead show:

Overall Score
Skills assessed
Strong areas
Weak areas
Competency movement
Recommended next step

Example:

Python

Before:
2/5

After:
3/5

Progress:
+1 level

Then:

NEXT RECOMMENDED ACTION

Continue:
Advanced Python

===============================================================
30. DOCUMENT UPLOAD
===============================================================

Create a premium drag-and-drop experience.

Show:

Upload
↓
Processing
↓
Extracting
↓
Understanding
↓
Generating Assessment
↓
Ready

Processing must feel alive.

Do not leave the user staring at a blank screen.

===============================================================
31. AI COACH
===============================================================

The AI Coach must NOT look like a generic chatbot.

It should feel like a personal learning intelligence layer.

Show contextual information:

Target role
Current competency
Biggest gap
Recommended action

Suggested prompts:

Explain my biggest skill gap
Why was this course recommended?
Create a 7-day learning plan
Test my Python knowledge
Explain machine learning simply
What should I learn next?

AI messages should have excellent typography and spacing.

===============================================================
32. AI VISUAL LANGUAGE
===============================================================

Create subtle consistency for AI-generated content.

Use a recognizable:

AI badge
AI icon
AI accent
Source indicator

But avoid:

- Neon overload
- Glowing everything
- Futuristic clichés
- Excessive gradients

AI should feel intelligent, not gimmicky.

===============================================================
33. MICRO-INTERACTIONS
===============================================================

Add meaningful micro-interactions.

Examples:

Buttons:
hover / active / focus

Cards:
subtle hover elevation

Navigation:
active state transition

Progress:
smooth growth

Competency:
animated reveal

Roadmap:
step transitions

Quiz:
question transitions

AI Coach:
message appearance

Toast:
smooth entrance/exit

Modal:
subtle scale/fade

Keep animations:

Fast
Smooth
Purposeful

Typical duration:

150–300ms

===============================================================
34. REDUCED MOTION
===============================================================

Respect:

prefers-reduced-motion

If reduced motion is enabled:

- Minimize transitions
- Remove unnecessary movement
- Preserve usability

===============================================================
35. RESPONSIVE DESIGN
===============================================================

The interface must work beautifully on:

Mobile
Tablet
Desktop

Prioritize:

390px
430px
768px
1024px
1280px
1440px

Do NOT merely shrink desktop.

Adapt the layout intelligently.

===============================================================
36. MOBILE NAVIGATION
===============================================================

Create an excellent mobile navigation experience.

The desktop sidebar may become:

- Drawer
- Bottom navigation
- Compact navigation

depending on the existing architecture and Figma.

Do not cram the desktop sidebar into mobile.

===============================================================
37. RESPONSIVE CHARTS
===============================================================

Charts must remain understandable on small screens.

If necessary:

- Simplify labels
- Change orientation
- Allow horizontal scrolling
- Use alternate mobile visualization

Never allow charts to overflow the viewport.

===============================================================
38. RESPONSIVE LEARNING ROADMAP
===============================================================

The learning path must work on mobile.

Possible approach:

Desktop:
horizontal/vertical journey

Mobile:
vertical timeline

Do not make the mobile roadmap unusable.

===============================================================
39. RESPONSIVE QUIZ
===============================================================

Quiz must be comfortable on mobile.

Controls should be easy to tap.

Do not create tiny answer options.

Keep important actions reachable.

===============================================================
40. LOADING STATES
===============================================================

Every asynchronous area must have a polished loading state.

Use:

Skeleton
Progress
Processing
Shimmer only where appropriate

Avoid unnecessary spinners everywhere.

===============================================================
41. EMPTY STATES
===============================================================

Empty states must feel designed.

Examples:

No skill gaps
No learning history
No courses
No assessments
No documents
No recommendations

Each empty state should explain:

What is happening
Why it matters
What the user should do

===============================================================
42. ERROR STATES
===============================================================

Create friendly, professional error states.

Examples:

Something went wrong.

We couldn't load your competency profile.

[Try Again]

Never show:

Stack traces
Raw API errors
Technical jargon

===============================================================
43. SUCCESS STATES
===============================================================

Add polished success states.

Examples:

Profile completed
Assessment completed
Course started
Document processed
Competency updated

Success should feel rewarding without becoming childish.

===============================================================
44. ACCESSIBILITY
===============================================================

Maintain:

- Keyboard navigation
- Focus indicators
- Semantic HTML
- Proper labels
- Accessible forms
- Accessible dialogs
- Accessible buttons
- Proper contrast
- Screen-reader-friendly structure
- Reduced motion

Check both Light and Dark themes for contrast.

===============================================================
45. HOVER / FOCUS / ACTIVE STATES
===============================================================

Every interactive component must have:

Default
Hover
Focus
Active
Disabled
Loading

states where applicable.

Do not leave interactions visually ambiguous.

===============================================================
46. FORMS
===============================================================

Forms must feel premium.

Improve:

- Input spacing
- Labels
- Helper text
- Validation
- Focus
- Error states
- Success states
- Password visibility
- Submit loading

Never rely only on placeholder text as labels.

===============================================================
47. NAVIGATION
===============================================================

Navigation should make the Employee journey obvious.

Main navigation:

Dashboard
Profile
Competencies
Skill Gaps
Learning Path
Courses
Assessments
Documents
AI Coach

Active route must be obvious.

===============================================================
48. COMMAND PALETTE
===============================================================

If already present, refine it.

If not present and architecture allows,
implement a lightweight command palette.

Potential actions:

Go to Dashboard
View Competencies
View Skill Gaps
Open Learning Path
Find Courses
Start Assessment
Open AI Coach

Do not over-engineer it.

===============================================================
49. NOTIFICATIONS
===============================================================

Use a clean notification experience.

Potential notifications:

Assessment completed
Competency updated
New recommendation
Course completed
Document ready

Do not overwhelm the user.

===============================================================
50. DATA VISUALIZATION QUALITY
===============================================================

Charts must work in both themes.

Never hardcode chart colors that become unreadable.

Use semantic chart tokens.

Tooltips must be readable.

Legends must be clear.

Do not overload charts with unnecessary data.

===============================================================
51. MOCK DATA
===============================================================

Preserve existing Version 1 mock data architecture.

Do not scatter mock data into components.

If additional data is needed:

Add it to the existing data layer.

Clearly distinguish demo/synthetic data from real government data.

===============================================================
52. API ARCHITECTURE
===============================================================

DO NOT BREAK THE EXISTING API ABSTRACTION.

Keep frontend services separated from UI.

Examples:

authApi
profileApi
competencyApi
skillGapApi
learningApi
courseApi
assessmentApi
documentApi
assistantApi

If Version 1 already has these abstractions,
reuse them.

===============================================================
53. NO BACKEND LOGIC
===============================================================

Do not implement:

Competency calculation
Recommendation algorithms
LLM calls
RAG
Database queries
Authentication server
iGOT production integration

Frontend should consume data.

===============================================================
54. PERFORMANCE
===============================================================

Maintain or improve performance.

Use:

- Lazy loading where useful
- Efficient rendering
- Optimized assets
- Reasonable dependencies
- Avoid unnecessary re-renders

Do not sacrifice performance for visual effects.

===============================================================
55. NO UNNECESSARY DEPENDENCIES
===============================================================

Before installing anything:

Ask:

Can the existing stack solve this?

If yes:
USE THE EXISTING STACK.

Only add a dependency when there is a clear benefit.

===============================================================
56. VISUAL QA
===============================================================

For EVERY major page:

1. Run application.
2. Open page in browser.
3. Inspect actual rendered result.
4. Compare against Figma.
5. Check spacing.
6. Check typography.
7. Check alignment.
8. Check colors.
9. Check borders.
10. Check shadows.
11. Check icons.
12. Check interactions.
13. Check Light mode.
14. Check Dark mode.
15. Check System mode.
16. Check mobile.
17. Check tablet.
18. Check desktop.
19. Fix issues.
20. Re-test.

Do not declare a page complete after only checking that it renders.

===============================================================
57. THEME QA LOOP
===============================================================

For every major page:

TEST:

Light
 ↓
Dark
 ↓
System Light
 ↓
System Dark
 ↓
Change OS theme while app is open
 ↓
Reload page
 ↓
Navigate to another route
 ↓
Open modal/drawer
 ↓
Use forms
 ↓
Check charts
 ↓
Check notifications

No visual regression is acceptable.

===============================================================
58. FUNCTIONAL QA LOOP
===============================================================

For every feature:

Happy path
 ↓
Invalid input
 ↓
Loading
 ↓
Empty
 ↓
Error
 ↓
Retry
 ↓
Mobile
 ↓
Refresh
 ↓
Back navigation
 ↓
Forward navigation

===============================================================
59. MASTER DEVELOPMENT LOOP
===============================================================

THIS LOOP MUST GOVERN ALL DEVELOPMENT.

PHASE A — UNDERSTAND

Inspect:

Repository
Figma
Existing V1
Routes
Components
Styles
Dependencies
Data layer

Do not code yet.

---------------------------------------------------------------

PHASE B — AUDIT

Identify:

Visual inconsistencies
Weak components
Poor spacing
Typography problems
Responsive issues
Theme problems
Accessibility issues
Interaction problems
Duplicated UI
Missing states

---------------------------------------------------------------

PHASE C — PLAN

Create a concise implementation plan.

Identify:

What changes
Why
Which components
Which pages
What risks

---------------------------------------------------------------

PHASE D — IMPLEMENT

Implement the smallest coherent change.

Prefer reusable components.

---------------------------------------------------------------

PHASE E — RUN

Run the application.

Check:

Console
TypeScript
Build
Routes
Runtime errors

---------------------------------------------------------------

PHASE F — VISUAL INSPECTION

Inspect the actual browser result.

Do not trust the source code alone.

---------------------------------------------------------------

PHASE G — FIGMA COMPARISON

Compare:

Composition
Spacing
Typography
Colors
Hierarchy
Interactions
Responsive behavior

---------------------------------------------------------------

PHASE H — THEME TEST

Test:

Light
Dark
System

---------------------------------------------------------------

PHASE I — RESPONSIVE TEST

Test:

Mobile
Tablet
Desktop

---------------------------------------------------------------

PHASE J — POLISH

Fix:

Small spacing issues
Alignment
Typography
Motion
States
Accessibility

---------------------------------------------------------------

PHASE K — REGRESSION

Verify that Version 1 functionality still works.

---------------------------------------------------------------

PHASE L — REPEAT

Continue until the feature reaches the quality bar.

===============================================================
60. PAGE-BY-PAGE PRIORITY
===============================================================

Polish in this order:

1. App Shell
2. Dashboard
3. Competencies
4. Skill Gaps
5. Learning Path
6. Courses
7. Course Details
8. Assessments
9. Assessment Results
10. Documents
11. AI Coach
12. Profile
13. Login/Register
14. Global states
15. Responsive refinement

Dashboard receives the highest visual attention.

===============================================================
61. APP SHELL
===============================================================

Make the global shell exceptionally polished.

Includes:

Sidebar
Topbar
Navigation
Profile menu
Theme selector
Notifications
Search / Command Palette
Breadcrumbs where useful

The shell should make every page feel connected.

===============================================================
62. SIDEBAR
===============================================================

Sidebar should include:

Brand
Navigation
Active state
Collapse behavior if appropriate
Theme control
User profile

Collapsed state must remain understandable.

Mobile should use a suitable mobile navigation pattern.

===============================================================
63. TOPBAR
===============================================================

Topbar may include:

Page title
Breadcrumb
Search
Notifications
Theme
User menu

Do not overcrowd it.

===============================================================
64. PROFILE EXPERIENCE
===============================================================

Profile should feel like a professional identity page.

Show:

Professional information
Experience
Education
Current assignment
Career goal
Skills
Training history
Profile completeness

Allow editing without making the interface complicated.

===============================================================
65. COMPETENCY DIGITAL TWIN
===============================================================

If Version 1 already has competency visualization,
upgrade it toward the concept of a:

COMPETENCY DIGITAL TWIN

Visualize:

Employee
 ↓
Current Skills
 ↓
Target Role
 ↓
Skill Gaps
 ↓
Learning
 ↓
Assessment
 ↓
Updated Competency

This should be visually impressive but understandable.

Do not create an unnecessarily complex 3D visualization.

A sophisticated 2D intelligence visualization is preferred.

===============================================================
66. PERSONALIZATION
===============================================================

The interface should feel personalized.

Use:

Employee name
Target role
Current competency
Top strengths
Top gaps
Learning progress
Recommended next action

Do not use personalization merely as decoration.

===============================================================
67. DELIGHT
===============================================================

Add small moments of delight.

Examples:

Profile completion reaches 100%
→ beautiful completion state

Course completed
→ subtle celebration

Skill level improves
→ animated improvement

Assessment completed
→ competency movement visualization

Learning path step completed
→ roadmap progression

Keep delight professional.

===============================================================
68. TRUST
===============================================================

Because this is a government-oriented platform,
trust is more important than visual novelty.

Avoid questionable visual tricks.

Clearly communicate:

- Source
- AI-generated content
- Demo/synthetic data where relevant
- Course provider
- Assessment source where available

===============================================================
69. AI TRANSPARENCY
===============================================================

When displaying AI-generated insights:

Make it clear that the content is AI-generated where appropriate.

Use subtle indicators.

Do not imply that AI decisions are authoritative
when they are recommendations.

===============================================================
70. FINAL VISUAL QUALITY BAR
===============================================================

Before declaring the project finished,
ask:

Does this look like a generic dashboard?

If YES:
Improve it.

Does every page feel like the same product?

If NO:
Improve the design system.

Does Light mode look intentional?

If NO:
Fix it.

Does Dark mode look intentional?

If NO:
Fix it.

Does System mode work correctly?

If NO:
Fix it.

Does mobile feel designed rather than compressed?

If NO:
Fix it.

Are there too many cards?

If YES:
Simplify.

Are there too many colors?

If YES:
Simplify.

Are animations distracting?

If YES:
Reduce them.

Does the user immediately know what to do next?

If NO:
Improve UX hierarchy.

===============================================================
71. FINAL TECHNICAL QUALITY BAR
===============================================================

Before completion:

[ ] Existing V1 functionality preserved
[ ] No broken routes
[ ] No TypeScript errors
[ ] No build errors
[ ] No critical console errors
[ ] No unnecessary dependencies
[ ] Clean component architecture
[ ] Reusable components
[ ] Responsive
[ ] Accessible
[ ] Light mode
[ ] Dark mode
[ ] System mode
[ ] Theme persistence
[ ] OS theme detection
[ ] Loading states
[ ] Empty states
[ ] Error states
[ ] Success states
[ ] Proper hover states
[ ] Proper focus states
[ ] Proper disabled states
[ ] Proper mobile navigation
[ ] Charts work in both themes
[ ] Forms work in both themes
[ ] AI Coach works in both themes
[ ] Quiz works in both themes
[ ] Learning path works in both themes
[ ] Visual QA completed
[ ] Functional QA completed
[ ] Responsive QA completed
[ ] Theme QA completed

===============================================================
72. IMPORTANT ANTI-PATTERNS
===============================================================

DO NOT:

- Rebuild everything unnecessarily
- Delete working code
- Create a new architecture without reason
- Make every element a card
- Use excessive gradients
- Use excessive glassmorphism
- Use excessive glow
- Use excessive rounded corners
- Use excessive shadows
- Use excessive animation
- Use random colors
- Use random fonts
- Use tiny text
- Use inconsistent icons
- Hardcode theme colors everywhere
- Hardcode API data into components
- Add fake backend integrations
- Add additional application roles
- Expose API secrets
- Claim mock functionality is production integration

===============================================================
73. FINAL PRODUCT EXPERIENCE
===============================================================

The employee should feel:

"I understand my professional capability."

"I know my skill gaps."

"I understand why those gaps matter."

"I know what I should learn next."

"I can follow a personalized path."

"I can test myself."

"I can see my competency improve."

"I have an AI coach helping me."

"I trust this platform."

===============================================================
74. FINAL EXECUTION INSTRUCTION
===============================================================

VERSION 1 ALREADY WORKS.

DO NOT START OVER.

Start by:

1. Inspecting the current Employee Frontend.
2. Running Version 1.
3. Auditing the existing UI.
4. Reviewing the Figma design.
5. Auditing the design system.
6. Implementing the Light/Dark/System theme architecture.
7. Polishing the global App Shell.
8. Polishing the Dashboard.
9. Polishing the remaining Employee pages.
10. Testing every page.
11. Testing every theme.
12. Testing responsive layouts.
13. Fixing visual issues.
14. Running final regression tests.

Work incrementally.

After every significant change:

IMPLEMENT
→ RUN
→ INSPECT
→ TEST
→ FIX
→ RE-TEST

Never assume success.

The final goal is not "more UI".

The final goal is:

THE MOST BEAUTIFUL, POLISHED, INTELLIGENT,
ATTRACTIVE AND PROFESSIONAL EMPLOYEE EXPERIENCE
POSSIBLE FOR SKILLSAARTHI AI.

===============================================================
END OF MASTER LOOP PROMPT
===============================================================