var express = require('express');
var router = express.Router();
var movies = [
    {id: 101, name: "On Time", year: 2009, rating: 8.1},
    {id: 102, name: "Inception", year: 2010, rating: 8.7},
    {id: 103, name: "Four Brothers", year: 2008, rating: 9},
    {id: 104, name: "The Social Network", year: 2011, rating: 8.9}
];
// Define the GET route for getting all the movies:
router.get('/', function(req, res){
    res.json(movies);
});
router.get('/:id([0-9]{3,})', function(req, res){
    var currentMovie = movies.filter(function(movie){
       if(movie.id == req.params.id)
       {
           return true;
       }
    });
    if(currentMovie.length == 1)
    {
        res.json(currentMovie[0]);
    }
    else
    {
        //Set status to 404 as movie was not found
        res.status(400);
        res.send('Not Found');
    }
});
// Use the following route to handle the POSTed data:
router.post('/', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.name || !req.body.year.toString().match(/^[0-9]{4}$/g) || !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
        res.status(400);
        res.send({message: 'Bad Request'});
    }
    else
    {
        var newId = movies[movies.length - 1].id+1;
        movies.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating
        });
        res.json({message: 'New Movie Created ', location: "/movies/" + newId});
    }
});
// Put Route To Update Existing Movie & If Not Found, It Will Create A New Movie
router.put('/:id', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.name || !req.body.year.toString().match(/^[0-9]{4}$/g) || !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
        res.status(400);
        res.send({message: 'Bad Request'});
    }
    else
    {
        //Gets us the index of movie with given id.
        var updateIndex = movies.map(function(movie){
           return movie.id;
        }).indexOf(parseInt(req.params.id));
        if(updateIndex === -1)
        {
            //Movie not found, create new
            movies.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.json({message: 'New Movie Created ', location: "/movies/" + req.params.id});
        }
        else
        {
            //Update existing movie
            movies[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            };
            res.json({message: "Movie ID : " + req.params.id + " Updated", location: "/movies/" + req.params.id});
        }
    }
});
//Use the following code to create a delete route:
router.delete('/:id', function(req, res){
    //Gets us the index of movie with given id.
    var removeIndex = movies.map(function(movie){
       return movie.id
    }).indexOf(parseInt(req.params.id));
    if(removeIndex === -1)
    {
        res.json({message: 'Not Found'});
    }
    else
    {
        movies.splice(removeIndex, 1);
        res.send({message: 'Movie ID : ' + req.params.id + " Deleted"});
    }
});
//Routes will go here
module.exports = router;