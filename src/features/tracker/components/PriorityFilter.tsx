import { useTaskTracker } from "../hooks/useTaskTracker";
import { type TaskPriorityType } from "../types/types";

export const PriorityFilter = () => {
  const { priorityFilter, setPriorityFilter } = useTaskTracker();

  return (
    <div className="mb-4 flex gap-2">
      <select
        value={priorityFilter}
        onChange={(e) =>
          setPriorityFilter(e.target.value as TaskPriorityType | "all")
        }
        className="form-select block rounded bg-zinc-800 px-3 py-1 text-sm text-white border border-zinc-700 focus:outline-none "
      >
        <option value="all">All Priority</option>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
    </div>
  );
};
