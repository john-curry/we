var canvas = document.getElementById("canvas");
var graphics = canvas.getContext("2d");
var out =    document.getElementById("debug");

var offset = new point(0, 200);
var corner = new point(0, 0);

var camera = new point(0,0);
camera.width = 800;
camera.height = 600;

var landscape = new Landscape();
var f = new Fucus();
game.addComponent(landscape);
game.addComponent(f);

var debug = {
  text: "No Error",
  number: null,
}

window.onload = function() {
  game.load();
  window.requestAnimationFrame(onFrame);
}

var onFrame = function(timestamp) {
  game.update(timestamp);
  game.draw(graphics);
  window.requestAnimationFrame(onFrame);
}

document.onkeypress = function(e) {
};

document.onmousemove = function(arg) {
  corner.x = arg.clientX;
  corner.y = arg.clientY;
};
