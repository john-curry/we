function Fucus() { }

Fucus.prototype = {
  properties: { 
    collidable: false,
    visible: true,
    updatable: true,
    drawable: true,
    loabable: true
  },

  velocity: new point(0, 0),
  acceleration: new point(0, 0),
  max_speed: 4,
  box: new rectangle(0, 0, 75, 150),
  
  
  load: function(game) {
  },

  draw: function(g) {
    var box = this.box;
    box.draw(g);
  },

  collide: function(r) {
  },

  update: function(timestamp, game) {
    var box = this.box;
    var v = this.velocity;
    var a = this.acceleration;
    var speedmax = this.max_speed;

    var collided_with = game.collidables().filter(
      function(e) {
        return collision(box,e);
      }
    );

    if (game.keysdown.some((i) => i == "ArrowLeft")) { 
      game.keysdown = game.keysdown.filter(i => i != "ArrowLeft");
      a.x -= .5;
    }

    if (game.keysdown.some((i) => i == "ArrowRight")) { 
      game.keysdown = game.keysdown.filter(i => i != "ArrowRight");
      a.x += .5;
    }

    if (game.keysdown.length == 0) {
      if (v.x > 0) {
        a.x = -.1;
      }
      if (v.x < 0) {
        a.x = .1;
      }
    }

    if (collided_with.length  == 0) { // if there is no collisions, add gravity to acceleration
      a.y = game.gravity.y;
    } else { a.y = 0; v.y = 0; }

    v.x += a.x;
    v.y += a.y;
    
    if (Math.abs(v.x) >= speedmax) v.x = Math.sign(v.x) * speedmax;

    box.x += v.x;
    box.y += v.y;

    if (Math.abs(v.x) <= 1) { v.x = 0; }
    if (Math.abs(v.y) <= 1) { v.y = 0; }
    //if (Math.abs(a.x) <= 1) { a.x = 0; }
    //if (Math.abs(a.y) <= 1) { a.y = 0; }


  },
};
