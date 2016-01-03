function collision(r1, r2) {
    if (r2 == undefined) {
      if (r1.X == undefined) throw "collision requires a rectangle to work";
      else r2 = this;
    }
    if (r2 === r1) return false;

    var ic = !( r1.X() > r2.X() + r2.W() ||
                r1.Y() > r2.Y() + r2.H() || // check number 2
                r1.X() + r1.W() < r2.X() || 
                r1.Y() + r1.H() < r2.Y()    // check number 1
              );
     
    // describes which direction r1 hits r2
    var direction = { 
      top:false, 
      bottom:false, 
      right:false, 
      left:false 
    };

    if (ic) {
      // check if bottom of r1 is below the top of r2
      if (r1.Y() + r1.H() > r2.Y()) direction.top = true;

      //  "    "  top    of r2    above the bottom of r2
      if (r1.Y() < r2.Y() + r2.H()) direction.bottom = true;

      // check if the right of r1 is to the right of the left of r2
      if (r1.X() + r1.W() > r2.X()) direction.right = true;

      // check if the left of r1 is to the left of the right of r2
      if (r1.X() < r2.X() + r2.W()) direction.left = true;
    }
    return direction;
}
