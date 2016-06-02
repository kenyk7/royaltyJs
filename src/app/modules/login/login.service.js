(function() {
    'use strict';

    angular
      .module('royaltyJs')
      .factory('loginService', loginService);

    /** @ngInject */
    function loginService(localStorageService, Restangular, $q, $state){
        var loginServiceFactory = {},
            loginAPI = Restangular.all('login');

        var _authentication = {
            isAuth: false,
            user_info: ''
        };

        var _login = function(loginData){
            var deferred = $q.defer();

            loginAPI.post(loginData).then(function(response) {
                localStorageService.set('authorizationData', {
                    token: response.access_token,
                    user_info: response.user_info
                });

                _authentication.isAuth = true;
                _authentication.user_info = response.user_info;

                deferred.resolve(response);
            }, function(err) {
                _logOut();

                deferred.reject(err);
            });

            return deferred.promise;
        };

        var _logOut = function(){
            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.user_info = '';

            $state.transitionTo('login');
        };

        var _fillAuthData = function(){
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.user_info = authData.user_info;
            }
        };

        loginServiceFactory.login = _login;
        loginServiceFactory.logOut = _logOut;
        loginServiceFactory.fillAuthData = _fillAuthData;
        loginServiceFactory.authentication = _authentication;

        return loginServiceFactory;
    }
})();
