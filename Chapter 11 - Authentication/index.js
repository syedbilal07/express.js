var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: 'Your Secret Key', resave: true, saveUninitialized: true}));

var Users = [];
// To Get Signup Page (Middleware)
app.get('/signup', function(req, res){
   res.render('signup');
});
// Route To Sign Up
app.post('/signup', function(req, res){
    if(!req.body.id || !req.body.password)
    {
        res.status('400');
        res.send('Invalid Details');
    }
    else
    {
        Users.filter(function(user){
           if(user.id == req.body.id)
           {
               res.render('signup', {message: 'User Already Exist!'});
           }
        });
        var newUser = {id: req.body.id, password: req.body.password};
        Users.push(newUser);
        req.session.user = newUser;
        res.redirect('/protected_page');
    }
});

// So lets define its route as well as routes to log in and log out:
function checkSignIn(req, res, next)
{
    if(req.session.user)
    {
        //If session exists, proceed to page
        next();
    }
    else
    {
        var err = new Error('Not Logged In');
        console.log(req.session.user);
        //Error, trying to access unauthorized page!
        next(err);
    }
}
app.get('/protected_page', checkSignIn, function(req, res){
   res.render('protected_page', {id: req.session.user.id});
});

app.get('/login', function(req, res){
   res.render('login');
});
app.post('/login', function(req, res){
    console.log(Users);
    if(!req.body.id || !req.body.password)
    {
        res.render('login', {message: 'Please Enter Both ID & Password'});
    }
    else
    {
        Users.filter(function(user){
           if(user.id == req.body.id || user.password == req.body.password)
           {
               req.session.user = user;
               res.redirect('/protected_page');
           }
        });
        res.render('login', {message: 'Invalid Credentials'});
    }
});
app.get('/logout', function(req, res){
    req.session.destroy(function(){
       console.log('User Logged Out!');
    });
    res.redirect('/login');
});

app.use('/protected_page', function(err, req, res, next){
    console.log(err);
    //User should be authenticated! Redirect him to log in.
    res.redirect('login');
});

app.listen(3000);