//declare dependencies
const express = require ('express');
const request = require ('request');
const bodyParser = require ('body-parser');
require('dotenv').config();

//invoke express
const app = express();

//use bodyParser;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set Payworks API information 
const apiIdentifier = process.env.API_IDENTIFIER;
const apiSecret = process.env.API_SECRET;
const merchantIdentifier = "64a41793-8da4-4b37-8f0e-efa39cefedb0";
const merchantSecret = "rvdZISeaLosDc28JHZf2MNo8yXojGIKJ";

const url = 'https://test.payworks.io';
const authorization = `payworks-apiIdentifier apiIdentifier=${apiIdentifier},apiSecretKey=${apiSecret}`;
const endpoint = `/v2/merchants/${merchantIdentifier}/transactionSessions`;

//use express to make the api call to Payworks server.
app.post('/registerTransaction', (req, res) => {
// save request information for use in Payworks API call  
  const amount = req.body.amount;
  const currency = req.body.currency;
  const type = req.body.type;
  const subject = req.body.subject;
  const customIdentifier = req.body.customIdentifier;

//build transaction using request body parameters
  const data = JSON.stringify({
    "transaction" : {
        "amount": amount,
        "currency": currency,
        "type": type,
        "subject": subject,
        "customIdentifier": customIdentifier
    }
})

//use the npm request framework to make a POST request to the Payworks API from our backend
request.post({
    "headers": { "content-type": "application/json", 
                "authorization": authorization
                },
    "url": `${url}${endpoint}`,
    "body": data

}, (error, response, body) => {
    if(error) {
        return console.log(error);
    }
    console.log(JSON.parse(body));
    
}).pipe(res)

});

// start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
return console.log(`PORT is open and ready on ${PORT}`);
});
