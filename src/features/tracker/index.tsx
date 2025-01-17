import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { PriorityFilter } from "./components/PriorityFilter";
import { TaskTrackerProvider } from "./hooks/useTaskTracker";
import { Form } from "./components/Form";

const TaskTrackerList = () => {
  return (
    <TaskTrackerProvider>
      <section
        className="min-h-screen bg-zinc-950 py-24"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      >
        <div className="mx-auto w-full max-w-xl px-4">
          <Header />
          <PriorityFilter />
          <Tasks />
        </div>
        <Form />
      </section>
    </TaskTrackerProvider>
  );
};

export default TaskTrackerList;
