
function Fucus() { 
  this.velocity = new point(0, 0);
  this.acceleration = new point(0, 0);
  this.mag_dir = new point(0, 90);
  this.box = new rectangle(1133, 580, 75, 150);
  this.fire_timer = undefined;
  this.fire_rate = 1000; // ms    
  this.image = undefined;
  this.box.color = "blue";
  this.collidable = true;
  this.state = "moving";    

  this.max_speed = 5;
  this.thrust = 1.2;
  this.anti_thrust = -.1;
  this.delta_theta = 4; this.tol = .2; // tolerance

  this.theta = function(t) { 
    if (t == undefined) return this.mag_dir.y; 
    else { this.mag_dir = t; }
  }

  this.X = function()
  { return this.box.x; }
  this.Y = function() 
  { return this.box.y; }
  this.W = function() 
  { return this.box.w;}
  this.H = function() 
  { return this.box.h; }

  this.load = function(game) {
    this.image = document.getElementById("spaceship");
    this.change_state("moving");
    this.uuid = make_uuid();
  }

  this.onCollision = function(game, collided_with) {
    if (collided_with instanceof rocket && rocket.owner != this.uuid) {
      game.change_state("player_loses");
    }
  }

  this.draw = function(g) {
    var box = this.box;
    g.save();
    g.translate(box.x + 0.5*box.w, box.y + 0.5*box.h);
    g.rotate((this.mag_dir.y + 270)*Math.PI/180);
    g.translate(-(box.x + .5*box.w), -(box.y + .5*box.h));
    g.drawImage(this.image, box.x, box.y, box.w, box.h);
    g.restore();
  }
  
  this.change_state = function(s) {
    this.state = s;
    this.update = this[this.state];
  };

  this.collide = function(e) { }

  this.update = this[this.state];

  this.moving = function(time, game) {
    var a = this.acceleration;
    var v = this.velocity;
    var box = this.box;
    var md = this.mag_dir;

    if (game.keysdown.some(i => i == "ArrowUp")) {
      md.x = this.thrust; 
    }
    else if (game.keysdown.some(i => i == "ArrowLeft")) {
      md.y -= this.delta_theta;
    }

    else if (game.keysdown.some(i => i == "ArrowRight")) {
      md.y += this.delta_theta;
    } else {
      md.x = this.anti_thrust;
    }

    if (game.keysdown.some(i => i == "j")) {
      game.addComponent(
        new ball(
          100,
          box.toPoint()
        )
      );
    }


    if (game.keysdown.some(i => i == "Enter")) {
      this.fireRocket(game);
    }
    this.update_position(time, game);
  };

  this.update_position = function(time, game) {
    var a = this.acceleration;
    var v = this.velocity;
    var box = this.box;
    var md = this.mag_dir;
        
    a.x = md.x * Math.cos(md.y*Math.PI/180);
    a.y = md.x * Math.sin(md.y*Math.PI/180);
    
    v.x += a.x;
    v.y += a.y;

    if (Math.sqrt(v.x*v.x + v.y*v.y) < -this.anti_thrust + this.tol) {
      v.x = 0;
      v.y = 0;
    }

    if (Math.sqrt(v.x*v.x + v.y*v.y) > this.max_speed) {
      v.x = this.max_speed *Math.cos(md.y*Math.PI/180);
      v.y = this.max_speed *Math.sin(md.y*Math.PI/180);
    }

    if (!(box.x + box.w + v.x > game.w)) {
      if (!(box.x + v.x < 0)) {
        box.x += v.x;
      }
    }  
    if (!(box.y + box.h + v.y > game.h)) {
      if (!(box.y + v.y < 0)) {
        box.y += v.y;
      }
    }
  };

  this.ready = true;
  this.fireRocket = function(game) {
    var ft = this.fire_timer;
    if (this.ready) {
      this.ready = false;
      ft = new timer(this.fire_rate, () => this.ready = true);
      ft.start();
      game.addComponent(
        new rocket(
          this.box.toPoint(),
          5,
          this.mag_dir.y,
          this.uuid
        )
      );
    }
  }
}

Fucus.prototype = Object.create(properties);
