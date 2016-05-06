import PhaserCommand from "../../../lib/phaserCommand";

class GameOver extends PhaserCommand {
  constructor() {
    super();
  }

  phaserCustomCommand(ms, done) {
    // get game and state
    // don't pause game on visibility change
    let game = window.Phaser.GAMES[0];
    let state = game.state.states[game.state.current];
    game.stage.disableVisibilityChange = true;

    // force a gameOver
    state.gameOver();
    done();
  }
}

module.exports = GameOver;
