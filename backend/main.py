from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uuid

app = FastAPI()

# Allow the frontend (running on a different port) to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# This is our "database" for now — just a Python list in memory
tasks = []

# This defines what a Task looks like
class Task(BaseModel):
    title: str
    description: str
    status: str  # "Open", "In Progress", or "Completed"

# GET /tasks — return all tasks
@app.get("/tasks")
def get_tasks():
    return tasks

# GET /tasks/{id} — return one task by ID
@app.get("/tasks/{task_id}")
def get_task(task_id: str):
    for task in tasks:
        if task["id"] == task_id:
            return task
    raise HTTPException(status_code=404, detail="Task not found")

# POST /tasks — create a new task
@app.post("/tasks")
def create_task(task: Task):
    new_task = task.dict()
    new_task["id"] = str(uuid.uuid4())  # give it a unique ID
    tasks.append(new_task)
    return new_task