export const generateId = () =>
  `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const getGreeting = () => {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return "Good morning! ☀️";
  } else if (hours < 18) {
    return "Good afternoon! 🌤️";
  } else {
    return "Good evening! 🌙";
  }
};
