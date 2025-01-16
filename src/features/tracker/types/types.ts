export type TaskPriorityType = "low" | "medium" | "high";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  time: string;
  priority: TaskPriorityType;
};
