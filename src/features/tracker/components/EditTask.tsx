import React, { useEffect, useState } from "react";
import { useTaskTracker } from "../hooks/useTaskTracker";
import { TaskPriorityType } from "../types/types";
import { Form } from "./Form";

export const EditTask = () => {
  const {
    editElement,
    formInputVisible: visible,
    setFormInputVisible: setVisible,
    selectedTask,
  } = useTaskTracker();
  const [time, setTime] = useState(15);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriorityType>("medium");
  const [unit, setUnit] = useState("mins");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setPriority(selectedTask.priority);
      const time = selectedTask.time.split(" ");
      setTime(parseInt(time[0]));
      setUnit(time[1]);
    }
  }, [selectedTask]);

  const handleSubmit = () => {
    if (!title.length || !description.length || !selectedTask) return;

    editElement({
      ...selectedTask,
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
