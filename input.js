const BUTTON_LEFT = 0;
const BUTTON_MIDDLE = 1;
const BUTTON_RIGHT = 2;

class InputHandler {
  constructor(canvas) {
    this._keys = {};
    this._mouse = {
      position: new Point(0, 0),
      buttons: {},
      clicks: {},
    };
    
    this._initHandlers(canvas);
  }
  
  get mousePosition() {
    return this._mouse.position;
  }
  
  addKey(key) {
    if (!(key in this._keys)) {
      this._keys[key] = true;
    }
  }
  
  removeKey(key) {
    if (key in this._keys) {
      delete this._keys[key];
    }
  }
  
  debounceKey(key) {
    if (key in this._keys) {
      this._keys[key] = false;
    }
  }
  
  debounceClick() {
    if ('click' in this._mouse.clicks) {
      this._mouse.clicks.click = false;
    }
  }
  
  debounceDoubleClick() {
    if ('dblclick' in this._mouse.clicks) {
      this._mouse.clicks.dblclick = false;
    }
  }
  
  isKeyDown(key) {
    return (key in this._keys) && (key[this._keys]);
  }
  
  addButton(button) {
    if (!(button in this._mouse.buttons)) {
      this._mouse.buttons[button] = true;
    }
  }
  
  removeButton(button) {
    if (button in this._mouse.buttons) {
      delete this._mouse.buttons[button];
    }
  }
  
  debounceButton(button) {
    if (button in this._mouse.buttons) {
      this._mouse.buttons[button] = false;
    }
  }
  
  isButtonDown(button) {
    return (button in this._mouse.buttons) && (this._mouse.buttons[button]);
  }
  
  get clicked() {
    return (('click' in this._mouse.clicks) && this._mouse.clicks.click);
  }
  
  get doubleClicked() {
    return (('dblclick' in this._mouse.clicks) && this._mouse.clicks.dblclick);
  }
  
  setMouseXY(xValue, yValue) {
    this._mouse.position.x = xValue;
    this._mouse.position.y = yValue;
  }
  
  _initHandlers(canvas) {
    canvas.addEventListener('keydown', (event) => {
      this.addKey(event.key);
    });
    
    canvas.addEventListener('keyup', (event) => {
      this.removeKey(event.key);
    });
    
    canvas.addEventListener('mousedown', (event) => {
      this.addButton(event.button);
      this.setMouseXY(event.clientX, event.clientY);
    });
    
    canvas.addEventListener('mouseup', (event) => {
      this.removeButton(event.button);
      this.setMouseXY(event.clientX, event.clientY);
    });
    
    canvas.addEventListener('mousemove', (event) => {
      this.setMouseXY(event.clientX, event.clientY);
    });
    
    canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
    
    canvas.addEventListener('click', (event) => {
      this._mouse.clicks.click = true;
      setTimeout(() => {
        delete this._mouse.clicks.click;
      }, 500);
    });
    
    canvas.addEventListener('dblclick', (event) => {
      this._mouse.clicks.dblclick = true;
      setTimeout(() => {
        delete this._mouse.clicks.dblclick;
      }, 500);
    });
  }
}
