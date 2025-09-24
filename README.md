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

1️⃣ Clone the repository
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

 ## Login Page
 <img width="1914" height="956" alt="Screenshot 2025-09-24 185304" src="https://github.com/user-attachments/assets/790b7847-a94d-4669-9935-0f52c62db0a8" />

## Dashboard Page
 <img width="1919" height="963" alt="Screenshot 2025-09-24 185323" src="https://github.com/user-attachments/assets/e0911a8d-204e-429f-9c0a-a67c0c3e4d7f" />

## Dark theme
 <img width="1919" height="899" alt="Screenshot 2025-09-24 185344" src="https://github.com/user-attachments/assets/91014ae5-a0fd-4769-84d8-89727d3ed087" />

## Track details
 <img width="1918" height="971" alt="Screenshot 2025-09-24 185447" src="https://github.com/user-attachments/assets/ea263cab-185f-44ab-9a5f-3a2c08439110" />

## Upload new track
 <img width="1919" height="967" alt="Screenshot 2025-09-24 185536" src="https://github.com/user-attachments/assets/633725cc-f555-411a-a05e-366d03d9771b" />





 


