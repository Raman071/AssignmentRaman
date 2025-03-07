const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port number
const PORT = 3000;

// Map file extensions to MIME types
const mimeType = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
};

// Function to handle incoming requests
const requestHandler = (req, res) => {
  let filePath = '.' + req.url;

  // Serve the default file if root is requested
  if (filePath === './' || filePath === './index.html') {
    filePath = './allinone.html';
  }

  // Get the file extension and determine the content type
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeType[extname] || 'application/octet-stream';

  // Read and serve the requested file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Serve the 404 error page if the file is not found
        fs.readFile('./404.html', (error, errorContent) => {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 Internal Server Error</h1>', 'utf-8');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(errorContent, 'utf-8');
          }
        });
      } else {
        // Handle other server errors
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(
          `<h1>500 Internal Server Error</h1><p>${err.code}</p>`,
          'utf-8'
        );
      }
    } else {
      // Serve the requested file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
};

// Create the HTTP server
const server = http.createServer(requestHandler);

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
