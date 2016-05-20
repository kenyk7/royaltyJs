(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .run(setHTMLTitle);

  angular
    .module('royaltyJs')
    .run(authServiceRun);

  angular
    .module('royaltyJs')
    .run(authControlService);

  angular
    .module('royaltyJs')
    .run(authInterceptService);


  /** @ngInject */
  function setHTMLTitle($rootScope){
    $rootScope.$on('$destroy', $rootScope.$on('$stateChangeStart', function(event, currentRoute) {
      $rootScope.title = currentRoute.title;
    }));
  }


  /** @ngInject */
  function authServiceRun(loginService){
    loginService.fillAuthData();
  }

  /**
   * Check if the user has a valid auth token to know
   * if it is logged in in every change of route
   */
  /** @ngInject */
  function authControlService($rootScope, $state, loginService){
    var authState = loginService.authentication.isAuth;

    $rootScope.$on('$destroy', $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.authenticate && !authState){
        // User isn’t authenticated
        $state.transitionTo('login');
        event.preventDefault();
      }
    }));
  }

  /** @ngInject */
  function authInterceptService(Restangular, localStorageService, $location){
    /**
     * Set always the access_token on every API request
     */
    Restangular.setRestangularFields({
      access_token: 'access_token.$token'
    });
    Restangular.addFullRequestInterceptor(function(element, operation, route, url, headers, params) {
      var authData = localStorageService.get('authorizationData');

      if (authData) {
        return {
          element: element,
          params: params,
          headers: angular.extend(headers, {access_token: authData.token})
        };
      }
    });

    /**
     * Redirect to home if API response state is 401
     * User is not logged in
     */
    Restangular.setErrorInterceptor(function(response) {
      if(response.status === 401) {
        $location.path('/');
      }
      return true; // error not handled
    });
  }

})();
