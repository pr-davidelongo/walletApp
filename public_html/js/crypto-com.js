$(document).ready(function() {
    console.log("sono pronto!")
        // options for GET

});

function getTicker(coppia) {
    $.ajax({
        url: "http://localhost:3000/coins/" + coppia,
        type: 'POST',
        success: function(coinData) {
            //my_code
            console.log(coinData);
            $("#result").append(coinData.result.data.i);
        },
        error: function(result) {
            //my_code
        }
    });
}