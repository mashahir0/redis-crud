import  { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

type Task = { id: string; task: string };

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const loadTasks = async () => {
    const res = await axios.get('http://localhost:4000/tasks');
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post('http://localhost:4000/tasks', { task: input });
    setInput('');
    loadTasks();
  };

  const updateTask = async (id: string) => {
    const newText = prompt('Update task:');
    if (newText) {
      await axios.put(`http://localhost:4000/tasks/${id}`, { task: newText });
      loadTasks();
    }
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:4000/tasks/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h1>Redis Task Manager</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={createTask}>Add</button>
      <ul>
        {tasks.map(({ id, task }) => (
          <li key={id}>
            {task} 
            <button onClick={() => updateTask(id)}>Edit</button> 
            <button onClick={() => deleteTask(id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
