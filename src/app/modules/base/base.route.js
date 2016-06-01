(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'app/modules/base/base.html',
        controller: 'BaseController',
        controllerAs: 'baseApp',
        authenticate: true
      });
  }

})();
