import { useNavigate } from "react-router-dom";
import type { Task, Status } from "../types";

interface Props {
  status: Status;
  tasks: Task[];
  moveTask: (id: string, status: Status) => void;
}

const statusStyle = {
  "not-started": { bg: "bg-slate-100", accent: "border-t-slate-400", title: "text-slate-700" },
  "in-progress": { bg: "bg-blue-50/50", accent: "border-t-blue-500", title: "text-blue-700" },
  "done": { bg: "bg-emerald-50/50", accent: "border-t-emerald-500", title: "text-emerald-700" },
};

const priorityStyle = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const Column = ({ status, tasks, moveTask }: Props) => {
  const navigate = useNavigate();

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("taskId");
    moveTask(taskId, status);
  };

  const handleCardClick = (e: React.MouseEvent, taskId: string) => {
    // Don't navigate if the user is dragging
    if (e.defaultPrevented) return;
    navigate(`/tasks/${taskId}`);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`flex flex-col rounded-2xl p-4 border-t-4 shadow-sm ${statusStyle[status].bg} ${statusStyle[status].accent} min-h-[500px] transition-colors`}
    >
      <div className="flex justify-between items-center mb-6 px-1">
        <h3 className={`font-bold uppercase tracking-wider text-xs ${statusStyle[status].title}`}>
          {status.replace("-", " ")}
        </h3>
        <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-bold text-gray-500">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("taskId", task.id);
            }}
            onClick={(e) => handleCardClick(e, task.id)}
            className="group bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer active:cursor-grabbing"
          >
            <div className="flex justify-between items-start gap-2 mb-2">
              <p className="font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                {task.title}
              </p>
              <span className={`shrink-0 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${priorityStyle[task.priority]}`}>
                {task.priority}
              </span>
            </div>

            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
              {task.description}
            </p>

            {task.deadline && (
              <div className="flex items-center gap-1.5 text-gray-400">
                <span className="text-[11px] font-medium italic">
                  🗓 {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;