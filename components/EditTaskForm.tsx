import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Task } from '../data/tasks';

interface EditTaskFormProps {
    // "null": it can be "null" if no task is selected
    task: Task | null;
    // "onSave", "onCancel": callback functions to save the edited or cancel editing
    // they are user-defined functions, are props passed to the "EditTaskForm" component
    // which means they are provided by the parent component that uses "EditTaskForm"
    onSave: (id: string, title: string, description: string) => void;
    onCancel: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSave, onCancel }) => {
    // "task?.title || ''": 1. if "task" exists and has a "title" property, "title" will be initialized with "task.title"
    // 2. if "taks" is null, undefined, or doesnot have a "title" property, "title" will be initiazlied as an empty string('')
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    // This hook runs whenever the "task" prop changes, updates the "title" and "description" state variables to reflect the current task's details
    // "useEffect": allows you to run side effects (like fetching data, subscribing to a service, or updating state based on prop changes or other state changes) in a functional component
    // it's called after the render and when the component's state or props change
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [task]);

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