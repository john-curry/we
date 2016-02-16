function Line(mag, dir, pos) {
  this.magnitude = mag;
  this.theta = dir;
  this.position = pos;
  this.toPoint = function() {
    var p = new point(
      this.magnitude * myCos(this.theta),
      this.magnitude * mySin(this.theta)
    );
    
    if (Math.abs(p.x) < TOL) p.x = 0;
    if (Math.abs(p.y) < TOL) p.y = 0;

    return p.add(this.position);
  }
  this.toString = function() {
    return "Mag: " + this.magnitude + " Dir:" + this.theta + " Pos:" + this.position;
  }
  this.draw = function(g) {
    g.save();
    g.fillStyle = this.color;
    g.beginPath();

    g.moveTo(this.position.x,this.position.y);

    var p = this.toPoint();

    g.lineTo(p.x,p.y);
    g.stroke();
    g.restore();
  }
}

Line.prototype = Object.create(properties);
Line.prototype.loadable = false;
Line.prototype.collidable = false;
Line.prototype.updatable = false;
