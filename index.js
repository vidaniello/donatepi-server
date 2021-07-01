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

app.post('/printmyname', (req, res) => {
  
  let resp = 'your name: '+req.query.name+"\r\n";
  resp += req.body;
  
  res.send(resp);
});

app.listen(process.env.PORT, () => {
  //console.log("Example app listening at http://localhost:"+process.env.PORT);
  console.log("done");
});