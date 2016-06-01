(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('app.home', {
        title: 'Home',
        url: '/',
        templateUrl: 'app/modules/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        active: 'main',
        authenticate: false
      });
  }

})();
