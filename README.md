# LabelLift Mini – Music Distribution Dashboard

A **mini music distribution dashboard** built with **Next.js** (frontend) and mock API routes.  
This project simulates a lightweight music distribution system where users can log in, upload tracks, and view/manage them in a dashboard.

---

## 🎯 Features (Completed)

- ✅ Project setup with Next.js + TypeScript  
- ✅ Mock API routes for serving and managing tracks  
- ✅ Basic page routing (Login → Dashboard → Track Details)  
- ✅ Track list rendering with table layout  
- ✅ Form handling for mock track upload  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (React + TypeScript)  
- **UI Styling:** TailwindCSS (planned)  
- **State Management:** React hooks + Context (for theme/session)  
- **Mock Backend:** Next.js API routes (no real DB yet)  
- **Optional Dev Server:** Express + Vite integration for hybrid serving  

---
LabelLift/
├── pages/
│ ├── index.tsx # Login Page
│ ├── dashboard.tsx # Dashboard Page (list of tracks)
│ ├── upload.tsx # Track Upload Page
│ ├── track/[id].tsx # Dynamic Track Details Page
│ └── api/ # Mock backend API routes
├── components/ # Reusable UI components
├── styles/ # Global + Tailwind styles
├── utils/ # Helper functions (mock data, etc.)
├── package.json
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sarthakshahii/LabelLift-Mini-music-distribution-dashboard.git
cd LabelLift-Mini-music-distribution-dashboard
2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev

4️⃣ Build for production
npm run build
npm run start

💡 Approach & Implementation
Login Page: Mock login with username + password. No real auth, just redirect to dashboard after validation.
Dashboard: Displays uploaded tracks using a table (Title, Artist, Release Date, Status). Data comes from mock API routes.
Track Upload: A form (Title, Artist, Release Date, Genre). On submit, track is added to mock backend and shown in dashboard.
Track Details: Dynamic route (/track/[id]). Fetches and displays info about a single track.
Bonus Features: Theme switcher + localStorage persistence for theme and session.

✅ Completed Features
 Next.js project structure with TypeScript
 Mock API setup (track data)
 Navigation between pages (login → dashboard → track details)
 Form handling for track upload
## 📂 Project Structure (Frontend Focused)

