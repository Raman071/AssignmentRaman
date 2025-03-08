const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Simulated user data (You can replace this with database logic)
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
];

// GET /users - Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST /users - Add a new user
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;

  // Create a new user object
  const newUser = {
    id: users.length + 1, // Simple id generation
    name,
    email,
    age,
  };

  // Add the new user to the users array
  users.push(newUser);

  // Send the newly created user as the response
  res.status(201).json(newUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
