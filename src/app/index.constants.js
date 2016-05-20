/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .constant('appConstants', {
      'API': 'http://localhost:8080/1'
    })
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
