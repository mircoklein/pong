function pong (){
  /*globals predictPosition doAI*/

var canvas = document.getElementById('pong');
var ctx = canvas.getContext('2d');
var x = 20;
var y = canvas.height/2;
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width,  canvas.height);
var color = '#ff0000';
var radius = 10;
var dx = 2;
var dy = -0.5;
var paddleHeight =   75,
    paddleWidth = 10,
    paddleR_X = (canvas.width-paddleWidth),
    paddleL_Y=(canvas.height-paddleHeight)/2,
    paddleL_X=(canvas.width-canvas.width),
    paddleR_Y=(canvas.height-paddleHeight-paddleWidth)/2;
var
    ballIsMoving;
var score = 0;
var score2 = 0;
var leftIsActive = true;
var keys = {
	leftUp: false,
	leftDown:  false, 
	rightUp: false,
	rightDown: false 
};
var ballPosition = [];
var counter = 0;
var timeLimit = 40;
var timeDifference = 5;
var posDifference = 25;

var predictedPosition;
var resultPosition;
var paddleAiIsMoving = false;
var direction;
var aiStepSize;
var aiDx;
var aiDy;

var mouse = {
  y: 0,
  x: 0,
  locked: true
};

document.addEventListener('pointerlockchange', lockChangeAlert, false);

function lockChangeAlert(){
  if(document.pointerLockElement === canvas){
    document.addEventListener("mousemove", updatePosition, false);
  }else{
    document.removeEventListener("mousemove", updatePosition, false);
  }
}

canvas.addEventListener('click', function togglePointer() {
  mouse.locked = !mouse.locked;
  canvas.requestPointerLock();
});

function updatePosition (event) {
  mouse.y += event.movementY;
}

document.addEventListener('keydown', makeKeyHandler(39, 37, 'leftUp', 'leftDown', keys, true), false);
document.addEventListener('keyup', makeKeyHandler(39, 37, 'leftUp', 'leftDown', keys, false), false);
document.addEventListener('keydown', keydHandler, false);

// document.addEventListener('keyup', keyuHandler, false);



function drawBall () {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
  
}


function drawPaddle (X,Y) {
  ctx.beginPath();
  ctx.rect( X, Y, paddleWidth, paddleHeight);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function makeKeyHandler (down, up, upProp, downProp, obj, state){
	return function (e) {
		if (e.keyCode === down) {
			obj[downProp] = state;
		}
		if (e.keyCode === up) {
			obj[upProp] = state;
		}
	}; 
}



// function keyxHandler (e) {
//   if(e.keyCode === 38) {
//     upPressed = true;
//   }
  
//   if(e.keyCode === 40) {
//     downPressed = true;
//   }
// }

// function keyyHandler (e) {
//   if(e.keyCode === 38) {
//     upPressed = false;
//   }
  
//   if(e.keyCode === 40) {
//     downPressed = false;
//   }
// }

function keydHandler (e) {
	if(e.keyCode === 32){
	   ballIsMoving = true;
	}
}




 function drawPath () {
 	ctx.beginPath();
 	ctx.moveTo(canvas.width/2, 0);
 	ctx.lineTo(canvas.width/2, canvas.height);
 	ctx.strokeStyle = color;
 	ctx.stroke();
 }
 
function drawScore () {
	ctx.beginPath ();
	ctx.font = '16px Arial';
	ctx.fillStyle = '#000000';
	ctx.fillText('Score:' + score, 20, 20);
	ctx.closePath();
}

function drawScore2 () {
	ctx.beginPath();
	ctx.font = '16px Arial';
	ctx.fillStyle = '#000000';
	ctx.fillText('Score:' + score2, 640, 20);
	ctx.closePath();
}


function draw () {
  counter = counter + 1;
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPath();
  drawScore ();
  drawScore2();
  if (ballIsMoving === true){
  	x = x + dx; 
    y = y + dy;
	}
  drawPaddle(paddleR_X, paddleR_Y);
  drawPaddle(paddleL_X, paddleL_Y);
  paddleL_Y = mouse.y;

  if (ballIsMoving) {
    ballPosition.push({x: x, y: y});
  }

  if (ballPosition.length === 2) {
    predictedPosition = predictPosition(paddleR_X, ballPosition[0], ballPosition[1]);
    ballPosition = [];
    if (aiDx - dx !== 0 || aiDy - dy !== 0) paddleAiIsMoving = false;
  }

  if (predictedPosition !== undefined && paddleAiIsMoving === false) {
    resultPosition = doAI({
      yPos: predictedPosition.y,
      counter: counter,
      timeLimit: timeLimit,
      timeDifference: timeDifference,
      posDifference: posDifference
    });

    if (paddleR_Y > resultPosition) direction = -1;
    if (paddleR_Y < resultPosition) direction = 1;

    aiDx = dx;
    aiDy = dy;
  }


  if (resultPosition !== undefined && paddleR_Y !== resultPosition) {
    paddleAiIsMoving = true;
    var stepDifference = Math.abs(paddleR_Y - resultPosition);
    if (stepDifference < 5) {
      aiStepSize = stepDifference;
    } else {
      aiStepSize = 5;
    }

    paddleR_Y = paddleR_Y + (aiStepSize * direction);
  }

 

  
  if(ballIsMoving === false || ballIsMoving === undefined) {
  	if (leftIsActive === true ){

  		y = paddleL_Y + paddleHeight/2;
  		x = paddleL_X + radius + 12;
  		
  	}else{
  		y = paddleR_Y + paddleHeight/2;
  		x = paddleR_X - 12;
  		
  	}

  }


  
  
  
  
  if ( y + dy > canvas.height - radius || y + dy < radius ) {
    dy = -dy;
  } 
    
   
  if( x - radius < paddleL_X + paddleWidth ) {
     if ( y < paddleL_Y + paddleHeight && y > paddleL_Y) {
		dx = -dx;
     } else {
     	score2 = score2 + 1;
        ballIsMoving = false;
        leftIsActive = false;

     }
 }

 if  ( x + radius > paddleR_X  ){
 	if ( y < paddleR_Y + paddleHeight && y > paddleR_Y ) {
 		dx = -dx;
 	} else {
 		score = score + 1;
 		ballIsMoving = false;
 	 	leftIsActive = true;
 	 	// console.log (leftIsActive);
 	}

 }
      
 

}

setInterval(draw, 10);
}