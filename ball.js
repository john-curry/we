function ball(r, p, v = new point(), c = "black") {
  this.radius = r;
  this.position = p;
  this.velocity = v;
  this.color = c;
  this.image = undefined;
  this.collidable = true; 
  this.acceleration = new point(0, 0);

  this.onCollision = function(game, collided_with) {
    game.components = game.components.filter(i => (i.uuid != this.uuid));
  }

  this.load = function(game) {
    this.image = document.getElementById("astroid");
   this.uuid = make_uuid();
  }

  this.draw = function(gfx) {
    var p = this.position;
    gfx.beginPath();
    gfx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI, false);
    gfx.fillStyle = this.color;
    gfx.fill();
    gfx.lineWidth = 5;
    gfx.strokeStyle = this.color;
    gfx.stroke();
    gfx.drawImage(this.image, p.x -(this.radius), p.y -(this.radius), 2*this.radius, 2*this.radius);
  }

  this.stop = function(t, game) {}
  this.update = function(t, game) {

  };
}
ball.prototype = Object.create(properties);
ball.prototype.toString = function() {
  return "Radius: " + this.radius + " @ " + this.position;
}
