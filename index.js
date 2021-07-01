const https = require('https');
const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//var jsonParser = bodyParser.json();

const piHostname = "api.minepi.com";
const piBasePath = "/v2";

/*
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
*/

//Call by json operation
app.post('/v1', (req, res) => {
  
  let operation = req.body.operation;
  
  if(operation=="infoByUserAccessToken")
    getMe(res, req.body.user_access_token);
  else if(operation=="paymentInfo")
    getPaymentInfo(res, req.body.payment_id);
  else{
    res.status(404).end("command '"+operation+"'' not found");
  }
  
});




//Info user by access token
/*
app.post('/me', (req, res) => {
  getMe(res, req.body.user_access_token);
});
*/

function getMe(resp, user_access_token){
  
  let options = {
    hostname: piHostname,
    port: 443,
    path: piBasePath+"/me",
    method: 'GET',
    headers: {
      'Authorization': "Bearer "+user_access_token,
    }
  }
  
  let req = https.request(options, res => {
    console.log("statusCode: "+res.statusCode);
    res.setEncoding('utf8');
    
    let retData;
    
    res.on('data', d => {
      retData += d;
    });
    
    res.on('end', () => {
      resp.status(res.statusCode)
          .set(res.headers)
          .send(retData);
    });
    
    res.on('error', error => {
      onError(resp, res.statusCode, error);
    })
    
  });
    
  req.end();
}





//paymentInfo
/*
app.post('/paymentInfo', (req, res) => {
  getPaymentInfo(res, req.body.payment_id);
});
*/

function getPaymentInfo(resp, payment_id){
  
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
    console.log("statusCode: "+res.statusCode);
    res.setEncoding('utf8');
    
    let retData;
    
    res.on('data', d => {
      retData += d;
    });
    
    res.on('end', () => {
      resp.status(res.statusCode)
          .set(res.headers)
          .send(retData);
    });
    
    res.on('error', error => {
      onError(resp, res.statusCode, error);
    })
  
  });
  
  req.end();
}









function onError(resp, status, error){
  console.error(error);
  resp.status(status).send(error);
}



app.listen(process.env.PORT, () => {
  //console.log("Example app listening at http://localhost:"+process.env.PORT);
  console.log("done");
});