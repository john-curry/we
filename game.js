var Game = function() { };
/* alg: turn based system
  every player character gets a timer which dictates its turn
  every time the player makes an action, the timer is depleted
  when the timer is depleted, their turn is over
  then the next player startes their turn

*/
Game.prototype = {
  DEBUG: true,
  x: 0, y: 0, w: 1900, h: 1000,
  X: function() { return x; },
  Y: function() { return y; },
  W: function() { return w; },
  H: function() { return h; },
  components: [ ],
  keysdown: [ ],
  load: function() {
    for (var i = 0; i < this.components.length; i++) {
      var comp = this.components[i];
      if (comp.loadable && !comp.loaded) {
        comp.load(game);
        comp.loaded = true;
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
    //c.forEach(i => i.load(this));
    this.components = this.components.concat(c);
  },
  
  addComponent: function(c) { 
    if (!c.loaded && c.loadable) c.load(game);
    this.components.push(c);  
  },
  change_state: function(s) {
    this.state = s;
    this.update = this[s];
  },
  player_wins: function(time, game) { },
  player_loses: function(time, game) { }
};
