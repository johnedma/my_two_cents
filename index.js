var express = require('express');
var server = express();

var port = process.env.PORT || 8080;

server.get('/', function(req, res){
  res.send('I am working!');
});

server.listen(port, function(){
  console.log('Now listening on port..', port);
});
