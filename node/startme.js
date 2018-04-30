var fs = require ("fs");
var cp = require ("child_process");

var file = "server-express.js";
var file1 = "server-expressort.js";
var file2 = "server-jet.js";
var file3 = "server-ubahn.js";

// var server = cp.fork(file); // starte den server
// var server1 = cp.fork(file1); // starte den server
//var server2 = cp.fork(file2); // starte den server
var server3 = cp.fork(file3); // starte den server

console.log("first time start");
// fs.watchFile(file, function(){
//     server.kill();
//     console.log("stop service");
//     server = cp.fork(file);
//     console.log("start service");
// })
//
// fs.watchFile(file1, function(){
//     server1.kill();
//     console.log("stop service1");
//     server1 = cp.fork(file1);
//     console.log("start service1");
// })
//
// fs.watchFile(file2, function(){
//      server2.kill();
//      console.log("stop service2");
//      server2 = cp.fork(file2);
//      console.log("start service2");
//  })

 fs.watchFile(file3, function(){
      server3.kill();
      console.log("stop service3");
      server3 = cp.fork(file3);
      console.log("start service3");
  })
