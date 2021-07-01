const https = require('https');
const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//var jsonParser = bodyParser.json();

const piHostname = "api.minepi.com";
const piBasePath = "/v2";

const somevar = process.env.SOMEVAR;

app.get('/', (req, res) => {
  res.send('nothing to do here!');
});

app.post('/', (req, res) => {
  res.send('nothing to do here!');
});

app.post('/printmyname', (req, res) => {
  
  let resp = "your name from ?params: "+req.query.name+"<br/>";
  resp += "json name: "+req.body.name+"<br/>";
  resp += "json surname: "+req.body.surname+"<br/>";
  resp += "stringfy: "+JSON.stringify(req.body);
  
  res.send(resp);
});

app.post('/payments', (req, res) => {
  getPayments(res, req.body.payment_id);
});

function getPayments(resp, payment_id){
  
  let options = {
    hostname: piHostname,
    port: 443,
    path: piBasePath+"/payments/"+payment_id,
    method: 'GET',
    headers: {
      'Authorization': "Key "+process.env.APPKEY,
    }
  }
  
  let req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      resp.send(d);
    })
  });
  
  req.on('error', error => {
    console.error(error)
    
  })
  
}










app.listen(process.env.PORT, () => {
  //console.log("Example app listening at http://localhost:"+process.env.PORT);
  console.log("done");
});