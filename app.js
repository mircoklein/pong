/*globals angular */

angular.module('pong', []);
angular.module('pong')
.controller('CanvasController', CanvasController);
function CanvasController (){
    var vm = this;
    vm.disableRadios = false;
    vm.start = function(){
       pong();
       vm.disableRadios = true;
    };
}

