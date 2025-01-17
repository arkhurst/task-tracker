import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTaskTracker } from "../hooks/useTaskTracker";
import { TaskPriorityType } from "../types/types";
import { FiPlus } from "react-icons/fi";

export const Form = () => {
  const { addTask, editTask, selectedTask, setSelectedTask } = useTaskTracker();
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(15);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriorityType>("low");
  const [unit, setUnit] = useState("mins");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setPriority(selectedTask.priority);
      const [timeValue, timeUnit] = selectedTask.time.split(" ");
      setTime(parseInt(timeValue));
      setUnit(timeUnit);
      setVisible(true);
    }
  }, [selectedTask]);

  const handleSubmit = () => {
    if (!title.length || !description.length || !priority) return;

    if (selectedTask) {
      const updatedTask = {
        ...selectedTask,
        title,
        description,
        priority,
        time: `${time} ${unit}`,
        checked: selectedTask.checked,
        id: selectedTask.id,
      };

      editTask(updatedTask);
    } else {
      addTask({
        title,
        description,
        priority,
        time: `${time} ${unit}`,
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setTime(15);
    setTitle("");
    setDescription("");
    setPriority("low");
    setUnit("mins");
    setVisible(false);
    setSelectedTask(null);
  };
  return (
    <div className="fixed bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
      <AnimatePresence>
        {visible && (
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3 space-y-3"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title (35 characters)"
              maxLength={35}
              required
              className="w-full rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (50 characters)"
              required
              maxLength={50}
              className="h-24 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    className="w-24 rounded bg-zinc-700 px-1.5 py-1 text-sm text-zinc-50 focus:outline-0"
                    value={time}
                    min={"1"}
                    onChange={(e) => setTime(parseInt(e.target.value))}
                  />
                  <button
                    type="button"
                    onClick={() => setUnit("mins")}
                    className={`rounded px-1.5 py-1 text-xs ${
                      unit === "mins"
                        ? "bg-white text-zinc-950"
                        : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
                    }`}
                  >
                    mins
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit("hrs")}
                    className={`rounded px-1.5 py-1 text-xs ${
                      unit === "hrs"
                        ? "bg-white text-zinc-950"
                        : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
                    }`}
                  >
                    hrs
                  </button>
                </div>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as TaskPriorityType)
                  }
                  className="rounded bg-zinc-700 px-1.5 py-1 text-sm text-zinc-50 focus:outline-0"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button
                type="submit"
                className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500"
              >
                Submit
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <button
        onClick={() => setVisible((pv) => !pv)}
        className="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900"
      >
        <FiPlus
          className={`transition-transform ${
            visible ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
};
