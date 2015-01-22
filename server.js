/**
 * Created by Shachar on 1/22/2015.
 */
var http = require('http'),
    https = require('https'),
    fs = require('fs'),
    express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'
    ,{maxAge:86400000} //1 day
));


var port = 8080;
var server = http.createServer(app).listen(port);
console.log('HTTP listening to port ' + port);

var acceptConnection = true;

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8081,
        verifyClient:function(info,next){
            if(acceptConnection) next(true,200);
        else next(false)
        }});

wss.on('connection', function connection(ws) {
    console.log("connected" + ws);
    setTimeout(function(){
        ws.close();
        acceptConnection = false;
    },5000)
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});