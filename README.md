# Task Tracker

A full-stack internal task tracking web application built with React and FastAPI.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Python + FastAPI
- **Database:** In-memory (Python list)
- **Containerization:** Docker + Docker Compose

## Running with Docker (recommended)

Make sure you have Docker Desktop installed and running, then:
```bash
docker compose up --build
```

Then open your browser at:
- App: http://localhost:5173
- API docs: http://localhost:8000/docs

To stop the app press `Ctrl+C` and run:
```bash
docker compose down
```

## Running Locally (without Docker)

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend** (in a second terminal):
```bash
cd frontend
npm install
npm run dev
```

## Features

- Create tasks with a title, description, and status
- View all tasks in a list
- Click any task to view its details
- Status options: Open, In Progress, Completed

## Design Choices

- Tasks are stored in memory (a Python list) for simplicity — no database setup required
- Each task is assigned a UUID on creation for unique identification
- CORS is enabled on the backend so the frontend can communicate with it across ports
- The frontend is a single-page React app with view-based navigation (no router needed for this scale)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/{id} | Get a single task |
| POST | /tasks | Create a new task |