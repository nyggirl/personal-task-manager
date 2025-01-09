// The interface defines the structure of a task, ensures all task
// objects follow the same structure
// Export: allows other files to import and use the Task interface
export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
}

// The array of tasks to simulate a small database, allow us to test and 
// develop features without needing a backend
// The mockTasks array is typed as Task[], meaning it's an array of 
// objects that adhere to the Task interface
// Export: allows other files to import and use the mockTasks array
export const mockTasks: Task[] = [
    { id: '1', title: 'Gym', description: 'Running, Yoga, Pilates', status: 'completed' },
    { id: '2', title: 'Leetcode', description: '168, 93, 15', status: 'pending'},
]

export default mockTasks;
