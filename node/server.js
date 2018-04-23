var http = require ('http');
var fs   = require ('fs');

http.createServer(function(request, response){

    if (request.url == "/")    {
        response.writeHead(200, {"Content-Type":"text/html"});
        fs.readFile('../test.html', function(err, data){
            response.end(data);
        });


    }
    else {
        response.writeHead(404);
        response.end("gibts nicht");
    }

    console.log("anfrage an den Server!");


}).listen(12456);
console.log("Server ist da");
console.log("URL : http://localhost:12456" );
