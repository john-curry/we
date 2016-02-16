function timer(time, fn = undefined) {
  this.started = false;
  this.done = false;
  this.stopped = false;
  this.interval = 20;
  this.tid = undefined;
  this.fn = fn;
  this.time = time;
  this.accu_time = 0;
  var _timer = this;
  this.start = function() {
    tid = setInterval(this.update, this.interval);
    this.started = true;
  }

  this.stop = function() {
    this.stopped = true;
  }
  this.unstop = function() {
    this.stopped = false;
  }
  this.restart = function(fn = undefined) {
    tid = setInterval(this.update, this.interval);
    this.stopped = false;
    this.done = false;
    this.started = true;
    this.accu_time = 0;
    if (fn != undefined) {
      this.fn = fn;
    } 
  }

  this.update = function() {
     
    if (!_timer.stopped) _timer.accu_time += _timer.interval;

    if (_timer.accu_time >= _timer.time) {

      if (_timer.fn != undefined && !_timer.done) {
        _timer.fn();
      }
      clearInterval(_timer.tid);
      _timer.done = true;
      _timer.started = false;
    }
  }

  this.finished = function() {
    return done;
  }
}
