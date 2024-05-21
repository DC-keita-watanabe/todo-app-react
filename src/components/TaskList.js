import React, { useState, useEffect } from 'react';
import './TaskList.css'

function TaskList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="task-list">
      <div className="header">
        <h1>ToDo List</h1>
      </div>
      <div className="add-task">
        <form className="filter-form" action="/filter" method="post">
          <input type="text" name="word" placeholder="検索..." />
          <button type="submit">検索</button>
          <button type="button" className="reset" onClick={() => window.location.href='/'}>
            リセット
          </button>
        </form>
        <a className="register-button" href="/create">タスクを追加</a>
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
              <td>{todo.taskName.length > 10 ? todo.taskName.substring(0, 10) + '...' : todo.taskName}</td>
              <td>{todo.taskDescription.length > 10 ? todo.taskDescription.substring(0, 10) + '...' : todo.taskDescription}</td>
              <td>{todo.assignPersonName}</td>
              <td>
                <div className="button-group">
                  <a className="edit-button" href={`/edit-page/${todo.id}`}>編集</a>
                  <a className="delete-button" href={`/delete-page/${todo.id}`}>削除</a>
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
