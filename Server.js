const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/start-yarn', (req, res) => {
  exec('yarn start', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Yarn started successfully');
      res.send('Yarn started successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
