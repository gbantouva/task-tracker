# Task Tracker

A full-stack internal task tracking web application built with React and FastAPI.

## Tech Stack

- **Frontend:** React (bootstrapped with Vite)
- **Backend:** Python + FastAPI
- **Database:** In-memory (Python list)
- **Containerization:** Docker + Docker Compose

## Running with Docker (recommended)

Make sure you have Docker Desktop installed and running, then from the root folder run:
```bash
docker compose up --build
```

Then open your browser at:
- App: http://localhost:5173
- API docs: http://localhost:8000/docs

To stop the app press `Ctrl+C` and then run:
```bash
docker compose down
```

## Running Locally (without Docker)

**Backend** — in one terminal:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend** — in a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Then open your browser at http://localhost:5173

## Features

- Create tasks with a title, description, and status
- View all tasks in a list
- Click any task to view its full details
- Status options: Open, In Progress, Completed

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/{id} | Get a single task by ID |
| POST | /tasks | Create a new task |

## Design Choices

- The frontend was bootstrapped using `npm create vite@latest` with the React template — Vite is the current industry standard build tool for React projects and handles JSX transformation and hot module reloading
- Tasks are stored in an in-memory Python list for simplicity, no database setup required
- Each task is assigned a UUID on creation for unique identification
- CORS is enabled on the backend so the frontend (port 5173) can communicate with the backend (port 8000), browsers block cross-origin requests by default
- The frontend is a single-page React app using view-based navigation controlled by a single state variable, no router was needed at this scale
- The frontend communicates with the backend via Axios, making HTTP requests to the REST API

## Assumptions

- A single user environment, no authentication required as per the brief
- Data does not need to persist between server restarts at this stage, in a production app this would be replaced with a real database like PostgreSQL
- All three fields (title, description, status) are required when creating a task
