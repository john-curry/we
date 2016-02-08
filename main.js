var canvas = document.getElementById("canvas");
var game = new Game();
canvas.height = game.h;
canvas.width  = game.w;
var graphics = canvas.getContext("2d");
var out =    document.getElementById("debug");
var ball = new Ball(50, new point(100, 100), new point(5, 1), "black");
var landscape = new Landscape();
var f = new Fucus();
var block = new rectangle(game.w / 2, game.h/4, 400, game.h / 2);
block.color = "red";
block.priority = 1;
block.collidable = true;
game.addComponents([ landscape, f , block , ball]);

var debug = {
  text: "No Error",
  number: null,
}

var out = document.getElementById("debug");

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
  if (event.defaultPrevented) return;
  game.keysdown.push(event.key);  
  event.preventDefault();
});

document.onmousemove = function(arg) {
  //corner.x = arg.clientX;
  //corner.y = arg.clientY;
};
