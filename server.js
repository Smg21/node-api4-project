
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

function setCSPHeader(req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data:;"
  );
  next();
}

app.use(setCSPHeader);
app.use(cors());
app.use(express.json());

const users = []; // In-memory array to store users

// Define API endpoints
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API!' });
  });

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  // You should hash the password and perform proper validation here
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // You should compare the provided username and hashed password with stored user data
  res.status(200).json({ message: `Welcome, ${username}!` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
