(function() {

  'use strict';

  angular.module('starter').controller('AppController', ['$scope', 'AppFactory', AppController]);

  function AppController($scope, AppFactory) {

    $scope.metro = {};

    $scope.loadMetro = function() {
      AppFactory.getMetro().then($scope.formatMetro);
    };

    $scope.formatMetro = function(data) {
      $scope.metro = data;
    };

    $scope.loadMetro();

  };

})();
