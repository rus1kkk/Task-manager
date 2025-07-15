// src/store/taskStore.ts
import { create } from 'zustand';
import type { Task } from '../types/types';

type TaskStore = {
  tasks: Task[];
  createTask: (task: Task) => void;
  updateTask: (id: string, updated: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  loadTasks: () => void;
  saveTasks: () => void;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  createTask: (task) => set((state) => {
    const newTasks = [...state.tasks, task];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),
  updateTask: (id, updated) => set((state) => {
    const newTasks = state.tasks.map(t => t.id === id ? { ...t, ...updated } : t);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),
  deleteTask: (id) => set((state) => {
    const newTasks = state.tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    return { tasks: newTasks };
  }),
  loadTasks: () => set(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return { tasks };
  }),
  saveTasks: () => {
    const { tasks } = get();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}));