import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskList.css'

function TaskList() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDeleteClick = (todo) => {
    navigate('delete', { state: { todo } });
  };

  const handlEditClick = (todo) => {
    navigate('edit', {state: {todo}});
  }

  return (
    <div className="task-list">
      <div className="header">
        <h1>ToDo List</h1>
      </div>
      <div className="add-task">
        <form className="filter-form" action="/filter" method="post">
          <input type="text" name="word" placeholder="検索..." />
          <button type="submit">検索</button>
          <button type="button" className="reset" onClick={() => navigate('/')}>
            リセット
          </button>
          <button className="register-button" type="button" onClick={() => navigate('/create')}>タスクを追加</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>タスクの名前</th>
            <th>タスクの説明</th>
            <th>担当者の名前</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.taskName.length > 25 ? todo.taskName.substring(0, 25) + '...' : todo.taskName}</td>
              <td>{todo.taskDescription.length > 25 ? todo.taskDescription.substring(0, 25) + '...' : todo.taskDescription}</td>
              <td>{todo.assignPersonName}</td>
              <td>
                <div className="button-group">
                  <button className="edit-button" onClick={() => handlEditClick(todo)}>編集</button>
                  <button className="delete-button" onClick={() => handleDeleteClick(todo)}>削除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
