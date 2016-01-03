
function Fucus() { 
  this.velocity = new point(0, 0);
  this.acceleration = new point(0, 0);
  this.max_speed = 4;
  this.box = new rectangle(0, 0, 75, 150);
  this.collidable = false;
    
  this.load = function(game) {
  }

  this.draw = function(g) {
    var box = this.box;
    box.draw(g);
  }

  // collide should return some information about the direction that the collision took place in
  this.collide = collision;

  this.update = function(timestamp, game) {
    var box = this.box;
    var v = this.velocity;
    var a = this.acceleration;
    var ms = this.max_speed;

    var collided_with = game.collidables().filter(
      function(e) {
        var d = e.collide(box);
        if (d.top || d.bottom || d.right || d.left) return true;
        return false;
      }
    );

    // need to find the rectangle that i am currently on
    // search collidables and find something i am on top of
    // set my position accordingly
    var c = game.collidables();
    var min = game.h;
    for (var i = 0; i < c.length; i++) {
      if (c[i].Y() < min && box.collide(c[i]).top) min = c[i].Y();
    }

    if (game.keysdown.some((i) => i == "ArrowLeft")) { 
      game.keysdown = game.keysdown.filter(i => i != "ArrowLeft");
      a.x = -3;
    }

    if (game.keysdown.some((i) => i == "ArrowRight")) { 
      game.keysdown = game.keysdown.filter(i => i != "ArrowRight");
      a.x = 3;
    }

    if (game.keysdown.some((i) => i == "ArrowUp")) { 
      game.keysdown = game.keysdown.filter(i => i != "ArrowUp");
      a.y = -3;
    }

    if (game.keysdown.some((i) => i == "ArrowDown")) { 
      game.keysdown = game.keysdown.filter(i => i != "ArrowDown");
    }

    v.x += a.x;
    v.y += a.y;

    if (Math.abs(v.x) < 1) {
      v.x = 0;
      a.x = 0;
    }

    if (Math.abs(v.y) >= ms) {
      a.y = 0;
      v.y = Math.sign(v.y) * ms;
    }

    if (Math.abs(v.x) >= ms) {
      a.x = 0;
      v.x = Math.sign(v.x) * ms;
    }

    if (game.keysdown.every(e => (e != "ArrowRight" && e != "ArrowLeft"))) {
      a.x = -0.1 * Math.sign(v.x);
    }

    box.x += v.x;
    box.y += v.y;
     
    
    if (collided_with.length  == 0) { 
      a.y = game.gravity.y;
    } else { 
      a.y = 0; 
      v.y = 0; 
      box.y = min - box.h;
    }
  }
}
Fucus.prototype = Object.create(properties);
