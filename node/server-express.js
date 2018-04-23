
var fs      = require ('fs');
var express = require ('express');
var bp      = require ('body-parser');


var app = express();

var server = app.listen(5000, function(){
    console.log("Express Server gestartet : localhost:5000");
})

app.use(function(req, res, next) {
    res.setHeader('content-type', 'text/javascript')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST')
    next();
})

app.get( '/', function(req, res){
    
    res.end('OK');
})
