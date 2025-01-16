export const generateId = () =>
  `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
