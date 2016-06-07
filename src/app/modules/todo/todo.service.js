(function() {
    'use strict';

    angular
      .module('royaltyJs')
      .factory('todoService', todoService);

    /** @ngInject */
    /** @ngInject */
    function todoService(Restangular, RestFullResponse, $q, toastr, todoMessages){
      var todoFactory = {},
        todo = RestFullResponse.all('todo'),
        todo_removed = RestFullResponse.all('todo/removed');

      var total_pages = 0;
      var per_page = 20;

      /**
       * Get a list of todo
       */
      var _getTodo = function(paginated, page){
        var deferred = $q.defer();

        if(paginated){
          todo.getList({page: page, per_page: per_page}).then(function(response) {
            total_pages = response.headers('total_pages');
            deferred.resolve(response.data);
          }, function(err) {
            deferred.reject(err);
          });
        }else{
          todo.getList().then(function(response) {
            total_pages = response.headers('total_pages');
            deferred.resolve(response.data);
          }, function(err) {
            deferred.reject(err);
          });
        }

        return deferred.promise;
      };

      

      /**
       * Add todo
       */
      var _addTodo = function(todoObj){
        var deferred = $q.defer();

        todo.post(todoObj).then(function(response) {
          deferred.resolve(response);
          toastr.success(todoMessages.success_add);
        }, function(err) {
          deferred.reject(err);
          toastr.error(todoMessages.error_add);
        });
        return deferred.promise;
      };

      /**
       * Update the path of an existing todo
       */
      var _updateTodo = function(todoObj){
        var deferred = $q.defer();
        todo.one(todoObj.id).customPUT(todoObj).then(function(response) {
          deferred.resolve(response);
          toastr.success(todoMessages.success_update);
        }, function(err) {
          deferred.reject(err);
          toastr.error(todoMessages.error_update);
        });
        return deferred.promise;
      };

      /**
       * Delete todo
       */
      var _deleteTodo = function(todoObj){
        var deferred = $q.defer();
        todo.one(todoObj.id).remove().then(function(response) {
          deferred.resolve(response);
          toastr.success(todoMessages.success_delete);
        }, function(err) {
          deferred.reject(err);
          toastr.error(todoMessages.error_delete);
        });
        return deferred.promise;
      };

      /**
       * Get a list of todo_removed
       */
      var _getTodoRemoved = function(paginated, page){
        var deferred = $q.defer();
        
        if(paginated){
          todo_removed.getList({page: page, per_page: per_page}).then(function(response) {
            total_pages = response.headers('total_pages');
            deferred.resolve(response.data);
          }, function(err) {
            deferred.reject(err);
          });
        }else{
          todo_removed.getList().then(function(response) {
            total_pages = response.headers('total_pages');
            deferred.resolve(response.data);
          }, function(err) {
            deferred.reject(err);
          });
        }

        return deferred.promise;
      };

      /**
       * Update the path of an existing todoObjs : restore
       */
      var _restoreTodoRemoved = function(todoObj){
        var deferred = $q.defer();
        todo_removed.one(todoObj.id).customPUT(todoObj).then(function(response) {
          deferred.resolve(response);
          toastr.success(todoMessages.success_restore);
        }, function(err) {
          deferred.reject(err);
          toastr.error(todoMessages.error_restore);
        });
        return deferred.promise;
      };


      /**
       * Get the number of total pages
       */
      var _getTotalPages = function() {
        return total_pages;
      };

      todoFactory.getTodo = _getTodo;
      todoFactory.getTodoRemoved = _getTodoRemoved;
      todoFactory.addTodo = _addTodo;
      todoFactory.updateTodo = _updateTodo;
      todoFactory.deleteTodo = _deleteTodo;
      todoFactory.restoreTodoRemoved = _restoreTodoRemoved;
      todoFactory.getTotalPages = _getTotalPages;

      return todoFactory;
    }
})();
