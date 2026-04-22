// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//ball color and size

function Ball(x, y, velX, velY, color, size, image) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.image = image;
}

//Ball function
Ball.prototype.draw = function() {
  ctx.beginPath(); //shape is drawn on paper
  ctx.fillStyle = this.color; //what color the shape will be
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //arcshape, defined by the x, y, size, 0 degrees, and the 360 degree arc
  ctx.fill(); //finish drawing the beginPath() path, fill the area with the specified color via fillStyle
}

Ball.prototype.update = function() { //first four parts check to see if the ball has hit trhe edge, then reverses it.
  if ((this.x + this.size) >= width) { //clear
this.velX = -(this.velX);
  }
  
  if ((this.x - this.size) <= 0) { //clear
    this.velX = -(this.velX);
  }

 if ((this.y + this.size) >= height) { //clear
    this.velY = -(this.velY);
}

 if ((this.y -this.size) <= 0) { //clear
this.velY= -(this.velY);
 }

 this.x += this.velX;
 this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + balls[j].size) {
        balls[j].color = 'rgb(' +random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
      }
    }
  }
 }

let balls = [];
while (balls.length < 25) { //creates new ball instance, pushes it to the end of the balls array, only if less than 25
  let size = random(10, 20);
  let ball = new Ball (
    //ball positition always drawn at least one ball width
    //away from edge of canvas to avoid errors.
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')',
  size
);
balls.push(ball);
}

console.log(balls)

function loop() { //sets the canvas fill color to semi-transparent black, draws rectangle of color across canvas width and height(fillRect())
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //loops through all balls in the array , runs each of the ball's functions
  ctx.fillRect (0, 0, width, height); //reruns animation using requesAnimationFrame()

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect ();
  }

  requestAnimationFrame(loop);
}

loop();