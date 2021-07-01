const express = require('express');
const app = express();

const piEndpoint = "https://api.minepi.com/v2";

const somevar = process.env.SOMEVAR;

app.get('/', (req, res) => {
  
  
  res.send('nothing to do here!');
});

app.post('/', (req, res) => {
  
  
  res.send('nothing to do here!');
});

app.listen(process.env.PORT, () => {
  //console.log("Example app listening at http://localhost:"+process.env.PORT);
});