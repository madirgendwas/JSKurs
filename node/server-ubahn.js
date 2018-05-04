var express = require ('express');
var bp      = require ('body-parser');
var fs      = require ('fs');
var request = require ('request');
const csv   = require ('csv')

// Github = wifi527


const linienCSV = "https://data.wien.gv.at/csv/wienerlinien-ogd-linien.csv";
const halteCSV  = "https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv";
const steigeCSV = "https://data.wien.gv.at/csv/wienerlinien-ogd-steige.csv";
var linienJSON = "linien.json";


var oriresponse;
var liniendata = [];
var haltedata = [];
var steigedata = [];
var linien = [];

// lade Ubahnen
fs.readFile(linienJSON, function(err, data){
    try{
        linien = JSON.parse(data);
        console.log(linien.length + " Linien geladen");
    }
    catch(e){
        linien = [];
        console.log("Error Load linien");
    }
 })

var app = express();
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

app.post( '/setlinien', function(req, res){
    oriresponse = res;
    console.log("vor laden file");
    readAndParseFiles(function(){
        createandWriteTable()
    })
});

app.post( '/getlinien', function(req, res){

    res.writeHeader(200, {'Content-type':'application/json'})
    res.end(JSON.stringify(linien));

});


var readAndParseFiles = function(callback){
    var parsebody;
    request(linienCSV, function (err, response, body) {
        if (err || response.statusCode != 200) {
            returnError(520);
            return;
        }
        else {
            csv.parse(body, {delimiter:';'}, function(error, xliniendata){
                console.log("Linien: ", xliniendata.length);
                if (error) {
                    returnError(530);
                    return;
                }
                else {
                    request(steigeCSV, function (err, response, body) {
                        if (err || response.statusCode != 200) {
                            returnError(521);
                            return;
                        }
                        else {
                            csv.parse(body, {delimiter:';'}, function(error, xsteigedata){
                                console.log("Bahnsteige: ", xsteigedata.length);
                                if (error) {
                                    returnError(531);
                                    return;
                                }
                                else{
                                    request(halteCSV, function (err, response, body) {
                                        if (err || response.statusCode != 200) {
                                            returnError(540);
                                            return;
                                        }
                                        else {
                                            csv.parse(body, {delimiter:';'}, function(error, xhaltedata){
                                                console.log("Haltestellen: ", xhaltedata.length);
                                                if (error) {
                                                    returnError(541);
                                                    return;
                                                }
                                                else {
                                                    liniendata = xliniendata;
                                                    haltedata = xhaltedata;
                                                    steigedata = xsteigedata;
                                                    callback();
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

var createandWriteTable = function(){

    linien = [];
    for (let i = 1;i<liniendata.length;i++){ // 0 sind namen
        if (liniendata[i][4] == "ptMetro"){
            var bahnsteg = {};
            bahnsteg.linie   = liniendata[i][1];
            bahnsteg.linienr = liniendata[i][0];
            //console.log("linie  : " , bahnsteg);
            for (let j = 1;j<steigedata.length;j++){
                if (liniendata[i][0] == steigedata[j][1]){
                    bahnsteg.richtung = steigedata[j][3];
                    bahnsteg.rbl = steigedata[j][4];
                    bahnsteg.lat = steigedata[j][8];
                    bahnsteg.lon = steigedata[j][9];
                    //console.log("bahnsteg  : " , bahnsteg);
                    for (let k = 1;k<haltedata.length;k++){
                        if (steigedata[j][2] == haltedata[k][0]){
                            bahnsteg.name = haltedata[k][3];
                            //linien.push(bahnsteg);
                            let index = linien.length;
                            linien[index] = new Object();
                            //linien[index] = bahnsteg;
                            // linien[index] = new Array();
                            linien[index].linie = bahnsteg.linie;
                            linien[index].linienr = bahnsteg.linienr;
                            linien[index].richtung = bahnsteg.richtung;
                            linien[index].rbl = bahnsteg.rbl;
                            linien[index].lat = bahnsteg.lat;
                            linien[index].lon = bahnsteg.lon;
                            linien[index].name = bahnsteg.name;
                        }
                    }
                }
            }
        }
    }

    // console.log(linien.length);
    // for (let i = 0;i<linien.length;i++){
    //     console.log(i, linien[i]);
    // }

    fs.writeFile(linienJSON, JSON.stringify(linien), function(){
        oriresponse.writeHeader(200, {'Content-type':'application/json'})
        oriresponse.end('{"result":"ok"}');
    });

    // returnError(510);
}

var returnError = function(errorcode) {
    oriresponse.writeHeader(200, {'Content-type':'application/json'})
    error = {
        fehlernummer:errorcode,
    }
    switch (errorcode) {
        case 510:
            error.fehlertext = "Linien-File konnte nicht erstellt werden"
            break;

        case 520:
            error.fehlertext = "Linien konnten nicht gelesen werden"
            break;
        case 521:
            error.fehlertext = "Haltestellen konnten nicht gelesen werden"
            break;
        case 522:
            error.fehlertext = "Bahnstelge konnten nicht gelesen werden"
            break;
        case 530:
            error.fehlertext = "Linien konnten nicht geparst werden"
            break;
        case 531:
            error.fehlertext = "Haltestellen konnten nicht geparst werden"
            break;
        case 532:
            error.fehlertext = "Bahnstelge konnten nicht geparst werden"
            break;
    }
    console.log(error.fehlernummer, error.fehlertext)
    oriresponse.end(error);
}
