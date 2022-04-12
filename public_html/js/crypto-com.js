var userCoins,jsonLenght; // Object.keys(coins).length; // restituisce dimensione JSON

function currency(value) {
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function getUserCoinsTable(user) {
    $.ajax({
        url: `http://localhost:3000/coins`,
        type: 'POST',
        dataType: 'json',
        success: function(coins) {
            jsonLenght=Object.keys(coins).length; 
            for (let id = 1; id < Object.keys(coins).length/*restituisce dimensione JSON*/; id++) {
                console.log(coins[id]);
                if (id > 1) {
                    $("#tbCoin").append(
                        `<tr id="coin${coins[id].coin}">
                            <td class="trID">${id}</td>
                            <td class="trLOGO"><img src="media/icon/${coins[id].coin}.png" alt="${coins[id].coin} Logo" width="32px" height="32px"></td>
                            <td class="trCOIN">${coins[id].coin}</td>
                            <td class="trVALUE">152.35</td>
                        </tr>`);
                } else {
                    $("#tbCoin").html(
                        `<tr id="coin${coins[id].coin}">
                            <td class="trID">${id}</td>
                            <td class="trLOGO"><img src="media/icon/${coins[id].coin}.png" alt="${coins[id].coin} Logo" width="32px" height="32px"></td>
                            <td class="trCOIN">${coins[id].coin}</td>
                            <td class="trVALUE">152.35</td>
                        </tr>`);
                }
            }
        },
        error: function(error) {}
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


$(document).ready(function() {
    console.log("sono pronto!")
        // options for GET
        getUserCoinsTable();

    //makeTableCoin();
});