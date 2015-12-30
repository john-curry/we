function collision(r2) {
    if (r2 === this) return false;
    var d = new direction;

    if (this.X() > r2.X() + r2.H()) d.right  = false;
    if (this.Y() > r2.Y() + r2.H()) d.bottom = false;
    if (this.X() + this.W() < r2.X()) d.left = false;
    if (this.Y() + this.H() < r2.Y()) d.top  = false;

    if (d.has_direction()) return false;    
    return d;
}

function direction() { 
  this.top = true;
  this.bottom = true;
  this.right = true;
  this.left = true;
}

direction.prototype.has_direction = function() {
  return (this.top || this.bottom || this.right || this.left);
};

