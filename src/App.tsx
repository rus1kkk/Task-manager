import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import Quote from "./components/Quote";
import TaskModal from "./components/TaskModal";
import { BrowserRouter, Routes, Route, Outlet, useParams, useNavigate } from "react-router-dom";
import { useTaskStore } from "./store/taskStore";
import type { Task } from "./types/types";
import { useEffect } from "react";

function Layout() {
  useEffect(() => {
    useTaskStore.getState().loadTasks();
  }, []);
  return (
    <>
      <Header />
      <TaskList />
      <Quote />
      <Outlet />
    </>
  );
}

function TaskModalWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const createTask = useTaskStore((state) => state.createTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const tasks = useTaskStore((state) => state.tasks);

  const isNew = !id;
  const emptyTask: Task = {
    id: Date.now().toString(),
    title: "",
    status: "To Do",
    category: "Feature",
    description: "",
    priority: "Medium",
    createdAt: new Date().toISOString(),
  };
  const task = isNew ? emptyTask : tasks.find((t) => String(t.id) === id) || emptyTask;

  const handleSave = (t: Task) => {
    if (isNew) {
      createTask({ ...t, createdAt: new Date().toISOString() });
    } else {
      updateTask(String(t.id), t);
    }
    navigate("/", { replace: true });
  };

  return (
    <TaskModal
      opened={true}
      onClose={() => navigate("/", { replace: true })}
      task={task}
      onSave={handleSave}
    />
  );
}

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="task/new" element={<TaskModalWrapper />} />
            <Route path="task/:id" element={<TaskModalWrapper />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
