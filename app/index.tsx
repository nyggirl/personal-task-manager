import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import { Task } from '../data/tasks';
import { useTaskState } from '../contexts/TaskContext';

export default function Home() {
  const { tasks, setTasks, toggleTaskStatus } = useTaskState();
  // Track the currently edited task, null when not editing
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (title: string, description: string) => {
    // Handle both edit and create scenarios
    if (editingTask) {
      // Update existing task while preserving other properties
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, title, description }
          : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      // Create new task with unique ID and default pending status
      const newTask: Task = {
        id: Math.random().toString(),
        title,
        description,
        status: 'pending',
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleToggleStatus = (id: string) => {
    console.log('Home handling toggle for:', id);
    toggleTaskStatus(id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* AddTaskForm handles both creation and editing */}
          <AddTaskForm 
            onAddTask={handleAddTask}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
