(function() {
  angular.module('two-cents')
      .controller("MainController", MainController);

  MainController.$inject = ['$scope', 'PostService'];

  function MainController($scope, PostService){
    $scope.posts = PostService.getAll();
    $scope.create = create;
    $scope.updatePost = updatePost;
    $scope.delete = deleteOne; //cant be called just id one internal right one dom left
    $scope.getOne = getOne;
    $scope.getSelectedPost = getSelectedPost;

    function getOne(id){ //wrapped in function so we can call on button click
      PostService.getOne(id);
    }

    function getSelectedPost(id){
      $scope.selectedPost = PostService.getSelectedPost();

    }

    $scope.$watch(function(){
      return PostService.getAll();
    }, function(){
      $scope.posts = PostService.getAll();
    });
    function create(newPost){
      PostService.create(newPost);
      $scope.newPost = {}; //clear the form fields when the function runs
    }
    function updatePost(id, updatedPost){
      PostService.update(id, updatedPost);
      $scope.updatedId = '';
      $scope.updatedPost = {};
    }
    function deleteOne(id){
      PostService.delete(id);
      $scope.deleteID = '';
    }
  }

}());
