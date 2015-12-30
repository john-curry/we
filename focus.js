
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
        return e.collide(box) != false;
      }
    );

    //var collision_information = collided_with.map(i => i.collide(this));

    if (game.keysdown.some((i) => i == "ArrowLeft")) { 
      game.keysdown = game.keysdown.filter(i => i != "ArrowLeft");
      a.x -= 1;
    }

    if (game.keysdown.some((i) => i == "ArrowRight")) { 
      game.keysdown = game.keysdown.filter(i => i != "ArrowRight");
      a.x += 1;
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
    } else { a.y = 0; v.y = 0; }
  }
}
Fucus.prototype = Object.create(properties);
