var express = require("express");
var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.use('/client', express.static(__dirname + '/client'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.post('/msg', function(req, res){
  var message = req.body.message;
  if (message){
    // echo back the message
    res.send(200, {'message': message })
  }
  else{
    // bad request
    res.send(400)
  }
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
