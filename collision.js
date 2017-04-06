
var collision = (function () {
   



    //geschwindigkeit paddle Links
var acceleration,  
    radius,
    paddleHeight,
    paddleWidth;


    return { leftPaddle: leftPaddle, init: init, rightPaddle: rightPaddle };

    function init (_acceleration, _radius, _paddleHeight, _paddleWidth){
        acceleration = _acceleration;
        radius = _radius;
        paddleWidth = _paddleWidth;
        paddleHeight = _paddleHeight;
    };

    function leftPaddle(x, y, paddleL_X, paddleL_Y) {
        var output = { xCollision: false, yCollision: false };
        if (x - radius < paddleL_X + paddleWidth) { output.xCollision = true }
        if (y - radius < paddleL_Y + paddleHeight && y + radius > paddleL_Y) { output.yCollision = true }
        return output;
    };

   function rightPaddle(x, y, paddleR_X, paddleR_Y){
       var output = { xCollision: false, yCollision: false};
       if (x + radius > paddleR_X ){output.xCollision = true}
       if (y - radius < paddleR_Y + paddleHeight && y + radius > paddleR_Y){output.yCollision = true}
       return output;

   };

    

})();