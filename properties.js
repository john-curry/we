var properties = {
  updatable: true,
  drawable: true,
  loadable: true,
  loaded: false,
  visible: true,
  collidable: true,
  color: "black",
  priority: 1,
  uuid: undefined,
  collide: function(e) {
    return false;
  },
  onCollision: function(e) {
    //console.log("colliding with a non-collision implemented object");
  }
};

