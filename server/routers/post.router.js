var express = require('express');
var router = express.Router();
var Post = require('../models/post.model.js');

router.get('/posts', function(req, res){
  Post.find({}, function(err, posts){
    if(err){
      return res.status(500).json({
        msg: err
      });
    }
    return res.status(200).json({
      posts: posts
    });
  });
});
router.get('/posts/:id', function(req, res){});
router.post('/posts', function(req, res){
  var post = new Post(req.body);
  post.postDate = new Date();
  post.summary = req.body.body.slice(0, 100) + '...';
  post.save(function(err){
    if(err){
      return res.status(500).json({
        msg: err
      });
    }
    return res.status(201).json({
      msg: 'Success!'
    });
  });
});
router.put('/posts/:id', function(req, res){});
router.delete('/posts/:id', function(req, res){});


module.exports = router;
