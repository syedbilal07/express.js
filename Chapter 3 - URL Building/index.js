var express = require('express');
var app = express();

app.get('/things/:id/:name', function(req, res){
    res.send("The ID Is : " + req.params.id + " And Name Is : " + req.params.name);
});

app.listen(8081);