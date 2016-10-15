angular.module('pong', []);
angular.module("pong")
.controller("CanvasController", CanvasController);
function CanvasController (){
    var vm = this;
    vm.start = function(){
       pong();
    }
}

