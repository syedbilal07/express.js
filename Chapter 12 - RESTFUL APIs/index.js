var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

//Require the Router we defined in movies.js
var movies = require('./movies.js');
//Use the Router on the sub route /movies
app.use('/movies', movies);

app.listen(3000);