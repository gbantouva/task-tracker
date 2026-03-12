# Task Tracker

A simple internal task tracking web application that allows users to create and view tasks through a clean, user-friendly interface.

## Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy, SQLite
- **Frontend:** React, Vite, React Router, Axios
- **Containerization:** Docker, Docker Compose

## Project Structure

```
task-tracker/
├── backend/
│   ├── main.py          # API endpoints
│   ├── models.py        # Database table definitions
│   ├── database.py      # Database connection setup
│   ├── schemas.py       # Request/response validation
│   ├── requirements.txt # Python dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── TaskList.jsx    # Displays all tasks
│   │   │   ├── CreateTask.jsx  # Task creation form
│   │   │   └── TaskDetail.jsx  # Single task view
│   │   ├── api.js       # API call functions
│   │   ├── App.jsx      # Routing and navigation
│   │   └── main.jsx     # React entry point
│   └── Dockerfile
└── docker-compose.yml
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Retrieve all tasks |
| GET | `/tasks/{id}` | Retrieve a single task |

## Run Locally (without Docker)

### Prerequisites
- Python 3.11+
- Node.js 22+

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs at [**http://localhost:8000**](http://localhost:8000)  
Interactive API docs available at [**http://localhost:8000/docs**](http://localhost:8000/docs)

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at [**http://localhost:5173**](http://localhost:5173)

## Run with Docker

### Prerequisites
- Docker Desktop installed and running

### Steps
```bash
docker-compose up --build
```
Visit [**http://localhost:5173**](http://localhost:5173)

To stop the containers:
```bash
docker-compose down
```

## Design Choices

- **SQLite** was chosen for simplicity — no external database setup required. Data persists in a `tasks.db` file inside the backend folder.
- **FastAPI** was chosen for its simplicity, automatic API documentation, and native Python type validation via Pydantic.
- **Vite** was used instead of Create React App for faster development build times.
- **CORS** is enabled on the backend to allow the frontend to communicate with it during development.
- Task statuses are limited to: `Open`, `In Progress`, `Completed`.
