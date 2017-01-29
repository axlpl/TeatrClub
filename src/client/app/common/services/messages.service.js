import angular from 'angular';

angular
  .module('AddressBookCommon')
  .factory('Messages', /* ngInject */ ($rootScope) => {
    return {
      init,
      clear,
      add,
      get
    };

    function init() {
      $rootScope.messages = [];
    }

    function clear() {
      init();
    }

    function add(message) {
      $rootScope.messages.push(message);
    }

    function get() {
      return [...$rootScope.messages];
    }
  });