const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get('/hello', (req, res) => {
  res.json({
    message: "Welcome to @caloskvasir's Express API!"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

