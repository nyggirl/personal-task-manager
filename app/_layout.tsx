import { Stack } from 'expo-router'
import { TaskProvider } from '../contexts/TaskContext'

export default function Layout() {
  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'TASK'
          }} 
        />
        <Stack.Screen 
          name="details/[id]" 
          options={{ 
            title: 'Task Details'
          }} 
        />
      </Stack>
    </TaskProvider>
  )
}