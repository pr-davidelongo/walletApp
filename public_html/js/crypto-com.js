$(document).ready(function() {
    console.log("sono pronto!")
        // options for GET
    getTicker('BTC', 'USDT', 1)
});

function getTicker(coin1, coin2, id) {
    $.ajax({
        url: `http://localhost:3000/coins/${coin1}_${coin2}`,
        type: 'POST',
        success: function(coinData) {
            //my_code
            console.log(coinData);
            var coinRead = coinData.result.data.i;
            var coinValue = coinData.result.data.b;
            if (id > 1) {
                $("#tableCoin").append(
                    `<tr id="coin${coin1}">
                        <td class="trID">${id}</td>
                        <td class="trLOGO"><img src="media/icon/${coin1}.png" alt="${coin1} Logo" width="32px" height="32px"></td>
                        <td class="trCOIN">${coinRead}</td>
                        <td class="trVALUE">${coinValue}</td>
                    </tr>`);
            } else {
                $("#tableCoin").html(
                    `<tr id="coin${coin1}">
                        <td class="trID">${id}</td>
                        <td class="trLOGO"><img src="media/icon/${coin1}.png" alt="${coin1} Logo" width="32px" height="32px"></td>
                        <td class="trCOIN">${coinRead}</td>
                        <td class="trVALUE">${coinValue}</td>
                    </tr>`
                );
            }

        },
        error: function(result) {
            //my_code
        }
    });
}

function makeTableCoin() {
    $("#tableCoin").html(`
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>LOGO</th>
                <th>COIN</th>
                <th>VALUE</th>
            </tr>
        </thead>
        <tbody id="tbCoin">
        </tbody>
    </table>`);

    for (let coinId = 0; coinId < 9; coinId++) {
        str = str + i;
    }

}