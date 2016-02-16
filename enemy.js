function Enemy() {
  Fucus.apply(this);
  this.time_since_direction_change = 0;
  this.till_dir_change = 2000;
  this.state = "moving";
  this.mag_dir = new point(0, 45);
  this.moving = function(game, timestamp) {
    this.box.x += 4;
  }

  this.load = function(game) {
    this.image = document.getElementById("spaceship");
    this.box.x = 100, this.box.y = 100;
    this.change_state(this.state);
    this.uuid = make_uuid();
  }

  this.stopped = function(time, game) {
    var f = game.player;

    var l = new Line(1, this.theta(), this.box.toPoint());

    if (collision_line_rect(l, f.box, 0)) {
      this.fireRocket(game);
    }
  }
  
  this.change_dir = true;
  this.dir_timer = undefined;

  this.moving = function(time, game) {
    var md = this.mag_dir;
    var dt = this.dir_timer;
    var box = this.box;
    if (this.change_dir) {
      this.change_dir = false;
      dt = new timer(this.till_dir_change, () => this.change_dir = true);
      dt.start();
      md.y = Math.random()*360;
      
    }
    if (box.x < 100) {
      md.y = Math.random()*90;
    }
    else if (box.y < 100) {
      md.y = Math.random()*180;
    }
    if (box.y + box.w  + 100>= game.h) {
      md.y = Math.random()*180 + 180;
    }
    if (box.x + box.w + 100 >= game.h) {
      md.y = Math.random()*180 + 90;
    }
    md.x = this.max_speed; 

    var f = game.player;

    var l = new Line(10, this.theta(), this.box.toPoint());

    if (collision_line_rect(l, f.box, 0)) {
      this.fireRocket(game);
    }
    this.update_position(time, game);
  }

  this.firing = function(time, game) {
    
  }

  this.onCollision = function(game, collided_with) {
    if (collided_with instanceof rocket) {
      game.change_state("player_wins");
    }
  }

}
Enemy.prototype = Object.create(properties);
