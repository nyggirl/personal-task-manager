import React, { createContext, useContext, useState } from 'react';
import { Task } from '../data/tasks';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Learn React Native',
    description: 'Study the fundamentals of React Native development',
    status: 'pending',
  }
];

interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  getTask: (id: string) => Task | undefined;
  toggleTaskStatus: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const useTaskState = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskState must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const getTask = (id: string) => tasks.find(task => task.id === id);

  const toggleTaskStatus = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
          : task
      )
    );
  };

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