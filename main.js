var canvas = document.getElementById("canvas");
var game = new Game();
canvas.height = game.h;
canvas.width  = game.w;
var graphics = canvas.getContext("2d");
var out =    document.getElementById("debug");

var landscape = new Landscape();
var f = new Fucus();
var r = new rocket(new point(100, 100), 1, 200);

game.addComponents([ landscape, f , r ]);

var debug = {
  text: "No Error",
  number: null,
}

var out = document.getElementById("debug");

var b = new ball(10, new point(100, 100));
var r = new rectangle(0, 0, 10, 10);

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
