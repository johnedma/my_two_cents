var express = require('express');
var server = express();
var mongoose = require('mongoose');
var postRouter = require('./server/routers/post.router.js'); //links our postrouter to indexjs
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./config.js').mongoURI;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true})); //body parser will be used in multiplaces (post and user router) so we set up in index and it used to parse info from mongoose so should start before

mongoose.connect(mongoURI); //establish the connection to the mongodatabase





server.get('/', function(req, res){
  res.send('I am working!');
});
server.use(postRouter);

server.listen(port, function(){
  console.log('Now listening on port..', port);
});
