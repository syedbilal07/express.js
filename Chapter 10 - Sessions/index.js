var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

app.use(cookieParser());
app.use(session({secret: 'Sssh! Its A Secret', resave: true, saveUninitialized: true}));

app.get('/', function(req, res){
    if(req.session.page_views)
    {
        req.session.page_views++;
        res.send('You Have Visited This Page ' + req.session.page_views + " Times");
    }
    else
    {
        req.session.page_views = 1;
        res.send('Welcome To This Page For The First Time');
    }
});

app.listen(3000);
