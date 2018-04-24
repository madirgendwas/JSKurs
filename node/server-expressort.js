var fs      = require ('fs');
var express = require ('express');
var bp      = require ('body-parser');

var orte = [];
var alleorte = {
    orte:[]
};

//var orte = [];
// fs.readFile('meineorte.txt', function(err, data){
//     alleorte = JSON.parse(data);
// });

 // fs.writeFile('meineorte.txt', JSON.stringify(alleorte), function(){
 //     //alleorte = JSON.parse(data);
 // });

 fs.readFile('meineorte.txt', function(err, data){
     alleorte = JSON.parse(data);
 });

var app = express();

var server = app.listen(5001, function(){
    console.log("Express Server gestartet : localhost:5001");
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST')
    next();
})

app.use( express.static('static'));
app.use(bp.urlencoded({extended:true}));
app.use(bp.json({extended:true}));

app.post( '/', function(req, res){
    res.setHeader('content-type', 'text/html')
    res.writeHeader (200);
    res.end('OK');
})

app.post( '/ort', function(req, res){
    alleorte.orte.push(req.body);
    fs.writeFile('meineorte.txt', JSON.stringify(alleorte), function(){
        res.setHeader('content-type', 'text/html')
        res.writeHeader (200);
        res.end('OK');
    });
})

app.post( '/deleteort', function(req, res){
    ort = req.body;
    console.log('ort');
    for (i=0;i<alleorte.orte.length;i++){
        if (alleorte.orte[i].ort == ort) {
            // alleorte.orte.splice(i, 1)
            // i--
        }
    }

    fs.writeFile('meineorte.txt', JSON.stringify(alleorte), function(){
        res.setHeader('content-type', 'text/html')
        res.writeHeader (200);
        res.end('OK');
    });
})

 app.post( '/getorte', function(req, res){
     res.setHeader('content-type', 'application/json')
     res.writeHeader (200);
     res.end(JSON.stringify(alleorte));
 });

app.get( '/', function(req, res){
    res.sendFile(__dirname + '/d12-serverort.html') ;
    // res.writeHeader (200);
    // fs.readFile('d12-serverort.html', function(err, data){
    //     res.end(data);
    //});
})
