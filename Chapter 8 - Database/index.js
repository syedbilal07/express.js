var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// for parsing multipart/form-data
app.use(upload.array());

app.set('view engine', 'pug');
app.set('views', './views');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model("Person", personSchema);
//Also add a new get route in index.js to render this document:
app.get('/person', function(req, res){
    res.render('person');
});
// We'll now define a post route handler at '/person' which will handle this request:
app.post('/person', function(req, res){
    //Get the parsed information
    var personInfo = req.body;
    if(!personInfo.name || !personInfo.age || !personInfo.nationality)
    {
        res.render('show_message', {message: 'Sorry, You Provided Wrong Info', type: 'error'});
    }
    else
    {
        var newPerson = new Person({
           name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });
        newPerson.save(function(err, res1){
            if(err)
            {
                res.render('show_message', {message: 'Database Error', type: 'error'});
            }
            else
            {
                res.render('show_message', {message: "New Person Added", type: "success", person: personInfo});
            }
        });
    }
});
// Let's create a route to view all people records:
app.get('/people', function(req, res){
    Person.find(function(err, response){
        res.json(response);
    })
});
// Lets create a route to update people. This will be a PUT route with the id as a parameter and details in the payload.
app.put('/people/:id', function(req, res){
    Person.findByIdAndUpdate(req.params.id, req.body, function(err, response){
        if(err)
        {
            res.json({message: 'Error In Updating Person With ID : ' + req.params.id});
        }
        else
        {
            res.json(response);
        }
    });
});
// Now lets create a route to delete people from our database.
app.delete('/people/:id', function(req, res){
    Person.findByIdAndRemove(req.params.id, function(err ,response){
       if(err)
       {
           res.json({message: 'Error In Deleting ID : ' + req.params.id});
       }
       else
       {
           res.json({message: 'Person With ID : ' + req.params.id + " Has Been Removed"});
       }
    });
});

app.listen(3000);