import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import DeleteTask from './components/DeleteTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<AddTask />} />
        <Route path="/delete/:id" element={<DeleteTask />} />
      </Routes>
    </Router>
  );
}

export default App;
