import PhaserWaitFor from "../../../lib/phaserWaitFor";

/**
 * Waits for a single CBG to be in the active state.
 * If none are activated in the specified amount of time, the test fails.
 */

class WaitForGridExists extends PhaserWaitFor {
  constructor() {
    super();

    this.successMsg = "Found game.grid after %d ms";
    this.failureMsg = "Timed out waiting for game.grid after %d ms";
  }

  condition() {
    let game = window.Phaser.GAMES[0];
    return !!game.grid;
  }

}

module.exports = WaitForGridExists;
