import { useState } from "react";
import { TaskType } from "./types/types";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { Form } from "./components/Form";
import { TaskTrackerData } from "@/data";

const TaskTrackerList = () => {
  const [tasks, setTasks] = useState<TaskType[]>(TaskTrackerData);

  const handleCheck = (id: string) => {
    setTasks((pv) =>
      pv.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const removeElement = (id: string) => {
    setTasks((pv) => pv.filter((t) => t.id !== id));
  };

  return (
    <section
      className="min-h-screen bg-zinc-950 py-24"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='%2318181b'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div className="mx-auto w-full max-w-xl px-4">
        <Header />
        <Tasks
          removeElement={removeElement}
          tasks={tasks}
          handleCheck={handleCheck}
        />
      </div>
      <Form setTasks={setTasks} />
    </section>
  );
};

export default TaskTrackerList;
