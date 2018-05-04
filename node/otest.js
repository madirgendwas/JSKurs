var fs      = require ('fs');

var xy = [{}];


xy[0].name ="xname";
xy[1].name ="yname";
console.log(xy);
fs.writeFile("xy", JSON.stringify(xy), function(){
});

var o = {
    l:[{
        h:[{
            s:[{}]
        }]
    }]
}; // linen

// var l = [{}]; // linen
// var h = [{}]; // haltestellen
// var s = [{}]; // stege

// l.h = h;
// l.h.s = s;

// lade Ubahnen

o.l[0].name = "U1";
o.l[0].nummer = "556855";

o.l[0].h[0].name = "Abesbach";
o.l[0].h[0].lat = "458";

o.l[0].h[0].s[0].richtung = "H";
o.l[0].h[0].s[0].reihenfolge = 1;
o.l[0].h[0].s[0].rbl = "4711";
o.l[0].h[0].s[0].lat = "459";
o.l[0].h[0].s[0].lon = "460";

o.l[1] = '';
o.l[1].name = "U2";
o.l[1].nummer = "556857";

fs.writeFile("test", JSON.stringify(o), function(){
});
