import angular from 'angular';

angular
  .module('TeatrClubCommon')
  .factory('Facebook', /* ngInject */ ($q) => {
    return {
        login,
        like,
        me,
        share,
        init,
        reParse,
        likeCheck
    }

    function reParse() {
        FB.XFBML.parse();
    };

    function likeCheck(cb) {
        FB.Event.subscribe('edge.create', cb);
    }

    function init() {
        console.log('cc');
        const deferred = $q.defer()
        
        return deferred.promise;
    };

    function like(pageId) {
        const deferred = $q.defer()
        FB.api(`/me/likes/${pageId}`, function(response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    };

    function login(callback) {
        FB.getLoginStatus((response) => {
            if (response.status === 'connected') {
                callback(response);
            }
            else {
                FB.login((res) => callback(res), {scope: 'public_profile,user_likes'});
            }
        });      
    };

    function me() {
        const deferred = $q.defer();
        FB.api('/me', {
            fields: 'last_name,name'
        }, (response) => {
            if (!response || response.error) {
                deferred.reject('Error occured');
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    };

    function share() {
        const deferred = $q.defer();
        FB.ui({
            method:  'share',
            href:    'https://teatrclub.pl',
            hashtag: 'TeatrClub',
            quote: 'Odbieram darmowa wejsciowke!!!'
        }, (response) => {
            if (!response || response.error) {
                deferred.reject('Error occured');
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }
});