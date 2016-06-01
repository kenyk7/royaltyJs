(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .directive('entelLoader', entelLoader);

  /** @ngInject */
  function entelLoader() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/loader/loader.html',
      controller: LoaderController,
      controllerAs: 'loaderSpinner',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function LoaderController() {
      // var vm = this;
    }
  }

})();
