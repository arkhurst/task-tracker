import React, { useState } from "react";
import { useTaskTracker } from "../hooks/useTaskTracker";
import { TaskPriorityType } from "../types/types";
import { Form } from "./Form";

export const AddTask = () => {
  const {
    addTask,
    formInputVisible: visible,
    setFormInputVisible: setVisible,
  } = useTaskTracker();
  const [time, setTime] = useState(15);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriorityType>("medium");
  const [unit, setUnit] = useState("mins");

  const handleSubmit = () => {
    if (!title.length || !description.length) return;

    addTask({
      title,
      description,
      priority,
      time: `${time} ${unit}`,
    });

    setTime(15);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setUnit("mins");
    setVisible(false);
  };

  return (
    <Form
      time={time}
      setTime={setTime}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      priority={priority}
      setPriority={setPriority}
      unit={unit}
      setUnit={setUnit}
      handleSubmit={handleSubmit}
      visible={visible}
      setVisible={setVisible}
    />
  );
};
