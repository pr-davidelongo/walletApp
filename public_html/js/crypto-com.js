var userCoins; // Object.keys(coins).length; // restituisce dimensione JSON

function currency(value) {
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function userCoinsTable(user) {
    $.ajax({
        url: `http://localhost:3000/coins`,
        type: 'POST',
        dataType: 'json',
        success: function(coins) {
            userCoins = coins;
            for (let id = 1; id < Object.keys(userCoins).length/*restituisce dimensione JSON*/; id++) {
                if (id > 1) {
                    $("#tbCoin").append(
                        `<tr id="coin${userCoins[id].coin}">
                            <td class="trID">${id}</td>
                            <td class="trLOGO"><img src="media/icon/${userCoins[id].coin}.png" alt="${userCoins[id].coin} Logo" width="32px" height="32px"></td>
                            <td class="trCOIN">${userCoins[id].coin}</td>
                            <td class="trQTY">${userCoins[id].qty}</td>
                            <td class="trVALUE">${userCoins[id].mvalue}</td>
                            <td class="trPRICE">${userCoins[id].price}</td>
                        </tr>`);
                } else {
                    $("#tbCoin").html(
                        `<tr id="coin${userCoins[id].coin}">
                            <td class="trID">${id}</td>
                            <td class="trLOGO"><img src="media/icon/${userCoins[id].coin}.png" alt="${userCoins[id].coin} Logo" width="32px" height="32px"></td>
                            <td class="trCOIN">${userCoins[id].coin}</td>
                            <td class="trQTY">${userCoins[id].qty}</td>
                            <td class="trVALUE">${userCoins[id].mvalue}</td>
                            <td class="trPRICE">${userCoins[id].price}</td>
                        </tr>`);
                }
            }
        },
        error: function(error) {}
    });
}

function getRowTicker(coin1, coin2) {
    $.ajax({
        url: `http://localhost:3000/coins/${coin1}_${coin2}`,
        type: 'POST',
        success: function(coinData) {
            //my_code
            var coinRead = coinData.i;
            var coinValue = coinData.b;
            currency(coinValue);
            $(`#tbCoin #coin${coin1} .trPRICE`).html(coinValue);
        },
        error: function(error) {
            //my_code
        }
    });
}

function refreshPrice(){
    setInterval(function() {userCoinsTable()}, 5000);
};

$(document).ready(function() {
    console.log("sono pronto!")
        // options for GET
        userCoinsTable()
        refreshPrice();  
});