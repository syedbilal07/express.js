var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('form');
});

app.post('/', function(req, res){
   console.log(req.body);
   res.send("Received Your Request");
});

app.listen(8080);
