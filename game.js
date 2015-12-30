var Game = function() { };

Game.prototype = {
  DEBUG: true,
  x: 0, y: 0, w: 800, h: 600,
  gravity: new point(0, .3),
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
  },

  draw: function(g) {
    g.clearRect(0, 0, 800, 600);
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
