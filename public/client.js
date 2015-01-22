/**
 * Created by Shachar on 1/22/2015.
 */
function createSocket(){
    var socket = new WebSocket('ws://localhost:8081');
    socket.onclose = function (e) {
        setTimeout(createSocket,10000);
    };

    socket.onerror = function (error) {
        console.log('oh no! can\'t connect');
    };

    socket.onopen = function () {
        console.log('yay got connection');
    };
}

createSocket();