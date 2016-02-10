
function Fucus() { 
  this.velocity = new point(0, 0);
  this.acceleration = new point(0, 0);
  this.mag_dir = new point(0, 90);
  this.box = new rectangle(200, 400, 75, 150);
  this.fire_timer = new timer(500);
    
  this.image = undefined;
  this.box.color = "blue";
  this.collidable = false;
  this.state = "moving";    

  this.max_speed = 5;
  this.thrust = 1.2;
  this.anti_thrust = -.1;
  this.delta_theta = 4;
  this.tol = .2; // tolerance

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

  this.collide = collision;

  this.update = this[this.state];

  this.moving = function(time, game) {
    var a = this.acceleration;
    var v = this.velocity;
    var box = this.box;
    var md = this.mag_dir;

    if (game.keysdown.some(i => i == "ArrowUp")) {
      md.x = this.thrust; 
    } else {
      md.x = this.anti_thrust;
    }

    if (game.keysdown.some(i => i == "ArrowDown")) {
    }

    if (game.keysdown.some(i => i == "ArrowLeft")) {
      md.y -= this.delta_theta;
    }

    if (game.keysdown.some(i => i == "ArrowRight")) {
      md.y += this.delta_theta;
    }

    if (game.keysdown.some(i => i == "Enter")) {
      this.fireRocket(game);
    }

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

    box.x += v.x;
    box.y += v.y;
  };

  this.fireRocket = function(game) {
      game.addComponent(
        new rocket(
          this.box.toPoint(),
          10,
          this.mag_dir.y
        )
      );
  }
}

Fucus.prototype = Object.create(properties);
