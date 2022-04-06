/* 
WebServer
*/

const cors = require('cors');
const express = require('express');
const app = express();
const https = require('https');

app.use(express.static('public_html'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST'] }));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + "/public_html" })
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
    res.sendFile('404.html', { root: __dirname + "/public_html" })
})

app.listen(3000);