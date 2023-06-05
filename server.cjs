import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the "wwwroot" directory
app.use(express.static(path.join(__dirname, 'wwwroot')));

// Define a route to serve your application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'wwwroot', 'src', 'app.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
