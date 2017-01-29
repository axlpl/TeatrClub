import angular from 'angular';

angular
  .module('TeatrClub')
  .config(/* @ngInject */ ($stateProvider, $urlRouterProvider, $locationProvider, BASE_URL) => {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    // define routes
    $stateProvider
      .state('main', {
        url: BASE_URL,
        abstract: true
      });
  });
