const urlServer = 'http://localhost:3000/';
var userCoins;

function currency(value) {
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function coinsTable(user){
    $.ajax({
        url: urlServer+'coins',
        type:'POST',
        dataType:'JSON',
        success: function(coins){
            userCoins = coins;
            console.log(coins);

        },error: function(err){}
    })
}

function coinsPrice(user){
    $.ajax({
        url: urlServer+'coins/prices-'+user,
        type:'POST',
        dataType:'JSON',
        success: function(coins){
            userCoins = coins;
            console.log(coins);

        },error: function(err){}
    })
}




$(document).ready(function() {
    console.log("sono pronto!")

    // options for GET
    coinsPrice('coins');
    setInterval(function() {console.log(userCoins)}, 5000);

    ;
});