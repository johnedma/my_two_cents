(function() {
  angular.module('two-cents')
      .controller("MainController", MainController);

  MainController.$inject = ['$scope', 'PostService'];

  function MainController($scope, PostService){
    $scope.posts = PostService.getAll();

    $scope.$watch(function(){
      return PostService.getAll();
    }, function(){
      $scope.posts = PostService.getAll();
    });
  }
}());
