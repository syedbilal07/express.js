var express = require('express');
var app = express();

app.use(function(req, res, next){
    console.log("A New Received At : " + Date.now());
    //This function call is very important. It tells that more processing is
    //required for the current request and is in the next middleware function/route handler
    next();
});

app.listen(8080);