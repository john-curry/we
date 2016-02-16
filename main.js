var canvas = document.getElementById("canvas");
var game = new Game();
canvas.height = game.h;
canvas.width  = game.w;
var graphics = canvas.getContext("2d");
var out =    document.getElementById("debug");
game.graphics = graphics;
var landscape = new Landscape();
var f = new Fucus();
//var r = new rocket(new point(100, 100), 1, 200);
var e = new Enemy();

game.player = f;
game.addComponents([ landscape, f ]);
game.addComponent(e);

var lines = [ ];


lines.forEach(i => deblog("Intersect rectangle: " + r + " with line " + i + ": " + collision_line_rect(i, r, 0)));




















window.onload = function() {
  game.load();
  game.components.sort((x, y) => x.priority < y.priority);
  window.requestAnimationFrame(onFrame);
}

var last_frame = 0;
var onFrame = function(timestamp) {
  setTimeout(function() {
  out.innerHTML = timestamp - last_frame;
  last_frame = timestamp;
  game.update(timestamp);
  game.draw(graphics);
  window.requestAnimationFrame(onFrame);
  }, 1000/60);
}

document.addEventListener("keydown", function(event) {
  //if (event.defaultPrevented) return;
  game.keysdown.push(event.key);  
  event.preventDefault();
});

document.onmousemove = function(arg) {
  //corner.x = arg.clientX;
  //corner.y = arg.clientY;
};
