const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const path = require('path');
//const url = "https://dts-gfjg.onrender.com"
const { url } = require('os');

const app = express();
const port = process.env.PORT || 3000;
const hostname = 'dtss.onrender.com';

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

app.get('/vej2013', (req, res) => {
  client.query('SELECT * FROM vej2013 LIMIT 4', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

app.get('/vej2016', (req, res) => {
  client.query('SELECT * FROM vej2016 LIMIT 4', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

app.get('/vej', (req, res) => {
  client.query('SELECT * FROM vej LIMIT 4', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

//QUERY FOR ANTAL BILER PR TYPE

app.get('/antalbiler', (req, res) => {
  client.query('SELECT * FROM antalbiler', (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

app.listen(port, () => {
  console.log('Serveren kører på 3000');
});

process.on('exit', () => {
  client.end();
});
