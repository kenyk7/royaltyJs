(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $urlRouterProvider.otherwise('/');
  }

})();
