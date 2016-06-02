(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .controller('TodoController', TodoController);

  /** @ngInject */
  function TodoController(Restangular, todoService, $log) {
    var vm = this;
    /**
     * INITIALIZATIONS
     *
     * We define here initial states for variables to be used both
     * on this controller as on the view.
     */
    
    vm.total_pages = []; // Value set from header value on response
    vm.current_page = 1;
    vm.todo = [];
    
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
      todoService.getTodo(true, vm.current_page).then(function(response){
        vm.todo = Restangular.stripRestangular(response);
        vm.total_pages = _.times(todoService.getTotalPages());
      }, function(){

      });
    };
    vm.getTodo();

    $log.debug(vm.todo);

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
