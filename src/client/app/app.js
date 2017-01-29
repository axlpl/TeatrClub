/*globals FB */

import angular from 'angular';
import 'angular-ui-router';
import './common/entry.js';
import './homepage/entry.js';
import './tickets/entry.js';
import 'angular-loading-bar';

angular
  .module('TeatrClub', [
    'ui.router',
    'TeatrClubCommon',
    'TeatrClubHomepage',
    'angular-loading-bar'
  ])
  .config(/* @ngInject */ (cfpLoadingBarProvider) => {
    cfpLoadingBarProvider.includeSpinner = false;
  })
  .run(/* @ngInject */ ($window) => {
    $window.fbAsyncInit = function() {
      FB.init({
          appId      : '839978052799850',
          xfbml      : true,
          version    : 'v2.8'
      });
      FB.AppEvents.logPageView();
    };
  });