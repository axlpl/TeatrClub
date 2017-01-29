import angular from 'angular';

angular
  .module('AddressBookCommon')
  .component('messages', {
    templateUrl: 'app/common/views/messages.html',
    controllerAs: 'MessagesList',
    controller: /* @ngInject */ function (Messages, $rootScope) {
      $rootScope.$on('$stateChangeStart', () => {
        this.messages = Messages.get();
      });
    }
  });