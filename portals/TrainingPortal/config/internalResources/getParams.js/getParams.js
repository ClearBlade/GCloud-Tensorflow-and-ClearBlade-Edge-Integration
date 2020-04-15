

var id = setInterval(
    function() {
        var secret = datasources.getSystemParams.latestData();
        if (secret != undefined){
            console.log(secret);
            datasources.systemCredentials.sendData({"systemSecret" : secret.results.systemSecret})
            clearInterval(id);
        }
    }, 100
)
// var credentials = datasources.systemCredentials.latestData();
// console.log(secret);
// console.log(credentials);