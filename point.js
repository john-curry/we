// ====== POINT =============
function point(x = 0, y = 0) {
  this.x = x; this.y = y; 
}

point.prototype = Object.create(properties);

point.prototype.X = function()
{ return this.x; }
point.prototype.Y = function() 
{ return this.y; }

point.prototype.dot = function(p) {
  if (p == undefined) p = this;
  return p.x*this.x + p.y*this.y;
}

point.prototype.length = function() {
  return Math.sqrt(this.dot());
}

point.prototype.add = function(p) {
  return new point(
    this.x + p.x,
    this.y + p.y
  );
}

point.prototype.norm = function() {
  return new point(
    this.x/this.length,
    this.y/this.length
  );
}

var origin = new point(0, 0);
