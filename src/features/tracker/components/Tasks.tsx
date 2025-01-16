import { AnimatePresence } from "framer-motion";
import { type TaskType } from "../types/types";
import { Task } from "./Task";

interface TaskProps {
  tasks: TaskType[];
  handleCheck: (id: string) => void;
  removeElement: (id: string) => void;
}

export const Tasks = ({ tasks, handleCheck, removeElement }: TaskProps) => {
  return (
    <div className="w-full space-y-3">
      <AnimatePresence>
        {tasks.map((t: TaskType) => (
          <Task
            handleCheck={handleCheck}
            removeElement={removeElement}
            id={t.id}
            key={t.id}
            checked={t.checked}
            time={t.time}
            title={t.text}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
