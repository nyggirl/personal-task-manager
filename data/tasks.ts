export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed';
}

export const mockTasks: Task[] = [
    { id: '1', title: 'Gym', description: 'Running, Yoga, Pilates', status: 'completed' },
    { id: '2', title: 'Leetcode', description: '168, 93, 15', status: 'pending'},
]

export default mockTasks;
