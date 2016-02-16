function explosion(p) {
  this.position = p;
  this.images = [ ];
  this.image = undefined;
  this.w = 100;
  this.h = 100;
  this.f_timer = undefined;
  this.frame = 0;
  this.frame_time = 70;
  this.frames = 8;

  this.load = function(game) {
    console.log("loading explosion");
    this.uuid = make_uuid();
    for (var i = 8; i > 0; i--) {
      this.images.push(document.getElementById("e"+i));
    }
    this.image = this.images.pop();
  };

  this.update = function(time, game) {
    if (this.f_timer == undefined || this.f_timer.done) {
      this.f_timer = new timer(
        this.frame_time,
        () => this.image = this.images.pop()
      );
      this.f_timer.start();
      if (this.image == undefined) {
        game.removeComponent(this);
      }
    }
  };
  this.draw = function(gfx) {
    var p = this.position;
    gfx.drawImage(this.image, p.x, p.y, this.w, this.h); 
  };
}
explosion.prototype = Object.create(properties);
