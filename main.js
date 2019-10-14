(() => {
  let canvas = document.getElementById('cvs');
  let game;
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 10;
  }
  
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    game = new Game(canvas);
  });
  
  game = new Game(canvas);
})();
