import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import DeleteTask from './components/DeleteTask';
import EditTask from './components/EditTask';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<AddTask />} />
        <Route path="/delete/" element={<DeleteTask />} />
        <Route path="/edit/" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
