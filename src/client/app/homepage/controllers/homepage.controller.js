import angular from 'angular';

angular
  .module('TeatrClubHomepage')
  .controller('HomepageController', /* @ngInject */ function (cfpLoadingBar, $timeout, $document, $window) {
  	console.log('HomepageController');
    this.init = init.bind(this);

    const document = $document[0];

    this.init();

    function init() {
      $window.Connections();
      $window.CountDownTimer('02/03/2017 09:0 PM', 'countdown');
	    cfpLoadingBar.start();

	    $timeout(() => {
	    	cfpLoadingBar.complete();
	    	const video = document.querySelector('video');
	    		
    		video	
	    		.style
	    		.display = 'block';

	    	video.play();
	    }, 2000);
    }
  });