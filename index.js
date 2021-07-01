const express = require('express');
const app = express();
const port = 3000;

const somevar = process.env.SOMEVAR;

app.get('/', (req, res) => {
  res.send('nothing to do here!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});