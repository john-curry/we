function Landscape() {
  
  this.load = function(game) { 
    for (var i = 0; i < game.w; i++) {
      game.addComponent(new rectangle(i, game.h / 2, 10, 2 * game.h));
    }
  };

  this.draw = function(g) {
  };

  this.update = function(timestamp, game) {
  };
}
Landscape.prototype.properties = Object.create(properties);
Landscape.prototype.properties.collidable = false;
