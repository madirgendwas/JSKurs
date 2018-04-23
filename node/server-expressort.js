var fs      = require ('fs');
var express = require ('express');
var bp      = require ('body-parser');


var ortarray = [];

var app = express();

var server = app.listen(5001, function(){
    console.log("Express Server gestartet : localhost:5001");
})

app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST')
    next();
})

app.use( express.static('static'))
app.use(bp.urlencoded({extended:true}));

app.post( '/', function(req, res){
    res.setHeader('content-type', 'text/html')
    res.writeHeader (200);
    res.end('OK');
})

app.post( '/ort', function(req, res){
    var meinort = JSON.stringify(req.body);
    console.log(meinort);
    ortarray[ortarray.length] = meinort;

    fs.writeFile('meineort', ortarray, function(){});

    res.setHeader('content-type', 'text/html')
    res.writeHeader (200);
    res.end('OK');
})


app.get( '/', function(req, res){
    res.writeHeader (200);
    fs.readFile('d12-serverort.html', function(err, data){
        res.end(data);
    });
})
