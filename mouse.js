var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var mouse = {
  y: 0,
  x: 0,
  locked: true
};




document.addEventListener('pointerlockchange', lockChangeAlert, false);

function updatePosition (event) {
  mouse.x += event.movementX;
  mouse.y += event.movementY;
}

function lockChangeAlert() {
  if(document.pointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", updatePosition, false);
  } else {
    console.log('The pointer lock status is now unlocked');      
    document.removeEventListener("mousemove", updatePosition, false);
  }
}

canvas.addEventListener('click', function togglePointer() {
    mouse.locked = !mouse.locked;
    canvas.requestPointerLock();
});

