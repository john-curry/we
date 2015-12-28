// ====== POINT =============
function point(x, y) {
  if (x == undefined) this.x = 0;
  if (y == undefined) this.y = 0;
  this.x = x; this.y = y; 

}
point.prototype.X = function()
{ return this.x; }
point.prototype.Y = function() 
{ return this.y; }
point.prototype = Object.create(properties);
