var express = require ('express');
var bp      = require ('body-parser');
var fs      = require ('fs');
var request = require ('request');
const csv   = require ('csv')


// var l = [{}]; // linen
// var h = [{}]; // haltestellen
// var s = [{}]; // stege
//
// l.h = new h();
// l.h.s = new s();
// var app = express();
// var linien = {};
// var halte = {};
//
// // lade Ubahnen
//
//
// l[0].name = "U1";
// l[0].nummer = "556855";
// l[0].h = h;
// l[0].h[0].name = "Abesbach";
// l[0].h[0].lat = "458";
// l[0].h[0].s = s;
// l[0].h[0].s[0].richtung = "H";
// l[0].h[0].s[0].reihenfolge = 1;
// l[0].h[0].s[0].rbl = "4711";
// l[0].h[0].s[0].lat = "459";
// l[0].h[0].s[0].lon = "460";
// l[1] = l;
// l[1].name = 'U2';


// console.log(l);
// fs.writeFile("test", JSON.stringify(l));
