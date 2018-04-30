var express = require ('express');
var bp      = require ('body-parser');
var fs      = require ('fs');
var request = require ('request');
const csv   = require ('csv')


const linienCSV = "https://data.wien.gv.at/csv/wienerlinien-ogd-linien.csv";
const halteCSV  = "https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv";
const steigeCSV = "https://data.wien.gv.at/csv/wienerlinien-ogd-steige.csv";

var linienJSON = "linien.json";
var halteJSON = "halte.json";

var app = express();
var linien = {};
var halte = {};


// lade Ubahnen
fs.readFile(linienJSON, function(err, data){
    try{
        linien = JSON.parse(data);
    }
    catch(e){
        linien = {};
        console.log("Error Load Linie");
    }
})

var server = app.listen(5003, function(){
    console.log("UbahnServer hört an Port : 5003");
})

app.use( express.static('static'));
app.use(bp.urlencoded({extended:true}));
app.use(bp.json({}));

app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Method', 'GET, POST')
    next();
})

app.get( '/', function(req, res){
    res.sendFile(__dirname+'/static/d14-ubahn.html');
});

app.post( '/getlinien', function(req, res){
    console.log("vor laden file");
    request(linienCSV, function (err, response, body) {
        if (!err &&response.statusCode == 200) {
            csv.parse(body, {delimiter:';'}, function(error, data){
                if (!error) {
                    linien = {};
                    for (let i = 1;i<data.length;i++){ // 0 sind namen
                        if (data[i][4] == "ptMetro"){
                            linien[data[i][1]] = data[i][0]
                        }
                    }
                    fs.writeFile(linienJSON, JSON.stringify(linien), function(){
                        res.writeHeader(200, {'Content-type':'application/json'})
                        res.end('{"result":"ok"}');
                    });
                }
                else {
                    res.code(404).end();
                }
            })
        }
        else{
            res.code(404).end();
        }
    });

});

app.post( '/getsteige', function(req, res){
    console.log("lade steige");
    request(steigeCSV, function (err, response, body) {
        if (!err &&response.statusCode == 200) {
            console.log("lade steige ok");
            csv.parse(body, {delimiter:';'}, function(error, data){
                if (!error) {
                    steige = {};
                    console.log("lade steige next");
                    for (let i = 1;i<data.length;i++){ // 0 sind namen
                        for (j in linien){
                            console.log(linien[j], data[i][0])
                            if (linien[j] == data[i][0]){
                                console.log("hab ich");
                                halte.haltestellen_id[halte.lenght] = [data[i][0]]
                                halte.name[halte.lenght-1] = [data[i][3]]
                                halte.lat[halte.lenght-1] = [data[i][6]]
                                halte.lon[halte.lenght-1] = [data[i][7]]
                            }
                        }
                    }
                    fs.writeFile(halteJSON, JSON.stringify(halte), function(){
                        res.writeHeader(200, {'Content-type':'application/json'})
                        res.end('{"result":"ok"}');
                    });
                }
                else {
                    res.code(404).end();
                }
            })
        }
        else{
            res.code(404).end();
        }
    });

});


app.post( '/gethaltestellen', function(req, res){
    console.log("lade halte");
    request(halteCSV, function (err, response, body) {
        if (!err &&response.statusCode == 200) {
            console.log("lade halte ok");
            csv.parse(body, {delimiter:';'}, function(error, data){
                if (!error) {
                    halte = {};
                    console.log("lade halt next");
                    for (let i = 1;i<data.length;i++){ // 0 sind namen
                        for (j in linien){
                            console.log(linien[j], data[i][0])
                            if (linien[j] == data[i][0]){
                                console.log("hab ich");
                                halte.haltestellen_id[halte.lenght] = [data[i][0]]
                                halte.name[halte.lenght-1] = [data[i][3]]
                                halte.lat[halte.lenght-1] = [data[i][6]]
                                halte.lon[halte.lenght-1] = [data[i][7]]
                            }
                        }
                    }
                    fs.writeFile(halteJSON, JSON.stringify(halte), function(){
                        res.writeHeader(200, {'Content-type':'application/json'})
                        res.end('{"result":"ok"}');
                    });
                }
                else {
                    res.code(404).end();
                }
            })
        }
        else{
            res.code(404).end();
        }
    });

});
