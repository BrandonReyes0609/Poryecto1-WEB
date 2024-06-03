// backend/index.js
const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 3001;

const client = new Client({
  user: 'u4eksis8dnhmm3',
  host: 'cdeuajkr4sf66s.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
  database: 'demlgl5n9857mp',
  password: 'pf3f0c104763c37ac94c02ddbdbed871e9e490199d63681bed928377611aeee74',
  port: 5432,
});

client.connect();

app.get('/blogs', (req, res) => {
  client.query('SELECT * FROM blog', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
