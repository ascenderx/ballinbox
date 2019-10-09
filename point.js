class Point {
  constructor(xValue, yValue) {
    this._value = [xValue, yValue];
  }
  
  get x() {
    return this._value[0];
  }
  
  get y() {
    return this._value[1];
  }
  
  get value() {
    return this._value;
  }
  
  set x(xValue) {
    this._value[0] = xValue;
  }
  
  set y(yValue) {
    this._value[1] = yValue;
  }
  
  set value(pair) {
    this._value[0] = pair[0];
    this._value[1] = pair[1];
  }
  
  moveLeft(dxValue) {
    this._value[0] -= dxValue;
  }
  
  moveRight(dxValue) {
    this._value[0] += dxValue;
  }
  
  moveUp(dyValue) {
    this._value[1] -= dyValue;
  }
  
  moveDown(dyValue) {
    this._value[1] += dyValue;
  }
  
  moveXY(dxValue, dyValue) {
    this._value[0] += dxValue;
    this._value[1] += dyValue;
  }
  
  move(velocity) {
    this._value[0] += velocity.dx;
    this._value[1] += velocity.dy;
  }
}
