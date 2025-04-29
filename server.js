const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to serve the frontend configuration safely
app.get('/api/config', (req, res) => {
    res.json({
        publicKey: process.env.MY_KEY,
        serviceId: process.env.SERVICE_ID,
        templateId: process.env.TEMPLATE_ID
    });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Your .env variables are being loaded:', {
        MY_KEY: process.env.MY_KEY ? '✓' : '✗',
        SERVICE_ID: process.env.SERVICE_ID ? '✓' : '✗',
        TEMPLATE_ID: process.env.TEMPLATE_ID ? '✓' : '✗'
    });
}); 