/* =================================================
    Contract: every 'offensive' object will check 
    for collisions on its own and call a collidables
    onCollision method
 ================================================= */
function pointsToRay(p1, p2) {
  var vec = p2.sub(p1);
  var length = vec.length();
  var d = vec.normalize();
  return new Line();
}
   
function rayToVector(ray) {
  var ret = new point;
  // ray = position + t * direction    
  var d = new point(
    myCos(ray.theta),
    mySin(ray.theta)
  );
  ret.x = ray.position.x + ray.magnitude*d.x;
  ret.y = ray.position.y + ray.magnitude*d.y;
  return ret;
}

function vectorsToRay(begin, end) {

}

function collision_line_rect(line, rect, rot) {
  var begin = undefined, 
      end = undefined;
  if (line.position.x < rect.x) {
    begin = rect.toPoint()                     
                .add(new point(rect.w, 0))
                .sub(line.position)
                
    end =   rect.toPoint()
                  .add(new point(0, rect.h))
                  .sub(line.position); 
  } else {
    begin = rect.toPoint()
                .sub(line.position);

    end = rect.toPoint()
              .add(rect.dimensions)
              .sub(line.position);
  }
                

  var ray = rayToVector(line).sub(line.position);
  

  var b_unit_v = begin.normalize();

  var cos_end_b_proj = end.dot(b_unit_v)/end.length();
  var cos_lin_b_proj = ray.dot(b_unit_v)/ray.length();
   
  var end_angle = toDeg(Math.acos(cos_end_b_proj));
  var lin_angle = toDeg(Math.acos(cos_lin_b_proj));
         
 // deblog("Begin: " + begin +
 //       " End: " + end +
 //       " Ray: " + ray +
 //       " Angle end: " + end_angle + 
 //       " Angle lin: " + lin_angle + 
 //       " interm end: " + cos_end_b_proj +
 //       " interm lin: " +  cos_lin_b_proj

 //       ); 
         
        
  if (lin_angle < end_angle) return true;
  return false;

}

function rot_point(p, rot) {
  return new point(
    p.x*Math.cos(rot*Math.PI/180) - p.y*Math.sin(rot*Math.PI/180),
    p.y*Math.sin(rot*Math.PI/180) + p.y*Math.cos(rot*Math.PI/180)
  );
}
  
function collision_circ_rect(circ, rect, rot) {
  // translate everything to the origin
  var center = new point(
    circ.position.x - rect.x - rect.w/2, 
    circ.position.y - rect.y - rect.h/2
  );
  // translate the rectangle to its center point
  var rect_trans = new point(
    (-rect.w/2),
    (-rect.h/2)
  );
  
  // rotate circle in opposite direction
  var center_rot = rot_point(center, -rot);

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
