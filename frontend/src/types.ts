export type Status = "not-started" | "in-progress" | "done";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  deadline: string;
}