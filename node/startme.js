var fs = require ("fs");
var cp = require ("child_process");

var file = "server-express.js";
var file1 = "server-expressort.js";

var server = cp.fork(file); // starte den server
var server1 = cp.fork(file1); // starte den server
console.log("first time start");
fs.watchFile(file, function(){
    server.kill();
    console.log("stop service");
    server = cp.fork(file);
    console.log("start service");
})

fs.watchFile(file1, function(){
    server1.kill();
    console.log("stop service1");
    server1 = cp.fork(file1);
    console.log("start service1");
})
