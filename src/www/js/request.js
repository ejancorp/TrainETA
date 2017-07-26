(function() {

  'use strict';

  angular.module('starter').factory('AppFactory', ['$http', '$q', AppFactory]);

  function AppFactory($http, $q) {

    return {
      getMetro: getMetro
    };

    function getMetro() {

      var d = $q.defer();
      $http.get('data/metro.json').then(function(response) {
        d.resolve(response.data);
      }, function(status) {
        d.reject(status);
      });
      return d.promise;

    }

  };

})();
