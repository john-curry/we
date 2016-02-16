function rocket(pos, v_mag, v_dir, o) { // no acceleration for rockets
  //console.log("rocket dir: " + v_dir + " pos: " + pos);
  this.w = 75;
  this.h = 1.25*this.w; 
  this.box = new rectangle(pos.x, pos.y, this.w, this.h);
  this.mag_dir = new point(v_mag, v_dir);
  this.image = undefined;
  this.owner = o;

  this.load = function(game) {
    this.image = document.getElementById("rocket");
    this.uuid = make_uuid();

  };
  
  this.collide = function(e) { 
    if (e instanceof ball) {
      var c = collision_circ_rect(e, this.box, 0);

      if (c) { 
        //console.log("collision with ball");
        return true;
      } return false;
    }
    if (e instanceof Fucus || e instanceof Enemy) {
      if (e.uuid == this.owner) return false;
      var coll_info = collision(e.box, this.box);
      if (coll_info.top || coll_info.bottom || coll_info.right || coll_info.left) {
        //console.log("collision with fucus");
        return true;
      } 
      return false;
    }
    if (e instanceof rocket) {
      var coll_info = collision(e.box, this.box);
      if (coll_info.top || coll_info.bottom || coll_info.right || coll_info.left) {
        //console.log("collision with rocket");
        return true;
      } 
      return false;
    }
    return false;
  }

    
  this.draw = function(g) {
    var box = this.box;
    g.save();
    g.translate(box.x + 0.5*box.w, box.y + 0.5*box.h);
    g.rotate((this.mag_dir.y + 90)*Math.PI/180);
    g.translate(-(box.x + .5*box.w), -(box.y + .5*box.h));
    g.fillRect(box.x, box.y, box.w, box.h);
    g.drawImage(this.image, box.x, box.y, box.w, box.h);
    g.restore();
  };

  this.update = function(t, game) {
    var md = this.mag_dir;
    var v = new point();
    v.x = md.x * Math.cos(md.y*Math.PI/180);
    v.y = md.x * Math.sin(md.y*Math.PI/180);
    this.box.x += v.x;
    this.box.y += v.y;
    var collidables = game.collidables();
    var hit = collidables.filter(i => this.collide(i));
    hit.forEach(i => i.onCollision(game,this));
    if (hit.length > 0) game.removeComponent(this);
  };
}

rocket.prototype = Object.create(properties);
