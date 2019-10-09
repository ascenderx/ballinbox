class Runner {
  constructor(callback, interval) {
    this._callback = callback;
    this._interval = interval;
    this._handle = null;
    this._previous = null;
  }
  
  start() {
    if (this._handle) {
      return false;
    }
    
    this._updateHandle();
    
    return true;
  }
  
  stop() {
    if (!this._handle) {
      return false;
    }
    
    this._clearHandle();
    
    return true;
  }
  
  _tick(timestamp) {
    if (!this._previous) {
      this._previous = timestamp;
    } else {
      let elapsed = timestamp - this._previous;
      if (elapsed >= this._interval) {
        this._previous = timestamp;
        this._callback();
      }
    }
    
    this._updateHandle();
  }
  
  _updateHandle() {
    this._handle = window.requestAnimationFrame(this._tick.bind(this));
  }
  
  _clearHandle() {
    window.cancelAnimationFrame(this._handle);
    this._handle = null;
  }
}
