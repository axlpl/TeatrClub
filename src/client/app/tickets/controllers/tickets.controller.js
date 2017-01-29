import angular from 'angular';

angular
  .module('TeatrClubTickets')
  .controller('TicketsController', /* @ngInject */ function (Facebook, FormValidation, Tickets, $q, LANG, $scope) {
  	this.getFreeTicket = getFreeTicket.bind(this);
  	this.facebookSteps = facebookSteps.bind(this);
    this.hasError = FormValidation.hasError;

    this.ticketQR = '';

    this.hashasObtainFreeTicket = false;
    this.hasClickedOnSubmit = false;
  	this.canObtainFreeTicket = false;
  	this.showLoginInfo = false;
  	this.showLikeDialog = false;

  	this.model = {
  		name: ''
  	};

  	this.facebookSteps();

  	function facebookSteps() {
	  	this.showLoginInfo = false;
	  	this.showLikeDialog = false;

	    Facebook.login((response) => {
	    	if (response.status != 'connected') {
	    		this.showLoginInfo = true;
	    		$scope.$digest();
	    		return 'error';
	    	}

	    	Facebook
	    		.me()
	    		.then((response) => {
	    			this.model = response;
	    			return Tickets.get(this.model.id, 1);
	    		})
	    		.then((response) => {
	    			if (response.data.message === 'ticked_already_created') {
    					this.hasObtainFreeTicket = true;
    					this.ticketQR = response.data.data;

	    				return $q.reject();
	    			} else {
	    				return Facebook.like('1073716242651784');
	    			}
	    		})
	    		.then((response) => {
	    			if (response.data.length >= 1) {
	    				Facebook.share();
	    			} else {
	    				Facebook.reParse();
	    				Facebook.likeCheck(() => {
	    					this.facebookSteps();
	    				})
	    				this.showLikeDialog = true;
	    				return $q.reject();
	    			}
	    		})
	    		.then((response) => {
		            this.canObtainFreeTicket = true;

		            if (response && response.post_id) {
		                this.canObtainFreeTicket = true;
		            } else {
		                console.log('share needed');
		            }
	    		})
	    		.catch((error) => {
	    			console.log(error)
	    		})
	    });
    }

    function getFreeTicket(isValid) {
    	this.hasClickedOnSubmit = true;
    	if (isValid) {
    		Tickets
    			.add(this.model)
    			.then((response) => {
    				this.hasObtainFreeTicket = true;
					this.ticketQR = response.data.data;

    				alert(response.data.message);
    			})
    	}
    }
  });