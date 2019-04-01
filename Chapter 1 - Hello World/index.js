var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.send('Hello Express JS!');
});

app.listen(8080);