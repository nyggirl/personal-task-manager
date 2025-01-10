import React, { createContext, useContext, useState } from 'react';
import { Task } from '../data/tasks';

// Initial state with a default task
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Learn React Native',
    description: 'Study the fundamentals of React Native development',
    status: 'pending',
  }
];

// Define the shape of our context
interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  getTask: (id: string) => Task | undefined;
  toggleTaskStatus: (id: string) => void;
}

// Create context with null as initial value
const TaskContext = createContext<TaskContextType | null>(null);

// Custom hook to consume the TaskContext
// Throws an error if used outside of TaskProvider
export const useTaskState = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskState must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Helper function to find a task by its ID
  const getTask = (id: string) => tasks.find(task => task.id === id);

  // Toggles a task's status between 'pending' and 'completed'
  // Uses functional update to ensure we're working with the latest state
  const toggleTaskStatus = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
          : task
      )
    );
  };

  // Memoize the context value to prevent unnecessary re-renders
  // Only updates when tasks array changes
  const value = React.useMemo(
    () => ({ tasks, setTasks, getTask, toggleTaskStatus }),
    [tasks]
  );

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}; 
