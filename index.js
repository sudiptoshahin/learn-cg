// index.js
const http = require("http");
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// Root route
app.get("/", (req, res) => {
    console.log('__dir_name__', __dirname);
//   res.json({ id: 1, message: "Hello, Node.js with Express!" });
    res.sendFile(path.join(__dirname, 'babylon/2babylon_scene.html'));
});

// 404 handler (for all other routes)
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
