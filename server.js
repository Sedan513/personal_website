// server.js (root of your project)
const express = require('express');
const path = require('path');
require('dotenv').config();  // ✔️ you already have this

const app = express();
const port = process.env.PORT || 3000;
const emailJsConfig = {
  publicKey: process.env.EMAILJS_PUBLIC_KEY || process.env.MY_KEY,
  serviceId: process.env.EMAILJS_SERVICE_ID || process.env.SERVICE_ID,
  templateId: process.env.EMAILJS_TEMPLATE_ID || process.env.TEMPLATE_ID
};

app.use(express.static(__dirname));

// ---- FIXED CONFIG ENDPOINT ----
app.get('/api/config', (req, res) => {
  if (!emailJsConfig.publicKey || !emailJsConfig.serviceId || !emailJsConfig.templateId) {
    return res.status(500).json({ error: 'Contact form is not configured on the server' });
  }

  res.json(emailJsConfig);
});
// -------------------------------

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Env loaded:', {
    EMAILJS_PUBLIC_KEY:  emailJsConfig.publicKey  ? '✓' : '✗',
    EMAILJS_SERVICE_ID:  emailJsConfig.serviceId  ? '✓' : '✗',
    EMAILJS_TEMPLATE_ID: emailJsConfig.templateId ? '✓' : '✗'
  });
});
