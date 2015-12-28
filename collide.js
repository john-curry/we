function collision(r1, r2) {
    if (r2 === r1) return false;

    var ic = !( r1.X() > r2.X() + r2.H() ||
                r1.Y() > r2.Y() + r2.H() || 
                r1.X() + r1.W() < r2.X() || 
                r1.Y() + r1.H() < r2.Y()
              );
    return ic;
}
