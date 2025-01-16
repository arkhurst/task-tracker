import { AnimatePresence } from "framer-motion";
import { type TaskType } from "../types/types";
import { Task } from "./Task";
import { useTaskTracker } from "../hooks/useTaskTracker";

export const Tasks = () => {
  const { tasks } = useTaskTracker();

  return (
    <div className="w-full space-y-3 mt-5">
      <AnimatePresence>
        {tasks.map((t: TaskType) => (
          <Task key={t.id} task={t} />
        ))}
      </AnimatePresence>
    </div>
  );
};
