import type { Task } from './types.js';
type TaskStore = {
    tasks: Task[];
    createTask: (task: Task) => void;
    updateTask: (id: string, updated: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    loadTasks: () => void;
    saveTasks: () => void;
};
export declare const useTaskStore: import("zustand").UseBoundStore<import("zustand").StoreApi<TaskStore>>;
export {};
