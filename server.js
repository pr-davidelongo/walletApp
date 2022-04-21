const https = require('https');
const fs = require('fs');
const cors = require('cors');
const express = require('express');
const { handle } = require('express/lib/application');
const app = express();

function getTicker(coin){
    var options ={
        host: 'api.crypto.com', // here only the domain name (no http/https!)
        path: `/v2/public/get-ticker?instrument_name=${coin}`,
        method: 'GET' // do POST
    }; 

    const coinVal = https.request(options, (coinRes) => { //chiedo dati all'API nell'opzions
        coinRes.on('data', (d) => {
            resJSON = JSON.parse(d); // parsifico la lettura      ret = resJSON.result.data.b
        });
        coinRes.on('end',()=>{
            //console.log(resJSON.result.data) // valore coin
            //return(resJSON.result.data);
        });
    });
    coinVal.on('error', (error) => {throw error;});
    coinVal.end(); // chiudo la richiesta all'API

}


app.use(express.static('public_html'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST'] }))

app.post('/price/:coin', (req, res) => {
    var options ={
        host: 'api.crypto.com', // here only the domain name (no http/https!)
        path: `/v2/public/get-ticker?instrument_name=${req.params.coin}`,
        method: 'GET' // do POST
    }; 

    const coinVal = https.request(options, (coinRes) => { //chiedo dati all'API nell'opzions
        coinRes.on('data', (d) => {
            resJSON = JSON.parse(d); // parsifico la lettura      ret = resJSON.result.data.b;
            res.send(resJSON);
        });
        //coinRes.on('end',()=>{
            //console.log(resJSON.result.data) // valore coin
            
        //});
    });
    coinVal.on('error', (error) => {throw error;});
    coinVal.end(); // chiudo la richiesta all'API
})


app.post('/coins/:usr', (req, res) => {

    coinsUser = require(`./db/${req.params.usr}.json`);

    /* for (let id = 1; id < Object.keys(coinsUser).length; id++) {
        if(ticker == undefined){
            coinsJSON[id].price = 1.00
        }else{
            coinsJSON[id].price = ticker; //salvo il valore della coin
        }
        console.log(coinsJSON[id].price);
    } */

    res.send(coinsUser);
});



app.get('/', (req, res) => {res.sendFile('index.html', { root: __dirname + "/public_html" })});
app.all('*', (req, res) => {res.sendFile('404.html', { root: __dirname + "/public_html" })});
app.listen(3000);