import React from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Task } from '../data/tasks';

export interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
}

// Memoized TaskItem component to prevent unnecessary re-renders
const TaskItem = React.memo(({ 
    item, 
    onDelete, 
    onEdit,
    onToggleStatus,
    router 
}: { 
    item: Task; 
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
    onToggleStatus: (id: string) => void;
    router: any;
}) => {
    const handleToggle = () => {
        console.log('Toggling task:', item.id);
        onToggleStatus(item.id);
    };

    return (
        <View style={styles.taskContainer}>
            {/* Custom checkbox implementation */}
            <TouchableOpacity 
                style={[
                    styles.checkbox,
                    item.status === 'completed' && styles.checkboxChecked
                ]}
                onPress={handleToggle}
                activeOpacity={0.6}
            >
                {item.status === 'completed' && (
                    <Text style={styles.checkmark}>✓</Text>
                )}
            </TouchableOpacity>

            {/* Task content area - navigates to details on press */}
            <TouchableOpacity 
                style={styles.taskContent}
                onPress={() => router.push(`/details/${item.id}`)}
            >
                <Text 
                    style={[
                        styles.taskTitle,
                        item.status === 'completed' && styles.completedTask
                    ]}
                >
                    {item.title}
                </Text>
                {item.description ? (
                    <Text 
                        style={[
                            styles.taskDescription,
                            item.status === 'completed' && styles.completedTask
                        ]}
                        numberOfLines={2}
                    >
                        {item.description}
                    </Text>
                ) : null}
            </TouchableOpacity>
            
            {/* Action buttons container */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onEdit(item)}
                >
                    <Text style={styles.actionButtonText}>✎</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => router.push(`/details/${item.id}`)}
                >
                    <Text style={styles.actionButtonText}>⚙</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => onDelete(item.id)}
                >
                    <Text style={[styles.actionButtonText, styles.deleteButton]}>✕</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
    const router = useRouter();

    const handleToggleStatus = (id: string) => {
        console.log('TaskList handling toggle for:', id);
        onToggleStatus(id);
    };

    // Render function for FlatList - provides consistent item rendering
    const renderItem = ({ item }: { item: Task }) => (
        <TaskItem 
            item={item} 
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleStatus={handleToggleStatus}
            router={router}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingBottom: 20,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    taskContent: {
        flex: 1,
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
    taskTitle: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    taskDescription: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    actionButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    actionButtonText: {
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: 'bold',
    },
    deleteButton: {
        color: '#ff4444',
    },
    checkboxChecked: {
        borderColor: '#4CAF50',
    },
});

export default TaskList;
