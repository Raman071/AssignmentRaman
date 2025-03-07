const express = require('express');
const path = require('path');

// Create an instance of an Express application
const app = express();

// Define the port number
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
