(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, mainService, Restangular) {
    var vm = this;

    /**
     * INITIALIZATIONS
     *
     * We define here initial states for variables to be used both
     * on this controller as on the view.
     */

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.showToastr = showToastr;

    vm.todo = [];

    vm.data = mainService.data;
    
    // load functions
    activate();

    /**
     * END INITIALIZATIONS
     */
    
    /**
     * FUNCTIONS CALLED FROM VIEW
     *
     * Every function called from the view to run any action
     * is defined here.
     */
    
    // get all todo
    vm.getTodo = function () {
      mainService.getTodo().then(function(response){
        vm.todo = Restangular.stripRestangular(response);
      }, function(){

      });
    };
    vm.getTodo();

    function activate() {
      getWebDevTec();

      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
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
