// get the HTML Elements 
const input = document.querySelector('#input');
const registerTxButton = document.querySelector('#button');

const merchantIdentifier = "026904f3-6582-40c0-a94a-b9d075a90784";
const merchantSecret = "hEvD3qD4Lh3UHPL3DlzemyW3aYcx9bVJ";

//build the post request to the backend to get the sessonIdentifer 
const registerTransaction = async () => {

    let link;
    const amount = input.value;
    const url = "http://localhost:1000/registerTransaction"
    const txDetails = JSON.stringify({
            "amount": amount,
            "currency": "USD",
            "type": "CHARGE",
            "subject": "Payworks WebApp Tester",
            "customIdentifier": "My custom identifier"
    })
    
    const headers = {
        "Content-Type": "application/json"
    }

    try {
        const response = await fetch (url, {
          method: 'POST',
          headers: headers,
          body: txDetails
        })
        if (response.ok) {
            const jsonResponse = await response.json();
            const sessionIdentifier = (jsonResponse.data.identifier);
            link =`payworks://transaction/charge?sessionIdentifier=${sessionIdentifier}&providerMode=TEST&accessoryFamily=MIURA_MPI&merchantIdentifier=${merchantIdentifier}&merchantSecretKey=${merchantSecret}`;
            console.log (link);
        }
    } catch (error) {
        console.log(error);
    }

    window.location.href = link;
};

registerTxButton.addEventListener('click', registerTransaction);