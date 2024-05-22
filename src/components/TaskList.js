import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskList.css'

function TaskList() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filterWord , setFilterWord] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
      .then(res => res.json())
      .then(data => setTodos(data.tasks))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filterTodo = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/filter/${filterWord}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filterWord)
    })
    .then(res => {
      if (res.ok) {
        console.log('Task filtered successfully');
        return res.json();
      } else {
        console.error('Failed to filter task');
        return [];
      }
    })
    .then(filteredData => {
      setFilteredTodos(filteredData.tasks);
      setIsFilter(true);
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });
  };

  const handleDeleteClick = (todo) => {
    navigate('delete', { state: { todo } });
  };

  const handlEditClick = (todo) => {
    navigate('edit', {state: {todo}});
  }

  const handleReset = () => {
    setFilteredTodos([]);
    setFilterWord('');
    setIsFilter(false);  
  }

  return (
    <div className="task-list">
      <div className="header">
        <h1>ToDo List</h1>
      </div>
      <div className="add-task">
        <form className="filter-form" method="post" onSubmit={filterTodo}>
          <input type="text" name="word" value={filterWord} placeholder="検索..." onChange={(e) => { setFilterWord(e.target.value) }} />
          <button type="submit">検索</button>
          <button type="button" className="reset" onClick={handleReset}>
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
          {(isFilter ? filteredTodos : todos).map(todo => (
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
