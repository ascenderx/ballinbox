class Acceleration {
  constructor(ddxValue, ddyValue) {
    this._value = [ddxValue, ddyValue];
  }
  
  get ddx() {
    return this._value[0];
  }
  
  get ddy() {
    return this._value[1];
  }
  
  get value() {
    return this._value;
  }
  
  set ddx(ddxValue) {
    this._value[0] = ddxValue;
  }
  
  set ddy(ddyValue) {
    this._value[1] = ddyValue;
  }
  
  set value(pair) {
    this._value[0] = pair[0];
    this._value[1] = pair[1]; 
  }
}
