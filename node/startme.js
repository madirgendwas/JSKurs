var fs = require ("fs");
var cp = require ("child_process");

var file = "server-express.js";
var server = cp.fork(file); // starte den server
console.log("first time start");
fs.watchFile(file, function(){
    server.kill();
    console.log("stop service");
    server = cp.fork(file);
    console.log("start service");

})
