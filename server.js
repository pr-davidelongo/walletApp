const https = require('https');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.static('public_html'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST'] }));



app.post('/coins', (req, res) => {

    var coinsUser = require('./db/coins.json');
    console.log(coinsUser);
    res.send(coinsUser);
});
app.post('/coins/prices-:usr', (req, res) => {

    var coinsUser = require(`./db/${req.params.usr}.json`);
    //console.log(coinsUser);
    //res.send(coinsUser);

    for (let id = 1; id < Object.keys(coinsUser).length; id++) {
        var coinsJSON;
        console.log(id);
        /* var options ={
            host: 'api.crypto.com', // here only the domain name (no http/https!)
            path: `/v2/public/get-ticker?instrument_name=${coinsUser[id].coin}_${coinsUser[0].coin}`,
            method: 'GET' // do POST
        }; 
        const coinVal = https.request(options, coinRes => { //chiedo dati all'API nell'opzions
            coinRes.on('data', d => {
                resJSON = JSON.parse(d); // parsifico la lettura
                if(resJSON.result.data.b == undefined){
                    coinsJSON[id].price = 1.00
                }else{
                    coinsJSON[id].price = resJSON.result.data.b; //salvo il valore della coin
                }
                console.log(coinsJSON[id].price);
            });
        });
        coinVal.on('error', error => {console.error(error)});
        coinVal.end(); // chiudo la richiesta all'API */
    }
    res.send(coinsJSON);
});



app.get('/', (req, res) => {res.sendFile('index.html', { root: __dirname + "/public_html" })});
app.all('*', (req, res) => {res.sendFile('404.html', { root: __dirname + "/public_html" })});
app.listen(3000)