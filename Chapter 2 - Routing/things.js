var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send("GET Router On Things");
});

router.post('/', function(req, res){
    res.send("POST Router On Things");
});

//export this router to use in our index.js
module.exports = router;
