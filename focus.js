function Fucus() { }

Fucus.prototype = {
  properties: { 
    collidable: false,
    visible: true,
    updatable: true,
    drawable: true,
    loabable: true
  },
  box: new rectangle(0, 0, 75, 150),
  
  load: function(game) {
  },

  draw: function(g) {
    this.box.draw(g);
  },
  collide: function(r) {
    return collision(r, this.box);
  },
  update: function(timestamp, game) {
    var collision = game.collidables().some(
      function(e, i, a) {
        return e.collide(this.box);
      }
    );
    if (!collision) {
      this.box.y += 1;
    }
  },
};
