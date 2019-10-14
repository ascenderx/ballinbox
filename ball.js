class Ball extends Entity {
  constructor(radius, position, kwargs = {}) {
    super(position, kwargs);
    
    this._radius = radius;
    
    // defaults for kwargs
    this._color = 'white';
    
    for (let key in kwargs) {
      let value = kwargs[key];
      
      switch (key) {
        case 'color':
          this._color = value;
          break;
      }
    }
  }
  
  get left() {
    return super.position.x - this._radius;
  }
  
  get right() {
    return super.position.x + this._radius;
  }
  
  get top() {
    return super.position.y - this._radius;
  }
  
  get bottom() {
    return super.position.y + this._radius;
  }
  
  get radius() {
    return this._radius;
  }
  
  set left(xValue) {
    super.position.x = xValue + this._radius;
  }
  
  set right(xValue) {
    super.position.x = xValue - this._radius;
  }
  
  set top(yValue) {
    super.position.y = yValue + this._radius;
  }
  
  set bottom(yValue) {
    super.position.y = yValue - this._radius;
  }
  
  isPointInBall(point) {
    let isRightOfLeft = point.x >= super.position.x - this._radius;
    let isLeftOfRight = point.x <= super.position.x + this._radius;
    let isBelowTop = point.y >= super.position.y - this._radius;
    let isAboveBottom = point.y <= super.position.y + this._radius;
    
    return isRightOfLeft && isLeftOfRight && isBelowTop && isAboveBottom;
  }
  
  draw(context, color = null) {
    if (!color) {
      context.strokeStyle = this._color;
    } else {
      context.strokeStyle = color;
    }
    context.lineWidth = 2;
    context.beginPath();
    context.arc(
      super.position.x,
      super.position.y,
      this._radius,
      0,
      Math.PI * 2
    );
    context.stroke();
  }
}
