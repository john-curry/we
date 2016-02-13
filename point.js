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

  var ret = p.x*this.x + p.y*this.y;

  if (Math.abs(ret.x) < TOL) ret.x = 0;
  if (Math.abs(ret.y) < TOL) ret.y = 0;

  return ret;
}

point.prototype.length = function() {
  return Math.abs(Math.sqrt(Math.abs(this.dot())));
}

point.prototype.add = function(p) {
  return new point(
    this.x + p.x,
    this.y + p.y
  );
}

point.prototype.normalize = function() {
  var ret = new point(
    this.x/this.length(),
    this.y/this.length()
  );

  if (Math.abs(ret.x) < TOL) ret.x = 0;
  if (Math.abs(ret.y) < TOL) ret.y = 0;
  return ret;
}

point.prototype.norm = function() {
  var p = new point(
    this.x,
    -this.y
  );
  if (p.dot(this) > TOL) { throw "Normal vector not normal"; }
  return p;
}

point.prototype.add = function(p) {
  if (p == undefined) throw "point must be defined to be added";
  return new point(
    this.x + p.x,
    this.y + p.y
  );
}

point.prototype.sub = function(p) {
  return new point(
    this.x - p.x,
    this.y - p.y
  );
}

point.prototype.toString = function() {
  return "("+this.x+","+this.y+")";
}

var origin = new point(0, 0);
