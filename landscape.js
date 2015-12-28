function Landscape() {
  var rectangles = [ ];  

  this.load = function(game) { 
    var blue = true;
    for (var i = 0; i < game.w; i++) {
      var r = new rectangle(i * 25, game.h / 2, 25, 2 * game.h);
      r.visible = false;
      rectangles.push(r);
    }
    game.addComponents(rectangles);
  };

  this.draw = function(g) {
  };

  this.update = function(timestamp, game) {
  };
}
Landscape.prototype.properties = Object.create(properties);
Landscape.prototype.properties.collidable = false;
