var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  cover: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String, //this type will change to user object
    required: true
  },
  postDate: {
    type: Date,
    required: true
  },
  summary: {
    type: String,
    required: true
  }
});

postSchema.pre('findOneAndUpdate', function(){
  this.update({},{ $set: { postDate: new Date() } }); //updates date
});

postSchema.post('findOneAndUpdate', function(){ //need to reference "post" b/c it's not just raw data, we're referencing the post
  post.summary({}, { summary: this.body.splice(0, 100) + '...'}); //updates the summary
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
