const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Use CORS to allow requests from the frontend
app.use(cors());

// Dummy routes for temperature and humidity
app.get('/readTemperature', (req, res) => {
  const temperature = Math.random() * 10 + 20; // Generate random temperature between 20 and 30
  res.send(temperature.toFixed(1));
});

app.get('/readHumidity', (req, res) => {
  const humidity = Math.random() * 10 + 40; // Generate random humidity between 40 and 50
  res.send(humidity.toFixed(1));
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
