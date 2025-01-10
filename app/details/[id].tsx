import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTaskState } from '../../contexts/TaskContext';

export default function Details() {
  const { tasks, getTask } = useTaskState();
  const params = useLocalSearchParams();
  const router = useRouter();

  // Ensure consistent ID type since params can be string | string[]
  const id = typeof params.id === 'string' ? params.id : String(params.id);
  
  console.log('Details page - tasks:', tasks);
  console.log('Details page - id:', id);

  // Find the specific task matching the URL parameter ID
  const task = tasks.find(t => t.id === id);
  
  console.log('Details page - found task:', task);

  // Early return with error state if task is not found
  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found (ID: {id})</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Task information sections */}
        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.title}>{task.title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            {/* Dynamic styling based on task status */}
            <View style={[
              styles.statusBadge,
              task.status === 'completed' ? styles.completedBadge : styles.pendingBadge
            ]}>
              <Text style={[
                styles.statusText,
                task.status === 'completed' ? styles.completedText : styles.pendingText
              ]}>
                {task.status === 'completed' ? 'Completed' : 'In Progress'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 140,
  },
  pendingBadge: {
    backgroundColor: '#fff3e0',
  },
  completedBadge: {
    backgroundColor: '#e8f5e9',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  pendingText: {
    color: '#f57c00',
  },
  completedText: {
    color: '#4caf50',
  },
});
