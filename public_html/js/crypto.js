const urlServer = 'http://localhost:3000/';
var userCoins, coinPrice;

function currency(value) {
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function getUserCoins(user){
    $.ajax({
        url: urlServer+'coins/'+user,
        type:'POST',
        dataType:'JSON',
        success: function(coins){
            for (let id = 1; id < Object.keys(coins).length/*restituisce dimensione JSON*/; id++) {
                if (id > 1) {
                    $("#tbCoin").append(
                        `<tr id="${coins[id].coin}">
                            <td class="trID">${id}</td>
                            <td class="trLOGO"><img src="media/icon/${coins[id].coin}.png" alt="${coins[id].coin} Logo" width="32px" height="32px"></td>
                            <td class="trCOIN">${coins[id].coin}</td>
                            <td class="trQTY">${coins[id].qty}</td>
                            <td class="trVALUE">${coins[id].mvalue}</td>
                            <td class="trPRICE" id="${coins[id].coin}_${coins[0].coin}"></td>
                        </tr>`);
                } else {
                    $("#tbCoin").html(
                        `<tr id="${coins[id].coin}">
                            <td class="trID">${id}</td>
                            <td class="trLOGO"><img src="media/icon/${coins[id].coin}.png" alt="${coins[id].coin} Logo" width="32px" height="32px"></td>
                            <td class="trCOIN">${coins[id].coin}</td>
                            <td class="trQTY">${coins[id].qty}</td>
                            <td class="trVALUE">${coins[id].mvalue}</td>
                            <td class="trPRICE" id="${coins[id].coin}_${coins[0].coin}"></td>
                        </tr>`);
                }
                //getPriceUSDT(coins[id].coin+'_'+coins[0].coin);
                setInterval(function() {getPriceUSDT(coins[id].coin+'_'+coins[0].coin)}, 500);
                
            }
        },error: function(err){}
    })
}

function getPriceUSDT(coin){

    $.ajax({
        url: urlServer+'price/'+coin,
        type:'POST',
        dataType:'JSON',
        success: function(ticker){
            if(ticker.result.data.b == undefined){
                $(`#${coin}`).html(1.00)
            }else{$(`#${coin}`).html(ticker.result.data.b)}
            
                
        },error: function(err){}
    })

    /* for (let id = 1; id < Object.keys(coinsUser).length; id++) {
        if(ticker == undefined){
            coinsJSON[id].price = 1.00
        }else{
            coinsJSON[id].price = ticker; //salvo il valore della coin
        }
        console.log(coinsJSON[id].price);
    } */
}

function saveUserCoin(user){
    const myInterval = setInterval(function() {getUserCoins(user);console.log(userCoins)}, 1000);

}


$(document).ready(function() {
    console.log("sono pronto!")

    // options for GET
    getUserCoins('coins');
    //setInterval(function() {getUserCoins('coins');console.log(userCoins)}, 1000);
    //getPriceUSDT('BTC_USDT');
    //setInterval(function() {getUserCoins('coins');console.log(userCoins)}, 1000);
});