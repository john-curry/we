/* =================================================
    Contract: every 'offensive' object will check 
    for collisions on its own and call a collidables
    onCollision method
 =================================================
 */
function collision_circ_rect(circ, rect, rot) {
  // translate everything to the origin
  var center = new point(
    circ.position.x - rect.x - rect.w/2, 
    circ.position.y - rect.y - rect.h/2
  );
  var rect_trans = new point(
    (-rect.w/2),
    (-rect.h/2)
  );
  //console.log("Circle center " + center + " with radius" + circ.radius + " intersecting " + rect);
  
  // rotate circle in opposite direction
  var center_rot = new point(
    center.x*Math.cos(-rot*Math.PI/180) - center.y*Math.sin(-rot*Math.PI/180),
    center.y*Math.sin(-rot*Math.PI/180) + center.y*Math.cos(-rot*Math.PI/180)
  );
  if (center_rot.x - circ.radius > rect_trans.x + rect.w ||
      center_rot.y - circ.radius > rect_trans.y + rect.h ||
      center_rot.x + circ.radius < rect_trans.x - rect.w ||
      center_rot.y + circ.radius < rect_trans.y - rect.h) 
   { return false; }
   
   return true;
}


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
    // TODO: collision on right and left is still messed up
    if (ic) {
      if (/*r1.X() < (r2.X() + r2.W()) &&*/ (r1.X() + r1.W() > r2.X + r2.W())) {
        direction.right = true;
      }
      // check if the left of r1 is to the left of the right of r2
      if (r1.X() + r1.W() > r2.X() && r1.X() < r2.X()){
        direction.left = true;
      }
      // check if bottom of r1 is below the top of r2
      if (r1.Y() + r1.H() > r2.Y()) {
        direction.top = true;
      }
      //  "    "  top    of r2    above the bottom of r2
      if (r1.Y() < r2.Y() + r2.H()) {
        direction.bottom = true;
      }
      // check if the right of r1 is to the right of the left of r2
      if (direction.right && direction.left) {
        direction.right = false;
        direction.left  = false;
      }
      if (direction.top && direction.bottom) {
        direction.right = false;
        direction.left  = false;
      }
    }
    return direction;
}
