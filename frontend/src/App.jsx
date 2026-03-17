import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", status: "Open" });
  const [view, setView] = useState("list"); // "list" | "create" | "detail"

  // Load all tasks when the page loads for the first time
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!form.title) return alert("Title is required!");
    await axios.post(`${API}/tasks`, form);
    setForm({ title: "", description: "", status: "Open" });
    await fetchTasks();
    setView("list");
  };

  const viewTask = async (id) => {
    const res = await axios.get(`${API}/tasks/${id}`);
    setSelectedTask(res.data);
    setView("detail");
  };

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h1>Task Tracker</h1>

      {/* Navigation */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setView("list")} style={btnStyle}>All Tasks</button>
        <button onClick={() => setView("create")} style={btnStyle}>+ New Task</button>
      </div>

      {/* Task List View */}
      {view === "list" && (
        <div>
          <h2>Tasks ({tasks.length})</h2>
          {tasks.length === 0 && <p>There aren't any tasks yet.</p>}
          {tasks.map(task => (
            <div key={task.id} style={cardStyle} onClick={() => viewTask(task.id)}>
              <strong style={{ flex: 1 }}>{task.title}</strong>
              <span style={badgeStyle(task.status)}>{task.status}</span>
              <span style={{ flex: 1, textAlign: "right", color: "#666", fontSize: 14 }}>{task.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* Create Task View */}
      {view === "create" && (
        <div>
          <h2>Create New Task</h2>
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={inputStyle}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            style={{ ...inputStyle, height: 70 }}
          />
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            style={inputStyle}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button onClick={createTask} style={{ ...btnStyle, background: "#4CAF50", color: "white" }}>
            Create Task
          </button>
        </div>
      )}

      {/* Task Detail View */}
      {view === "detail" && selectedTask && (
        <div>
          <button onClick={() => setView("list")} style={btnStyle}>← Back</button>
          <h2>{selectedTask.title}</h2>
          <p><strong>Status:</strong> <span style={badgeStyle(selectedTask.status)}>{selectedTask.status}</span></p>
          <p><strong>Description:</strong><br />{selectedTask.description}</p>
          <p style={{ color: "#666", fontSize: 13 }}>ID: {selectedTask.id}</p>
        </div>
      )}
    </div>
  );
}

// Styles
const btnStyle = { marginRight: 10, padding: "8px 16px", cursor: "pointer", borderRadius: 6, border: "1px solid #ccc" };
const inputStyle = { display: "block", width: "100%", marginBottom: 12, padding: 10, fontSize: 15, borderRadius: 6, border: "1px solid #ccc", boxSizing: "border-box" };
const cardStyle = { border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 12, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",};
const badgeStyle = (status) => ({
  padding: "3px 10px", borderRadius: 20, fontSize: 13, fontWeight: "bold",
  background: status === "Completed" ? "#d4edda" : status === "In Progress" ? "#fff3cd" : "#cce5ff",
  color: status === "Completed" ? "#155724" : status === "In Progress" ? "#856404" : "#004085",
});

export default App;