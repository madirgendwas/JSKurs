var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(26893, function(){
    console.log("wifi chater");
})

app.use(express.static("static"));

app.get("/", function(request, response){
    response.sendFile(__dirname+'/d13-chat.html');
})

var io = socket(server);
var alleuser = [];

io.on('connection', function(socket){
    console.log("Neuer Gast")
    var username;

    socket.on('neueruser', function(name){
        username = name;

        io.emit('servershout',getTime() + "<em><b> " + username + " ist online</br></em>");

        var usertext = ''
        if (alleuser.length == 0){
            socket.emit('servershout', "Hi Du bist der einzige Chater")
        }
        else {
            for (i=0;i<alleuser.length;i++){
                if (username !== alleuser[i]){
                    usertext+= alleuser[i] + ", "
                }
            }
            socket.emit('servershout', "Hi " + username +". es sind noch " + alleuser.length + " User online: " + usertext)
        }
        alleuser.push(username);
    })
    socket.on('disconnect', function(){
        for (i=0;i<alleuser.length;i++){
            if (username == alleuser[i]){
                alleuser.splice(i, 1)
                i--;
            }
        }

        io.emit('servershout', getTime() + "<em><b>" + username + " ist offline</br></em>");
    })
    socket.on('userchat', function(nachricht){
        nachricht = replaceEmoji(nachricht);
        io.emit("servershout", getTime() + "User " + username + ":" + nachricht);
    })
});

var getTime = function(){
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    return hour + ":" + min + " - ";
}

var replaceEmoji = function(text){
    var newtext = text.replace(':)', '<img src="lachen.png"></img>');
    return newtext;
}
