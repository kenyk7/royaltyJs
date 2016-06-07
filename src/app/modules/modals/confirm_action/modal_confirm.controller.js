(function() {
  'use strict';

  angular
    .module('royaltyJs')
    .controller('ModalConfirmController', ModalConfirmController);

  /** @ngInject */
  function ModalConfirmController($uibModalInstance, $uibModal, data, toastr, todoService, $log) {
    var vm = this;

    // close modal
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    // data received
    vm.index = data.index;
    vm.type = data.type;
    vm.dataId = data.dataId;
    vm.info = data.info;

    $log.debug(data);

    /**
     * Remove a message format
     */
    vm.delete = function(){
      // type acept: todo

      // delete todo
      if(vm.type === 'todo'){
        todoService.deleteTodo(vm.dataId).then(function() {
          $uibModalInstance.close();
        }, function(err) {
          $log.debug(err);
          vm.cancel();
        });
      }

    };

  }
})();
