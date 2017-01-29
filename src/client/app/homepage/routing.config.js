import angular from 'angular';

angular
  .module('TeatrClubHomepage')
  .config(/* @ngInject */ ($stateProvider, BASE_URL) => {
    console.log('routing');
    $stateProvider
      .state('main.homepage', {
        url: `^${BASE_URL}`,
        views: {
          'main@': {
            templateUrl: 'app/homepage/views/homepage.html',
            controller: 'HomepageController as Homepage',
            resolve: {
              contacts: /* @ngInject */ () => { console.log('ddd'); }
            }
          }
        }
      })
  });
