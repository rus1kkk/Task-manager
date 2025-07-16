// src/store/taskStore.ts
import { create } from 'zustand';
export const useTaskStore = create((set, get) => ({
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
