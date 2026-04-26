# Mini Task Manager (Full Stack)

A clean full-stack Task Manager built with React (frontend) and Node.js + Express (backend).

## Live Links

- Frontend (Vercel): https://task-manager-app-nine-taupe.vercel.app/
- Backend (Render): https://task-manager-app-uznu.onrender.com

## Repository

- GitHub: `add-your-github-repo-link-here`

## Tech Stack

- Frontend: React (functional components, hooks), Vite
- Backend: Node.js, Express
- Storage: In-memory JavaScript array (no database)

## Folder Structure

```text
Task-Manager-app-assignment/
├─ client/
│  ├─ src/
│  │  ├─ App.jsx        # Task UI + API integration
│  │  ├─ App.css        # Component-level styling
│  │  ├─ index.css      # Global styling
│  │  └─ main.jsx       # React entry
│  └─ .env              # VITE_API_URL for backend base URL
├─ server/
│  ├─ index.js          # Express server + 3 required endpoints
│  └─ package.json
└─ package.json          # Root scripts to run both apps
```

## API Endpoints

Backend provides exactly these endpoints:

1. `GET /tasks` -> return all tasks
2. `POST /tasks` -> create a new task with body:
   ```json
   { "text": "My new task" }
   ```
3. `DELETE /tasks/:id` -> delete task by ID

## Local Setup (Step-by-Step)

### 1) Clone repository

```bash
git clone <your-repo-url>
cd Task-Manager-app-assignment
```

### 2) Install dependencies

```bash
npm install
npm run install:all
```

### 3) Configure frontend environment variable

Create `client/.env` with:

```env
VITE_API_URL=http://localhost:5000
```

### 4) Run both apps

```bash
npm run dev
```

Expected result:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173` (or next available port)

## Decisions and Assumptions

- Used in-memory array storage exactly as requested (no database).
- Kept backend to only the 3 required REST endpoints.
- Added lightweight input validation:
  - task text must be non-empty
  - task text max length is 200 characters
  - delete ID must be a positive integer
- Frontend always performs create/read/delete through API calls (not local-only state).
- Styling is intentionally minimal and readable.

## Limitation

- Because storage is in-memory, all tasks reset when the server restarts.
