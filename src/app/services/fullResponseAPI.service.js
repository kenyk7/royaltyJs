(function() {
    'use strict';

    angular
      .module('royaltyJs')
      .factory('RestFullResponse', RestFullResponse);

    /** @ngInject */
    function RestFullResponse(Restangular){
        return Restangular.withConfig(function (RestangularConfigurer) {
          RestangularConfigurer.setFullResponse(true);
        });
    }
})();
