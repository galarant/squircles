import PhaserUpdate from "../lib/phaserUpdate";

class ShowCustomDebug extends PhaserUpdate {
  constructor() {
    super();
  }

  phaserCustomUpdate(ms, done) {
    console.log("running custom update");
    let game = window.Phaser.GAMES[0];
    game.stage.disableVisibilityChange = true;
    let currentStateName = game.state.current;
    let currentState = game.state.states[currentStateName];
    game.state.onUpdateCallback = function() {
      currentState.update();
      game.debug.text(
        "CUSTOM DEBUG TEXT",
        30, 45, "#00ff00"
      );
    };

    setTimeout(
      function() {
        console.log("custom update timing out");
        game.state.onUpdateCallback = currentState.update;
        game.debug.reset();
        done();
      },
      ms
    );
  }
}

module.exports = ShowCustomDebug;
