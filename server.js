const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const path = require('path');
//const url = "https://dts-gfjg.onrender.com"
const { url } = require('os');

const app = express();
const port = process.env.PORT || 3000;
const hostname = 'dts.onrender.com';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'projekt')));
app.get('/favicon.ico', (req, res) => {
  res.status(204);
});

const client = new Client({
  connectionString: 'postgres://pwyctilp:17nsLdJ1cvO6X5reg0FfcQFNQge5ARfX@balarama.db.elephantsql.com/pwyctilp',
});

client.connect();

app.get('/vej', (req, res) => {
  client.query('SELECT vejnavn, AVG(gennemsnit) AS gennemsnit FROM vej GROUP BY vejnavn ORDER BY gennemsnit DESC LIMIT 4;', (err, result) => {
    if (err) {
      console.error('Fejl ved hentning af data fra databasen', err);
      res.status(500).send('Der opstod en fejl');
    } else {
      res.json(result.rows);
    }
  });
});

app.listen(port, () => {
  console.log('Serveren kører på 3000');
});

process.on('exit', () => {
  client.end();
});
