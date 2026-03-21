# 2048 Game — React + TypeScript + AWS + CI/CD

A fully functional 2048 game built with React and TypeScript, featuring a retro pastel UI with a dynamic day/night background that evolves as your score grows. Deployed on AWS with a fully automated CI/CD pipeline — push code, and it's live in 25 seconds.

---

## Live Demo

Hosted on AWS CloudFront — globally available via HTTPS.

---

## Features

**Game**
- Classic 2048 mechanics — slide, merge, spawn
- Arrow key, mouse drag, and touch swipe support
- Ghost tile that follows your cursor while dragging
- Score tracking with best score saved in localStorage
- Win and Game Over overlays with restart

**Dynamic Background**
The background changes every 250 points, cycling through five phases:

| Score | Phase |
|---|---|
| 0 – 249 | Dawn — dark sky, sun barely at the horizon, stars out |
| 250 – 499 | Sunrise — warm orange sky, sun rises low |
| 500 – 749 | Afternoon — bright sky, sun high, lush green hills |
| 750 – 999 | Sunset — deep red-orange, sun drops back down |
| 1000 – 1249 | Night — dark sky, moon rises, stars fully visible |
| 1250+ | Repeats from Dawn |

All transitions are smooth 3-second fades. The sun moves to a new position on each phase change, the moon rises at night, and the hills and clouds shift color throughout.

**UI**
- Retro pixel aesthetic using Press Start 2P and VT323 fonts
- Hard pixel box shadows, sharp corners, no blur effects
- Original 2048 tile colors preserved exactly

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Hosting | AWS S3 (static website hosting) |
| CDN | AWS CloudFront (400+ edge locations, free HTTPS) |
| Access Control | AWS IAM (least privilege deployment user) |
| CI/CD | GitHub Actions |
| Version Control | Git + GitHub |

---

## Project Structure

```
2048-game/
├── .github/
│   └── workflows/
│       └── deploy.yml        — CI/CD pipeline
├── src/
│   ├── components/
│   │   ├── Background.tsx    — animated sky background
│   │   ├── GameBoard.tsx     — 4x4 grid
│   │   ├── ScoreBoard.tsx    — score display
│   │   └── Tile.tsx          — individual tile
│   ├── App.tsx               — game state and controls
│   ├── gameLogic.ts          — pure game logic
│   ├── phases.ts             — day/night phase config
│   └── main.tsx              — entry point
├── index.html
└── package.json
```

---

## How the Pipeline Works

Every push to `main` triggers this automatically:

```
git push
  → install dependencies
  → npm run build
  → sync dist/ to AWS S3
  → invalidate CloudFront cache
  → live in ~25 seconds
```

Credentials are stored as GitHub Secrets. The IAM user only has access to S3 and CloudFront — nothing else.

---

## Running Locally

Requires Node.js v20+

```bash
git clone https://github.com/Nilaksh20/2048-game-with-CI-CD-pipeline-using-cloud.git
cd 2048-game-with-CI-CD-pipeline-using-cloud
npm install
npm run dev
```

Open http://localhost:5173

```bash
npm run build   # production build → dist/
```

---

## What This Project Covers

- React component architecture and hooks
- Pure functional game logic (immutable board state)
- TypeScript for type-safe development
- AWS S3 static hosting and bucket policies
- CloudFront CDN setup and cache invalidation
- IAM user creation with least privilege access
- GitHub Actions workflow for automated deployment
- Git version control and branching

---

## Author

Nilaksh — [github.com/Nilaksh20](https://github.com/Nilaksh20)