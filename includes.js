var DEBUG = false;

var TOL = 0.0000005;

function make_uuid() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

var debug = {
  text: "No Error",
  number: null,
}

var out = document.getElementById("debug");

function mySin(theta) {
  return Math.sin(theta*Math.PI/180);
}
function myCos(theta) {
  return Math.cos(theta*Math.PI/180);
}
function toDeg(rad) {
  return 180*rad/Math.PI;
}
function toRad(deg) {
  return deg*Math.PI/180;
}
function toQuadDeg(vec) {
  if (vec.x > 0 && vec.y < 0) {
    var a = toDeg(Math.atan(vec.y/vec.x)); 
    if (a > 0) throw "1) Nothing is how it seems";
    return a += 360;
  }
  if (vec.x < 0 && vec.y > 0) {
    var a = toDeg(Math.atan(vec.y/vec.x));
    if (a > 0) throw "2) Nothing is how it seems";
    return a += 180;
  }
  if (vec.x < 0 && vec.y < 0)  {
    var a = toDeg(Math.atan(vec.y/vec.x));
    if (a < 0) throw "3) Nothing is how it seems";
    return a += 180;
  }
  if (vec.x > 0 && vec.y > 0) {
    var a = toDeg(Math.atan(vec.y/vec.x));
    if (a < 0) throw "4) Nothing is how it seems";
    return a;
  }
  throw "should not have gotten here";
}


function deblog(s) {
  if (DEBUG) console.log(s);
}

