import React from "react";
import { useNavigate } from "react-router-dom";
import './css/TaskForm.css';

const TaskForm = ({initialValues, onSubmit, buttonText}) => {
    const navigate = useNavigate();
    const [taskName, setTaskName] = React.useState(initialValues.taskName);
    const [taskDescription, setTaskDescription] = React.useState(initialValues.taskDescription);
    const [assignPersonName, setAssignPersonName] = React.useState(initialValues.assignPersonName);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            taskName : taskName,
            taskDescription : assignPersonName,
            assignPersonName : assignPersonName
        }

        onSubmit(formData);
    }

    return (
        <div className="container">
            <h2>タスクの{buttonText}</h2>
            <form onSubmit={handleSubmit}>
            <p>
                タスクの名前：<input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                />
            </p>
            <p>
                タスクの説明：<input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
                />
            </p>
            <p>
                担当者の名前：<input
                type="text"
                value={assignPersonName}
                onChange={(e) => setAssignPersonName(e.target.value)}
                required
                />
            </p>
            <input type="submit" value={buttonText} />
            </form>
            <button className="cancel-button" onClick={() => navigate('/')}>キャンセル</button>
        </div>
    )
    
}

export default TaskForm