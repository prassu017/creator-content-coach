# 5-Minute Demo Script: Creator Content Coach

Use this outline to record your screen presentation for the TikTok AI Product Manager assessment.

---

## Setup Before Recording

- [ ] App running locally or on Vercel
- [ ] Browser open to the landing page
- [ ] Screen recording software ready (OBS, Loom, or QuickTime)
- [ ] Quiet background, clear audio
- [ ] Practice the flow once before recording

---

## Script Outline (5 minutes)

### 0:00 - 0:30 | Introduction (30 seconds)

"Hi, I'm Prasanna Jain. I built Creator Content Coach, an AI-powered tool that helps TikTok creators optimize their scripts, captions, and hooks before posting. I'm going to walk you through the product thinking, the working demo, and the technical architecture."

**Show**: Landing page hero section.

---

### 0:30 - 1:00 | Problem and Product Thinking (30 seconds)

"The problem is simple: creators invest time writing content but lack fast, structured feedback before hitting post. They learn what went wrong after it is too late. This tool closes that gap."

**Show**: Scroll through the landing page features grid and stats bar briefly. Then navigate to the Product page.

"I documented this as a full PRD with user personas, jobs to be done, success metrics, and ethical considerations."

**Show**: Quick scroll through the Product page (do not read everything, just show it exists and is thorough).

---

### 1:00 - 3:00 | Live Demo (2 minutes - this is the core)

Navigate to the Demo page.

"Let me show you how it works. I will paste a TikTok travel caption."

**Action**: Click the "Travel caption" example to load it. Select "Caption" type. Click "Analyze Content."

"In under a second, I get an overall content score plus breakdowns for clarity, engagement, and originality."

**Show**: Scores tab with the rings.

"Scroll down and I have specific recommendations for improvement."

**Show**: Point out the recommendations.

"The Hooks tab gives me five different hook variants, each a different style: question, statistic, story, bold claim, and contrast."

**Action**: Click Hooks tab, scroll through them.

"Rewrites shows three tone-shifted versions of my content: punchy and direct, story-driven, and authority voice."

**Action**: Click Rewrites tab, briefly show all three.

"I also get a suggested content structure, smart hashtags, and a quality checklist that tells me exactly what I passed and what to fix."

**Action**: Click through Structure, Hashtags, and Checklist tabs quickly.

"Now let me iterate. I will edit my caption based on the recommendations and re-analyze."

**Action**: Modify the text slightly (add a question at the end, remove a cliche phrase). Click Analyze again.

"Score went up. And I can compare versions side by side."

**Action**: Open History panel, click on the first run to compare. Show the side-by-side scores.

"I can also export the full analysis as JSON."

**Action**: Click Export JSON button.

---

### 3:00 - 3:45 | Design Artifacts (45 seconds)

Navigate to the Design page.

"Before building, I created wireframes and user flow diagrams."

**Show**: Scroll through the wireframes (point out the landing page, demo page, results, and comparison wireframes).

"And here are the user flows mapped in Mermaid: the core analysis loop, feature discovery, and the iteration flow."

**Show**: Scroll through the Mermaid diagrams briefly.

---

### 3:45 - 4:30 | Technical Architecture (45 seconds)

Navigate to the Tech page.

"Technically, this is a Next.js app with API routes deployed on Vercel Edge. The AI pipeline supports two modes."

**Show**: Tech stack cards.

"Demo Mode uses a deterministic hash-based scoring engine, so the same input always gives the same output. No API key needed. Live Mode sends a structured prompt to OpenAI GPT-4o-mini and parses the JSON response."

**Show**: System architecture diagram and AI pipeline diagram.

"The data flow is fully client-side with no persistent storage. Rate limiting and input validation happen server-side."

**Show**: Data flow sequence diagram briefly.

---

### 4:30 - 5:00 | Results and Closing (30 seconds)

Navigate to the Results page.

"I modeled realistic beta metrics: 2,847 users over 8 weeks, an 18% average score improvement, 73% 7-day retention, and an NPS of 62."

**Show**: Hero metrics and the WAU growth chart.

"The roadmap includes post-publish analytics, team collaboration, and multi-platform support."

**Show**: Roadmap cards briefly.

"This project shows how I think about product from problem to PRD to design to working code. Thank you for watching."

---

## Recording Checklist

- [ ] Introduced yourself and the project clearly
- [ ] Showed the landing page
- [ ] Showed the Product page (PRD)
- [ ] Ran a full demo analysis with an example input
- [ ] Walked through all 6 output tabs (scores, hooks, rewrites, structure, hashtags, checklist)
- [ ] Demonstrated iteration (edit and re-analyze)
- [ ] Showed version comparison
- [ ] Showed export functionality
- [ ] Showed wireframes on the Design page
- [ ] Showed user flow diagrams
- [ ] Showed system architecture on the Tech page
- [ ] Showed AI pipeline explanation
- [ ] Showed beta metrics on the Results page
- [ ] Showed the product roadmap
- [ ] Stayed under 5 minutes
- [ ] Audio is clear and audible
- [ ] Screen recording is sharp and readable
