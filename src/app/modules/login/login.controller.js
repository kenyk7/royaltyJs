(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $location, Restangular, loginService, loginMessages, $window, $timeout, toastr, spinnerService) {
    var vm = this;


    /**
     * INITIALIZATIONS
     *
     * We define here initial states for variables to be used both
     * on this controller as on the view.
     */

    vm.formData = {};
    vm.alert = {};
    vm.loginError = false;
    vm.sendingAjax = {
      button: true
    };

    /**
     * END INITIALIZATIONS
     */



    /**
     * FUNCTIONS CALLED FROM VIEW
     *
     * Every function called from the view to run any action
     * is defined here.
     */


    /**
     * Submit the form and check if login was ok
     */
    vm.loginUser = function() {
      // Block if form is not valid
      if (!$scope.loginForm.$valid) {
        toastr.error(loginMessages.error);
        return false;
      }

      vm.loginError = false;
      vm.sendingAjax.button = false;
      vm.alert = {};

      spinnerService.show('loginSpinner');
      loginService.login(vm.formData).then(function() {
          $window.location.assign("/");
        },
        function() {
          // Show error when login fails
          toastr.error(loginMessages.error, 'Error');

          spinnerService.hide('loginSpinner');

          // Initial state
          $timeout(function() {
            vm.sendingAjax = {
              button: true
            };
          }, 500);

        });
    };

    /**
     * END FUNCTIONS CALLED FROM VIEW
     */



     /**
      * DOM EVENTS HANDLED WITH ANGULAR.ELEMENT
      *
      * Every DOM event like click, toggle, addClass.. is
      * handled here.
      */



      /**
       * END DOM EVENTS HANDLED WITH ANGULAR.ELEMENT
       */
  }
})();
