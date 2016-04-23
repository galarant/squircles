var _ = require("lodash");

var util = require("util");
var events = require("events");

/**
 * Recognizes that the grid exists
 * and continues the tests.
 *
 * ```
 * this.demoTest = function (client) {
 *   client.touchSquircles(500);
 * };
 * ```
 *
 * @method pause
 * @param {number} ms The number of milliseconds to touch for
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @api commands
 */

function TouchSquircles() {
  events.EventEmitter.call(this);
}

util.inherits(TouchSquircles, events.EventEmitter);


TouchSquircles.prototype.command = function(ms, cb) {
  var self = this;

  // If we don"t pass the milliseconds, the client will
  // be suspended indefinitely
  if (!ms) {
    return this;
  }

  this.api.executeAsync(function(ms, done) {
    self.phaser = window.Phaser;
    self.game = self.phaser.GAMES[0];
    self.game.stage.disableVisibilityChange = true;

    self.game.e2eUpdate = function() {
      self.game.debug.text("foobar", 30, 45, "#00ff00");
    };

    console.log("open cbg:", self.game.grid.open_cbg);
    _.forEach(self.game.grid.cells, function(cell) {
      cell.squircle.touched();
      console.log("touched cell");
    });

    setTimeout(function() {
      self.game.e2eUpdate = null;
      done();
    }, ms);

  },

  [ms],

  function() {
    console.log("running TouchSquircles main");

    if (cb) {
      cb.call(self);
    }

    self.emit("complete");
  });

  return this;
};

module.exports = TouchSquircles;
