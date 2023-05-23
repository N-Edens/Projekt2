// server.js


const express = require('express');
const app = express();
const { Client } = require('pg');


// Opret forbindelse til din Elephant SQL database
const client = new Client({
 connectionString: 'postgres://pwyctilp:17nsLdJ1cvO6X5reg0FfcQFNQge5ARfX@balarama.db.elephantsql.com/pwyctilp',
});


// Opret forbindelse til databasen
client.connect();


// Definer en rute for at hente data fra databasen
app.get('/vej', (req, res) => {
 // Udfør en forespørgsel til databasen
 client.query('SELECT * FROM vej', (err, result) => {
   if (err) {
     console.error('Fejl ved hentning af data fra databasen', err);
     res.status(500).send('Der opstod en fejl');
   } else {
     // Send data som JSON-respons
     res.json(result.rows);
   }
 });
});


// Start serveren
app.listen(3000, () => {
 console.log('Serveren kører på port 3000');
});


process.on('exit',() => {
client.end();
});