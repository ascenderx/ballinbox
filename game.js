const GAMEMODE_RUNNING = 1;
const GAMEMODE_PAUSED = 2;

class Game {
  constructor(canvas) {
    const FRAMERATE = 50;
    const INTERVAL = Math.floor(1000 / FRAMERATE);
    
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._hdlInput = new InputHandler(canvas);
    this._runner = new Runner(this._tick.bind(this), INTERVAL);
    
    this._border = {
      left: 0,
      right: this._canvas.width,
      top: 0,
      bottom: this._canvas.height,
    };
    this._gravity = 5;
    this._friction = 0.9;
    
    const BALL_RADIUS = 50;
    const BALL_POSITION = new Point(canvas.width * 0.5, canvas.height * 0.5);
    const BALL_COLOR = 'red';
    const BALL_VELOCITY = new Velocity(20, -40);
    const BALL_ACCELERATION = new Acceleration(0, this._gravity);
    this._ball = new Ball(BALL_RADIUS, BALL_POSITION, {
      color: BALL_COLOR,
      velocity: BALL_VELOCITY,
      acceleration: BALL_ACCELERATION,
    });
    
    this._mode = GAMEMODE_RUNNING;
    this._cursor = {
      x: null,
      y: null,
      color: 'aqua',
    }
    this._maxSpeed = 200;
    this._minSpeed = 1;
    
    this._runner.start();
  }
  
  _tick() {
    this._input();
    this._update();
    this._draw();
  }
  
  _modifyBallVelocity(position) {
    let x0 = this._ball.position.x;
    let y0 = this._ball.position.y;
    let x1 = position.x;
    let y1 = position.y;
    
    let dx = x1 - x0;
    let dy = y1 - y0;
    
    this._ball.velocity.dx = dx;
    this._ball.velocity.dy = dy;
    
    //this._ball.velocity.constrainX(this._maxSpeed);
    //this._ball.velocity.constrainY(this._maxSpeed);
    
    this._cursor.x = x1;
    this._cursor.y = y1;
  }
  
  _input() {
    if (this._hdlInput.doubleClicked || this._hdlInput.doubleTouched) {
      this._mode = (this._mode === GAMEMODE_RUNNING) ? GAMEMODE_PAUSED : GAMEMODE_RUNNING;
      this._hdlInput.debounceDoubleClick();
      this._hdlInput.debounceDoubleTouch();
    }
    
    if (this._mode === GAMEMODE_PAUSED) {
      if (this._hdlInput.isButtonDown(BUTTON_LEFT)) {
        this._modifyBallVelocity(this._hdlInput.mousePosition);
      } else if (this._hdlInput.touched) {
        this._modifyBallVelocity(this._hdlInput.touchPosition);
      }
    } else {
      this._cursor.x = null;
      this._cursor.y = null;
    }
  }
  
  _moveObjects() {
    this._ball.velocity.force(this._ball.acceleration);
    this._ball.velocity.truncateX(this._minSpeed);
    this._ball.velocity.truncateY(this._minSpeed);
    this._ball.position.move(this._ball.velocity);
  }
  
  _handleCollisions() {
    let ball = this._ball;
    let border = this._border;
    
    // bounce off of left & right borders
    if ((ball.left <= border.left) || (ball.right >= border.right)) {
      ball.velocity.reflectX();
    }
    
    // bounce off of top & bottom borders
    if ((ball.top <= border.top) || (ball.bottom >= border.bottom)) {
      ball.velocity.reflectY();
    }
    
    // force within box horizontally
    if (ball.left < border.left) {
      ball.left = border.left;
    } else if (ball.right > border.right) {
      ball.right = border.right;
    }
    
    // force within box vertically
    if (ball.top < border.top) {
      ball.top = border.top;
    } else if (ball.bottom > border.bottom) {
      ball.bottom = border.bottom;
    }
    
    // apply friciton from borders
    if (ball.top <= border.top) {
      ball.velocity.applyFrictionY(this._friction);
    }
    if (ball.bottom >= border.bottom) {
      ball.velocity.applyFrictionX(this._friction);
      ball.velocity.applyFrictionY(this._friction);
    }
  }
  
  _update() {
    if (this._mode === GAMEMODE_RUNNING) {
      this._moveObjects();
      this._handleCollisions();
    }
  }
  
  _draw() {
    let context = this._context;
    let canvas = this._canvas;
    let ball = this._ball;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (this._mode === GAMEMODE_PAUSED) {
      ball.draw(context, '#ffff00');
      if (this._cursor.x !== null) {
        context.strokeStyle = this._cursor.color;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(ball.position.x, ball.position.y);
        context.lineTo(this._cursor.x, this._cursor.y);
        context.stroke();
      }
    } else {
      ball.draw(context);
    }
  }
}
