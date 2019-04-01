var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());

app.get('/', function(req, res){
    //Sets name=express
    //Expires after 360000 ms from the time it is set.
    res.cookie('name', 'express', {expire: 360000 + Date.now()}).send('cookie set');
    //This cookie also expires after 360000 ms from the time it is set.
    res.cookie('name', 'node', {maxAge: 360000}).send('cookie set');
    console.log('Cookies : ' + req.cookies);
});
// Deleting existing cookies
app.get('/clearcookie', function(req, res){
   res.clearCookie('express');
   res.send('Express Cookie Deleted');
});

app.listen(3000);