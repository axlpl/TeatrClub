import angular from 'angular';

angular
  .module('TeatrClubTickets')
  .config(/* @ngInject */ ($stateProvider, BASE_URL) => {
    $stateProvider
      .state('main.tickets', {
        url: 'tickets',
        abstract: true
      })
      .state('main.tickets.get', {
        url: '/get',
        views: {
          'main@': {
            templateUrl: 'app/tickets/views/get.html',
            controller: 'TicketsController as Tickets'
          }
        }
      });
  });
