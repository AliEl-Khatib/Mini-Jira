import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Task, Priority } from "../types";
import { updateTask as updateTaskApi, deleteTask } from "../api/tasks";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskPage = ({ setTasks }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch the task directly from API — doesn't depend on parent state
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setTask(data);
      } catch {
        setTask(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSave = async () => {
    if (!id || !task) return;
    setSaving(true);
    try {
      const updated = await updateTaskApi(id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
      });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    navigate("/");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!task) return <p className="p-6">Task not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium flex items-center gap-1"
          >
            ← Back to Board
          </button>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 border border-white p-6 space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Edit Task
          </h2>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Title
            </label>
            <input
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 text-sm text-slate-800 font-medium"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Description
            </label>
            <textarea
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              rows={3}
              className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 text-sm text-slate-600 resize-none"
            />
          </div>

          {/* Priority + Deadline row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Priority
              </label>
              <select
                value={task.priority}
                onChange={(e) =>
                  setTask({ ...task, priority: e.target.value as Priority })
                }
                className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 text-sm text-slate-600"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Deadline
              </label>
              <input
                type="date"
                value={task.deadline}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                className="w-full bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 text-sm text-slate-500"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 pt-2 space-y-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer font-bold shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleDelete}
              className="w-full bg-white text-red-500 py-3 rounded-xl hover:bg-red-50 border border-red-200 transition-all font-bold cursor-pointer"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
