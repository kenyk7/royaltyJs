(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .config(config);

  /** @ngInject */
  function config($logProvider, RestangularProvider, appConstants, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // API url
    RestangularProvider.setBaseUrl(appConstants.API);

    /**
     * Headers to send with every API request
     */
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json'
    });

    /**
     * Set cache for API calls
     * @param {[type]} {cache: true} [description]
     */
    RestangularProvider.setDefaultHttpFields({cache: true});

    // custom config toastr
    angular.extend(toastrConfig, {
      allowHtml: true,
      positionClass: 'toast-bottom-center',
      progressBar: true,
      preventDuplicates: true,
      timeOut: 3000
    });
    
  }

})();
