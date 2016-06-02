(function() {
    'use strict';

    angular
      .module('royaltyJs')
      .factory('mainService', mainService);

    /** @ngInject */
    function mainService(Restangular,$q){
        var mainServiceFactory = {},
            todo = Restangular.all('todo');

        var data = [
            {
                name: "Yeoman"
            },
            {
                name: "Gulp"
            },
            {
                name: "Angular"
            }
        ];

        /**
         * Get groups
         */
        var _getTodo = function() {
          var deferred = $q.defer();

          todo.getList().then(function(response) {
            deferred.resolve(response);
          }, function(err) {
            deferred.reject(err);
          });

          return deferred.promise;
        };

        mainServiceFactory.data = data;
        mainServiceFactory.getTodo = _getTodo;

        return mainServiceFactory;
    }
})();
