// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow CORS for testing
  next();
});

app.get('/api/reverb', async (req, res) => {
  const apiUrl = 'https://api.reverb.com/api/listings?query=narwhal%20industries&per_page=6&sort_by=created_at&sort_order=desc';
  const token = process.env.REVERB_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'REVERB_TOKEN not set' });
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/hal+json, application/json',
        'Content-Type': 'application/hal+json',
        'Accept-Version': '3.0',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch Reverb data' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});