import { useEffect, useState } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load existing tasks once when the page opens.
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks.');
        }

        const data = await response.json();
        setTasks(data);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    setError('');

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: trimmedText }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task.');
      }

      const createdTask = await response.json();
      setTasks((previousTasks) => [...previousTasks, createdTask]);
      setText('');
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const handleDelete = async (taskId) => {
    setError('');

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task.');
      }

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== taskId),
      );
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <main className="app">
      <section className="task-card">
        <h1>Task Manager</h1>
        <p className="subtitle">Keep your tasks simple and organized.</p>

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="status">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="status">No tasks yet. Add your first one.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <span>{task.text}</span>
                <button type="button" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
