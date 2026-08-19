# LaunchCraft AI Studio

AI-powered product intelligence platform that helps founders, developers, and innovators turn raw ideas into structured, buildable product plans — including feature planning, UI/UX recommendations, technology stack suggestions, and development roadmaps.

## Features

- **Landing Page** — marketing site with animated hero, feature showcase, and interactive elements
- **Authentication** — secure signup/login via Supabase
- **Dashboard** — live project stats, progress tracking, recent activity feed
- **AI Workspace** — chat-based interface that generates a structured product blueprint from a plain-language idea
- **Project Management** — create, track, and delete projects with visual progress indicators (linear + circular)
- **Project Progress View** — all projects ranked by completion percentage
- **Activity Log** — full history of project-related actions
- **Settings** — profile, notification preferences, and account management

##  Tech Stack

- **Frontend:** React + Vite
- **Routing:** React Router v6
- **Backend / Database / Auth:** Supabase
- **Styling:** Plain CSS with custom properties (no CSS framework)
- **Fonts:** Sora (headings), Inter (body)

##  Project Structure

    src/
    ├── App.jsx                 # Route definitions
    ├── main.jsx                # Entry point
    ├── context/
    │   └── AuthContext.jsx     # Auth state and session handling
    ├── components/
    │   ├── ProtectedRoute.jsx
    │   ├── layout/
    │   │   └── DashboardLayout.jsx
    │   └── dashboard/
    │       ├── Header.jsx
    │       ├── Sidebar.jsx
    │       ├── ProjectCard.jsx
    │       ├── MyProjects.jsx
    │       ├── RecentActivity.jsx
    │       └── CreateProjectModal.jsx
    ├── pages/
    │   ├── Landing.jsx
    │   ├── login.jsx
    │   ├── signup.jsx
    │   ├── Dashboard.jsx
    │   ├── ActivityPage.jsx
    │   ├── ProgressPage.jsx
    │   ├── Settings.jsx
    │   └── Workspace.jsx
    ├── hooks/
    │   ├── useReveal.js         # Scroll-triggered reveal animations
    │   └── useCountUp.js        # Animated number counting
    ├── lib/
    │   ├── projectService.js    # Supabase project CRUD
    │   └── activityService.js   # Supabase activity logging
    └── styles/
        ├── landing.css
        ├── dashboard.css
        └── workspace.css

##  Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- A Supabase project (URL + anon key)

### Installation

    git clone <your-repo-url>
    cd launchcraft-ai-studio
    npm install

### Running Locally

    npm run dev

The app will be available at `http://localhost:5173` (default Vite port).

### Building for Production

    npm run build
    npm run preview

##  Design System

| Role | Color | Hex |
|---|---|---|
| Primary | Violet | `#7C5CFF` |
| Primary (hover) | Deep Violet | `#6142E0` |
| Accent | Teal | `#5EEAD4` |
| Background | Off-white | `#F7F7FB` |

- Two-color brand system by design — no third accent color
- Solid buttons (not gradients) for a trustworthy, professional feel
- Gradient reserved for decorative moments: headline text, logo, card borders

##  Routes

| Route | Page |
|---|---|
| `/` | Landing |
| `/login` | Login |
| `/signup` | Sign Up |
| `/dashboard` | Dashboard |
| `/projects` | My Projects |
| `/activity` | Recent Activity |
| `/progress` | Project Progress |
| `/settings` | Settings |
| `/workspace/:projectId` | AI Workspace |


##  License

All rights reserved. This project is proprietary and confidential.
