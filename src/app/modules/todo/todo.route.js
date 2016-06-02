(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('app.todo', {
        title: 'Todo',
        url: '/todo',
        templateUrl: 'app/modules/todo/todo.html',
        controller: 'TodoController',
        controllerAs: 'todo',
        active: 'todo',
        authenticate: false
      });
  }

})();
