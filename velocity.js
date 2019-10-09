class Velocity {
  constructor(dxValue, dyValue) {
    this._value = [dxValue, dyValue];
  }
  
  get dx() {
    return this._value[0];
  }
  
  get dy() {
    return this._value[1];
  }
  
  get value() {
    return this._value;
  }
  
  set dx(dxValue) {
    this._value[0] = dxValue;
  }
  
  set dy(dyValue) {
    this._value[1] = dyValue;
  }
  
  set value(pair) {
    this._value[0] = pair[0];
    this._value[1] = pair[1];
  }
  
  reflectX() {
    this._value[0] = -this._value[0];
  }
  
  reflectY() {
    this._value[1] = -this._value[1];
  }
  
  forceLeft(dxValue) {
    this._value[0] -= dxValue;
  }
  
  forceRight(dxValue) {
    this._value[0] += dxValue;
  }
  
  forceUp(dyValue) {
    this._value[1] -= dyValue;
  }
  
  forceDown(dyValue) {
    this._value[1] += dyValue;
  }
  
  forceXY(dxValue, dyValue) {
    this._value[0] += dxValue;
    this._value[1] += dyValue;
  }
  
  force(acceleration) {
    this._value[0] += acceleration.ddx;
    this._value[1] += acceleration.ddy;
  }
  
  applyFrictionX(friction) {
    this._value[0] *= friction;
  }
  
  applyFrictionY(friction) {
    this._value[1] *= friction;
  }
  
  stopX() {
    this._value[0] = 0;
  }
  
  stopY() {
    this._value[1] = 0;
  }
  
  stop() {
    this.stopX();
    this.stopY();
  }
  
  constrainX(maxSpeedX) {
    if (this._value[0] < -maxSpeedX) {
      this._value[0] = -maxSpeedX;
    } else if (this._value[0] > maxSpeedX) {
      this._value[0] = maxSpeedX;
    }
  }
  
  constrainY(maxSpeedY) {
    if (this._value[1] < -maxSpeedY) {
      this._value[1] = -maxSpeedY;
    } else if (this._value[1] > maxSpeedY) {
      this._value[1] = maxSpeedY;
    }
  }
  
  truncateX(minSpeedX) {
    if ((this._value[0] >= -minSpeedX) && (this._value[0] <= minSpeedX)) {
      this.stopX();
    }
  }
  
  truncateY(minSpeedY) {
    if ((this._value[1] >= -minSpeedY) && (this._value[1] <= minSpeedY)) {
      this.stopY();
    }
  }
  
  isMovingLeft() {
    return this._value[0] < 0;
  }
  
  isMovingRight() {
    return this._value[0] > 0;
  }
  
  isMovingUp() {
    return this._value[1] < 0;
  }
  
  isMovingDown() {
    return this._value[1] > 0;
  }
  
  isMovingX() {
    return this.isMovingLeft() || this.isMovingRight();
  }
  
  isMovingY() {
    return this.isMovingUp() || this.isMovingDown();
  }
  
  isMoving() {
    return this.isMovingX() || this.isMovingY();
  }
}
