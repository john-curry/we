var canvas = document.getElementById("canvas");
var graphics = canvas.getContext("2d");
var out =    document.getElementById("debug");

var offset = new point(0, 200);
var corner = new point(0, 0);

var camera = new point(0,0);
camera.width = 800;
camera.height = 600;

var game = new Game();
var landscape = new Landscape();
var f = new Fucus();
var block = new rectangle(game.w / 2, game.h/4, 40, game.h / 2);
block.priority = 1;
block.collidable = true;
game.addComponents([ landscape, f , block]);

var debug = {
  text: "No Error",
  number: null,
}

window.onload = function() {
  game.load();
  game.components.sort((x, y) => x.priority < y.priority);
  window.requestAnimationFrame(onFrame);
}

var onFrame = function(timestamp) {
  game.update(timestamp);
  game.draw(graphics);
  window.requestAnimationFrame(onFrame);
}

document.addEventListener("keydown", function(event) {
  //if (event.defaultPrevent) return;
  var left = "left";
  var right = "right";
  var up = "up";
  var down = "down";
  game.keysdown.push(event.key);  

  event.preventDefault();
});

document.onmousemove = function(arg) {
  corner.x = arg.clientX;
  corner.y = arg.clientY;
};
