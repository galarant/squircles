import PhaserCommand from "../../../lib/phaserCommand";

class GameInputDown extends PhaserCommand {
  constructor() {
    super();
  }

  phaserCustomCommand(ms, done) {
    // get game and state
    // don't pause game on visibility change
    let game = window.Phaser.GAMES[0];

    // dispatch an InputDown event on the game object
    game.input.onDown.dispatch();
    done();
  }
}

module.exports = GameInputDown;
