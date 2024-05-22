import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AddTask.css";

function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignPersonName, setAssignPersonName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // フォームデータを作成
    const formData = {
      taskName: taskName,
      taskDescription: taskDescription,
      assignPersonName: assignPersonName,
    };
    // POSTリクエストを送信
    fetch('http://localhost:8080/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Task added successfully');
        // フォームをリセット
        setTaskName('');
        setTaskDescription('');
        setAssignPersonName('');
        // リダイレクト
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
      <h2>タスクを追加</h2>
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
        <input type="submit" value="追加" />
      </form>
      <button className="cancel-button" onClick={() => navigate('/')}>キャンセル</button>
    </div>
  );
}

export default AddTask;
