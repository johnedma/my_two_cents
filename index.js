var express = require('express');
var server = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./config.js').mongoURI;

mongoose.connect(mongoURI); //establish the connection to the mongo database

server.get('/', function(req, res){
  res.send('I am working!');
});


server.listen(port, function(){
  console.log('Now listening on port...', port);
});
