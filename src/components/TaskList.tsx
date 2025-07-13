import  { useState } from "react";
import { Flex } from "@mantine/core";
import TaskItem from "./TaskItem";
import type { Task } from "../types/types";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Fix bug that only happens when you stare at the screen",
    status: "To Do",
    category: "Bug",
    description: "Apparently the bug is shy and disappears when observed.",
    priority: "High",
  },
  {
    id: 2,
    title: "Add feature: Auto-coffee maker integration",
    status: "In Progress",
    category: "Feature",
    description: "Because coding without coffee is just sad.",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Write docs nobody will read",
    status: "Done",
    category: "Documentation",
    description: "But hey, it looks professional!",
    priority: "Low",
  },
  {
    id: 4,
    title: "Refactor spaghetti code into lasagna layers",
    status: "To Do",
    category: "Refactor",
    description: "More delicious and easier to digest.",
    priority: "High",
  },
  {
    id: 5,
    title: "Test if the app breaks when you press all buttons at once",
    status: "In Progress",
    category: "Test",
    description: "Because chaos is the best QA strategy.",
    priority: "Medium",
  },
  {
    id: 6,
    title: "Fix typo in README that causes existential crisis",
    status: "To Do",
    category: "Bug",
    description: "One letter can change everything.",
    priority: "Low",
  },
  {
    id: 7,
    title: "Add Easter egg: Make app play 'Never Gonna Give You Up' on error",
    status: "To do",
    category: "Feature",
    description: "Rickroll your users with style.",
    priority: "Low",
  },
];

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => task.id === updatedTask.id ? updatedTask : task));
  };

  return (
    <Flex
      mih={50}
      gap="md"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => handleDelete(task.id)}
          onSave={handleSaveTask}
        />
      ))}
    </Flex>
  );
}

export default TaskList;
