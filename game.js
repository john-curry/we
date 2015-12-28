var game = {
  x: 0, y: 0, w: 800, h: 600,
  components: [ ],

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
      if (this.components[i].properties.drawable) {
        this.components[i].draw(g);
      }
    }
  },
  
  collidables: function() {
    return this.components.filter(function(i) { return i.properties.collidable; });
  },

  addComponent: function(c) { 
    this.components.push(c);  
  }
};

