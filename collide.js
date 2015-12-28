var calls = 0;
function collision(r, b) {
    calls++; 
    if (b === r) return false;
    var ic = !(r.X() > b.X() + b.H() ||
             r.X() + r.W() < b.X() || 
             r.Y() > b.Y() + b.H() || 
             r.Y() + r.H() < b.Y()
             );
    if  (ic == true) alert("COLLISION");
    return ic;
}
