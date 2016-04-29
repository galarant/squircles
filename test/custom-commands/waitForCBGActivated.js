import PhaserWaitFor from "./phaserWaitFor";

/**
 * Waits for a single CBG to be in the active state.
 * If none are activated in the specified amount of time, the test fails.
 */

class WaitForCBGActivated extends PhaserWaitFor {
  constructor() {
    super();

    this.successMsg = "Found activated CBG after %d ms";
    this.failureMsg = "Timed out waiting for active CBG after %d ms";
  }

  condition() {
    let currentState = window.Phaser.GAMES[0].state.current;
    let playState = window.Phaser.GAMES[0].state.states[currentState];
    let game = playState.game;
    return game.grid.activated_cbgs.length > 0;
  }

}

module.exports = WaitForCBGActivated;
