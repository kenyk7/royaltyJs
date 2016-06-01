(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .controller('BaseController', BaseController);

  /** @ngInject */
  function BaseController($log) {
    var vm = this;

    vm.creationDate = 1463712555475;

    $log.info('base');

  }
})();
