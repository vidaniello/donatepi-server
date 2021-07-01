const express = require('express');
var bodyParser = require('body-parser');

const app = express();

var jsonParser = bodyParser.json();

const piEndpoint = "https://api.minepi.com/v2";

const somevar = process.env.SOMEVAR;

app.get('/', (req, res) => {
  res.send('nothing to do here!');
});

app.post('/', (req, res) => {
  res.send('nothing to do here!');
});

app.post('/printmyname', jsonParser, (req, res) => {
  
  let resp = 'your name: '+req.query.name;
  resp += req.body;
  
  res.send(resp);
});












app.listen(process.env.PORT, () => {
  //console.log("Example app listening at http://localhost:"+process.env.PORT);
  console.log("done");
});