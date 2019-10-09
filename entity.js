class Entity {
  constructor(position, kwargs = {}) {
    this._position = position;
    
    // default values for kwargs
    this._velocity = new Velocity(0, 0);
    this._acceleration = new Acceleration(0, 0);
    
    for (let key in kwargs) {
      let value = kwargs[key];
      
      switch (key) {
        case 'velocity':
          this._velocity.dx = value.dx;
          this._velocity.dy = value.dy;
          break;
        
        case 'acceleration':
          this._acceleration.ddx = value.ddx;
          this._acceleration.ddy = value.ddy;
          break;
      }
    }
  }
  
  get position() {
    return this._position;
  }
  
  get velocity() {
    return this._velocity;
  }
  
  get acceleration() {
    return this._acceleration;
  }
}
