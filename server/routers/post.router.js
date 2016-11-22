var express = require('express');
var router = express.Router();
var Post = require('../models/post.model.js');

router.get('/posts', function(req, res){
  Post.find({}, function(err, posts){
    if(err){
      return res.status(500).json({
        msg: err //only for pre production
      });
    }
    return res.status(200).json({
      posts: posts
    });
  });
});

router.get('/posts/:id', function(req, res){
  Post.find({_id: req.params.id}, function(err, post){
    if(err){
      return res.status(500).json({
        msg: err
      });
    }
    return res.status(200).json({
      post: post
    });
  });
});
router.post('/posts', function(req, res){
  var post = new Post(req.body);
  post.postDate = new Date();
  post.summary = req.body.body.slice(0, 100) + '...'; //requests json body and the bodyy attribute within it
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

router.put('/posts/:id', function(req, res){ //ask why this is like this
  Post.findOneAndUpdate({_id: req.params.id}, req.body, function(err, post){
    if(err){
      return res.status(500).json({
        msg: err
      });
    }
    return res.status(200).json({
      msg: oldPost
    });
  });
});
router.delete('/posts/:id', function(req, res){
  Post.findOneAndRemove({_id: req.params.id}, function(err, deletedPost){
    if(err){
      return res.status(500).json({
        msg: err
      });
    }
    return res.status(200).json({
      msg: deletedPost
    });
  });
});


module.exports = router;
