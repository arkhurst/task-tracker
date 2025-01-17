import { renderHook, act } from "@testing-library/react";
import { TaskTrackerProvider, useTaskTracker } from "../hooks/useTaskTracker";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TaskTrackerProvider>{children}</TaskTrackerProvider>
);

describe("useTaskTracker", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should add a task correctly", () => {
    const { result } = renderHook(() => useTaskTracker(), { wrapper });

    const newTask = {
      title: "Test Task",
      description: "Test Description",
      priority: "high" as const,
      time: "15 mins",
    };

    act(() => {
      result.current.addTask(newTask);
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toMatchObject({
      ...newTask,
      checked: false,
    });
    expect(result.current.tasks[0].id).toBeDefined();
  });

  it("should edit a task correctly", () => {
    const { result } = renderHook(() => useTaskTracker(), { wrapper });

    const initialTask = {
      title: "Initial Task",
      description: "Initial Description",
      priority: "medium" as const,
      time: "15 mins",
    };

    act(() => {
      result.current.addTask(initialTask);
    });

    const taskToEdit = result.current.tasks[0];
    const updatedTask = {
      ...taskToEdit,
      title: "Updated Task",
      priority: "high" as const,
    };

    act(() => {
      result.current.editTask(updatedTask);
    });

    expect(result.current.tasks[0]).toMatchObject({
      ...updatedTask,
      checked: false,
    });
  });

  it("should remove a task correctly", () => {
    const { result } = renderHook(() => useTaskTracker(), { wrapper });

    act(() => {
      result.current.addTask({
        title: "Test Task",
        description: "Test Description",
        priority: "low" as const,
        time: "15 mins",
      });
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.removeTask(taskId);
    });

    expect(result.current.tasks).toHaveLength(0);
  });
});
