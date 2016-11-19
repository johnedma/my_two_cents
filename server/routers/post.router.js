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
router.get('/posts/id', function(req, res){});
router.post('/posts', function(req, res){});
router.put('/posts/:id', function(req, res){});
router.delete('/posts/:id', function(req, res){});


module.exports = router;
