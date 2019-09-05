// UUID generator
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
// selecting page elements
const loginButton = document.querySelector('button');
// saving Payorks credentials 
const merchantIdentifier = "64a41793-8da4-4b37-8f0e-efa39cefedb0";
const merchantSecret = "64a41793-8da4-4b37-8f0e-efa39cefedb0";
//server 
const localHost = "ws://localhost:";
const port = 8080;


loginButton.onclick = function () {
  const webSocket = new WebSocket(`${localHost}${port}`);
  
  if (webSocket.readyState = "OPEN") {
  alert(`WebSocket is open and ready to receive on PORT: ${port}`);
}

  webSocket.onopen = function () {
    
    const login = {
    "tag": guid(),
    "type": "LOGIN_MERCHANT_REQUEST",
    "loginMerchantRequest": {
    "providerMode": "TEST",
    "merchantIdentifier": `${merchantIdentifier}`,
    "merchantSecret": `${merchantSecret}`}
    }

    webSocket.send(JSON.stringify(login));

  }

  webSocket.onmessage = function (message) {
    const response = JSON.parse(message.data);
    const reader = (response.loginMerchantResponse.devices[0].resource);
    console.log(reader);
    
  //   const transaction = {
  //   "tag": guid(),
  //   "type": "EXECUTE_TRANSACTION_REQUEST",
  //   "resource": reader,
  //   "executeTransactionRequest": {
  //     "mode": "ONLINE",
  //     "transactionParameters": {
  //       "amount": 5.00,
  //       "currency": "USD",
  //       "autoCapture": true,
  //       "type": "CHARGE",
  //       "subject": "Payworks-Test",
  //       "customIdentifier": "my-custom-identifier",
  //       "statementDescriptor": "Wiltech Electronics",
  //       "applicationFee": 1.00,
  //       "includedTipAmount": 1.00,
  //       "metadata": {
  //         "my": "metadata"
  //       }
  //     }
  //   }
  // }

  // webSocket.send(JSON.stringify(transaction));

  }
}
