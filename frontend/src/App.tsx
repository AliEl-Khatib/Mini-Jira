import { Routes, Route } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import Homepage from "./pages/Homepage";
import { useState } from "react";
import type { Task } from "./types";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-4 md:p-8">
      <Routes>
        <Route path="/" element={<Homepage tasks={tasks} setTasks={setTasks} />} />
        <Route path="/tasks/:id" element={<TaskPage setTasks={setTasks} />} />
      </Routes>
    </div>
  );
}

export default App;