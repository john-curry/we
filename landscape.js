function Landscape() {
  var rectangles = [ ];  

  this.load = function(game) { 
    var blue = true;
    for (var i = 0; i < game.w; i++) {
      var r = new rectangle(i * 25, game.h - 200, 25, game.h - 20);
      var r2 = new rectangle(i * 60, 0, 30, game.h / 2);
      r2.color = "Orange";
      r2.collidable = false;
      if (i % 2 == 0) r.color = "Blue";
      else            r.color = "Green";
      rectangles.push(r2);
      rectangles.push(r);
    }
    game.addComponents(rectangles);
  };

  this.draw = function(g) {
  };

  this.update = function(timestamp, game) {
  };
}
Landscape.prototype = Object.create(properties);
Landscape.prototype.collidable = false;
