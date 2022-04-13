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
                            <td class="trPRICE">0.00</td>
                        </tr>`);
                } else {
                    $("#tbCoin").html(
                        `<tr id="coin${userCoins[id].coin}">
                            <td class="trID">${id}</td>
                            <td class="trLOGO"><img src="media/icon/${userCoins[id].coin}.png" alt="${userCoins[id].coin} Logo" width="32px" height="32px"></td>
                            <td class="trCOIN">${userCoins[id].coin}</td>
                            <td class="trQTY">${userCoins[id].qty}</td>
                            <td class="trVALUE">${userCoins[id].mvalue}</td>
                            <td class="trPRICE">0.00</td>
                        </tr>`);
                }
            }
        },
        error: function(error) {}
    });
}

function getPrice() {
    $.ajax({
        url: `http://localhost:3000/coins/price-all`,
        type: 'POST',
        success: function(coinsPrice) {
            //my_code
            for (let id = 1; id < Object.keys(coinsPrice).length/*restituisce dimensione JSON*/; id++) {
                console.log(coinsPrice[id]);
                var coin = coinsPrice[id].coin;
                var price = coinsPrice[id].price;
                currency(price);
                $(`#tbCoin #coin${coin} .trPRICE`).html(price);
            }
        },
        error: function(error) {
            //my_code
        }
    });
}

function refreshPrice(){
    setInterval(function() {getPrice()}, 5000);
};

$(document).ready(function() {
    console.log("sono pronto!")
        // options for GET
        userCoinsTable()
        refreshPrice();  
});