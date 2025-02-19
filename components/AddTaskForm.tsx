import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Task } from '../data/tasks';

interface AddTaskFormProps {
    onAddTask: (title: string, description: string) => void;
    editingTask?: Task | null;
    onCancelEdit?: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, editingTask, onCancelEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // Controls whether the description input field is visible
    const [isExpanded, setIsExpanded] = useState(false);

    // Populate form fields when editing an existing task
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description || '');
            setIsExpanded(true); // Always show description field when editing
        }
    }, [editingTask]);

    // Reset form state and notify parent component
    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setIsExpanded(false);
        if (onCancelEdit) {
            onCancelEdit();
        }
    };

    const handleSubmit = () => {
        // Only submit if title is not empty (after trimming whitespace)
        if (title.trim()) {
            onAddTask(title, description);
            // Reset form state after successful submission
            setTitle('');
            setDescription('');
            setIsExpanded(false);
            // If we were editing, notify parent component
            if (editingTask && onCancelEdit) {
                onCancelEdit();
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add new task..."
                    value={title}
                    onChangeText={setTitle}
                    onFocus={() => setIsExpanded(true)} // Show description field on focus
                />
                <View style={styles.buttonContainer}>
                    {/* Only show cancel button when editing */}
                    {editingTask && (
                        <TouchableOpacity 
                            style={[styles.submitButton, styles.cancelButton]}
                            onPress={handleCancel}
                        >
                            <Text style={styles.submitButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitButtonText}>
                            {editingTask ? 'Update' : 'Add'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Expandable description input */}
            {isExpanded && (
                <View style={styles.descriptionContainer}>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Add description..."
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={3}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#ed667d',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignSelf: 'center',
        marginLeft: 10,
        minWidth: 90,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
    },
    descriptionContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    descriptionInput: {
        fontSize: 14,
        color: '#666',
        minHeight: 60,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    cancelButton: {
        backgroundColor: '#555',
        minWidth: 80,
    },
});

export default AddTaskForm;
