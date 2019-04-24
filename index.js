const fs = require('fs')
const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

//app.use(bodyParser.json());

app.get('/', async (req, res) => {
  const file = fs.readFileSync('index.html').toString();
  res.send(file);
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});



