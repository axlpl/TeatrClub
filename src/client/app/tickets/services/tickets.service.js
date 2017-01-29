import angular from 'angular';

angular
  .module('TeatrClubTickets')
  .factory('Tickets', /* ngInject */ ($http) => {
    return {
      add,
      get
    };

    function add(data) {
      return $http.post('/api/tickets', data);
    }

    function get(facebook_id, party_id) {
    	return $http.get(`/api/tickets/${facebook_id}/${party_id}`);
    }
  });