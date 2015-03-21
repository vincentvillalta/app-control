angular.module('DicormoApp')
  .controller('LoginCtrl', ['$scope', '$ionicLoading', 'AuthService', function ($scope, $ionicLoading, AuthService) {
    var _form = null;
    $scope.credentials = {
      username: '',
      password : ''
    };
    $scope.credentialsDefault = {
      username: '',
      password : ''
    };


    $scope.login = function(form) {
      _form = form;
      if(form.$valid) {
        $scope.doLogin();
      }
    };

    $scope.doLogin = function() {
      $ionicLoading.show({template: 'Cargando...'});
      AuthService.login($scope.credentials)
        .then(function ( user ) {
          alert('Bienvenido : ' + user.name );
        }, function ( ) {
          alert('Error al ingresar, intenta nuevamente');
          $ionicLoading.hide();
          _form.$setPristine();
          $scope.credentials = $scope.credentialsDefault;

        });
    }

  }])
  .controller('FeedCtrl', ['$scope', 'Twitter', 'Facebook', 'Blog', function ($scope, Twitter, Facebook, Blog) {
    $scope.tweets = [];
    $scope.statuses = [];

    Twitter.get(function (data) {
      $scope.tweets = data;
    });

    Facebook.get(function (data) {
      $scope.statuses = data;
    });

    $scope.posts = Blog.query();

  }])
  .controller('PostCtrl', ['$scope', '$stateParams', 'Blog', function ($scope, $stateParams, Blog) {
    var postId = $stateParams.id;
    var post = Blog.get({id: postId}, function () {
      $scope.post = post;
    });
  }]);
