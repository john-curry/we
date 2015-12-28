// ====== POINT =============
function point(x, y) 
{ this.x = x; this.y = y; }
point.prototype.properties = 
{ visible:false, loadable:false, updatable:false, drawable:false, collidable:false}
point.prototype.X = function()
{ return this.x; }
point.prototype.Y = function() 
{ return this.y; }

