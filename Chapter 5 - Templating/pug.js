var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/component', function(req, res){
    res.render('content');
});

app.listen(8080);