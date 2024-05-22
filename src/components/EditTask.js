import React from "react";
import './EditTask.css';
import { useLocation, useNavigate } from "react-router-dom";

const EditTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state : { todo } } = location;
    const [taskName, setTaskName] = React.useState(todo.taskName);
    const [taskDescription, setTaskDescription] = React.useState(todo.taskDescription);
    const [assignPersonName, setAssignPersonName] = React.useState(todo.assignPersonName);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            id : todo.id,
            taskName : taskName,
            taskDescription : taskDescription,
            assignPersonName : assignPersonName
        }

        fetch('http://localhost:8080/edit', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(formData)
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
        <div className="container">
            <h2>タスクを編集</h2>
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
            <input type="submit" value="編集" />
            </form>
            <button className="cancel-button" onClick={() => navigate('/')}>キャンセル</button>
        </div>
    )
}

export default EditTask;