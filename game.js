var Game = function(game_state) { this.game_states = game_states; };
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
  mouse_events: [ ],
  mouse_info: new point,
  state: "start",  
  load: function() {
    this.game_states[this.state].load(this); 
  },

  update: function(timestamp) {
    this.game_states[this.state].update(timestamp,this);
  },

  draw: function(g) {
    this.game_states[this.state].draw(g);
  },
  refresh: function(g) {
    g.clearRect(0, 0, this.w, this.h);
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
  clearComponents: function() {
    this.components = [ ];
  },
  removeComponent: function(c) {
    this.components = this.components.filter(i => i.uuid != c.uuid);
  },
  change_state: function(s) {
    this.state = s;
    this.game_states[s].game = this;
    this.game_states[s].load(this);
  },
  player_wins: function(time, game) { },
  player_loses: function(time, game) { }
};
