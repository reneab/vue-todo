const express = require('express');
const cors = require('cors');

const app = express();
let todos = require('./mockData.js'); // Import mock data

app.use(cors());
app.use(express.json());

// GET /api/todos - Respond with the todos array
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST /api/todos - Create a new todo
app.post('/api/todos', (req, res) => {
  const { title, dueDate } = req.body;
  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const newTodo = {
    id: newId,
    title,
    completed: false,
    dueDate: dueDate || null,
    createdOn: new Date().toISOString() // Add this line
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === todoId);

  if (todoIndex !== -1) {
    // Update the todo item. Preserve existing fields if not provided in req.body
    // For example, if req.body is { completed: true }, only 'completed' should change.
    // If req.body is { title: "New Title", completed: true }, both should change.
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === todoId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
