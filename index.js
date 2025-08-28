// index.js
const http = require("http");
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// serve static files from public
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "babylon/2babylon_scene.html"));
});

app.get('/village/buildings', (req, res) => {
  res.sendFile(path.join(__dirname, 'babylon/buildings.html'));
});

app.get('/village/house', (req, res) => {
  res.sendFile(path.join(__dirname, 'babylon/house.html'));
});

app.get('/village/big-house', (req, res) => {
  res.sendFile(path.join(__dirname, 'babylon/big-house.html'));
});

app.get('/village/a-village', (req, res) => {
  res.sendFile(path.join(__dirname, 'babylon/a_village.html'));
});

// 404 handler (for all other routes)
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
