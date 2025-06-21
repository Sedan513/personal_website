// server.js (root of your project)
const express = require('express');
const path = require('path');
require('dotenv').config();  // ✔️ you already have this

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

// ---- FIXED CONFIG ENDPOINT ----
app.get('/api/config', (req, res) => {
  res.json({
    publicKey: process.env.MY_KEY,
    serviceId:  process.env.SERVICE_ID,
    templateId: process.env.TEMPLATE_ID
  });
});
// -------------------------------

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Env loaded:', {
    MY_KEY:      process.env.MY_KEY      ? '✓' : '✗',
    SERVICE_ID:  process.env.SERVICE_ID  ? '✓' : '✗',
    TEMPLATE_ID: process.env.TEMPLATE_ID ? '✓' : '✗'
  });
});