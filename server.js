import http from 'http';

// server object
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, server!');
});

// Define the port
const port = process.env.PORT || 8080;

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error
server.on('error', (err) => {
  console.error('Server error:', err.message);
});

