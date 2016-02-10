function ball(r, p, v, c) {
  this.radius = r;
  this.position = p;
  this.velocity = v;
  this.color = c;
  this.image = undefined;
  this.collidable = false; 
  this.acceleration = new point(0, 0);


  this.load = function(game) {
    this.image = document.getElementById("astroid");
  }

  this.draw = function(gfx) {
    var p = this.position;
    gfx.drawImage(this.image, p.x -(this.radius/2), p.y -(this.radius/2), this.radius, this.radius);
    //gfx.beginPath();
    //gfx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI, false);
    //gfx.fillStyle = this.color;
    //gfx.fill();
    //gfx.lineWidth = 5;
    //gfx.strokeStyle = this.color;
    //gfx.stroke();
  }

  this.stop = function(t, game) {}
  this.update = function(t, game) {

  };
}
ball.prototype = Object.create(properties);
