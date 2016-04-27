import events from "events";

/**
 * Touches all of the cells on the grid
 * and continues the tests.
 */

class TouchSquircles extends events.EventEmitter {
  constructor() {
    super();
  }

  command(ms, cb) {
    let _ = require("lodash");
    let self = this;

    // If we don"t pass the milliseconds, the client will
    // be suspended indefinitely
    if (!ms) {
      return this;
    }

    this.api.executeAsync(function(ms, done) {
      this.game = window.Phaser.GAMES[0];
      this.game.stage.disableVisibilityChange = true;

      _.forEach(this.game.grid.cells, function(cell) {
        cell.squircle.touched();
      });

      setTimeout(function() {
        done();
      }, ms);

    },

    [ms],

    function() {
      if (cb) {
        cb.call(this);
      }

      self.emit("complete");
    });

    return this;
  }
}

module.exports = TouchSquircles;
