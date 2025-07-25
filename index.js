console.log('📢 index.js is starting...');

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // You can store this securely in a .env file
  database: 'formula5'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1); // Exit the server if DB fails
  } else {
    console.log('✅ Connected to MySQL. Thread ID:', db.threadId);
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ Formula5 Backend API is live and working!');
});

// Route: Get all users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Failed to fetch users:', err.message);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Catch-all route (Optional but recommended)
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
