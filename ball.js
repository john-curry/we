function Ball(r, p, v, c) {
  this.radius = r;
  this.position = p;
  this.velocity = v;
  this.color = c;
  this.collidable = false; 
  this.acceleration = new point(0, 0);


  this.load = function(game) {

  }

  this.draw = function(gfx) {
    var p = this.position;
    gfx.beginPath();
    gfx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI, false);
    gfx.fillStyle = this.color;
    gfx.fill();
    gfx.lineWidth = 5;
    gfx.strokeStyle = this.color;
    gfx.stroke();
  }
  this.stop = function(t, game) {}
  this.update = function(t, game) {
    var v = this.velocity;
    var p = this.position;
    var a = this.acceleration;
    var r = this.radius;
    var box = new rectangle(p.x - (r / 2), p.y - (r / 2), r, r);
    var colli_info = game.collidables().filter(
      function(e) {
        if (typeof e.collide === 'function') {
          var d = box.collide(e);
          if (d.top || d.bottom || d.right || d.left) return true;
          return false;
        }
        return false;
      }
    );
    
    var collided_with = colli_info.map((e) => box.collide(e)); 
    
    var on_top_of = colli_info.filter((e) => e.collide(box).top);
     
    if (on_top_of.length != 0 && (v.y >= v.x)) {
      a.y = -.5*a.y;
      v.y = -Math.abs(v.y);
      //if (v.y < .5) { v.y = 0; a.y = 0; }
    } 

    if (collided_with.some((e) => e.top) && (v.y < v.x)) {
      v.x = .9*v.x;
    }

    if (collided_with.some((e) => e.right || e.left)) {
      v.x = 0;
      a.x = 0;
    }

    if (collided_with.length != 0) {
      //
    } else {
      a.y = game.gravity.y;
    }
    
    if (box.w + box.x > game.w) {
      a.x = 0;
      v.x = -5;
    }

    if (box.x < 0) {
      a.x = 0;
      v.x = 5;
    }

    if (box.y < 0) {
      a.y = game.gravity.y;
      v.y = 0;
    }

    if (box.h + box.y > game.h) {
      a.y = 0;
      v.y = -5;
    }

    v.x += a.x;
    v.y += a.y;

    if (Math.abs(v.x) < 2) { v.x = 0; a.x = 0; }
    p.x += v.x;
    p.y += v.y; 

  };
}
Ball.prototype = Object.create(properties);
