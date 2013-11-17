var express = require("express");
var app = express();
var http = require('http');
var app = express();
var socket_io = require('socket.io');


// catch all exception for saving the node.js server from crashing
// disable when debugging if the information logged is not enough
// and let the server crash
process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Node NOT Exiting...");
});

// configuration of the node application
var appPort = 5000;
var appHost = 'localhost';



app.configure(function(){
    app.set('port', appPort);
    app.set('views', __dirname + '/app/server/views');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    app.locals.apphost = appHost;
    app.locals.appport = appPort;
    //app.use(express.favicon(__dirname + '/app/public/img/favicon.ico'));

    app.use(express.logger('development'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
    app.use(express.static(__dirname + '/app/public'));
});


app.configure('development', function(){
    app.use(express.errorHandler());
});

app.configure('production', function(){
    //code minified and compress for production
});

require('./app/server/router')(app);

http.createServer(app.handle.bind(app)).listen(app.get('port'));



app.use('/public', express.static(__dirname + '/public'));


