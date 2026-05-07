import type { Task, Status } from "../types";
import Column from "./Column";

interface Props {
  tasks: Task[];
  moveTask: (id: string, status: Status) => void;
}

const Board = ({ tasks, moveTask }: Props) => {
  const statuses: Status[] = ["not-started", "in-progress", "done"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {statuses.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
};

export default Board;
