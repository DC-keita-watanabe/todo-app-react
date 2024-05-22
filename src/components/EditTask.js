import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";

const EditTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state : { todo } } = location;

    const handleSubmit = (formData) => {

        const updateFormDate = {
            id : todo.id,
            ...formData
        };

        fetch('http://localhost:8080/edit', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(updateFormDate)
        })
        .then((res) => {
            if(res.ok){
                console.log('Task edited successfully');
                navigate('/');
            } else {
                console.error('Failed to add task');
            }
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
    };

    return (
        <TaskForm
            initialValues={{taskName: todo.taskName, taskDescription : todo.taskDescription, assignPersonName : todo.assignPersonName }}
            onSubmit={handleSubmit}
            buttonText="編集"
        />
    )
}

export default EditTask;