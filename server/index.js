const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory task list for this assignment.
let tasks = [];
let nextId = 1;

// Validate incoming task text before creating a task.
const validateTaskText = (text) => {
  if (typeof text !== 'string') {
    return 'Task text must be a string.';
  }

  if (!text.trim()) {
    return 'Task text is required.';
  }

  if (text.trim().length > 200) {
    return 'Task text must be 200 characters or fewer.';
  }

  return null;
};

// 1) Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// 2) Create a task from { text }
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  const validationError = validateTaskText(text);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const newTask = {
    id: nextId++,
    text: text.trim(),
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// 3) Delete a task by id
app.delete('/tasks/:id', (req, res) => {
  const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({ message: 'Task ID must be a positive integer.' });
  }

  const initialLength = tasks.length;

  tasks = tasks.filter((task) => task.id !== taskId);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
