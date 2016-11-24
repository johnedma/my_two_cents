(function() {
  angular.module('two-cents')
      .factory('PostService', PostService);

  PostService.$inject = ['$http'];

  function PostService($http){
    var posts = [];
    var selectedPost;
    var baseUrl = '/posts/';
    init();
    return {
      getAll: getAll,
      getOne: getOne,
      create: create,
      update: update,
      delete: deleteOne,
      getSelectedPost: getSelectedPost
    };

    function getSelectedPost(){
      return selectedPost;
    }

    function init(){
      $http.get(baseUrl)
          .then(function(response){
            posts = response.data.posts;
          })
          .catch(function(err){
            console.log(err);
          });
    }
    function getAll(){
      return posts;
    }
    function getOne(id){
      $http.get(baseUrl + id)
          .then(function(response){
            selectedPost = response.data.post[0]; //if this returns an empty array it will return an error. selectedPost will bring back a collection so we use [0] to select the first one
          })
          .catch(function(error){
            console.log(error);
          });
    }
    function create(newPost){
      $http.post(baseUrl, newPost)
          .then(function(response){
            init();
          })
          .catch(function(error){
            console.log(error);
          });
    }
    function update(id, newPostData){
      $http.put(baseUrl + id, newPostData)
        .then(function(response){
          init();
        })
        .catch(function(err){
          console.log(err);
        });
    }
    function deleteOne(id){
      $http.delete(baseUrl + id)
        .then(function(response){
          init();
        })
        .catch(function(err){
          console.log(err);
        });
    }
  }
}());
