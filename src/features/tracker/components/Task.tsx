import { useAnimate, usePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FiClock, FiTrash2, FiEdit } from "react-icons/fi";
import { TaskType } from "../types/types";
import { useTaskTracker } from "../hooks/useTaskTracker";
import { PriorityBadge } from "./PriorityBadge";

type TaskIProps = {
  task: TaskType;
};

export const Task: React.FC<TaskIProps> = ({ task }) => {
  const { removeTask, setSelectedTask, handleCheck } = useTaskTracker();
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        try {
          await animate(
            scope.current,
            {
              opacity: 0,
              x: task.checked ? 24 : -24,
              scale: 0.95,
            },
            {
              duration: 0.2,
              ease: "easeOut",
            }
          );
          safeToRemove?.();
        } catch {
          safeToRemove?.();
        }
      };

      exitAnimation();
    }
  }, [isPresent, safeToRemove, animate, scope, task]);

  return (
    <motion.div
      ref={scope}
      layout
      className="relative flex w-full items-start gap-3 rounded border border-zinc-700 bg-zinc-900 p-3"
    >
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => handleCheck(task.id)}
        className="size-4 accent-indigo-400"
      />

      <div className="-mt-1 flex flex-col">
        <span
          className={`text-white transition-colors truncate ${
            task.checked && "text-zinc-400"
          }`}
        >
          {task.title}
        </span>
        <span className="text-zinc-400 text-xs">{task.description}</span>
      </div>

      <div className="ml-auto flex gap-1.5">
        <PriorityBadge variant={task.priority}>{task.priority}</PriorityBadge>
        <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
          <FiClock />
          <span>{task.time}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setSelectedTask(task);
          }}
          className="rounded bg-blue-300/20 px-1.5 py-1 text-xs text-blue-300 transition-colors hover:bg-blue-600 hover:text-blue-200"
        >
          <FiEdit />
        </button>
        <button
          type="button"
          onClick={() => removeTask(task.id)}
          className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};
