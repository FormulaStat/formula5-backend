const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Update if needed
  database: 'formula5'
});

// Connect to database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as ID', db.threadId);
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ Formula5 Backend API is running');
});

// Example route to fetch users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('❌ Error fetching users:', err);
      res.status(500).send('Error fetching users');
    } else {
      res.json(results);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
