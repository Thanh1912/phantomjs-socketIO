//starting socket io server
// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function() {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('messageFromPhantom', function(data) {
        console.log('message from phantom received', data);
    });
    socket.on('disconnect', function() {
        console.log('phantom disconnected');
    });

    var count = 0;
    setInterval(function() {
        socket.emit('messageFromNode', count);
        count++;
    }, 1000);
});
//starting child phantom process
var path = require('path');
var childProcess = require('child_process');

var childArgs = [
    '--local-to-remote-url-access=true',
    path.join(__dirname, 'simple_phantom.js')
];
var child = childProcess.execFile('phantomjs', childArgs);
child.stdout.on('data', function(data) {
    console.log(data.toString());
});