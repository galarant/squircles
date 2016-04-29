import WaitFor from "../../node_modules/phase-2-e/lib/custom-commands/_waitFor";

/**
 * Waits a given time in milliseconds for a condition
 * on a Phaser component to return true.
 *
 * If the condition does not return true in the specified time,
 * the test fails.
 */

class PhaserWaitFor extends WaitFor {
  constructor() {
    super();
    this.expectedValue = "found";

    // ideally these messages will be delegated to the child class
    this.successMsg = "Phaser custom assertion passed after %d ms";
    this.failureMsg = "Timed out waiting for Phaser custom assertion after %d ms";
  }

  // assertion passed
  phaserComponentFound(result, now) {
    return this.pass(result, this.successMsg, now - this.startTimer);
  }

  // assertion failed on this tick
  phaserComponentNotFound(result, now) {
    // still have time left, schedule another tick
    if (now - this.startTimer < this.ms) {
      this.reschedule();
      return this;
    }

    // no time left, the test is going to fail
    return this.fail({value:false}, "not found", this.expectedValue, this.failureMsg, now - this.startTimer);
  }

  getProtocolCommand(callback) {

    //Checks that the game is available, and calls the callback if it is.
    return this.protocol.execute(this.condition, [],
      function (result) {
        callback.call(this, result);
      });
  }
}

module.exports = PhaserWaitFor;
