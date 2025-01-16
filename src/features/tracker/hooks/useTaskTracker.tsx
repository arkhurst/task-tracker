import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
} from "react";
import { TaskType, TaskPriorityType } from "../types/types";
import { generateId } from "../utils/utils";
import { useLocalStorage } from "@/hooks";
import { PRIORITY_FILTER_KEY, TRACKER_DATA_KEY } from "@/constants";

const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2,
} as const;

interface TaskTrackerContextType {
  tasks: TaskType[];
  priorityFilter: TaskPriorityType | "all";
  setPriorityFilter: (filter: TaskPriorityType | "all") => void;
  handleCheck: (id: string) => void;
  removeElement: (id: string) => void;
  editElement: (task: TaskType) => void;
  addTask: (task: Omit<TaskType, "id" | "checked">) => void;
  formInputVisible: boolean;
  setFormInputVisible: (value: React.SetStateAction<boolean>) => void;
  selectedTask: TaskType | null;
  setSelectedTask: (value: React.SetStateAction<TaskType | null>) => void;
  showForm: () => void;
}

const TaskTrackerContext = createContext<TaskTrackerContextType | undefined>(
  undefined
);

export const TaskTrackerProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>(TRACKER_DATA_KEY, []);
  const [priorityFilter, setPriorityFilter] = useLocalStorage<
    TaskPriorityType | "all"
  >(PRIORITY_FILTER_KEY, "all");
  const [formInputVisible, setFormInputVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const sortedAndFilteredTasks = tasks
    .filter((task) =>
      priorityFilter === "all" ? true : task.priority === priorityFilter
    )
    .sort((a, b) => {
      const priorityDiff =
        priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      if (a.checked !== b.checked) return a.checked ? 1 : -1;

      return 0;
    });

  const handleCheck = (id: string) => {
    setTasks(
      tasks.map((t: TaskType) =>
        t.id === id ? { ...t, checked: !t.checked } : t
      )
    );
  };

  const removeElement = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const showForm = () => setFormInputVisible(true);

  const editTask = (task: TaskType) => {
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)));
  };

  const addTask = (task: Omit<TaskType, "id" | "checked">) => {
    setTasks([
      {
        ...task,
        id: generateId(),
        checked: false,
      },
      ...tasks,
    ]);
  };

  return (
    <TaskTrackerContext.Provider
      value={{
        tasks: sortedAndFilteredTasks,
        priorityFilter,
        setPriorityFilter,
        handleCheck,
        removeElement,
        editElement: editTask,
        addTask,
        setFormInputVisible,
        formInputVisible,
        selectedTask,
        setSelectedTask,
        showForm,
      }}
    >
      {children}
    </TaskTrackerContext.Provider>
  );
};

export const useTaskTracker = () => {
  const context = useContext(TaskTrackerContext);
  if (!context) {
    throw new Error("useTaskTracker must be used within a TaskTrackerProvider");
  }
  return context;
};