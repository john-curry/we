// ========== RECTANGLE ==========
function rectangle(x, y, w, h) {
  this.x = x; this.y = y; this. w = w, this.h = h; 
  this.updatable = false;
  this.loadable = false;
  this.priority = 2;
}

rectangle.prototype = Object.create(new point(0, 0));

rectangle.prototype.W = function() {
    return this.w; 
}

rectangle.prototype.H = function() {
    return this.h; 
}

rectangle.prototype.draw = function(g) { 
    g.fillStyle = this.color;
    g.fillRect(this.x, this.y, this.w, this.h); 
}
