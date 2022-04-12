function currency(value) {
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
var userCoins;

function getUserCoins(user) {
    $.ajax({
        url: `http://localhost:3000/coins`,
        type: 'POST',
        success: function(coins) {
            userCoins = JSON.parse(coins);
        },
        error: function(error) {

        }
    });
}

function getRowTicker(coin1, coin2, id) {
    $.ajax({
        url: `http://localhost:3000/coins/${coin1}_${coin2}`,
        type: 'POST',
        success: function(coinData) {
            //my_code
            var coinRead = coinData.i;
            var coinValue = coinData.b;
            //currency(coinValue);
            $("#tbCoin").html(coinValue);
            /* if (id > 1) {
                $("#tbCoin").append(
                    `<tr id="coin${coin1}">
                        <td class="trID">${id}</td>
                        <td class="trLOGO"><img src="media/icon/${coin1}.png" alt="${coin1} Logo" width="32px" height="32px"></td>
                        <td class="trCOIN">${coinRead}</td>
                        <td class="trVALUE">${coinValue}</td>
                    </tr>`);
            } else {
                $("#tbCoin").html(
                    `<tr id="coin${coin1}">
                        <td class="trID">${id}</td>
                        <td class="trLOGO"><img src="media/icon/${coin1}.png" alt="${coin1} Logo" width="32px" height="32px"></td>
                        <td class="trCOIN">${coinRead}</td>
                        <td class="trVALUE">${coinValue} $</td>
                    </tr>`); 
            }*/

        },
        error: function(error) {
            //my_code
        }
    });
}

function makeTableCoin() {

    for (let c = 1; c < userCoins.lenght; c++) {
        console.log(array[c]);

    }
    /* if (id > 1) {
        $("#tbCoin").append(
            `<tr id="coin${coin1}">
                        <td class="trID">${id}</td>
                        <td class="trLOGO"><img src="media/icon/${coin1}.png" alt="${coin1} Logo" width="32px" height="32px"></td>
                        <td class="trCOIN">${coinRead}</td>
                        <td class="trVALUE">${coinValue}</td>
                    </tr>`);
    } else {
        $("#tbCoin").html(
            `<tr id="coin${coin1}">
                        <td class="trID">${id}</td>
                        <td class="trLOGO"><img src="media/icon/${coin1}.png" alt="${coin1} Logo" width="32px" height="32px"></td>
                        <td class="trCOIN">${coinRead}</td>
                        <td class="trVALUE">${coinValue} $</td>
                    </tr>`);
    } */



    /* getRowTicker('BTC', 'USDT', 1);
    
        getRowTicker('ETH', 'USDT', 2);
        getRowTicker('CRO', 'USDT', 3);
        getRowTicker('LUNA', 'USDT', 4);
        getRowTicker('STX', 'USDT', 5); */

}






$(document).ready(function() {
    console.log("sono pronto!")
        // options for GET
    getUserCoins();

    makeTableCoin();
});