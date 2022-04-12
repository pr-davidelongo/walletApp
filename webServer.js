/* 
WebServer
*/

const https = require('https');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();
const coinsJSON = require('./db/coins.json');

function getPrice(idCoin){
    var options ={
        host: 'api.crypto.com', // here only the domain name (no http/https!)
        path: `/v2/public/get-ticker?instrument_name=${coinsJSON[idCoin].coin}_${coinsJSON[0].coin}`,
        method: 'GET' // do POST
    }; 
    const coinVal = https.request(options, coinRes => { //chiedo dati all'API nell'opzions
        coinRes.on('data', d => {
            resJSON = JSON.parse(d); // parsifico la lettura
            if(resJSON.result.data.b == undefined){
                coinsJSON[idCoin].price = 1.00
            }else{
                coinsJSON[idCoin].price = resJSON.result.data.b; //salvo il valore della coin
            }
            console.log(coinsJSON[idCoin].price);
            fs.writeFile('./db/coins.json',JSON.stringify(coinsJSON), (err) => { // aggiorno il JSON
                if (err) throw err;
                //console.log('Data written to file');
            });
        });
    });
    coinVal.on('error', error => {console.error(error)});
    coinVal.end(); // chiudo la richiesta all'API
};  

app.use(express.static('public_html'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST'] }));

app.post('/coins', (req, res) => {
    for (let id = 1; id < Object.keys(coinsJSON).length/*restituisce dimensione JSON*/; id++) {
        getPrice(id); // leggo il PRICE della coin
    }
    res.send(coinsJSON)
});

app.get('/', (req, res) => {res.sendFile('index.html', { root: __dirname + "/public_html" })});
app.all('*', (req, res) => {res.sendFile('404.html', { root: __dirname + "/public_html" })});
app.listen(3000)