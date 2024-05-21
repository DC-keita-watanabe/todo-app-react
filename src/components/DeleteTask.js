import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './DeleteTask.css';

const DeleteTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state: { todo } } = location;

    const handleDelete = () => {
        fetch(`http://localhost:8080/delete/${todo.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: todo.id })
        })
        .then(res => {
            if (res.ok) {
                console.log('Task deleted successfully');
                navigate('/');
            } else {
                console.error('Failed to delete task');
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    };

    return (
        <div className="delete-container">
            <h2>タスクを削除</h2>
            <p>タスクの名前：{todo.taskName}</p>
            <p>タスクの説明：{todo.taskDescription}</p>
            <p>担当者の名前：{todo.assignPersonName}</p>
            <button className="delete-button" onClick={handleDelete}>削除</button>
            <button className="cancel-button" onClick={() => navigate('/')}>キャンセル</button>
        </div>
    );
}

export default DeleteTask;
