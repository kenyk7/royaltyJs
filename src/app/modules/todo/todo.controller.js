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
    vm.listTodo = [];
    vm.todo = {};
    vm.editing_index = -1;
    
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
        vm.listTodo = Restangular.stripRestangular(response);
        vm.total_pages = _.times(todoService.getTotalPages());
        $log.debug(vm.listTodo);
      }, function(){

      });
    };
    vm.getTodo();

    // crud methods
    // add
    vm.addTodo = function(){
      todoService.addTodo(vm.todo).then(function(){
        vm.getTodo();
        vm.todo = {};
      },function(){

      });
    };
    // update
    vm.updateTodo = function($index){
      vm.todoUpdate = vm.listTodo[$index];
      todoService.updateTodo(vm.todoUpdate).then(function(){
        vm.getTodo();
        vm.editing_index = -1;
      }, function(){

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
