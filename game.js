var Game = function() { };

Game.prototype = {
  x: 0, y: 0, w: 800, h: 600,
  gravity: new point(0, 1),
  components: [ ],
  DEBUG: true,
  keysdown: [ ],
  load: function() {
    for (var i = 0; i < this.components.length; i++) {
      if (this.components[i].properties.loadable) {
        this.components[i].load(game);
      }
    }
  },

  update: function(timestamp) {
    for (var i = 0; i < this.components.length; i++) {
      if (this.components[i].properties.updatable) {
        this.components[i].update(timestamp, game);
      }
    }
  },

  draw: function(g) {
    g.clearRect(0, 0, 800, 600);
    for (var i = 0; i < this.components.length; i++) {
      var c = this.components[i];
      if (c.properties.drawable && c.properties.visible) {
        this.components[i].draw(g);
      }
    }
  },

  collidables: function() {
    return this.components.filter(function(i) { return i.properties.collidable; });
  },

  addComponents: function(c) {
    this.components = this.components.concat(c);
  },
  
  addComponent: function(c) { 
    this.components.push(c);  
  }
};
