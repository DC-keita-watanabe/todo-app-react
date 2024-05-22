import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';

function AddTask() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    fetch('http://localhost:8080/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => {
      if (res.ok) {
        console.log('Task added successfully');
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
      initialValues={{taskName : '', taskDescription : '', assignPersonName : ''}}
      onSubmit={handleSubmit}
      buttonText="追加"
     />
  );
}

export default AddTask;
