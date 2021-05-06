const express = require("express");
const bodyParser = require("body-parser");
const app = express();
  
const urlencodedParser = bodyParser.urlencoded({extended: false});
 
app.get("/example", urlencodedParser, function (request, response) {
    response.sendFile("/example.html");
});
app.post("/example", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", function(request, response){
    response.send("Главная страница");
});

app.listen(3000, function() {
	console.log('App listening at port 3000')
});