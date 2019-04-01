var express = require('express');
var app = express();

app.get('/', function(req, res){
   var err = new Erro("Something Went Wrong");
   next(err);
});

/*
 * other route handlers and middleware here
 * ....
 */

//An error handling middleware
app.use(function(err, req, res, next){
   res.status(500);
   res.send("Oops, Something Literally Went Wrong!");
});

app.listen(8080);