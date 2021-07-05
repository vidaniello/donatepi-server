const https = require('https');
const express = require('express');
var bodyParser = require('body-parser');

const serverEnabled = true;
const messageWhenServerDisabled = "Server donatepi is in manteinance!";

const piHostname = "api.minepi.com";
const piBasePath = "/v2";

const app = express();
app.use(bodyParser.json());

// https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  
  //Preflight
  if(req.method=="OPTIONS")
    console.log("Preflight request from: "+req.headers.origin);
  
  if(req.headers.origin=="https://donatepi.glitch.me" /*|| req.headers.origin=="https://www.w3schools.com" */){
    console.log("Access control allowed for: "+req.headers.origin);
      
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      
  }else{
    console.log("Access control default for: "+req.headers.origin);
  }
  
  next();
  
});

//var jsonParser = bodyParser.json();



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

app.get('/serverStatus', (req, res) => {
  if(serverEnabled)
    res.send("Donatepi-server status ok!");
  else
    res.status(500)  
      .send(messageWhenServerDisabled);
});

app.get('/donatepiBalance', (req, res) => {
  if(serverEnabled){
    res.send("Donatepi-server status ok!");
  }else
    res.status(500)  
      .send(messageWhenServerDisabled);
});

//Call by json operation
app.post('/v1', (req, res) => {
  
  //console.log("contLengh: "+req.get("Content-Length"));
  
  if(serverEnabled){
  
    let operation = req.body.operation;

    if(operation=="infoByUserAccessToken")
      getMe(res, req.body.user_access_token);
    else if(operation=="paymentInfo")
      getPaymentInfo(res, req.body.payment_id);
    else if(operation=="approvePayment")
      approvePayment(res, req.body.payment_id);
    else if(operation=="completePayment")
      completePayment(res, req.body.payment_id, req.body.txid);
    else{
      res.status(404).end("command '"+operation+"'' not found");
    }
  }else
    res.status(500)  
      .send(messageWhenServerDisabled);
  
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
    
    res.setEncoding('utf8');
    
    let retData;
    
    res.on('data', d => {
      retData += d;
    });
    
    res.on('end', () => {
      resp.status(res.statusCode)  
          .send(retData);
    });
    
    res.on('error', error => {
      onError(resp, res, error);
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
    
    res.setEncoding('utf8');
    
    let retData;
    
    res.on('data', d => {
      retData += d;
    });
    
    res.on('end', () => {
      
      //retData is PaymentDTO object
      
      resp.status(res.statusCode)
          .send(retData);
    });
    
    res.on('error', error => {
      onError(resp, res, error);
    })
  
  });
  
  req.end();
}





//approvePayment
// POST /payments/{payment_id}/approve
function approvePayment(resp, payment_id){
  
  let options = {
    hostname: piHostname,
    port: 443,
    path: piBasePath+"/payments/"+payment_id+"/approve",
    method: 'POST',
    headers: {
      'Authorization': "Key "+process.env.APPKEY,
    }
  }
  
  console.log("request approve payment id: "+payment_id);
  
  let req = https.request(options, res => {
    
    res.setEncoding('utf8');
    
    let retData;
    
    res.on('data', d => {
      retData += d;
    });
    
    res.on('end', () => {
      
      //retData is PaymentDTO object
      
      resp.status(res.statusCode)  
          .send(retData);
    });
    
    res.on('error', error => {
      onError(resp, res, error);
    })
    
  });
    
  req.end();
}


//approvePayment
// POST /payments/{payment_id}/complete
/*
* {
*   "txid": "7a7ed20d3d72c365b9019baf8dc4c4e3cce4c08114d866e47ae157e3a796e9e7"
* }
*/
function completePayment(resp, payment_id, txid){
  
  let data = new Object();
  data.txid = txid;
  let dataJson = JSON.stringify(data);
  //let dataByteArray = new TextEncoder().encode(dataJson);
  
  let options = {
    hostname: piHostname,
    port: 443,
    path: piBasePath+"/payments/"+payment_id+"/complete",
    method: 'POST',
    headers: {
      'Authorization': "Key "+process.env.APPKEY,
      'Content-Type': "application/json",
      'Content-Length': dataJson.length
    }
  }
    
  console.log("request complete payment id: "+payment_id+", txid: "+txid);
  
  let req = https.request(options, res => {
    
    res.setEncoding('utf8');
    
    let retData;
    
    res.on('data', d => {
      retData += d;
    });
    
    res.on('end', () => {
      
      //retData is PaymentDTO object
      
      console.log("user_id: "+retData.user_uid);
      
      resp.status(res.statusCode)  
          .send(retData);
    });
    
    res.on('error', error => {
      onError(resp, res, error);
    })
    
  });
    
  req.write(dataJson);
  req.end();
}




function onError(resp, res, error){
  console.error(error);
  resp.status(res.statusCode)
      .send(error);
}



app.listen(process.env.PORT, () => {
  //console.log("Example app listening at http://localhost:"+process.env.PORT);
  //console.log("done");
});