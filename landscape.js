function Landscape() {
  var rectangles = [ ];  
  this.loaded = false;
  this.loadable = true;

  this.load = function(game) { 
    var blue = true;
    var num = 10;
    for (var i = 0; i < game.w; i++) {
      if (i % 50 == 0) {
        game.addComponent(
          new rectangle(i, 0, 2, game.h)
        );
        game.addComponent(
          new rectangle(0, i, game.w, 2)
        );
      }
    }
    //game.addComponent(new ball(200,new point(800,400))); 
    //for (var i = 0; i < num; i++) {
    // game.addComponents(
    //  new ball(
    //    250*Math.random(),  
    //    new point(game.w*Math.random(), game.h*Math.random()),
    //    new point(0, 0),
    //    "black"
    //    )
    //  );
    //}
  };

  this.draw = function(g) {
  };

  this.update = function(timestamp, game) {
  };
}
Landscape.prototype = Object.create(properties);
Landscape.prototype.collidable = false;
