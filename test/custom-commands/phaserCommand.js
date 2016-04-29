import events from "events";

/**
 * Performs a custom Phaser command
 */

class PhaserCommand extends events.EventEmitter {
  constructor() {
    super();
  }

  // this method name and format is needed for nightwatch
  command(ms) {
    let self = this;

    // the phaserCommand method is delegated to the child class
    this.api.executeAsync(this.phaserCommand, [ms],

    function() {
      self.emit("complete");
    });

    return this;
  }
}

module.exports = PhaserCommand;
