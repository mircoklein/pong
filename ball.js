
var ball = (function () {

    var acceleration;




    return {changeSpeed: changeSpeed, init: init}
    function init (_acceleration){
    acceleration = _acceleration;
    };


    function changeSpeed(direction, ballSpeedX, x) {
        if (direction !== 0) {
            if (ballSpeedX === -5 || ballSpeedX === -10){
                return -10;
            }

             if (ballSpeedX === 5 || ballSpeedX === 10){
                return 10;
            }
            

        } else {
            if (ballSpeedX === 10 || ballSpeedX === 5){
                return 5
            }

            if (ballSpeedX === -10 || ballSpeedX === -5){
                return -5
            }
        }

    }

})();