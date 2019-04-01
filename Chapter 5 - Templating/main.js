var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/dynamic_view', function(req, res){
    res.render('dynamic', {
       name: 'TutorialsPoint',
        url: 'http://www.tutorialspoint.com'
    });
});

app.listen(8080);