import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Task } from '../data/tasks';

interface EditTaskFormProps {
    task: Task | null;
    onSave: (id: string, title: string, description: string) => void;
    onCancel: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSave, onCancel }) => {
    // Initialize form state with task data or empty strings if no task provided
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    // Sync form state with task prop when it changes
    // This ensures form is updated if parent component provides a different task
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

    // Only trigger save if we have a valid task ID
    const handleSubmit = () => {
        if (task) {
            onSave(task.id, title, description);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Task Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Task Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button title="Save Changes" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onCancel} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { margin: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default EditTaskForm;
