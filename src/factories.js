angular.module('DicormoApp')
  .factory('AuthService', ['$http', function ($http) {
    var authService = {};
    var url = 'http://104.236.42.145/app/login/auth'

    authService.login = function (credentials) {

      return $http
        .post(url, credentials)
        .then(function (res) {
          console.log(res);
        });
    };

    return authService;
  }])
  .factory('Blog', ['$resource', function ($resource) {
    return $resource('http://dicormo.com/wp-json/posts/:id?filter[posts_per_page]=3', {id: '@id'});
  }])
  .factory('Twitter', ['$http', function ($http) {
    var url = 'http://104.236.42.145/app/twitter';
    return {
      get: function (callback) {
        $http.get(url).success(function (data) {
          callback(data);
        });
      }
    };
  }])
  .factory('Facebook', ['$http', function ($http) {
    var url = 'http://104.236.42.145/app/facebook';
    return {
      get: function (callback) {
        $http.get(url).success(function (data) {
          callback(data);
        });
      }
    };
  }]);