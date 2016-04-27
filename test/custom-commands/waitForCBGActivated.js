import WaitFor from "../../node_modules/phase-2-e/lib/custom-commands/_waitFor";

/**
 * Waits a given time in milliseconds for a single element of game.grid.cell_block_groups to be activated
 * If none are activated in the specified amount of time, the test fails.
 */

class WaitForCBGActivated extends WaitFor {
  constructor() {
    super();
    this.expectedValue = "found";
  }

  phaserComponentFound(result, now) {
    let defaultMsg = "CBG Activated OK after %d milliseconds.";
    return this.pass(result, defaultMsg, now - this.startTimer);
  }

  phaserComponentNotFound(result, now) {
    // element wasn't found, schedule another check
    if (now - this.startTimer < this.ms) {
      this.reschedule();
      return this;
    }

    // element was found
    let defaultMsg = "Timed out while waiting for CBG to activate for %d milliseconds.";
    return this.fail({value:false}, "not found", this.expectedValue, defaultMsg, now - this.startTimer);
  }

  getProtocolCommand(callback) {

    //Checks that the game is available, and calls the callback if it is.
    return this.protocol.execute(
      function () {
        let currentState = window.Phaser.GAMES[0].state.current;
        let playState = window.Phaser.GAMES[0].state.states[currentState];
        let game = playState.game;
        return game.grid.activated_cbgs.length > 0;
      },
      [],
      function (result) {
        callback.call(this, result);
      });
  }

}

module.exports = WaitForCBGActivated;
