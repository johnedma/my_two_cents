(function() {
  angular.module('two-cents')
      .controller("MainController", MainController);

  MainController.$inject = ['$scope'];

  function MainController($scope){
    $scope.message = "I work!"
    $scope.stuff = stuff;

    function stuff(){
      alert('I work also');
    }
  }
}());
