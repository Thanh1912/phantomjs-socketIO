var phantomSocket = require('../index.js');
var fs = require('fs');
var system = require('system');
var simpleJsPath = system.args[0];

phantomSocket.initialize('http://localhost:3000', function() {
    var count = 0;
    phantomSocket.on('messageFromNode', function(data) {
        console.log('Message from node received', data);
        phantomSocket.emit('messageFromPhantom', count);
        count++;
    });

});