import events from "events";

/**
 * Performs a custom Phaser command
 */

class PhaserUpdate extends events.EventEmitter {
  constructor() {
    super();
  }

  // this method name and format is needed for nightwatch
  command(ms) {
    let self = this;

    if (!ms) {
      console.error("CUSTOM COMMAND ERROR: Need to pass ms argument into PhaserUpdate command.");
      throw "";
    }

    // the phaserCommand method is delegated to the child class
    this.api.executeAsync(this.phaserCustomUpdate, [ms],
      function() {
        self.emit("complete");
      }
    );

    return this;
  }
}

module.exports = PhaserUpdate;
