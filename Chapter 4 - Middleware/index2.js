var express = require('express');
var app = express();

//Middleware function to log request protocol
app.use('/things', function(req, res, next){
    console.log("A New Received At : " + Date.now());
    //This function call is very important. It tells that more processing is
    //required for the current request and is in the next middleware function/route handler
    next();
});

//Route handler that sends the response
app.get('/things', function(req, res){
   res.send('Things');
});

app.listen(8080);