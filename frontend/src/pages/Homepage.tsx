import { useEffect, useState } from "react";
import type { Task, Status, Priority } from "../types";
import Board from "../components/Board";
import { updateTask, fetchTasks, createTask } from "../api/tasks";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const Homepage = ({ tasks, setTasks }: Props) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium" as Priority,
    deadline: "",
  });

  const moveTask = async (id: string, status: Status) => {
    try {
      const updated = await updateTask(id, { status });

      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updated : task))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTasks();
  }, [setTasks]);

  const addTask = async () => {
    if (!form.title.trim()) return;

    try {
      const newTask = await createTask({
        title: form.title,
        description: form.description,
        priority: form.priority,
        deadline: form.deadline,
        status: "not-started",
      });

      setTasks((prev) => [...prev, newTask]);

      setForm({
        title: "",
        description: "",
        priority: "medium",
        deadline: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight text-center md:text-left">
          Mini Jira
        </h1>
      </header>

      {/* FORM */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 border border-white p-6">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
          New Task
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 text-sm"
              placeholder="Task title..."
            />
            <input
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className="bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 text-sm"
              placeholder="Description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <select
              value={form.priority}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  priority: e.target.value as Priority,
                }))
              }
              className="bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 text-sm text-slate-600"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <input
              type="date"
              value={form.deadline}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, deadline: e.target.value }))
              }
              className="bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 text-sm text-slate-500 uppercase"
            />

            <button
              onClick={addTask}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all font-bold shadow-lg shadow-blue-200"
            >
              + Create Task
            </button>
          </div>
        </div>
      </div>

      {/* BOARD */}
      <Board tasks={tasks} moveTask={moveTask} />
    </div>
  );
};

export default Homepage;