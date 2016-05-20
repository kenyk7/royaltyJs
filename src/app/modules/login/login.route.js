(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('login', {
        title: 'Login',
        url: '/login',
        templateUrl: 'app/modules/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        authenticate: false
      });
  }

})();
