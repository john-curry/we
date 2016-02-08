var Game = function() { };

Game.prototype = {
  DEBUG: true,
  x: 0, y: 0, w: 1900, h: 1000,
  X: function() { return x; },
  Y: function() { return y; },
  W: function() { return w; },
  H: function() { return h; },
  gravity: new point(0, 2),
  components: [ ],
  keysdown: [ ],
  load: function() {
    for (var i = 0; i < this.components.length; i++) {
      if (this.components[i].loadable) {
        this.components[i].load(game);
      }
    }
  },

  update: function(timestamp) {
    for (var i = 0; i < this.components.length; i++) {
      if (this.components[i].updatable) {
        this.components[i].update(timestamp, game);
      }
    }
    this.keysdown = [ ];
  },

  draw: function(g) {
    g.clearRect(0, 0, this.w, this.h);
    for (var i = 0; i < this.components.length; i++) {
      var c = this.components[i];
      if (c.drawable && c.visible) {
        this.components[i].draw(g);
      }
    }
  },

  collidables: function() {
    return this.components.filter(i => i.collidable);
  },

  addComponents: function(c) {
    this.components = this.components.concat(c);
  },
  
  addComponent: function(c) { 
    this.components.push(c);  
  }
};
