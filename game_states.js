var game_states = { 
  start: {
    game: undefined,
    image: undefined,
    ready: false,
    r_timer: undefined,
    load: function(game) { 
      this.ready = false;
      r_timer = new timer(100, () => this.ready = true);
      r_timer.start();
      this.game = game; 
      game.player = new Fucus();
      game.addComponents([
        new Landscape(),
        new Enemy(),
        game.player
      ]);
      this.image = document.getElementById("splash");
    },

    update: function(time, g) { 
      if (g.mouse_events.some(i => i == "mousedown") && this.ready) {
        g.change_state("play");
        //g.clearComponents();
      }
    },
    draw: function(gfx) { 
      this.game.refresh(gfx);
      gfx.drawImage(this.image, 0, 0, this.game.w, this.game.h);
    }
  },
  player_wins: {
    image: undefined,
    load: function() { 
      this.image = document.getElementById("win");
    },
    update: function(time, g) { 
      if (g.mouse_events.some(i => i == "mousedown")) {
        g.clearComponents();
        g.change_state("start");
      }
    },
    draw: function(gfx) { 
      this.game.refresh(gfx);
      gfx.drawImage(this.image, 0, 0, this.game.w, this.game.h);
    }
  },
  player_loses: {
    image: undefined,
    load: function() { 
      this.image = document.getElementById("lose");
    },
    update: function(time, g) { 
      if (g.mouse_events.some(i => i == "mousedown")) {
        g.clearComponents();
        g.change_state("start");
      }
    },
    draw: function(gfx) { 
      this.game.refresh(gfx);
      gfx.drawImage(this.image, 0, 0, this.game.w, this.game.h);
    }
  },
  play: {
    load: function(g) {
      for (var i = 0; i < g.components.length; i++) {
        var comp = g.components[i];
        if (comp.loadable && !comp.loaded) {
          comp.load(g);
          comp.loaded = true;
        }
      }
    },
    update: function(timestamp, g) {
      for (var i = 0; i < g.components.length; i++) {
        if (g.components[i].updatable) {
          g.components[i].update(timestamp, game);
        }
      }
      g.keysdown = [ ];
    },
    draw: function(gfx) {
      this.game.refresh(gfx);
      for (var i = 0; i < this.game.components.length; i++) {
        var c = this.game.components[i];
        if (c.drawable && c.visible) {
          this.game.components[i].draw(gfx);
        }
      }
    }
  }
}
