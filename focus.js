
function Fucus() { 
  this.velocity = new point(0, 0);
  this.acceleration = new point(0, 0);
  this.max_speed = 15;
  this.box = new rectangle(0, 400, 75, 150);

  this.box.color = "blue";
  this.collidable = false;
  this.state = "stopped";    
  
  this.X = function()
  { return this.box.x; }
  this.Y = function() 
  { return this.box.y; }
  this.W = function() 
  { return this.box.w;}
  this.H = function() 
  { return this.box.h; }

  this.load = function(game) {

  }

  this.draw = function(g) {
    var box = this.box;
    box.draw(g);
  }
  
  this.change_state = function(s) {
    this.state = s;
    this.update = this[this.state];
  };

  this.collide = collision;

  this.stopped = function(timestamp, game) {
    var c = game.collidables();
    var box = this.box;
    
    if (!(c.some((e) => e.collide(box).top))) {
      this.change_state("falling");
    }
    
    this.velocity = new point(0, 0);
    this.acceleration = new point(0, 0); 
  };
  
  this.falling = function(timestamp, game) {
    this.acceleration = new point(0, 0);
    var c = game.collidables();
    var collided = c.filter(i => this.box.collide(i).top);
    collided.sort(function(a, b) {
      if (a.Y() <  b.Y()) return -1;
      if (a.Y() >  b.Y()) return  1;
      return 0;
    });
    

    var not_collided = c.filter(i => !this.box.collide(i).top);
    
    if (collided.length != 0) {
      this.box.y = collided.pop().Y() - this.box.H();
      this.change_state("stopped");
    } else {
      // raycast down to see if we are about to collide

      var box = this.box;
      var a = this.acceleration;
      var v = this.velocity;
      var a = Object.create(game.gravity);
      var change_state = this.change_state;

      about_to = not_collided.filter(function(i) {
        if (   (box.Y() + box.H() + v.y + a.y > i.Y()) 
            && (box.X() + (box.W()/2) > i.X()) 
            && (box.X() + (box.W()/2) < i.W() + i.X())) {
          return true;
        } else {
          return false;
        }
      });
      if (about_to.length != 0) {
          box.y = about_to.pop().Y() - box.H();
          change_state("stopped");
        } else {
          v.x += a.x;
          v.y += a.y;
          box.x += v.x;
          box.y += v.y;
        }
      }
    }
  

  this.update = this[this.state];

  this.update2 = function(timestamp, game) {
    var v = this.velocity;
    var a = this.acceleration;
    var ms = this.max_speed;

  }
    
}
Fucus.prototype = Object.create(properties);
