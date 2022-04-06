/* 
WebServer
*/

const cors = require('cors');
const express = require('express');
const axios = require('axios');
const app = express();
const http = require('http');
const https = require('https');
const { append } = require('express/lib/response');


const BTCUSDT = "BTC_USDT";


app.use(express.static('public_html'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST'] }));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + "/public" })
})


app.post('/coins/:coppia', (req, res) => {
    var options = {
        host: 'api.crypto.com', // here only the domain name (no http/https!)
        path: `/v2/public/get-ticker?instrument_name=${req.params.coppia}`, // the rest of the url with parameters if needed
        method: 'GET' // do POST
    };
    const coinVal = https.request(options, coinRes => {
        console.log(`status code: ${coinRes.statusCode}`);
        coinRes.on('data', d => {
            resJSON = JSON.parse(d);
            res.send(resJSON);
        })
    })
    coinVal.on('error', error => { console.error(error) });
    coinVal.end()

})



app.all('*', (req, res) => {
    res.sendFile('404.html', { root: __dirname + "/public" })
})

app.listen(3000);