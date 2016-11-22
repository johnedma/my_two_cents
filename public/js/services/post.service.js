(function() {
  angular.module('two-cents')
      .factory('PostService', PostService);

  PostService.$inject = ['$http'];

  function PostService($http){
    var posts = [];
    var baseUrl = '/posts/';
    init();
    return {
      getAll: getAll,
      getOne: getOne,
      create: create,
      update: update,
      delete: deleteOne
    };

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
    function getOne(id){}
    function create(newPost){
      $http.post(baseUrl, newPost)
          .then(function(response){
            init();
          })
          .catch(function(error){
            console.log(error);
          });
    }
    function update(id, newPostData){}
    function deleteOne(id){}
  }
}());
